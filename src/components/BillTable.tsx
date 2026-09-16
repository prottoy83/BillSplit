import { Box, Typography, Paper, Divider, Stack, ButtonGroup, Button } from "@mui/material";

function BillTable({ item, onEdit, onDelete }) {
  // Fallback in case item is empty or undefined
  if (!item) return null;

  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        borderRadius: 3,
        border: '1px solid',
        borderColor: '#e2e8f0',
        bgcolor: '#f8fafc',
        display: 'flex',
        flexDirection: 'column',
        gap: 1.5,
        transition: 'all 0.15s ease-in-out',
        '&:hover': {
          borderColor: '#cbd5e1',
          bgcolor: '#f1f5f9',
        },
      }}
    >
      {/* Top Section: Item Info & Actions */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <Box>
          <Typography variant="subtitle1" sx={{ fontWeight: 700, color: 'text.primary' }}>
            {item.name || "Unnamed Item"}
          </Typography>
          <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.secondary' }}>
            Price: {item.price || "0"} BDT
          </Typography>
        </Box>

        {/* Edit / Remove Buttons (PeopleBox Style) */}
        <ButtonGroup
          size="small"
          variant="outlined"
          sx={{
            '& .MuiButton-root': {
              textTransform: 'none',
              borderColor: '#cbd5e1',
              color: 'text.secondary',
              py: 0.3,
              px: 1,
              fontSize: '0.75rem',
              fontWeight: 500,
              '&:hover': {
                borderColor: '#94a3b8',
                bgcolor: '#ffffff',
              },
            },
          }}
        >
          <Button onClick={() => onEdit && onEdit(item)}>Edit</Button>
          <Button
            onClick={() => onDelete && onDelete(item.id)}
            sx={{
              '&:hover': {
                color: 'error.main',
                borderColor: 'error.light',
                bgcolor: '#fee2e2 !important',
              },
            }}
          >
            Remove
          </Button>
        </ButtonGroup>
      </Box>

      <Divider sx={{ borderColor: '#e2e8f0' }} />

      {/* Contributors Section */}
      <Box>
        <Typography 
          variant="caption" 
          sx={{ fontWeight: 700, color: 'text.secondary', display: 'block', mb: 1 }}
        >
          CONTRIBUTORS
        </Typography>
        
        <Stack spacing={0.75}>
          {item.contributors && item.contributors.length > 0 ? (
            item.contributors.map((contrib, index) => (
              <Box 
                key={contrib.id || index} 
                sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
              >
                <Typography variant="body2" sx={{ fontWeight: 500, color: 'text.primary' }}>
                  • {contrib.person || "Unknown"}
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.secondary' }}>
                  {contrib.percentage || "0"}%
                </Typography>
              </Box>
            ))
          ) : (
            <Typography variant="body2" sx={{ fontStyle: 'italic', color: 'text.disabled' }}>
              No contributors added.
            </Typography>
          )}
        </Stack>
      </Box>
    </Paper>
  );
}

export default BillTable;