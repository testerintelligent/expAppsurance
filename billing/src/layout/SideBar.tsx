import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Box,
  Tooltip
} from '@mui/material';
import { useSelector } from 'react-redux';
import { sidebarConfig } from '../components/sidebarConfig.ts';
import { useNavigate } from 'react-router-dom';
import { setPolicy } from '../redux/policyaction.ts';

type SidebarProps = {
  collapsed: boolean;
  onToggle: () => void;
};

const Sidebar = ({ collapsed }: SidebarProps) => {

const navigate = useNavigate();

  const { activePage,activeSubMenu } = useSelector(
    (state: any) => state.navigationReducer
  );

  
  const sidebarKey = activeSubMenu || activePage;

  const items = sidebarConfig[sidebarKey] || [];

  const handleItemClick = (page: string) => {
     console.log('page',page);  
     navigate(`/${page}`);
  };

  return (
    <Box sx={{ height: '100%' }}>
     <List disablePadding>
        {items.map((item: any) => (
          <Tooltip
            key={item.page}
            title={collapsed ? item.label : ''}
            placement="right"
          >
            <ListItemButton onClick={() => handleItemClick(item.page)} selected={activePage === item.page}>
              {!collapsed && (
                <ListItemText
                  primary={item.label}
                  sx={{ color: 'black' }}
                />
              )}
            </ListItemButton>
          </Tooltip>
        ))}
      </List>
    </Box>
  );
};

export default Sidebar;
