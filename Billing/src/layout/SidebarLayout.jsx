import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import PeopleIcon from "@mui/icons-material/People";
import DescriptionIcon from "@mui/icons-material/Description"; // for Policy Summary
import ReceiptIcon from "@mui/icons-material/Receipt"; // for Invoice
import PaymentsIcon from "@mui/icons-material/Payments";
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
  Autorenew as RenewalsIcon,
  AssignmentTurnedIn as SubmissionIcon,
  ReceiptLong as OtherPolicyIcon,
  Queue as QueueIcon,
  Menu as MenuIcon,
  ChevronLeft as ChevronLeftIcon,
  Edit as ChangePolicyIcon,
  SettingsBackupRestore as ReinstateIcon,
  Cancel as CancelIcon,
} from "@mui/icons-material";

const Sidebar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = React.useState(true);
  const PROTECTED_ROUTES = ["/policy-summary", "/invoice", "/payment-schedule"];
  const isPolicyPage = PROTECTED_ROUTES.some((route) =>
    location.pathname.startsWith(route),
  );

  // const [selectedIndex, setSelectedIndex] = React.useState(0);
  const policyNumber = location.pathname.split("/")[2];

  const menuItems = [
    { label: "Dashboard", path: "/", icon: <DashboardIcon /> },
    { label: "Users", path: "/users", icon: <PeopleIcon /> },
    ...(isPolicyPage
      ? [
          {
            label: "Policy Summary",
            path: `/policy-summary/${policyNumber}`,
            icon: <DescriptionIcon />,
          },
          {
            label: "Invoice",
            path: `/invoice/${policyNumber}`,
            icon: <ReceiptIcon />,
          },
          {
            label: "PaymentSchedule",
            path: `/payment-schedule/${policyNumber}`,
            icon: <PaymentsIcon />,
          },
        ]
      : []),
  ];

  const policySummaryMenu = [
    {
      label: "Summary",
      path: `/policy-summary/${policyNumber}`,
    },
    {
      label: "Details",
      path: `/policy-summary/${policyNumber}/details`,
    },
    {
      label: "Contacts",
      path: `/policy-summary/${policyNumber}/contacts`,
    },
    {
      label: "Transactions",
      path: `/policy-summary/${policyNumber}/transactions`,
    },
    {
      label: "Charges",
      path: `/policy-summary/${policyNumber}/charges`,
    },
    {
      label: "Payment Schedule",
      path: `/payment-schedule/${policyNumber}`,
    },
    {
      label: "Commissions",
      path: `/policy-summary/${policyNumber}/commissions`,
    },
    {
      label: "History",
      path: `/policy-summary/${policyNumber}/history`,
    },
    {
      label: "Trouble Tickets",
      path: `/policy-summary/${policyNumber}/trouble-tickets`,
    },
    {
      label: "Documents",
      path: `/policy-summary/${policyNumber}/documents`,
    },
    {
      label: "Policy Notes",
      path: `/policy-summary/${policyNumber}/policy-notes`,
    },
  ];

  const isPolicySummaryPage = location.pathname.startsWith("/policy-summary");

  const navItems = isPolicySummaryPage ? policySummaryMenu : menuItems;

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
