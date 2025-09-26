import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import SaveIcon from "@mui/icons-material/Save";
import SettingsIcon from "@mui/icons-material/Settings";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";

const NavDropdown = ({ label = "Menu", menuId, items = [], onClick }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  return (
    <div>
      <Button
        size="small"
        onClick={onClick ? onClick : (e) => setAnchorEl(e.currentTarget)}
        endIcon={
          <ArrowDropDownIcon
            className="border-l-2 border-slate-300"
            style={{ fontSize: 18 }}
          />
        }
        className="nav-small-btn normal-case"
        sx={{
          minWidth: 88,
          paddingLeft: 0.6,
          paddingRight: 0.6,
          textTransform: "none",
        }}
      >
        {label}
      </Button>

      {!onClick && (
        <Menu
          id={menuId}
          anchorEl={anchorEl}
          open={open}
          onClose={() => setAnchorEl(null)}
          MenuListProps={{ dense: true }}
          transformOrigin={{ horizontal: "left", vertical: "top" }}
          anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
        >
          {items.length ? (
            items.map((it, i) => (
              <MenuItem key={i} onClick={() => setAnchorEl(null)}>
                {it}
              </MenuItem>
            ))
          ) : (
            <>
              <MenuItem onClick={() => setAnchorEl(null)}>Option 1</MenuItem>
              <MenuItem onClick={() => setAnchorEl(null)}>Option 2</MenuItem>
              <MenuItem onClick={() => setAnchorEl(null)}>Option 3</MenuItem>
            </>
          )}
        </Menu>
      )}
    </div>
  );
};

export default function Navbar() {
  const navigate = useNavigate();
  return (
    <header className="border-b-4 border-slate-600 bg-gray-100">
      <div className="max-w-full mx-auto">
        <div className="flex items-center px-3 lg:px-6 h-12">
          <div className="mr-4">
            <p className="text-sm text-slate-500">
              ExpleoSurance <span className="text-sky-500">Policy Center</span>
            </p>
          </div>
          <nav className="flex items-center gap-2 flex-1 text-sm overflow-x-auto ml-8 text-slate-800">
            <NavDropdown label="Desktop" />
            <NavDropdown label="Account" onClick={() => navigate("/account")} />
            <NavDropdown label="Policy" />
            <NavDropdown label="Contact" onClick={() => navigate("/contact")}/>
            <NavDropdown label="Search" />
            <NavDropdown label="Team" />
            <NavDropdown label="Administration" />
          </nav>

          <div className="flex items-center gap-2">
            <Box
              component="div"
              className="flex items-center rounded border border-gray-300 bg-white"
              sx={{ px: 1, py: 0.5, minWidth: 220 }}
            >
              <SearchIcon fontSize="small" color="inherit" />
              <InputBase
                placeholder="Go to (Alt+/)"
                inputProps={{ "aria-label": "go to" }}
                sx={{
                  ml: 1,
                  fontSize: 13,
                }}
                fullWidth
              />
            </Box>

            <IconButton
              size="small"
              className="border border-gray-200 bg-white"
              aria-label="save"
            >
              <SaveIcon fontSize="small" />
            </IconButton>

            <IconButton
              size="small"
              className="border border-gray-200 bg-white"
              aria-label="settings"
            >
              <SettingsIcon fontSize="small" />
            </IconButton>
          </div>
        </div>
      </div>
    </header>
  );
}
