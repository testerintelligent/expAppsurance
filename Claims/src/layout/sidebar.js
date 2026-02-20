import React from "react";
import { NavLink } from "react-router-dom";
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Tooltip,
  Divider,
} from "@mui/material";

import {
  Dashboard as DashboardIcon,
  EventNote as ActivitiesIcon,
  Assignment as ClaimsIcon,
  AddCircleOutline as CreateClaimIcon,
  WarningAmber as ExposuresIcon,
  Queue as QueueIcon,
  Menu as MenuIcon,
  ChevronLeft as ChevronLeftIcon,
} from "@mui/icons-material";

const navItems = [
  { label: "Dashboard", path: "/", icon: <DashboardIcon /> },
  { label: "Activities", path: "/activities", icon: <ActivitiesIcon /> },
  { label: "Claims", path: "/claims", icon: <ClaimsIcon /> },
  { label: "Create Claim", path: "/claims/create", icon: <CreateClaimIcon /> },
  { label: "Exposures", path: "/exposures", icon: <ExposuresIcon /> },
  { label: "Queues", path: "/queues", icon: <QueueIcon /> },
];

const Sidebar = () => {
  const [isOpen, setIsOpen] = React.useState(true);

  return (
    <aside
      style={{
        width: isOpen ? 240 : 64,
        background: "#ffffff",
        borderRight: "1px solid #e0e0e0",
        transition: "width 0.3s ease",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Toggle Button */}
      <div
        style={{
          display: "flex",
          justifyContent: isOpen ? "flex-end" : "center",
          padding: "8px",
        }}
      >
        <IconButton onClick={() => setIsOpen(!isOpen)} size="small">
          {isOpen ? <ChevronLeftIcon /> : <MenuIcon />}
        </IconButton>
      </div>

      <Divider />

      <List disablePadding sx={{ mt: 1 }}>
        {navItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            style={{ textDecoration: "none" }}
          >
            {({ isActive }) => (
              <Tooltip
                title={!isOpen ? item.label : ""}
                placement="right"
                arrow
              >
                <ListItemButton
                  sx={{
                    mx: 1,
                    my: 0.5,
                    borderRadius: 2,
                    justifyContent: isOpen ? "flex-start" : "center",
                    px: 2,
                    position: "relative",

                    // Background
                    backgroundColor: isActive ? "#e1dfdd" : "transparent",
                    color: "#333",

                    "&:hover": {
                      backgroundColor: "#edebe9",
                    },

                    // Right purple highlight bar
                    "&::after": isActive
                      ? {
                        content: '""',
                        position: "absolute",
                        left: 0,
                        top: 8,
                        bottom: 8,
                        width: "4px",
                        borderRadius: "4px",
                        backgroundColor: "#32145a",
                      }
                      : {},
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: isOpen ? 2 : 0,
                      justifyContent: "center",

                      // Icon color logic
                      color: isActive ? "#32145a" : "#6b7280",
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>

                  {isOpen && (
                    <ListItemText
                      primary={item.label}
                      primaryTypographyProps={{
                        fontSize: "0.9rem",
                        fontWeight: isActive ? 600 : 500,
                        color: "#333",
                      }}
                    />
                  )}
                </ListItemButton>
              </Tooltip>
            )}
          </NavLink>
        ))}
      </List>
    </aside>
  );
};

export default Sidebar;