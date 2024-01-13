import { useLocation, useMatch } from "react-router-dom";
import { AppBar, Toolbar, Typography } from "@mui/material";
import MainMenu from "./MainMenu";
import NavList from "./NavList";
import AvatarMenu from "./AvatarMenu";
import { useSelector } from "react-redux";

export default function Header() {
  const location = useLocation();
  const activeMainPage = location.pathname.split("/")[1];
  const profileMatch = useMatch("/photographers/:id");
  const photographerProfileInfo = useSelector(
    (state: any) => state.photographer.photographerProfileInfo
  );

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
              : activeMainPage === "photographers" && !profileMatch
              ? "Фотографы"
              : activeMainPage === "devices"
              ? "Техника"
              : activeMainPage === "settings"
              ? "Настройки"
              : activeMainPage === "profile"
              ? "Профиль"
              : profileMatch
              ? `${photographerProfileInfo.surname ?? ""} ${
                  photographerProfileInfo.firstname ?? ""
                }`
              : ""}
          </Typography>
          <NavList activeMainPage={activeMainPage} />
          <AvatarMenu />
        </Toolbar>
      </AppBar>
    </div>
  );
}
