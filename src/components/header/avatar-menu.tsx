import { useState, MouseEvent } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./index.module.css";
import axios from "axios";
import {
  IconButton,
  Box,
  Menu,
  MenuItem,
  Divider,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import { useCookies } from "react-cookie";
import SettingsIcon from "@mui/icons-material/Settings";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";

const userMenu = [
  { title: "Настройки", to: "/settings", icon: <SettingsIcon /> },
  { title: "Профиль", to: "/profile", icon: <PersonIcon /> },
];

export default function AvatarMenu() {
  const navigate = useNavigate();
  const [cookies, setCookies, removeCookie] = useCookies(["SESSION"]);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (e: MouseEvent<HTMLElement>) => {
    setAnchorElUser(e.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    axios(`https://photographersekb.ru:8080/admin/auth/logout`, {
      withCredentials: true,
    }).finally(() => {
      removeCookie("SESSION", { path: "/" });
    });
  };

  return (
    <Box sx={{ textAlign: "right", flexGrow: 1 }}>
      <IconButton
        size="small"
        edge="start"
        color="inherit"
        aria-label="open drawer"
        onClick={handleOpenUserMenu}
      >
        <AccountCircle />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        {userMenu.map((page) => (
          <MenuItem
            key={page.title}
            onClick={() => {
              navigate(page.to);
              handleCloseUserMenu();
            }}
          >
            <ListItemIcon>{page.icon}</ListItemIcon>
            <ListItemText>{page.title}</ListItemText>
          </MenuItem>
        ))}
        <Divider />
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText>Выйти</ListItemText>
        </MenuItem>
      </Menu>
    </Box>
  );
}
