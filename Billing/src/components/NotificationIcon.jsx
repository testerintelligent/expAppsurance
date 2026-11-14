// import React from "react";
// import NotificationsIcon from "@mui/icons-material/Notifications";
// import Badge from "@mui/material/Badge";
// import IconButton from "@mui/material/IconButton";

// function NotificationButton() {
//   return (
//     <IconButton color="inherit">
//       <Badge badgeContent={4} color="error">
//         <NotificationsIcon />
//       </Badge>
//     </IconButton>
//   );
// }

// export default NotificationButton;

import React, { useState } from "react";
import NotificationsIcon from "@mui/icons-material/Notifications";
import {
  IconButton,
  Badge,
  Menu,
  MenuItem,
  Card,
  CardContent,
  Typography,
} from "@mui/material";

function NotificationButton() {
  const [anchorEl, setAnchorEl] = useState(null);

  const notifications = [
    { id: 1, message: "Invoice created for Policy #POL12345" },
    { id: 2, message: "Payment received for Policy #POL56789" },
  ];

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      {/* Notification Icon */}
      <IconButton color="inherit" onClick={handleOpen}>
        <Badge badgeContent={notifications.length} color="error">
          <NotificationsIcon />
        </Badge>
      </IconButton>

      {/* Notification Dropdown */}
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        {notifications.map((note) => (
          <MenuItem key={note.id}>
            <Card sx={{ width: 250 }}>
              <CardContent>
                <Typography variant="body2">{note.message}</Typography>
              </CardContent>
            </Card>
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}

export default NotificationButton;
