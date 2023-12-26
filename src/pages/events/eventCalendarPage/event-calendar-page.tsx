import React, {useEffect, useState} from 'react';
import moment from "moment";
import CalendarHeader from "./CalendarHeader/calendarHeader";
import CalendarGrid from "./CalendarGrid/calendarGrid";
import styles from './event-calendar-page.module.css'
import axios from "axios";
import {useDispatch} from 'react-redux'
import {addLocation} from '../../../store/locationSlice'
import {addZone} from "../../../store/zoneSlice";
import {addActivity} from "../../../store/activitySlice";


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
                        dispatch(addActivity(res.data))
                        setIsLoading(false)
                    })
            } catch (e) {
                console.error(e)
            }
        }
        getDataLocation()
    }, [])

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
            <CalendarGrid></CalendarGrid>
        </div>
    );
}
