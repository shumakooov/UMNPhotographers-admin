import React from "react";
import "./App.css";
import { Route, Routes, Navigate, Outlet } from "react-router-dom";
import AllPhotographersPage from "./pages/photographers/allPhotographers/all-photographers-page";
import LoginPage from "./pages/loginPage/login-page";
import ChangePassPage from "./pages/changePassPage/change-pass-page";
import ProfilePhotographerPage from "./pages/photographers/profilePhotographer";
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
import DevicesPageWrapper from "./pages/devices";
import CamerasTable from "./pages/devices/cameras-table";
import OpticsTable from "./pages/devices/optics-table";
import FlashesTable from "./pages/devices/flashes-table";
import AccumulatorsTable from "./pages/devices/accumulators-table";
import MemoryTable from "./pages/devices/memory-table";

function App() {
  const [cookies, setCookies] = useCookies(["SESSION"]);

  function handleLogin(user: any) {
    if (process.env.REACT_APP_PROFILE === "DEV") {
      setCookies("SESSION", user, { path: "/" });
    } else {
      window.location.reload();
    }
  }

  return (
    <CookiesProvider>
      {cookies.SESSION ? (
        <>
          <Header />
          <Routes>
            <Route path="*" element={<Navigate to="/events" replace />} />
            <Route path="/events/" element={<Outlet />}>
              <Route path="" element={<EventsPage />} />
              <Route path=":id/" element={<Outlet />}>
                <Route path="" element={<EventProfilePage />} />
                <Route path="calendar" element={<EventCalendarPage />} />
                <Route path="priority" element={<PriorityZonesPage />} />
                <Route
                  path="distribution"
                  element={<PhotographersDistributionPage />}
                />
                <Route path="rate" element={<RatePhotographersPage />} />
              </Route>
            </Route>
            <Route path="/photographers/" element={<Outlet />}>
              <Route path="" element={<AllPhotographersPage />} />
              <Route path=":id" element={<ProfilePhotographerPage />} />
            </Route>
            <Route path="/devices/" element={<DevicesPageWrapper />}>
              <Route path="" element={<DevicesPage />} />
              <Route path="camera" element={<CamerasTable />} />
              <Route path="lens" element={<OpticsTable />} />
              <Route path="flash" element={<FlashesTable />} />
              <Route path="battery" element={<AccumulatorsTable />} />
              <Route path="memory" element={<MemoryTable />} />
            </Route>
            <Route path="/settings" element={<ChangePassPage />} />
            <Route path="/profile" element={<ChangePassPage />} />
            <Route
              path="/work-photographers-calendar"
              element={<WorkPhotographersCalendarPage />}
            />
          </Routes>
        </>
      ) : (
        <Routes>
          <Route path="*" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
          <Route path="/events/:id/calendar" element={<EventCalendarPage />} />
        </Routes>
      )}
    </CookiesProvider>
  );
}

export default App;
