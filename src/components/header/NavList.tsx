import { Box } from "@mui/material";
import CustomLink from "../ui/customLink/CustomLink";
import { useMatch, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

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
    (state) => state.photographer.photographerProfileInfo,
  );
  const profileMatch = useMatch("/photographers/:id");
  const eventMatch = useMatch("/events/:id/*");
  const { pathname } = useLocation();
  const eventId = pathname.split("/")[2] ?? "";

  if (activeMainPage === "events") {
    const eventLinks = [
      { title: "Расписание", to: `/events/${eventId}/calendar` },
      { title: "Приоритеты", to: `/events/${eventId}/priority` },
      { title: "Распределение", to: `/events/${eventId}/distribution` },
      { title: "Оценка фотографов", to: `/events/${eventId}/rate` },
      { title: "О мероприятии", to: `/events/${eventId}` },
    ];

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
