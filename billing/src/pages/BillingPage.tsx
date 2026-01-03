import Header from '../components/Header.tsx';
import Account from '../layout/Account.tsx';
import Policy from '../layout/Policy.tsx';
import Contact from '../layout/Contact.tsx';
import Admin from '../layout/Admin.tsx';
import SideBar from '../layout/SideBar.tsx';
import { useSelector } from 'react-redux';
import { Box, Container, Divider, Grid, IconButton, Toolbar } from '@mui/material';
import { useState } from 'react';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Outlet } from 'react-router-dom';

const BillingPage = ({children}: any) => {

  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(prev => !prev);
  };

  return (
    <Container maxWidth={false} disableGutters>
      <Grid container direction="column">
        {/* Header */}
        <Grid item xs={12}>
          <Header />
        </Grid>

        {/* Body */}
        <Grid item flexGrow={1} overflow="hidden" sx={{ pt: '100px' }} >
          <Grid container sx={{ minHeight: '81.8vh' }} bgcolor={'white'}>

            {/* Sidebar */}
            <Grid
              item
              xl={collapsed ? 0.3 : 2}
              lg={collapsed ? 0.3 : 2}
              md={collapsed ? 0.3 : 3}
              xs={collapsed ? 1 : 4}
              sx={{
                borderRight: '1px solid #e0e0e0',
                transition: 'all 0.3s ease',
                overflow: 'hidden',
              }}
            >
              <SideBar collapsed={collapsed} onToggle={toggleSidebar} />
            </Grid>

            {/* Spacer */}
            <Grid
              item
              sx={{
                width: 12,
                bgcolor: '#E2E2E2',
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'center',alignItems:'center', height: '100%' }}>
                <IconButton onClick={toggleSidebar} size="small">
                  {collapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                </IconButton>
              </Box>
            </Grid>

            {/* Main Content */}
            <Grid
              item
              sx={{
                flex: 1,
                overflow: 'auto',
                transition: 'all 0.3s ease',
              }}
              color={'black'}
            >
              <Outlet />
            </Grid>

          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default BillingPage;