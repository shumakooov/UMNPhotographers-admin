import React from 'react';
import './App.css';
import {Outlet} from "react-router-dom";

function App() {
  return (
      <>
        <div className='wrapper_root'>
          <div className='sideBar'>
            <h1 style={{marginTop: 0}}>nav</h1>
            <nav>
              <ul>
                <li>
                  <a href={`/login`}>login</a>
                </li>
                <li>
                  <a href={`/change-pass`}>change pass</a>
                </li>
                <li>
                  <a href={`/photographers`}>all photographers</a>
                </li>
                <li>
                  <a href={`/profile-photographer`}>profile photographer</a>
                </li>
                <li>
                  <a href={`/devices`}>devices</a>
                </li>
                <li>
                  <a href={`/events`}>events</a>
                </li>
                <li>
                  <a href={`/event-profile`}>event profile</a>
                </li>
                <li>
                  <a href={`/priority-zones`}>priority zones</a>
                </li>
                <li>
                  <a href={`/work-photographers-calendar`}>work photographers calendar</a>
                </li>
                <li>
                  <a href={`/event-calendar`}>event calendar</a>
                </li>
                <li>
                  <a href={`/photographers-distribution`}>photographers distribution</a>
                </li>
                <li>
                  <a href={`/rate-photographers`}>rate photographers</a>
                </li>
              </ul>
            </nav>
          </div>
          <div className='main'>
            <Outlet/>
          </div>
        </div>
      </>
  );
}

export default App;
