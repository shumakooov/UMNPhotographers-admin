import React from 'react';
import './App.css';
import {Route, Routes} from "react-router-dom";
import AllPhotographersPage from "./pages/photographers/allPhotographers/all-photographers-page";
import LoginPage from "./pages/loginPage/login-page";
import ChangePassPage from "./pages/changePassPage/change-pass-page";
import ProfilePhotographerPage from "./pages/photographers/profilePhotographer/profile-photographer-page";
import DevicesPage from "./pages/devices/devices-page";
import EventsPage from "./pages/events/eventsPage/events-page";
import EventProfilePage from "./pages/events/eventProfilePage/event-profile-page";
import EventCalendarPage from "./pages/events/eventCalendarPage/event-calendar-page";
import PriorityZonesPage from "./pages/events/priorityZonesPage/priority-zones-page";
import WorkPhotographersCalendarPage
    from "./pages/events/workPhotographersCalendarPage/work-photographers-calendar-page";
import PhotographersDistributionPage
    from "./pages/events/photographersDistributionPage/photographers-distribution-page";
import RatePhotographersPage from "./pages/events/ratePhotographersPage/rate-photographers-page";
import HomePage from "./pages/homePage/home-page";
import SideBar from "./components/sideBar/side-bar";
import ErrorPage from "./pages/errorPage/error-page";
import {CookiesProvider, useCookies} from "react-cookie";

function App() {
    const [cookies, setCookies] = useCookies(['SESSION']);

    function handleLogin(user: any) {
        setCookies("SESSION", user, {path: '/'})
    }

    return (
        <CookiesProvider>
            <div className={'wrapper_root'}>
                {cookies.SESSION ? (
                    <>
                        <SideBar/>
                        <Routes>
                            <Route path={"*"} element={<ErrorPage/>}/>
                            <Route path={"/"} element={<HomePage/>}/>
                            <Route path={"/login"} element={<LoginPage/>}/>
                            <Route path={"/change-pass"} element={<ChangePassPage/>}/>
                            <Route path={"/photographers"} element={<AllPhotographersPage/>}/>
                            <Route path={"/photographers/:id"} element={<ProfilePhotographerPage/>}/>
                            <Route path={"/devices"} element={<DevicesPage/>}/>
                            <Route path={"/events"} element={<EventsPage/>}/>
                            <Route path={"/event-profile"} element={<EventProfilePage/>}/>
                            <Route path={"/priority-zones"} element={<PriorityZonesPage/>}/>
                            <Route path={"/work-photographers-calendar"} element={<WorkPhotographersCalendarPage/>}/>
                            <Route path={"/event-calendar"} element={<EventCalendarPage/>}/>
                            <Route path={"/photographers-distribution"} element={<PhotographersDistributionPage/>}/>
                            <Route path={"/rate-photographers"} element={<RatePhotographersPage/>}/>
                        </Routes>
                    </>
                ) : (
                    <LoginPage onLogin={handleLogin}/>
                )}
            </div>
        </CookiesProvider>
    );
}

export default App;
