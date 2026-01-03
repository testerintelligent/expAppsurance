import { Box, Menu, MenuItem, Typography} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setPage, setSubmenu } from '../redux/navigationAction.ts';
import { setPolicy } from '../redux/policyaction.ts';

interface MenuListProps {
  anchorEl: HTMLElement | null;
  open: boolean;
  onClose: () => void;
  items: string[];
}

const MenuList = ({ anchorEl, open, onClose, items }: MenuListProps) => {


  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {activePage} = useSelector((state: any) => state.navigationReducer);

  const handleItemClick = (item: any) => {

  // dispatch(setSubmenu(item));    
  
  if(activePage.toLowerCase() === 'policy' || activePage.toLowerCase() === 'policysummary') {
        dispatch(setPage('policysummary')); 
        dispatch(setPolicy(item));
    navigate('/policysummary', {state: {policyId: item}});
  }
    
    onClose();
  };

  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
    >
      <Box sx={{ px: 2, py: 1 }}>
        <Typography variant="subtitle2" fontWeight="bold">
          Policies
        </Typography>
      </Box>
       {items.map((item) => (
        <MenuItem key={item} onClick={() => handleItemClick(item)}>
          {item}
        </MenuItem>
      ))} 
    </Menu>
  );
};

export default MenuList;
