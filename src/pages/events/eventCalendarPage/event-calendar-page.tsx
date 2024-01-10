import React, {useEffect, useState} from 'react';
import moment from "moment";
import CalendarHeader from "./CalendarHeader/calendarHeader";
import CalendarGrid from "./CalendarGrid/calendarGrid";
import styles from './event-calendar-page.module.css'
import axios from "axios";
import {useDispatch, useSelector} from 'react-redux'
import {addLocation, Location} from '../../../store/locationSlice'
import {addZone, Zone} from "../../../store/zoneSlice";
import {Activity, addActivity} from "../../../store/activitySlice";
import {RootState} from "../../../store/store";


export default function EventCalendarPage() {
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

    moment.updateLocale('en', {week: {dow: 1}})

    const startDay = moment().startOf('month').startOf('week');
    const endDay = moment().endOf('month').endOf('week');


    return (
        <div className={styles.wrapper}>
            <CalendarHeader></CalendarHeader>
            <CalendarGrid props={{
                locations: locations,
                items: activities,
                zones: zones,
            }}></CalendarGrid>
        </div>
    );
}
