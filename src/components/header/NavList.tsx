import { Box } from "@mui/material";
import CustomLink from "../ui/customLink/CustomLink";

const eventLinks = [
  { title: "Все", to: "/events" },
  { title: "Расписание", to: "/events/calendar" },
  { title: "Приоритеты", to: "/events/priority" },
  { title: "Распределение", to: "/events/distribution" },
  { title: "Оценка фотографов", to: "/events/rate" },
  { title: "О мероприятии", to: "/events/event/:id" },
];

const photographerLinks = [
  { title: "Все", to: "/photographers" },
  { title: "Профиль", to: "/photographers/:id" },
];

const devicesLinks = [
  { title: "Все", to: "/devices" },
  { title: "Камеры", to: "/devices/camera" },
  { title: "Оптика", to: "/devices/leens" },
  { title: "Вспышки", to: "/devices/flash" },
  { title: "Батареи", to: "/devices/battery" },
  { title: "Карты памяти", to: "/devices/memory" },
];

export default function NavList({
  activeMainPage,
}: {
  activeMainPage: string;
}) {
  if (activeMainPage === "events") {
    return (
      <Box sx={{ flexGrow: 1, display: { xs: "flex", gap: 16 } }}>
        {eventLinks.map((link) => (
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
      <Box sx={{ flexGrow: 1, display: { xs: "flex", gap: 16 } }}>
        {photographerLinks.map((link) => (
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

  if (activeMainPage === "devices") {
    return (
      <Box sx={{ flexGrow: 1, display: { xs: "flex", gap: 16 } }}>
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
