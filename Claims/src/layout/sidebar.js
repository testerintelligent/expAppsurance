import React from "react";
import { NavLink } from "react-router-dom";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

const navItems = [
  { label: "Activities", path: "/activities" },
  { label: "Claims", path: "/claims" },
  { label: "Create Claim", path: "/claims/create" },
  { label: "Exposures", path: "/exposures" },
  { label: "Queues", path: "/queues" },
];

const Sidebar = () => {
  return (
    <aside className="w-60 bg-white border-r-8 h-full flex flex-col overflow-auto color-">
      <div className="overflow-auto mt-2">
        <List disablePadding className="text-sm 600">
          {navItems.map((item, index) => (
            <NavLink
              key={index}
              to={item.path}
              className={({ isActive }) =>
                `block ${
                  isActive
                    ? "bg-blue-500 text-white font-medium"
                    : "text-gray-700"
                }`
              }
            >
              <ListItemButton dense>
                <ListItemText
                  className="ml-6"
                  primary={item.label}
                  primaryTypographyProps={{
                    style: { fontSize: "0.85rem" },
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
