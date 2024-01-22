import React, { useEffect, useState } from "react";
import styles from "./calendarHeaderPhoto.module.css";
import moment from "moment";
import { Moment } from "moment/moment";
import axios from "axios";

import { Event } from "../../../../types/event";
import { IconButton } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

export default function CalendarHeaderPhoto({ props }: any) {
  let duration = moment.duration(
    moment(props.event.endTime).diff(moment(props.event.startTime)),
  );

  const [tempDate, setTempDate] = React.useState<Moment>(
    moment(props.event.startTime),
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
            <IconButton
              aria-label="delete"
              onClick={() => handleBackDate()}
              // disabled={whichDay === 1}
            >
              <ArrowBackIosNewIcon />
            </IconButton>
            <p className={styles.eventDaysText}>
              День {whichDay}. {tempDate.format("DD.MM.YYYY")}
            </p>
            <IconButton
              aria-label="delete"
              onClick={() => handleForwardDate()}
              // disabled={
              //   new Date(props.curDate?.toISOString()).toLocaleDateString() ===
              //   new Date(props.events.endTime).toLocaleDateString()
              // }
            >
              <ArrowForwardIosIcon />
            </IconButton>
          </>
        ) : (
          <p className={styles.eventDaysText}>
            День {whichDay}. {tempDate.format("DD.MM.YYYY")}
          </p>
        )}
      </div>
    </div>
  );
}
