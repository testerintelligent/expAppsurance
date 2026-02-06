import React from "react";
import { NavLink } from "react-router-dom";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

const navItems = [
  { label: "Dashboard", path: "/" },
  { label: "Submissions", path: "/submissions" },
  { label: "Renewals", path: "/renewals" },
  { label: "Other Policy Transactions", path: "/transactions" },
  { label: "Queues", path: "/queues" },
];

const Sidebar = () => {
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  return (
    <aside className="w-60 bg-white border-r-8 h-full flex flex-col overflow-auto color-">
      <div className="overflow-auto mt-2">
        {/* <div className="flex items-center justify-between m-4 border-2">
          <button className="flex items-center justify-between w-full p-2 text-lg text-center hover:bg-gray-100 hover:border-sky-600 hover:border-2 text-sky-500">
            Actions
            <SouthEastIcon />
          </button>
        </div> */}
        <List disablePadding className="text-sm 600">
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

        {/* <Divider className="overflow-x-auto" /> */}
      </div>
    </aside>
  );
};

export default Sidebar;
