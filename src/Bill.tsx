import { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Paper,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Stack,
  IconButton,
  Typography,
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText
} from '@mui/material';
import BillTable from './components/BillTable';

// --- TYPE DEFINITIONS ---
export interface Person {
  id: number;
  name: string;
}

export interface Contributor {
  id: number;
  person: string;
  percentage: string | number;
}

export interface SavedItem {
  id: number;
  name: string;
  price: number;
  contributors: Contributor[];
}

interface BillProps {
  people: Person[];
}
// ------------------------

function Bill({ people }: BillProps) {
  const [itemName, setItemName] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  
  const [contributors, setContributors] = useState<Contributor[]>([
    { id: Date.now(), person: '', percentage: '' },
  ]);

  const [savedItems, setSavedItems] = useState<SavedItem[]>([]);

  // --- NEW: Dialog and calculation state ---
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [breakdown, setBreakdown] = useState<Record<string, number>>({});

  const handleAddContributor = () => {
    setContributors((prev) => [
      ...prev,
      { id: Date.now(), person: '', percentage: '' },
    ]);
  };

  const handleRemoveContributor = (id: number) => {
    setContributors((prev) => prev.filter((row) => row.id !== id));
  };

  const handleRowChange = (id: number, field: keyof Contributor, value: string) => {
    setContributors((prev) =>
      prev.map((row) => (row.id === id ? { ...row, [field]: value } : row))
    );
  };

  const handleSaveItem = () => {
    if (!itemName || !price) return;

    const newItem: SavedItem = {
      id: Date.now(),
      name: itemName,
      price: parseFloat(price),
      contributors: contributors 
    };

    setSavedItems((prev) => [...prev, newItem]);
    
    setItemName('');
    setPrice('');
    setContributors([{ id: Date.now(), person: '', percentage: '' }]);
  };

  const handleRemoveSavedItem = (id: number) => {
    setSavedItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleLoadItemIntoForm = (item: SavedItem) => {
    setItemName(item.name);
    setPrice(item.price.toString());
    setContributors(item.contributors);
    handleRemoveSavedItem(item.id); 
  };

  // --- NEW: Calculate totals based on percentages ---
  const handleCalculate = () => {
    const newBreakdown: Record<string, number> = {};

    savedItems.forEach((item) => {
      const itemPrice = Number(item.price) || 0;
      
      item.contributors.forEach((contributor) => {
        if (contributor.person && contributor.percentage) {
          const pct = Number(contributor.percentage) || 0;
          const amountOwed = itemPrice * (pct / 100);
          
          newBreakdown[contributor.person] = 
            (newBreakdown[contributor.person] || 0) + amountOwed;
        }
      });
    });

    setBreakdown(newBreakdown);
    setIsDialogOpen(true);
  };

  return (
    <Box sx={{ maxWidth: 480, mx: 'auto', width: '100%', p: 1, display: 'flex', flexDirection: 'column', gap: 3, pb: 10 }}>
      
      {/* Add Item Form */}
      <Paper
        elevation={0}
        sx={{
          p: 2.5, display: 'flex', flexDirection: 'column', gap: 2,
          bgcolor: '#ffffff', borderRadius: 3, border: '1px solid', borderColor: 'divider',
        }}
      >
        <Box sx={{ display: 'flex', gap: 1.5 }}>
          <TextField
            size="small" label="Item name" variant="outlined" fullWidth
            value={itemName} onChange={(e) => setItemName(e.target.value)}
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
          />
          <TextField
            size="small" label="Price" type="number" variant="outlined"
            value={price} onChange={(e) => setPrice(e.target.value)}
            sx={{ width: 140, '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
          />
        </Box>

        <Stack spacing={1.5}>
          {contributors.map((row) => (
            <Box key={row.id} sx={{ display: 'flex', gap: 1.5, alignItems: 'center' }}>
              <FormControl size="small" fullWidth sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}>
                <InputLabel id={`person-select-${row.id}`}>Select Person</InputLabel>
                <Select
                  labelId={`person-select-${row.id}`} label="Select Person"
                  value={row.person} onChange={(e) => handleRowChange(row.id, 'person', e.target.value as string)}
                >
                  {people.map((p) => (
                    <MenuItem key={p.id} value={p.name}>{p.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>

              <TextField
                size="small" label="%" type="number" variant="outlined"
                value={row.percentage} onChange={(e) => handleRowChange(row.id, 'percentage', e.target.value)}
                sx={{ width: 100, '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
              />

              {contributors.length > 1 && (
                <IconButton
                  size="small" onClick={() => handleRemoveContributor(row.id)}
                  sx={{ 
                    color: 'error.main', bgcolor: '#fee2e2', borderRadius: 1.5,
                    '&:hover': { bgcolor: '#fca5a5', color: '#fff' } 
                  }}
                >
                  <span style={{ fontSize: '1rem', fontWeight: 'bold', lineHeight: 1 }}>✕</span>
                </IconButton>
              )}
            </Box>
          ))}
        </Stack>

        <Button
          variant="outlined" type="button" onClick={handleAddContributor}
          sx={{
            borderRadius: 2, textTransform: 'none', fontWeight: 600,
            borderColor: 'divider', color: 'text.primary',
            '&:hover': { borderColor: 'text.secondary', bgcolor: '#f8fafc' },
          }}
        >
          + Add Person
        </Button>

        <Button
          variant="contained" type="button" onClick={handleSaveItem} disableElevation
          sx={{
            py: 1, borderRadius: 2, textTransform: 'none', fontWeight: 600,
            bgcolor: '#1e293b', '&:hover': { bgcolor: '#334155' },
          }}
        >
          Save Item
        </Button>
      </Paper>

      {/* Saved Items List */}
      {savedItems.length > 0 && (
        <Stack spacing={2}>
          <Typography variant="overline" sx={{ color: 'text.secondary', fontWeight: 700 }}>
            Saved Items
          </Typography>
          
          {savedItems.map((savedItem) => (
            <BillTable 
              key={savedItem.id} item={savedItem} 
              onDelete={handleRemoveSavedItem} onEdit={handleLoadItemIntoForm} 
            />
          ))}
        </Stack>
      )}

      {/* --- NEW: Floating Calculate Button --- */}
      <Fab 
        variant="extended" 
        color="primary" 
        onClick={handleCalculate}
        sx={{
          position: 'fixed',
          bottom: 80,
          right: 24,
          fontWeight: 'bold',
          textTransform: 'none',
          boxShadow: 3
        }}
      >
        Calculate Bill
      </Fab>

      {/* --- NEW: Breakdown Dialog --- */}
      <Dialog 
        open={isDialogOpen} 
        onClose={() => setIsDialogOpen(false)} 
        maxWidth="xs" 
        fullWidth
        sx={{ '& .MuiDialog-paper': { borderRadius: 3 } }}
      >
        <DialogTitle sx={{ fontWeight: 'bold', textAlign: 'center' }}>
          Final Breakdown
        </DialogTitle>
        <DialogContent dividers>
          {Object.keys(breakdown).length === 0 ? (
            <Typography align="center" color="text.secondary" sx={{ py: 2 }}>
              No calculations to show yet.
            </Typography>
          ) : (
            <List disablePadding>
              {Object.entries(breakdown).map(([person, total]) => (
                <ListItem key={person} sx={{ px: 0, py: 1 }}>
                  <ListItemText 
                    primary={<Typography sx={{ fontWeight: 500 }}>{person}</Typography>} 
                  />
                  <Typography variant="overline" sx={{ fontWeight: 'bold' }}>
                      Pay: {total.toFixed(2)} 
                  </Typography>
                </ListItem>
              ))}
            </List>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button 
            onClick={() => setIsDialogOpen(false)} 
            variant="contained" 
            disableElevation
            fullWidth
            sx={{ borderRadius: 2, textTransform: 'none', fontWeight: 'bold' }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
      
    </Box>
  );
}

export default Bill;