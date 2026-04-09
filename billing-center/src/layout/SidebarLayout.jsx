import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import DescriptionIcon from "@mui/icons-material/Description"; // for Policy Summary
import ReceiptIcon from "@mui/icons-material/Receipt"; // for Invoice
import PaymentsIcon from "@mui/icons-material/Payments"; // for Invoice

const Sidebar = () => {
  const location = useLocation();
  const isPolicySummary = location.pathname.startsWith("/policy-summary");
  const isInvoice = location.pathname.startsWith("/invoice");
  const PROTECTED_ROUTES = ["/policy-summary", "/invoice", "/payment-schedule"];

  const isPolicyPage = PROTECTED_ROUTES.some(route =>
    location.pathname.startsWith(route)
  );

  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const policyNumber = location.pathname.split("/")[2];

  const navItems = [
     { label: "Dashboard", path: "/", icon: <DashboardIcon /> },
    { label: "Users", path: "/users", icon: <PeopleIcon /> },  ...(isPolicyPage ? [
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
        ]  : []
    ),
  ];

  return (
    <aside className="w-60 bg-white border-r-8 h-full flex flex-col overflow-auto">
      <div className="overflow-auto mt-4">
        <List disablePadding className="text-sm pb-10">
          {navItems.map((item, index) => (
            <NavLink
              key={index}
              to={item.path}
              className={({ isActive }) =>
                `block ${
                  isActive
                    ? "bg-purple-700 text-white font-medium p-1 rounded"
                    : "text-gray-700"
                } `
              }
            >
              <ListItemButton
                dense
                selected={selectedIndex === index}
                onClick={() => setSelectedIndex(index)}
                className="flex items-center gap-4 mb-3" // ensures icon and text are aligned
              >
                {/* Render the icon */}
                <span className="ml-4">{item.icon}</span>
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{
                    style: { fontSize: "0.85rem" },
                  }}
                  sx={{
                    "& .MuiListItemText-primary": {
                      fontWeight: selectedIndex === index ? "bold" : "normal",
                    },
                  }}
                />
              </ListItemButton>
            </NavLink>
          ))}
        </List>
      </div>
    </aside>
  );
};

export default Sidebar;
