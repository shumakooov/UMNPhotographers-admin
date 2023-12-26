import {Link} from "react-router-dom";
import React from "react";
import './side-bar.css'
import axios from "axios";

export default function SideBar() {
    const handleLogout = () => {
        axios(`https://photographersekb.ru:8080/admin/auth/logout`, {withCredentials: true}).then(r => console.log(r))
    }

    return (
        <div className='sideBar'>
            <nav>
                <ul>
                    <li>
                        <Link to={`/login`}>login</Link>
                    </li>
                    <li>
                        <Link to={`/change-pass`}>change pass</Link>
                    </li>
                    <li>
                        <Link to={`/photographers`}>all photographers</Link>
                    </li>
                    <li>
                        <Link to={`/devices`}>devices</Link>
                    </li>
                    <li>
                        <Link to={`/events`}>events</Link>
                    </li>
                    <li>
                        <Link to={`/event-profile`}>event profile</Link>
                    </li>
                    <li>
                        <Link to={`/priority-zones`}>priority zones</Link>
                    </li>
                    <li>
                        <Link to={`/work-photographers-calendar`}>work photographers calendar</Link>
                    </li>
                    <li>
                        <Link to={`/event-calendar`}>event calendar</Link>
                    </li>
                    <li>
                        <Link to={`/photographers-distribution`}>photographers distribution</Link>
                    </li>
                    <li>
                        <Link to={`/rate-photographers`}>rate photographers</Link>
                    </li>
                </ul>
            </nav>
            <div>
                <button onClick={handleLogout}>Выйти</button>
            </div>
        </div>
    )
}
