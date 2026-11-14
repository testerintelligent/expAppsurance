import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Tooltip,
  Divider,
  SvgIcon,
} from "@mui/material";

// Inline Material icon paths: @mui/icons-material is not a dependency of this app.
const icon = (d) => (props) => (
  <SvgIcon {...props}>
    <path d={d} />
  </SvgIcon>
);
const TableIcon = icon(
  "M10 10.02h5V21h-5zM17 21h3c1.1 0 2-.9 2-2v-9h-5zm3-18H5c-1.1 0-2 .9-2 2v3h19V5c0-1.1-.9-2-2-2M3 19c0 1.1.9 2 2 2h3V10H3z",
);
const MenuIcon = icon("M3 18h18v-2H3zm0-5h18v-2H3zm0-7v2h18V6z");
const ChevronLeftIcon = icon("M15.41 7.41 14 6l-6 6 6 6 1.41-1.41L10.83 12z");

const menuItems = [{ label: "Rate Tables", path: "/", icon: <TableIcon /> }];

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

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
        <IconButton
          onClick={() => setIsOpen(!isOpen)}
          size="small"
          aria-label={isOpen ? "Collapse sidebar" : "Expand sidebar"}
        >
          {isOpen ? (
            <ChevronLeftIcon fontSize="small" />
          ) : (
            <MenuIcon fontSize="small" />
          )}
        </IconButton>
      </div>

      <Divider />

      <List disablePadding sx={{ mt: 0.5 }}>
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end
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
