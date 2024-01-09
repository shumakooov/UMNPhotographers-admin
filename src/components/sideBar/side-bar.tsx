import { useState, MouseEvent } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./side-bar.css";
import axios from "axios";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Menu,
  MenuItem,
  Divider,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { AccountCircle } from "@mui/icons-material";
import { useCookies } from "react-cookie";
import SettingsIcon from "@mui/icons-material/Settings";
import PersonIcon from "@mui/icons-material/Person";
import CustomLink from "../ui/customLink/CustomLink";
import LogoutIcon from "@mui/icons-material/Logout";
import NavList from "./NavList";

const mainPages = [
  { title: "Мероприятия", to: "/events", icon: "" },
  { title: "Фотографы", to: "/photographers", icon: "" },
  { title: "Техника", to: "/devices", icon: "" },
];

const userMenu = [
  { title: "Настройки", to: "/change-pass", icon: <SettingsIcon /> },
  { title: "Профиль", to: "/events", icon: <PersonIcon /> },
];

const pages = [
  { title: "Все", to: "/events" },
  { title: "Расписание", to: "/event-calendar" },
  { title: "Приоритеты", to: "/priority-zones" },
  { title: "Распределение", to: "/work-photographers-calendar" },
  { title: "Оценка фотографов", to: "/rate-photographers" },
  { title: "О мероприятии", to: "/event-profile" },
];

export default function SideBar() {
  const location = useLocation();
  const activeMainPage = location.pathname.split("/")[1];
  const navigate = useNavigate();
  const [cookies, setCookies, removeCookie] = useCookies(["SESSION"]);
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenMenu = (e: MouseEvent<HTMLElement>) => {
    setAnchorElNav(e.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorElNav(null);
  };

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
    <div className="sideBar">
      <AppBar position="static" color="transparent">
        <Toolbar>
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
              {mainPages.map((page) => (
                <MenuItem
                  key={page.title}
                  onClick={() => {
                    navigate(page.to);
                    handleCloseMenu();
                  }}
                >
                  <Typography textAlign="center">{page.title}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            color="primary"
            sx={{
              display: { xs: "none", sm: "block" },
              width: 268,
            }}
          >
            {activeMainPage === "events"
              ? "Мероприятия"
              : activeMainPage === "photographers"
              ? "Фотографы"
              : activeMainPage === "devices"
              ? "Техника"
              : ""}
          </Typography>
          <NavList activeMainPage={activeMainPage} />
          <Box>
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
        </Toolbar>
      </AppBar>
    </div>
  );
}
