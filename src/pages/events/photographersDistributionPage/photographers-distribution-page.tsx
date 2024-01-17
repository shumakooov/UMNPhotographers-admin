import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import {addLocation, Location} from "../../../store/locationSlice";
import {addZone, Zone} from "../../../store/zoneSlice";
import {Activity, addActivity} from "../../../store/activitySlice";
import {RootState} from "../../../store/store";
import styles from "./photographers-distribution-page.module.css";
import CalendarHeaderPhoto from "./CalendarHeaderPhoto/calendarHeaderPhoto";
import CalendarGridPhoto from "./CalendarGridPhoto/calendarGridPhoto";
import {addSchedule, Schedule} from "../../../store/scheduleSlice";
import {addSchedulePart, SchedulePart} from "../../../store/schedulePartSlice";

export default function PhotographersDistributionPage() {
    const [isLoading, setIsLoading] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        const getDataLocation = () => {
            try {
                axios.get(`https://photographersekb.ru:8080/admin/schedule/list`, {withCredentials: true})
                    .then(res => {
                        console.log(res)
                        dispatch(addSchedule(res.data.list))
                    })
                axios.get(`https://photographersekb.ru:8080/admin/schedule_part/all`, {withCredentials: true})
                    .then(res => {
                        dispatch(addSchedulePart(res.data.list))
                        setIsLoading(false)
                    })
            } catch (e) {
                console.error(e)
            }
        }
        getDataLocation()
    }, [])

    const scheduleList: Schedule[] = useSelector((state: RootState) => state.scheduleList.schedule);
    const scheduleParts: SchedulePart[] = useSelector((state: RootState) => state.schedulePart.schedulePart);

    if (isLoading) {
        return (
            <div className={styles.spinner}></div>
        );
    }
    return (
        <div className={styles.wrapper}>
            <CalendarHeaderPhoto></CalendarHeaderPhoto>
            <CalendarGridPhoto props={{
                scheduleList: scheduleList,
                scheduleParts: scheduleParts
            }}></CalendarGridPhoto>
        </div>
    );
}
