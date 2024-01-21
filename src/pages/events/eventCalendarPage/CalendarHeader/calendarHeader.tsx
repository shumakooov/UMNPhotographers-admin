import React, { useEffect, useState } from "react";
import styles from "./calendarHeader.module.css";
import { IconButton } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import moment from "moment/moment";
import { Moment } from "moment";

export default function CalendarHeader({ props }: any) {
  let duration = moment.duration(
    moment(props.events.endTime).diff(moment(props.events.startTime)),
  );

  const [tempDate, setTempDate] = React.useState<Moment>(
    moment(props.events.startTime),
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
          <p className={styles.eventDaysText}>
            День {whichDay}. {tempDate.format("DD.MM.YYYY")}
          </p>
        )}
      </div>
    </div>
  );
}
