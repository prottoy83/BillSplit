import { Box, Typography, ButtonGroup, Button, Avatar } from '@mui/material';

function PeopleBox({ name = "User Name", index = 1, onDelete, onEdit }: any) {
  const initial = name ? name.charAt(0).toUpperCase() : '?';

  return (
    <Box
      sx={{
        p: 1.5,
        px: 2,
        borderRadius: 2,
        bgcolor: '#f8fafc',
        border: '1px solid',
        borderColor: '#e2e8f0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        transition: 'all 0.15s ease-in-out',
        '&:hover': {
          bgcolor: '#f1f5f9',
          borderColor: '#cbd5e1',
        },
      }}
    >
      {/* Left side: Avatar initial + Name */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <Avatar
          sx={{
            width: 32,
            height: 32,
            fontSize: '0.875rem',
            fontWeight: 700,
            bgcolor: '#e2e8f0',
            color: 'text.primary',
          }}
        >
          {initial}
        </Avatar>
        <Typography
          variant="body1"
          sx={{ fontWeight: 600, color: 'text.primary' }}
        >
          {name}
        </Typography>
      </Box>

      {/* Right side: Action buttons */}
      <ButtonGroup
        size="small"
        variant="outlined"
        sx={{
          '& .MuiButton-root': {
            textTransform: 'none',
            borderColor: '#cbd5e1',
            color: 'text.secondary',
            py: 0.4,
            px: 1.2,
            fontSize: '0.78rem',
            fontWeight: 500,
            '&:hover': {
              borderColor: '#94a3b8',
              bgcolor: '#ffffff',
            },
          },
        }}
      >
        <Button onClick={onEdit}>Edit</Button>
        <Button
          onClick={onDelete}
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
  );
}

export default PeopleBox;