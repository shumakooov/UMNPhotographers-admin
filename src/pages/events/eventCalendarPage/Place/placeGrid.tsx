import React from 'react';
import styles from "./placeGrid.module.css";
import Event from "../Event/event";
import {HALF_HOUR_HEIGHT, HOUR_MARGIN_TOP} from "../globals";
import moment, {Moment} from "moment";
import axios from "axios";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import {Button, MenuItem, TextField} from "@mui/material";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterMoment} from "@mui/x-date-pickers/AdapterMoment";
import {DemoContainer} from "@mui/x-date-pickers/internals/demo";
import {TimePicker} from "@mui/x-date-pickers";
import {Activity} from "../../../../store/activitySlice";
import {Location} from "../../../../store/locationSlice";
import {useNavigate} from "react-router-dom";

export default function PlaceGrid({props}: any) {

    const [open, setOpen] = React.useState(false);
    const [locationIdForModal, setLocationIdForModal] = React.useState<number>()
    const [activityId, setActivityId] = React.useState<number>()
    const [zoneId, setZoneId] = React.useState<number>()
    const [eventId, setEventId] = React.useState<number>()
    const [timeFromForModal, setTimeFromForModal] = React.useState<Moment | null>();
    const [timeToForModal, setTimeToForModal] = React.useState<Moment | null>();
    const handleOpen = (e: any, activity: Activity) => {
        e.stopPropagation();
        setTimeFromForModal(moment(activity.startTime))
        setTimeToForModal(moment(activity.endTime))
        setLocationIdForModal(activity.locationId)
        setActivityId(activity.id)
        setZoneId(activity.zoneId)
        setEventId(activity.eventId)
        setName(activity.name)
        setDescription(activity.description)
        setPriority(activity.priority?.toString())
        setOpen(true);
    };
    const handleClose = (e: any) => {
        e.stopPropagation();
        setOpen(false);
    };

    //for modal edit activity
    const [name, setName] = React.useState<string>('');
    const [description, setDescription] = React.useState<string>('');
    const [countPhotographers, setCountPhotographers] = React.useState<string | null>("");
    const [priority, setPriority] = React.useState<string | null>("");
    const [shootingTime, setShootingTime] = React.useState<string | null>("");
    const [shootingType, setShootingType] = React.useState<string | null>("");
    const [persons, setPersons] = React.useState<string | null>("");
    const navigate = useNavigate();

    const handleUpdateActivity = async () => {
        if (true) {
            const response = await axios.put(`https://photographersekb.ru:8080/admin/activity/${activityId}`, {
                locationId: locationIdForModal,
                eventId: eventId,
                zoneId: zoneId,
                name: name,
                description: description,
                startTime: timeFromForModal?.add(5, 'h'),
                endTime: timeToForModal?.add(5, 'h'),
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
    }

    const handleDeleteActivity = async () => {
        if (true) {
            const response = await axios.delete(`https://photographersekb.ru:8080/admin/activity/${activityId}`, {withCredentials: true})

            if (response.status === 200) {
                navigate(0)
            }
        }
    }

    const COUNT_ROWS = 48;
    const [droppedCell, setDroppedCell] = React.useState<number>();

    function dragStartHandler(e: any, act: Activity) {
        setActivityId(act.id)
        setLocationIdForModal(act.locationId)
        setZoneId(act.zoneId)
        setEventId(act.eventId)
        setName(act.name)
        setDescription(act.description)
        setPriority(act.priority?.toString())
    }

    function dragEndHandler(e: any, act: Activity) {
        handleUpdateActivityByDrag(droppedCell, act.startTime, act.endTime)
    }

    function dropHandler(e: any, index: number) {
        e.preventDefault()
        setDroppedCell(index)
    }

    function dragOverHandler(e: any) {
        e.preventDefault()
    }

    const handleUpdateActivityByDrag = async (index: any, startTimePrev: string, endTimePrev: string) => {
        let duration = moment.duration(moment(endTimePrev).diff(moment(startTimePrev)));
        console.log(props.curDate)

        let timeFrom = index % 2 === 0 ? moment().set({
            'hour': index / 2,
            'minute': 0
        }) : moment().set({
            'year': props.curDate.year(),
            'month': props.curDate.month(),
            'date': props.curDate.date(),
            'hour': index / 2,
            'minute': 30
        })
        let timeTo = moment(timeFrom).add(duration, 'ms')
        const response = await axios.put(`https://photographersekb.ru:8080/admin/activity/${activityId}`, {
            locationId: locationIdForModal,
            eventId: eventId,
            zoneId: zoneId,
            name: name,
            description: description,
            startTime: timeFrom.add(5, 'h'),
            endTime: timeTo.add(5, 'h'),
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

    return (
        <>
            <div className={styles.wrapper} style={{height: 24 * HALF_HOUR_HEIGHT * 2}}>

                {
                    Array.from({length: COUNT_ROWS}, (_, index) => {
                        return (
                            <div key={index}
                                 style={{height: HALF_HOUR_HEIGHT}} className={styles.gridDiv}
                                 onDrop={(e: any) => {
                                     dropHandler(e, index)
                                 }}
                                 onDragOver={dragOverHandler}
                                 onClick={(e) => props.handleOpenModal(e, props.locationId)}
                            >
                            </div>
                        );
                    })
                }

                {/*<Event />*/}
                {
                    props.tempActivitiesByLocation.map((act: Activity) => {
                        let startTime = moment(act.startTime);
                        let endTime = moment(act.endTime);
                        let duration = moment.duration(endTime.diff(startTime));

                        const EVENT_TOP = startTime.hours() * HALF_HOUR_HEIGHT * 2 + HOUR_MARGIN_TOP + startTime.minutes();
                        const EVENT_HEIGHT = duration.hours() * HALF_HOUR_HEIGHT * 2 + duration.minutes();

                        return (
                            <>
                                <button className={styles.eventBtn} style={{
                                    top: EVENT_TOP,
                                    height: EVENT_HEIGHT,
                                }} onClick={(e) => {
                                    handleOpen(e, act)
                                }}
                                        draggable={true}
                                        onDragStart={(e) => dragStartHandler(e, act)}
                                        onDragEnd={(e) => dragEndHandler(e, act)}
                                >
                                    {act.name}
                                </button>
                            </>
                        )
                    })
                }

                <div>
                    <Modal
                        open={open}
                        onClose={handleClose}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Box className={styles.modal}>
                            <h2>Редактировать</h2>
                            <TextField id="outlined-basic" label="Название" variant="outlined"
                                       defaultValue={name}
                                       onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}/>
                            <TextField id="outlined-basic" label="Описание" variant="outlined"
                                       defaultValue={description}
                                       onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDescription(e.target.value)}/>
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
                                    <TimePicker label="Время начала" defaultValue={timeFromForModal}
                                                onChange={(newValue) => setTimeFromForModal(newValue)}/>
                                </DemoContainer>
                                <DemoContainer components={['TimePicker']}>
                                    <TimePicker label="Время конца" defaultValue={timeToForModal}
                                                onChange={(newValue) => setTimeToForModal(newValue)}/>
                                </DemoContainer>
                            </LocalizationProvider>
                            <TextField id="outlined-basic" label="Количество фотографов" variant="outlined"
                                       onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCountPhotographers(e.target.value)}/>
                            <TextField id="outlined-basic" label="Приоритет" variant="outlined"
                                       defaultValue={priority}
                                       onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPriority(e.target.value)}/>
                            <TextField id="outlined-basic" label="Время съемки" variant="outlined"
                                       onChange={(e: React.ChangeEvent<HTMLInputElement>) => setShootingTime(e.target.value)}/>
                            <TextField id="outlined-basic" label="Тип съемки" variant="outlined"
                                       onChange={(e: React.ChangeEvent<HTMLInputElement>) => setShootingType(e.target.value)}/>
                            <TextField id="outlined-basic" label="Важные персоны" variant="outlined"
                                       onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPersons(e.target.value)}/>
                            <Button onClick={handleUpdateActivity}>Сохранить</Button>
                            <Button onClick={handleDeleteActivity}>Удалить</Button>
                            {/*<ChildModal />*/}
                        </Box>
                    </Modal>
                </div>
            </div>
        </>
    );
}


