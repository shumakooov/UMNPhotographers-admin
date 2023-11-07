import {Link} from "react-router-dom";
import React from "react";
import './side-bar.css'

export default function SideBar() {
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
        </div>
    )
}
