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
  { label: "Create Claim", path: "/Claim", icon: <CreateClaimIcon /> },
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
        transition: "width 0.25s ease",
        display: "flex",
        flexDirection: "column",
        flexShrink: 0,
        overflowX: "hidden",
      }}
    >
      {/* Collapse toggle */}
      <div
        style={{
          display: "flex",
          justifyContent: isOpen ? "flex-end" : "center",
          padding: "4px 4px 2px",
        }}
      >
        <IconButton onClick={() => setIsOpen(!isOpen)} size="small">
          {isOpen ? <ChevronLeftIcon fontSize="small" /> : <MenuIcon fontSize="small" />}
        </IconButton>
      </div>

      <Divider />

      <List disablePadding sx={{ mt: 0.5 }}>
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
                    borderRadius: 1,
                    justifyContent: isOpen ? "flex-start" : "center",
                    px: isOpen ? 1.5 : 1,
                    position: "relative",
                    backgroundColor: isActive ? "#e8f0fa" : "transparent",
                    color: "#333",
                    "&:hover": {
                      backgroundColor: "#f0f4fb",
                    },
                    "&::after": isActive
                      ? {
                          content: '""',
                          position: "absolute",
                          left: 0,
                          top: 6,
                          bottom: 6,
                          width: 4,
                          borderRadius: "0 3px 3px 0",
                          backgroundColor: "#1f5fa6",
                        }
                      : {},
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: isOpen ? 1.5 : 0,
                      justifyContent: "center",
                      color: isActive ? "#1f5fa6" : "#6b7280",
                      "& .MuiSvgIcon-root": { fontSize: 19 },
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>

                  {isOpen && (
                    <ListItemText
                      primary={item.label}
                      primaryTypographyProps={{
                        fontSize: "0.8rem",
                        fontWeight: isActive ? 700 : 500,
                        color: isActive ? "#1f2d3d" : "#3d5164",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
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
