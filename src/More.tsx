import { Box, Typography, Paper, Divider, Stack } from '@mui/material';
import Link from '@mui/material/Link';
import GitHubIcon from '@mui/icons-material/GitHub';

function More() {
  return (
    <Box sx={{ maxWidth: 520, mx: 'auto', px: 1 }}>
      <Paper
        elevation={0}
        sx={{
          p: { xs: 2.5, sm: 3.5 },
          borderRadius: 3,
          border: '1px solid',
          borderColor: 'divider',
          bgcolor: '#ffffff',
        }}
      >
        {/* Header Section */}
        <Box sx={{ mb: 2.5 }}>
          <Typography
            variant="h5"
            component="h2"
            sx={{
              fontWeight: 800,
              letterSpacing: '-0.02em',
              color: 'text.primary',
            }}
          >
            BillSplit.io
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.25 }}>
            Crafted by{' '}
            <Typography component="span" variant="body2" sx={{ fontWeight: 600, color: 'text.primary' }}>
              Prottoy Roy
            </Typography>
          </Typography>
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* Description Section */}
        <Stack spacing={1.5} sx={{ mb: 3 }}>
          <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.7 }}>
            <Box component="strong" sx={{ color: 'text.primary', fontWeight: 600 }}>
              BillSplit
            </Box>{' '}
            makes splitting expenses simple and stress-free. Whether you're sharing a meal,
            going on a trip, or living with roommates, the app handles all the math for you.
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.7 }}>
            Add your friends, enter the total costs—including taxes and tips—and instantly see exactly
            what each person owes. No messy calculations, no confusion.
          </Typography>
        </Stack>

        {/* Feedback / GitHub Section */}
        <Box
          sx={{
            p: 2,
            borderRadius: 2,
            bgcolor: '#f8fafc',
            border: '1px solid',
            borderColor: '#e2e8f0',
            mb: 3,
          }}
        >
          <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mb: 0.5, fontWeight: 500 }}>
            FEEDBACK & SUPPORT
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', display: 'flex', alignItems: 'center', gap: 0.75, flexWrap: 'wrap' }}>
            <GitHubIcon sx={{ fontSize: 16, color: 'text.primary' }} />
            Found a bug or want a feature?{' '}
            <Link
              href="https://github.com/prottoy83/BillSplit/issues/new"
              target="_blank"
              rel="noopener noreferrer"
              underline="hover"
              sx={{ fontWeight: 600, color: 'primary.main' }}
            >
              Open an issue on GitHub
            </Link>
          </Typography>
        </Box>

        {/* Footer Note */}
        <Typography
          variant="caption"
          align="center"
          sx={{
            display: 'block',
            color: 'text.disabled',
            fontWeight: 500,
          }}
        >
          Thanks for using BillSplit!
        </Typography>
      </Paper>
    </Box>
  );
}

export default More;