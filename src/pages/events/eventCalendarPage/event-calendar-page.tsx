import React, { useEffect, useState } from "react";
import moment from "moment";
import CalendarHeader from "./CalendarHeader/calendarHeader";
import CalendarGrid from "./CalendarGrid/calendarGrid";
import styles from "./event-calendar-page.module.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addLocation, Location } from "../../../store/locationSlice";
import { addZone, Zone } from "../../../store/zoneSlice";
import { Activity, addActivity } from "../../../store/activitySlice";
import { RootState } from "../../../store/store";
import { addEvent } from "../../../store/eventSlice";
import { Event } from "../../../types/event";
import { Moment } from "moment/moment";
import { useLocation } from "react-router-dom";

export default function EventCalendarPage() {
  const location = useLocation();
  const activeEventId = location.pathname.split("/")[2];
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const getDataLocation = () => {
      try {
        axios
          .get(`https://photographersekb.ru:8080/admin/location/all`, {
            withCredentials: true,
          })
          .then((res) => {
            dispatch(addLocation(res.data.list));
          });
        axios
          .get(`https://photographersekb.ru:8080/admin/zone/all`, {
            withCredentials: true,
          })
          .then((res) => {
            dispatch(addZone(res.data.list));
          });
        axios
          .get(`https://photographersekb.ru:8080/admin/activity/short/all`, {
            withCredentials: true,
          })
          .then((res) => {
            dispatch(addActivity(res.data));
          });
        axios
          .get(`https://photographersekb.ru:8080/admin/event/all`, {
            withCredentials: true,
          })
          .then((res) => {
            dispatch(addEvent(res.data.list));
            setIsLoading(false);
          });
      } catch (e) {
        console.error(e);
      }
    };
    getDataLocation();
  }, []);

  const locations: Location[] = useSelector(
    (state: RootState) => state.locations.location,
  );
  const zones: Zone[] = useSelector((state: RootState) => state.zones.zone);
  const activities: Activity[] = useSelector(
    (state: RootState) => state.activities.activity,
  );
  const events: Event[] = useSelector((state: RootState) => state.events.event);

  const [curDate, setCurDate] = React.useState<Moment>();

  if (isLoading) {
    return <div className={styles.spinner}></div>;
  }

  moment.updateLocale("en", { week: { dow: 1 } });

  function handleDate(date: Moment) {
    setCurDate(date);
  }

  return (
    <div className={styles.wrapper}>
      <CalendarHeader
        props={{
          events: events.find(
            (event: Event) => event.id === Number(activeEventId),
          ),
          handleDate: handleDate,
        }}
      ></CalendarHeader>
      <CalendarGrid
        props={{
          locations: locations,
          items: activities.filter(
            (i: Activity) =>
              curDate?.isBetween(i.startTime, i.endTime) ||
              curDate?.isSame(i.endTime, "day"),
          ),
          zones: zones,
          curDate: curDate,
        }}
      ></CalendarGrid>
    </div>
  );
}
