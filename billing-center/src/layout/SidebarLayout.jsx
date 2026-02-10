import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

const Sidebar = () => {
  const location = useLocation();
  const isPolicyPage = location.pathname.startsWith("/policy-summary");
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const navItems = [
    { label: "Dashboard", path: "/" },
    { label: "Users", path: "/users" },
    ...(isPolicyPage
      ? [{ label: "Policy Summary", path: location.pathname }]
      : []),
  ];

  return (
    <aside className="w-60 bg-white border-r-8 h-full flex flex-col overflow-auto color-">
      <div className="overflow-auto mt-2">
        <List disablePadding className="text-sm 600 ">
          {navItems.map((item, index) => (
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
                key={item.id}
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
