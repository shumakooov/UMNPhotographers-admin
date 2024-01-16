import { Box } from "@mui/material";
import CustomLink from "../ui/customLink/CustomLink";
import { useMatch } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

const eventLinks = [
  { title: "Расписание", to: "/events/:id/calendar" },
  { title: "Приоритеты", to: "/events/:id/priority" },
  { title: "Распределение", to: "/events/:id/distribution" },
  { title: "Оценка фотографов", to: "/events/:id/rate" },
  { title: "О мероприятии", to: "/events/:id" },
];

const photographerLinks = [{ title: "Все", to: "/photographers" }];

const devicesLinks = [
  { title: "Все", to: "/devices" },
  { title: "Камеры", to: "/devices/camera" },
  { title: "Оптика", to: "/devices/leens" },
  { title: "Вспышки", to: "/devices/flash" },
  { title: "Батареи", to: "/devices/battery" },
  { title: "Карты памяти", to: "/devices/memory" },
];

const boxStyle = { flexGrow: 1, display: { xs: "flex", gap: 16 } };

export default function NavList({
  activeMainPage,
}: {
  activeMainPage: string;
}) {
  const photographerProfileInfo: any = useSelector<RootState>(
    (state) => state.photographer.photographerProfileInfo
  );
  const profileMatch = useMatch("/photographers/:id");
  const eventMatch = useMatch("/events/:id/*");

  if (activeMainPage === "events") {
    return (
      <Box sx={boxStyle}>
        <CustomLink
          title={"Все".toUpperCase()}
          to="/events"
          activeMainPage={activeMainPage}
        />
        {eventMatch &&
          eventLinks.map((link) => (
            <CustomLink
              title={link.title.toUpperCase()}
              to={link.to}
              activeMainPage={activeMainPage}
              key={link.title}
            />
          ))}
      </Box>
    );
  }
  if (activeMainPage === "photographers") {
    return (
      <Box sx={boxStyle}>
        {photographerLinks.map((link) => (
          <CustomLink
            title={link.title.toUpperCase()}
            to={link.to}
            activeMainPage={activeMainPage}
            key={link.title}
          />
        ))}
        {profileMatch && (
          <CustomLink
            title={`Профиль: ${photographerProfileInfo.surname ?? ""} ${
              photographerProfileInfo.firstname ?? ""
            }`.toUpperCase()}
            to="/photographers/:id"
            activeMainPage={activeMainPage}
          />
        )}
      </Box>
    );
  }

  if (activeMainPage === "devices") {
    return (
      <Box sx={boxStyle}>
        {devicesLinks.map((link) => (
          <CustomLink
            title={link.title.toUpperCase()}
            to={link.to}
            activeMainPage={activeMainPage}
            key={link.title}
          />
        ))}
      </Box>
    );
  }

  return null;
}
