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

export default function PhotographersDistributionPage() {
    const [isLoading, setIsLoading] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        const getDataLocation = () => {
            try {
                axios.get(`https://photographersekb.ru:8080/admin/location/all`, {withCredentials: true})
                    .then(res => {
                        dispatch(addLocation(res.data.list))
                    })
                axios.get(`https://photographersekb.ru:8080/admin/zone/all`, {withCredentials: true})
                    .then(res => {
                        dispatch(addZone(res.data.list))
                    })
                axios.get(`https://photographersekb.ru:8080/admin/activity/short/all`, {withCredentials: true})
                    .then(res => {
                        console.log(res)
                        dispatch(addActivity(res.data))
                        setIsLoading(false)
                    })
            } catch (e) {
                console.error(e)
            }
        }
        getDataLocation()
    }, [])

    const locations: Location[] = useSelector((state: RootState) => state.locations.location);
    const zones: Zone[] = useSelector((state: RootState) => state.zones.zone);
    const activities: Activity[] = useSelector((state: RootState) => state.activities.activity);

    if (isLoading) {
        return (
            <div className={styles.spinner}></div>
        );
    }
    return (
        <div className={styles.wrapper}>
            photographers distribution page
            <CalendarHeaderPhoto></CalendarHeaderPhoto>
            <CalendarGridPhoto props={{
                locations: locations,
                items: activities,
                zones: zones,
            }}></CalendarGridPhoto>
        </div>
    );
}
