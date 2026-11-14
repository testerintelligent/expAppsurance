import React from "react";
import { NavLink, useLocation } from "react-router-dom";
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
  PersonOutline as AccountIcon,
  AssignmentOutlined as SubmissionIcon,
  Autorenew as RenewalsIcon,
  ReceiptLong as TransactionsIcon,
  Edit as ChangePolicyIcon,
  SettingsBackupRestore as ReinstateIcon,
  Cancel as CancelIcon,
  Menu as MenuIcon,
  ChevronLeft as ChevronLeftIcon,
} from "@mui/icons-material";

const Sidebar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = React.useState(true);

  const menuItems = [
    { label: "Activities",               path: "/",                icon: <DashboardIcon /> },
    { label: "Accounts",                 path: "/account",         icon: <AccountIcon /> },
    { label: "Submissions",              path: "/new-submission",  icon: <SubmissionIcon /> },
    { label: "Renewals",                 path: "/renewals",        icon: <RenewalsIcon /> },
    { label: "Other Policy Transactions",path: "/transactions",    icon: <TransactionsIcon /> },
  ];

  const policySummaryMenu = [
    { label: "Change Policy",   path: "/policy-summary/change",    icon: <ChangePolicyIcon /> },
    { label: "Reinstate Policy",path: "/policy-summary/reinstate", icon: <ReinstateIcon /> },
    { label: "Cancel Policy",   path: "/policy-summary/cancel",    icon: <CancelIcon /> },
  ];

  const navItems = location.pathname.startsWith("/policy-summary")
    ? policySummaryMenu
    : menuItems;

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
