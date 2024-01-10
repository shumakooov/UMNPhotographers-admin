import React from "react";
import "./App.css";
import { Route, Routes, Navigate, Outlet } from "react-router-dom";
import AllPhotographersPage from "./pages/photographers/allPhotographers/all-photographers-page";
import LoginPage from "./pages/loginPage/login-page";
import ChangePassPage from "./pages/changePassPage/change-pass-page";
import ProfilePhotographerPage from "./pages/photographers/profilePhotographer/profile-photographer-page";
import DevicesPage from "./pages/devices/devices-page";
import EventsPage from "./pages/events/eventsPage/events-page";
import EventProfilePage from "./pages/events/eventProfilePage/event-profile-page";
import EventCalendarPage from "./pages/events/eventCalendarPage/event-calendar-page";
import PriorityZonesPage from "./pages/events/priorityZonesPage/priority-zones-page";
import WorkPhotographersCalendarPage from "./pages/events/workPhotographersCalendarPage/work-photographers-calendar-page";
import PhotographersDistributionPage from "./pages/events/photographersDistributionPage/photographers-distribution-page";
import RatePhotographersPage from "./pages/events/ratePhotographersPage/rate-photographers-page";
import Header from "./components/header";
import { CookiesProvider, useCookies } from "react-cookie";

function App() {
  const [cookies, setCookies] = useCookies(["SESSION"]);

  function handleLogin(user: any) {
    setCookies("SESSION", user, { path: "/" });
  }

  return (
    <CookiesProvider>
      {cookies.SESSION ? (
        <>
          <Header/>
          <Routes>
            <Route path={"*"} element={<Navigate to="/events" replace />} />
            <Route path="/events/" element={<Outlet />}>
              <Route path="" element={<EventsPage />} />
              <Route path="calendar" element={<EventCalendarPage />} />
              <Route path="priority" element={<PriorityZonesPage />} />
              <Route
                path="distribution"
                element={<PhotographersDistributionPage />}
              />
              <Route path="rate" element={<RatePhotographersPage />} />
              <Route path="event/:id" element={<EventProfilePage />} />
            </Route>
            <Route path={"/photographers/"} element={<Outlet />}>
              <Route path={""} element={<AllPhotographersPage />} />
              <Route path={":id"} element={<ProfilePhotographerPage />} />
            </Route>
            <Route path={"/devices/"} element={<Outlet />}>
              <Route path={""} element={<DevicesPage />} />
              <Route path={":type"} element={<DevicesPage />} />
            </Route>

            <Route path={"/settings"} element={<ChangePassPage />} />
            <Route path={"/profile"} element={<ChangePassPage />} />
            <Route
              path={"/work-photographers-calendar"}
              element={<WorkPhotographersCalendarPage />}
            />
          </Routes>
        </>
      ) : (
        <Routes>
          <Route path={"*"} element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
        </Routes>
      )}
    </CookiesProvider>
  );
}

export default App;
