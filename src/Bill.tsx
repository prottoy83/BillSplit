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
  Typography
} from '@mui/material';
// Import your BillTable component! Adjust the path if it's inside a components folder.
import BillTable from './components/BillTable'; 

// Dummy list for dev
const names = ['Alice', 'Bob', 'Charlie', 'David'];

function Bill() {
  const [itemName, setItemName] = useState('');
  const [price, setPrice] = useState('');
  
  // List of dynamic contributor rows for the form
  const [contributors, setContributors] = useState([
    { id: Date.now(), person: '', percentage: '' },
  ]);

  // --- NEW: State to hold the saved items ---
  const [savedItems, setSavedItems] = useState([]);

  // Form row actions
  const handleAddContributor = () => {
    setContributors((prev) => [
      ...prev,
      { id: Date.now(), person: '', percentage: '' },
    ]);
  };

  const handleRemoveContributor = (id) => {
    setContributors((prev) => prev.filter((row) => row.id !== id));
  };

  const handleRowChange = (id, field, value) => {
    setContributors((prev) =>
      prev.map((row) => (row.id === id ? { ...row, [field]: value } : row))
    );
  };

  // --- NEW: Actually save the item to the list ---
  const handleSaveItem = () => {
    if (!itemName || !price) return; // Simple validation

    const newItem = {
      id: Date.now(),
      name: itemName,
      price: price,
      contributors: contributors // matches what BillTable expects
    };

    setSavedItems((prev) => [...prev, newItem]);
    
    // Reset form fields
    setItemName('');
    setPrice('');
    setContributors([{ id: Date.now(), person: '', percentage: '' }]);
  };

  // --- NEW: Remove a saved item ---
  const handleRemoveSavedItem = (id) => {
    setSavedItems((prev) => prev.filter((item) => item.id !== id));
  };

  // --- NEW: Load a saved item back into the form to edit ---
  const handleLoadItemIntoForm = (item) => {
    setItemName(item.name);
    setPrice(item.price);
    setContributors(item.contributors);
    
    // Optional: Remove it from the saved list while editing
    handleRemoveSavedItem(item.id); 
  };

  return (
    // Wrapped everything in a parent Box with a gap
    <Box sx={{ maxWidth: 480, mx: 'auto', p: 1, display: 'flex', flexDirection: 'column', gap: 3 }}>
      
      {/* --- ADD ITEM FORM --- */}
      <Paper
        elevation={0}
        sx={{
          p: 2.5,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          bgcolor: '#ffffff',
          borderRadius: 3,
          border: '1px solid',
          borderColor: 'divider',
        }}
      >
        {/* Item Name & Price Input Boxes */}
        <Box sx={{ display: 'flex', gap: 1.5 }}>
          <TextField
            size="small"
            label="Item name"
            variant="outlined"
            fullWidth
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
          />
          <TextField
            size="small"
            label="Price"
            type="number"
            variant="outlined"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            sx={{ width: 140, '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
          />
        </Box>

        {/* Dynamic Contributor Rows */}
        <Stack spacing={1.5}>
          {contributors.map((row) => (
            <Box key={row.id} sx={{ display: 'flex', gap: 1.5, alignItems: 'center' }}>
              <FormControl
                size="small"
                fullWidth
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
              >
                <InputLabel id={`person-select-${row.id}`}>Select Person</InputLabel>
                <Select
                  labelId={`person-select-${row.id}`}
                  label="Select Person"
                  value={row.person}
                  onChange={(e) => handleRowChange(row.id, 'person', e.target.value)}
                >
                  {names.map((name) => (
                    <MenuItem key={name} value={name}>
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <TextField
                size="small"
                label="%"
                type="number"
                variant="outlined"
                value={row.percentage}
                onChange={(e) => handleRowChange(row.id, 'percentage', e.target.value)}
                sx={{ width: 100, '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
              />

              {/* Remove Button */}
              {contributors.length > 1 && (
                <IconButton
                  size="small"
                  onClick={() => handleRemoveContributor(row.id)}
                  sx={{ 
                    color: 'error.main', 
                    bgcolor: '#fee2e2', 
                    borderRadius: 1.5,
                    '&:hover': { bgcolor: '#fca5a5', color: '#fff' } 
                  }}
                >
                  <span style={{ fontSize: '1rem', fontWeight: 'bold', lineHeight: 1 }}>✕</span>
                </IconButton>
              )}
            </Box>
          ))}
        </Stack>

        {/* Button to Add New Person Row */}
        <Button
          variant="outlined"
          type="button"
          onClick={handleAddContributor}
          sx={{
            borderRadius: 2,
            textTransform: 'none',
            fontWeight: 600,
            borderColor: 'divider',
            color: 'text.primary',
            '&:hover': { borderColor: 'text.secondary', bgcolor: '#f8fafc' },
          }}
        >
          + Add Person
        </Button>

        {/* Submit Button */}
        <Button
          variant="contained"
          type="button"
          onClick={handleSaveItem}
          disableElevation
          sx={{
            py: 1,
            borderRadius: 2,
            textTransform: 'none',
            fontWeight: 600,
            bgcolor: '#1e293b',
            '&:hover': { bgcolor: '#334155' },
          }}
        >
          Save Item
        </Button>
      </Paper>

      {/* --- SAVED ITEMS LIST --- */}
      {savedItems.length > 0 && (
        <Stack spacing={2}>
          <Typography variant="overline" sx={{ color: 'text.secondary', fontWeight: 700 }}>
            Saved Items
          </Typography>
          
          {savedItems.map((savedItem) => (
            <BillTable 
              key={savedItem.id} 
              item={savedItem} 
              onDelete={handleRemoveSavedItem} 
              onEdit={handleLoadItemIntoForm} 
            />
          ))}
        </Stack>
      )}
      
    </Box>
  );
}

export default Bill;