import React, {useEffect, useState} from 'react';
import styles from "./calendarGrid.module.css";
import PlaceGrid from "../Place/placeGrid";
import PlaceHeader from "../PlaceHeader/placeHeader";
import axios from "axios";
import {HALF_HOUR_HEIGHT, HOUR_MARGIN_TOP} from "../globals";
import moment, {Moment} from "moment";
import {Box, Button, Drawer, MenuItem, Modal, TextField} from "@mui/material";
import {DemoContainer} from '@mui/x-date-pickers/internals/demo';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import {AdapterMoment} from "@mui/x-date-pickers/AdapterMoment";
import {TimePicker} from "@mui/x-date-pickers";
import 'moment/locale/de';
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {RootState} from "../../../../store/store";
import {Location} from "../../../../store/locationSlice"
import {Zone} from "../../../../store/zoneSlice";
import {Activity} from "../../../../store/activitySlice";
import CreateTimelineDrawer from "../../../../components/createTimeLineDrawer/create-timeline-drawer";

export default function CalendarGrid({props}: any) {
    const time = [];
    for (let i = 0; i < 24; i++) {
        for (let j = 0; j < 2; j++) {
            time.push(`${i}:${j === 0 ? `00` : 30 * j}`);
        }
    }

    const hourNow = moment().hour();
    const minutesNow = moment().minutes();
    const TIME_NOW_TOP = hourNow * HALF_HOUR_HEIGHT * 2 + HOUR_MARGIN_TOP + minutesNow;

    //for modal start
    const [openModal, setOpenModal] = React.useState(false);
    const [locationIdForModal, setLocationIdForModal] = React.useState<number>()
    const [zoneIdForModal, setZoneIdForModal] = React.useState<number | null>()
    const handleOpenModal = (e: any, id: number) => {
        e.stopPropagation();
        e.preventDefault()
        handleTopByMouse(e)
        setLocationIdForModal(id)
        let ta = props.items.find((activity: any) => activity.locationId === id)
        setZoneIdForModal(ta?.zoneId)
        setOpenModal(true);
    };
    const handleCloseModal = (e: any) => {
        e.stopPropagation();
        setOpenModal(false);
    };
    const [timeStartByCoords, setTimeStartByCoords] = useState<Moment>();

    const handleTopByMouse = (event: any) => {
        let hours = Math.floor((event.clientY - HOUR_MARGIN_TOP + window.scrollY) / (HALF_HOUR_HEIGHT * 2))
        let minutesFull = (event.clientY - HOUR_MARGIN_TOP + window.scrollY) % (HALF_HOUR_HEIGHT * 2)
        let minutesMultipleTen = minutesFull - minutesFull % 10

        let time = moment(hours.toString() + ":" + minutesMultipleTen.toString(), "HH:mm")

        setTimeStartByCoords(time);
        setTimeFromCreate(time)
        setTimeToCreate(moment(time).add(10, 'm'))
    };

    const [nameCreate, setNameCreate] = React.useState<string>("");
    const [descriptionCreate, setDescriptionCreate] = React.useState<string>("");
    const [timeFromCreate, setTimeFromCreate] = React.useState<Moment | null>();
    const [timeToCreate, setTimeToCreate] = React.useState<Moment>();
    const [countPhotographers, setCountPhotographers] = React.useState<string | null>("");
    const [priority, setPriority] = React.useState<string | null>("");
    const [shootingTime, setShootingTime] = React.useState<string | null>("");
    const [shootingType, setShootingType] = React.useState<string | null>("");
    const [persons, setPersons] = React.useState<string | null>("");

    const navigate = useNavigate()

    const handleCreateActivity = async () => {
        console.log(timeFromCreate)
        if (true) {
            const response = await axios.post(`https://photographersekb.ru:8080/admin/activity`, {
                locationId: locationIdForModal,
                eventId: 1,
                zoneId: zoneIdForModal,
                name: nameCreate,
                description: descriptionCreate,
                startTime: timeFromCreate?.add(5, 'h'),
                endTime: timeToCreate?.add(5, 'h'),
                photographersCount: Number(countPhotographers),
                priority: Number(priority),
                shootingTime: Number(shootingTime),
                shootingType: shootingType,
                importantPersons: persons,
            }, {withCredentials: true})

            if (response.status === 200) {
                navigate(0)
            }
        }
    };

    return (
        <div className={styles.root}>
            <div className={styles.wrapperZones}>
                <div className={styles.gridWrapper}>
                    {
                        time.map((i) => (
                            <span className={styles.timeItem} style={{height: HALF_HOUR_HEIGHT}}>
                            {i}
                                {/*<span className={styles.line}></span>*/}
                        </span>
                        ))
                    }
                    <span className={styles.timeNow} style={{top: TIME_NOW_TOP}}></span>
                </div>


                <div className={styles.zones}>
                    {
                        props.locations.map((location: Location) => {
                            const tempActivitiesByLocation = props.items.filter((activity: Activity) => activity.locationId === location.id)

                            return (
                                <div key={location.id} className={styles.timeLine}
                                >
                                    <PlaceHeader props={{
                                        location: location,
                                        tempActivitiesByLocation: tempActivitiesByLocation,
                                        zones: props.zones,
                                    }}/>
                                    <PlaceGrid props={{
                                        locationId: location.id,
                                        startDate: location.startDate,
                                        tempActivitiesByLocation: tempActivitiesByLocation,
                                        locations: props.locations,
                                        handleOpenModal: handleOpenModal
                                    }}/>
                                </div>
                            )
                        })
                    }

                    {/*Drawer*/}
                    <div>
                        <CreateTimelineDrawer props={{zones: props.zones}}/>
                    </div>

                    {/*Modal*/}
                    <div>
                        <Modal
                            open={openModal}
                            onClose={handleCloseModal}
                            aria-labelledby="parent-modal-title"
                            aria-describedby="parent-modal-description"
                        >
                            <Box className={styles.modal}>
                                <h2>Создать активность</h2>
                                <TextField id="outlined-basic" label="Название" variant="outlined"
                                           onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNameCreate(e.target.value)}/>
                                <TextField id="outlined-basic" label="Описание" variant="outlined"
                                           onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDescriptionCreate(e.target.value)}/>
                                <TextField
                                    id="outlined-select-currency"
                                    select
                                    label="Адрес"
                                    defaultValue={locationIdForModal}
                                    helperText="Адрес"
                                >
                                    {props.locations.map((location: Location) => (
                                        <MenuItem key={location.address} value={location.id}>
                                            {location.address}
                                        </MenuItem>
                                    ))}
                                </TextField>
                                <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale="de">
                                    <DemoContainer components={['TimePicker']}>
                                        <TimePicker label="Время начала" value={timeFromCreate}
                                                    onChange={(newValue) => setTimeFromCreate(newValue)}/>
                                    </DemoContainer>
                                    <DemoContainer components={['TimePicker']}>
                                        <TimePicker label="Время конца" value={timeToCreate}
                                                    onChange={(newValue) => setTimeToCreate(moment(newValue))}
                                        />
                                    </DemoContainer>
                                </LocalizationProvider>
                                <TextField id="outlined-basic" label="Количество фотографов" variant="outlined"
                                           onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCountPhotographers(e.target.value)}/>
                                <TextField id="outlined-basic" label="Приоритет" variant="outlined"
                                           onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPriority(e.target.value)}/>
                                <TextField id="outlined-basic" label="Время съемки" variant="outlined"
                                           onChange={(e: React.ChangeEvent<HTMLInputElement>) => setShootingTime(e.target.value)}/>
                                <TextField id="outlined-basic" label="Тип съемки" variant="outlined"
                                           onChange={(e: React.ChangeEvent<HTMLInputElement>) => setShootingType(e.target.value)}/>
                                <TextField id="outlined-basic" label="Важные персоны" variant="outlined"
                                           onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPersons(e.target.value)}/>
                                <Button onClick={handleCreateActivity}>Сохранить</Button>
                                {/*<ChildModal />*/}
                            </Box>
                        </Modal>
                    </div>
                </div>
            </div>
        </div>
    );
}
