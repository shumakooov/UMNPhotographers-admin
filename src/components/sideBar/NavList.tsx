import { Box } from "@mui/material";
import CustomLink from "../ui/customLink/CustomLink";

const eventLinks = [
  { title: "Все", to: "/events" },
  { title: "Расписание", to: "/event-calendar" },
  { title: "Приоритеты", to: "/priority-zones" },
  { title: "Распределение", to: "/photographers-distribution" },
  { title: "Оценка фотографов", to: "/rate-photographers" },
  { title: "О мероприятии", to: "/event-profile" },
];

const photographerLinks = [
  { title: "Все", to: "/photographers" },
  { title: "Профиль", to: "/photographers/:id" },
];

const devicesLinks = [
  { title: "Все", to: "/devices" },
  { title: "Камеры", to: "/event-calendar" },
  { title: "Оптика", to: "/priority-zones" },
  { title: "Вспышки", to: "/work-photographers-calendar" },
  { title: "Батареи", to: "/rate-photographers" },
  { title: "Карты памяти", to: "/event-profile" },
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
          <CustomLink title={link.title} to={link.to} key={link.title} />
        ))}
      </Box>
    );
  }
  if (activeMainPage === "photographers") {
    return (
      <Box sx={{ flexGrow: 1, display: { xs: "flex", gap: 16 } }}>
        {photographerLinks.map((link) => (
          <CustomLink title={link.title} to={link.to} key={link.title} />
        ))}
      </Box>
    );
  }

  if (activeMainPage === "devices") {
    return (
      <Box sx={{ flexGrow: 1, display: { xs: "flex", gap: 16 } }}>
        {devicesLinks.map((link) => (
          <CustomLink title={link.title} to={link.to} key={link.title} />
        ))}
      </Box>
    );
  }

  return null;
}
