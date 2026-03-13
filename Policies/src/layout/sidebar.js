import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const Sidebar = () => {
  const location = useLocation();
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [openActions, setOpenActions] = React.useState(false);

  const navItems = [
    { label: "Dashboard", path: "/" },
    { label: "Submissions", path: "/submissions" },
    { label: "Renewals", path: "/renewals" },
    { label: "Other Policy Transactions", path: "/transactions" },
    { label: "Queues", path: "/queues" },
  ];

  const policySummaryMenu = [
    { label: "Change Policy", path: "/policy-summary/change" },
    { label: "Reinstate Policy", path: "/policy-summary/reinstate" },
    { label: "Cancel Policy", path: "/policy-summary/cancel" },
  ];

  const isPolicySummaryPage = location.pathname.startsWith("/policy-summary");

  const handleToggleActions = () => {
    setOpenActions(!openActions);
  };

  const menuItems = isPolicySummaryPage ? policySummaryMenu : navItems;

  return (
    <aside className="w-60 bg-white border-r-8 h-full flex flex-col overflow-auto">
      <div className="overflow-auto mt-2">
        <List disablePadding className="text-sm">

          {/* POLICY SUMMARY SIDEBAR */}
          {isPolicySummaryPage ? (
            <>
              {/* Actions Header */}
              <ListItemButton onClick={handleToggleActions}>
                <ListItemText
                  className="ml-2"
                  primary="Actions"
                  primaryTypographyProps={{ style: { fontSize: "0.9rem", fontWeight: "bold" } }}
                />

                {openActions ? <ExpandMoreIcon /> : <ChevronRightIcon />}
              </ListItemButton>

              {/* Dropdown Items */}
              {openActions &&
                menuItems.map((item, index) => (
                  <NavLink
                    key={index}
                    to={item.path}
                    className={({ isActive }) =>
                      `block ${
                        isActive
                          ? "bg-blue-500 text-white font-medium p-1 rounded"
                          : "text-gray-700"
                      }`
                    }
                  >
                    <ListItemButton
                      dense
                      selected={selectedIndex === index}
                      onClick={() => setSelectedIndex(index)}
                      sx={{ pl: 4 }}
                    >
                      <ListItemText
                        primary={item.label}
                        primaryTypographyProps={{
                          style: { fontSize: "0.85rem" },
                        }}
                        sx={{
                          "& .MuiListItemText-primary": {
                            fontWeight:
                              selectedIndex === index ? "bold" : "normal",
                          },
                        }}
                      />
                    </ListItemButton>
                  </NavLink>
                ))}
            </>
          ) : (
            /* NORMAL SIDEBAR */
            menuItems.map((item, index) => (
              <NavLink
                key={index}
                to={item.path}
                className={({ isActive }) =>
                  `block ${
                    isActive
                      ? "bg-blue-500 text-white font-medium p-1 rounded"
                      : "text-gray-700"
                  }`
                }
              >
                <ListItemButton
                  dense
                  selected={selectedIndex === index}
                  onClick={() => setSelectedIndex(index)}
                >
                  <ListItemText
                    className="ml-6"
                    primary={item.label}
                    primaryTypographyProps={{
                      style: { fontSize: "0.85rem" },
                    }}
                    sx={{
                      "& .MuiListItemText-primary": {
                        fontWeight:
                          selectedIndex === index ? "bold" : "normal",
                      },
                    }}
                  />
                </ListItemButton>
              </NavLink>
            ))
          )}
        </List>
      </div>
    </aside>
  );
};

export default Sidebar;