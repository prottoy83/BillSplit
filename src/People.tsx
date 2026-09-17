import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Paper, Stack } from '@mui/material';
import PeopleBox from './components/PeopleBox';

// 1. Define the interfaces
export interface Person {
  id: number;
  name: string;
}

interface PeopleProps {
  people: Person[];
  setPeople: React.Dispatch<React.SetStateAction<Person[]>>;
}

// 2. Apply the interface to the component props
function People({ people, setPeople }: PeopleProps) {
  const [name, setName] = useState('');

  // 3. Type the event parameter
  const handleAdd = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name.trim()) return;

    setPeople((prev) => [
      ...prev,
      { 
        id: prev.length > 0 ? Math.max(...prev.map((p) => p.id)) + 1 : 1, 
        name: name.trim() 
      },
    ]);
    setName('');
  };

  // 4. Type the id parameter
  const handleDelete = (id: number) => {
    setPeople((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <Box sx={{ maxWidth: 480, mx: 'auto', display: 'flex', flexDirection: 'column', gap: 2.5 }}>
      {/* Add Person Input Box */}
      <Paper
        component="form"
        onSubmit={handleAdd}
        elevation={0}
        sx={{
          p: 2,
          display: 'flex',
          gap: 1.5,
          bgcolor: '#ffffff',
          borderRadius: 3,
          border: '1px solid',
          borderColor: 'divider',
        }}
      >
        <TextField
          size="small"
          label="Name"
          variant="outlined"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
          sx={{
            '& .MuiOutlinedInput-root': { borderRadius: 2 },
          }}
        />
        <Button
          variant="contained"
          type="submit"
          disableElevation
          sx={{
            px: 3,
            borderRadius: 2,
            textTransform: 'none',
            fontWeight: 600,
            bgcolor: '#1e293b',
            '&:hover': { bgcolor: '#334155' },
          }}
        >
          Add
        </Button>
      </Paper>

      {/* People List Section */}
      <Paper
        elevation={0}
        sx={{
          p: 2.5,
          bgcolor: '#ffffff',
          borderRadius: 3,
          border: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
          <Typography
            variant="overline"
            sx={{ color: 'text.secondary', fontWeight: 700, letterSpacing: '0.05em' }}
          >
            People Added
          </Typography>
          <Typography
            variant="caption"
            sx={{
              bgcolor: '#f1f5f9',
              color: 'text.primary',
              px: 1.2,
              py: 0.3,
              borderRadius: 4,
              fontWeight: 700,
            }}
          >
            {people.length}
          </Typography>
        </Box>

        <Stack spacing={1.5}>
          {people.map((p) => (
            <PeopleBox
              key={p.id}
              name={p.name}
              onDelete={() => handleDelete(p.id)}
            />
          ))}
        </Stack>

        {people.length === 0 && (
          <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            sx={{ py: 3, fontStyle: 'italic' }}
          >
            No one added yet.
          </Typography>
        )}
      </Paper>
    </Box>
  );
}

export default People;