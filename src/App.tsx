import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';

// Material Icons
import PeopleIcon from '@mui/icons-material/People';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

// Pages
import People from './People';
import Bill from './Bill';
import More from './More';

// 1. Define the type for the people state
export interface Person {
  id: number;
  name: string;
}

function App() {
  const [tabValue, setTabValue] = useState(0);

  // 2. Tell TypeScript this is an array of Person objects
  const [people, setPeople] = useState<Person[]>([]);

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f8fafc' }}>
      {/* Modern Frosted Header */}
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          bgcolor: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(8px)',
          borderBottom: '1px solid',
          borderColor: 'divider',
          color: 'text.primary',
        }}
      >
        <Toolbar sx={{ justifyContent: 'center' }}>
          <Typography
            variant="h6"
            component="h1"
            sx={{
              fontWeight: 800,
              letterSpacing: '-0.025em',
              background: 'linear-gradient(135deg, #1e293b 0%, #475569 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            BillSplit
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Main Content Spacer */}
      <Box sx={{ p: 2, pb: 10 }}>
      {[
        <People key="people" people={people} setPeople={setPeople} />, 
        <Bill key="bill" people={people} />, 
        <More key="more" />][tabValue]}
      </Box>

      {/* Bottom Navigation */}
      <Paper
        elevation={0}
        sx={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          borderTop: '1px solid',
          borderColor: 'divider',
          bgcolor: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(8px)',
        }}
      >
        <BottomNavigation
          showLabels
          value={tabValue}
          // 3. Replaced 'event' with '_' since we don't use it
          onChange={(_, newValue) => {
            setTabValue(newValue);
          }}
          sx={{ bgcolor: 'transparent' }}
        >
          <BottomNavigationAction label="People" icon={<PeopleIcon />} />
          <BottomNavigationAction label="Bill" icon={<ReceiptLongIcon />} />
          <BottomNavigationAction label="More" icon={<MoreHorizIcon />} />
        </BottomNavigation>
      </Paper>
    </Box>
  );
}

export default App;