import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import ErrorPage from "./pages/errorPage/error-page.jsx";
import LoginPage from "./pages/loginPage/login-page.jsx";
import ChangePassPage from "./pages/changePassPage/change-pass-page";
import AllPhotographersPage from "./pages/photographers/allPhotographers/all-photographers-page";
import ProfilePhotographerPage from "./pages/photographers/profilePhotographer/profile-photographer-page";
import DevicesPage from "./pages/devices/devices-page";
import EventsPage from "./pages/events/eventsPage/events-page";
import PriorityZonesPage from "./pages/events/priorityZonesPage/priority-zones-page";
import WorkPhotographersCalendarPage
    from "./pages/events/workPhotographersCalendarPage/work-photographers-calendar-page";
import EventCalendarPage from "./pages/events/eventCalendarPage/event-calendar-page";
import PhotographersDistributionPage
    from "./pages/events/photographersDistributionPage/photographers-distribution-page";
import RatePhotographersPage from "./pages/events/ratePhotographersPage/rate-photographers-page";
import EventProfilePage from "./pages/events/eventProfilePage/event-profile-page";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/login",
                element: <LoginPage />
            },
            {
                path: "/change-pass",
                element: <ChangePassPage />
            },
            {
                path: "/photographers",
                element: <AllPhotographersPage />
            },
            {
                path: "/photographers/:id",
                element: <ProfilePhotographerPage />
            },
            {
                path: "/devices",
                element: <DevicesPage />
            },
            {
                path: "/events",
                element: <EventsPage />
            },
            {
                path: "/event-profile",
                element: <EventProfilePage />
            },
            {
                path: "/priority-zones",
                element: <PriorityZonesPage />
            },
            {
                path: "/work-photographers-calendar",
                element: <WorkPhotographersCalendarPage />
            },
            {
                path: "/event-calendar",
                element: <EventCalendarPage />
            },
            {
                path: "/photographers-distribution",
                element: <PhotographersDistributionPage />
            },
            {
                path: "/rate-photographers",
                element: <RatePhotographersPage />
            },
        ]
    }
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
