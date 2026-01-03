import { AppBar, Box, Button, Divider, Grid, IconButton, TextField, Toolbar, Typography } from "@mui/material";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useState } from "react";
import MenuList from "./MenuList.tsx";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setPage, setSideBar } from "../redux/navigationAction.ts";
import { setPolicy } from "../redux/policyaction.ts";

const menuConfig: Record<string, any[]> = {
  Account: ['Accounts', 'Contacts', 'Billing Summary'],
  Policy: ['1234', '5678', '91011'],
  Contact: ['Search Contact', 'Create Contact'],
  Admin: ['Users', 'Roles', 'System Settings'],
};

const Header = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {policyNumber} = useSelector((state: any) => state.policyReducer);

   const today = new Date().toLocaleDateString('en-IN', {
    weekday: 'long',
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });


  const handleIconClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    menuName: string
  ) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
    setActiveMenu(menuName);
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>, menuName: string) => {
    event.stopPropagation();
    dispatch(setPage(menuName.toLowerCase()));
    dispatch(setSideBar(menuName.toLowerCase()));
    navigate(`/${menuName.toLowerCase()}`);
    dispatch(setPolicy(""));
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setActiveMenu(null);
  };

  return (
    <AppBar
      position="fixed"
      elevation={1}     
      sx={{
        backgroundColor: '#f5f5f5',
        color: '#000',
      }}
    >
      <Toolbar sx={{ minHeight: '20px !important', px: 2}}>
        <Typography
          variant="subtitle1"
          sx={{ fontWeight: 600, mr: 4 }}
        >
          ExpleoSurance <span style={{ color: '#1976d2' }}>Billing</span>
        </Typography>

        {/* Center Menu */}
        <Box sx={{ display: 'flex', gap: 1 }}>
          {['Account', 'Policy', 'Contact', 'Admin'].map(
            (item) => (
              <Button
                key={item}
                variant="text"
                onClick={(e) => handleClick(e, item)}
                sx={{
                  textTransform: 'none',
                  color: 'inherit',
                  fontSize: 14,
                  '&:hover': {
                    backgroundColor: '#0067AC',
                    color: 'white',
                  },
                }}
              >
                {item}
                 {/* Dropdown icon only */}
              <IconButton
                size="small"
                onClick={(e) => handleIconClick(e, item)}
                sx={{
                  ml: 0.5,
                  color: 'inherit',
                }}
              >
                <ArrowDropDownIcon fontSize="small" />
              </IconButton>
              </Button>
            )
          )}
        </Box>

        {/* Dropdown Menu */}
        <MenuList
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          items={activeMenu ? menuConfig[activeMenu] : []}
        />

      </Toolbar>
      <Box
  sx={{
    height: 7,
    background:
      'linear-gradient(to bottom, rgba(0,0,0,0.35), rgba(0,0,0,0))',
  }}
/>
      <Toolbar disableGutters 
       
      sx={{
    minHeight: '50px !important',
    bgcolor: '#505050',
    px: 3,
  }}>

    <Grid container spacing={3} sx={{color:"#88D3FF"}} alignItems="center">
  {policyNumber && (
    <>
      <Grid item>
        <Typography variant="body2" >
          Policy#: <span style={{ fontWeight: 'bolder' }}>{policyNumber}</span>
        </Typography>
      </Grid>

      <Grid item>
        <Typography variant="body2" >
          Account#: <span style={{ fontWeight: 'bolder' }}>1234567</span>
        </Typography>
      </Grid>
    </>
  )}

  <Grid item>
    <Typography variant="body2" sx={{ color: 'white' }}>
      Current Date: <span style={{ fontWeight: 'bolder' }}>{today}</span>
    </Typography>
  </Grid>
</Grid> 
        </Toolbar>
    </AppBar>
  );
};

export default Header;
