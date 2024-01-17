import { useLocation } from "react-router-dom";
import { AppBar, Toolbar, Typography } from "@mui/material";
import MainMenu from "./main-menu";
import NavList from "./nav-list";
import AvatarMenu from "./avatar-menu";

export default function Header() {
  const location = useLocation();
  const activeMainPage = location.pathname.split("/")[1];

  return (
    <div style={{ backgroundColor: "#FFF" }}>
      <AppBar position="static" color="transparent">
        <Toolbar>
          <MainMenu />
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
                  : activeMainPage === "settings"
                    ? "Настройки"
                    : activeMainPage === "profile"
                      ? "Профиль"
                      : ""}
          </Typography>
          <NavList activeMainPage={activeMainPage} />
          <AvatarMenu />
        </Toolbar>
      </AppBar>
    </div>
  );
}
