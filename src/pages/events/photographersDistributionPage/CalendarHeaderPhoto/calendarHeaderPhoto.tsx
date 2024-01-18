import React, { useEffect, useState } from "react";
import styles from "./calendarHeaderPhoto.module.css";
import moment from "moment";
import { Moment } from "moment/moment";
import axios from "axios";
import { Event } from "../../../../store/eventSlice";
import { IconButton } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

export default function CalendarHeaderPhoto({ props }: any) {
  const [event, setEvent] = React.useState<Event>();
  useEffect(() => {
    const getEvent = () => {
      axios
        .get(`https://photographersekb.ru:8080/admin/event/${props.eventId}`, {
          withCredentials: true,
        })
        .then((res) => {
          setEvent(res.data);
        });
    };
    getEvent();
  }, []);

  let duration = moment.duration(
    moment(event?.endTime).diff(moment(event?.startTime)),
  );

  const [tempDate, setTempDate] = React.useState<Moment>(
    moment(event?.startTime),
  );

  const [whichDay, setWhichDay] = React.useState(1);

  useEffect(() => {
    const doHandleDate = () => {
      props.handleDate(tempDate);
    };
    doHandleDate();
  }, []);

  const handleBackDate = () => {
    let d = moment(tempDate.subtract(1, "d"));
    setTempDate(d);
    setWhichDay(whichDay - 1);
    props.handleDate(d);
  };
  const handleForwardDate = () => {
    let d = moment(tempDate.add(1, "d"));
    setTempDate(d);
    setWhichDay(whichDay + 1);
    props.handleDate(d);
  };

  return (
    <div className={styles.wrapperHeader}>
      <div className={styles.eventDays}>
        {duration.days() > 0 ? (
          <>
            <IconButton aria-label="delete" onClick={() => handleBackDate()}>
              <ArrowBackIosNewIcon />
            </IconButton>
            <p className={styles.eventDaysText}>
              День {whichDay}. {tempDate.format("DD.MM.YYYY")}
            </p>
            <IconButton aria-label="delete" onClick={() => handleForwardDate()}>
              <ArrowForwardIosIcon />
            </IconButton>
          </>
        ) : (
          <p className={styles.eventDaysText}></p>
        )}
      </div>
    </div>
  );
}
