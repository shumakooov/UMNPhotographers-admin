import { useState, MouseEvent } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";
import {
  IconButton,
  Box,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import EventIcon from "@mui/icons-material/Event";
import PersonIcon from "@mui/icons-material/Person";
import CameraAltIcon from "@mui/icons-material/CameraAlt";

const mainLinks = [
  { title: "Мероприятия", to: "/events", icon: <EventIcon /> },
  { title: "Фотографы", to: "/photographers", icon: <PersonIcon /> },
  { title: "Техника", to: "/devices", icon: <CameraAltIcon /> },
];

export default function MainMenu() {
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

  const handleOpenMenu = (e: MouseEvent<HTMLElement>) => {
    setAnchorElNav(e.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <Box>
      <IconButton
        size="large"
        edge="start"
        color="primary"
        aria-label="open drawer"
        onClick={handleOpenMenu}
        sx={{ mr: 2 }}
      >
        <MenuIcon />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorElNav}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        open={Boolean(anchorElNav)}
        onClose={handleCloseMenu}
      >
        {mainLinks.map((link) => (
          <MenuItem
            key={link.title}
            onClick={() => {
              navigate(link.to);
              handleCloseMenu();
            }}
          >
            <ListItemIcon>{link.icon}</ListItemIcon>
            <ListItemText>{link.title}</ListItemText>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}
