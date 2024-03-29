import React, { useEffect } from "react";
import styles from "./placeGridPhoto.module.css";
import { HALF_HOUR_HEIGHT, HOUR_MARGIN_TOP } from "../globalsPhoto";
import moment, { Moment } from "moment";
import axios from "axios";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Button, MenuItem, TextField } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { TimePicker } from "@mui/x-date-pickers";
import { Activity, ActivityFull } from "../../../../store/activitySlice";
import { Location } from "../../../../store/locationSlice";
import { useNavigate } from "react-router-dom";
import {
  addSchedulePart,
  SchedulePart,
} from "../../../../store/schedulePartSlice";
import { addSchedule } from "../../../../store/scheduleSlice";

const colorsByPriority = {
  "0": "#79747E",
  "1": "#FFC800",
  "2": "#FF3D00",
  "3": "#FF0000",
  null: "#79747E",
};

export default function PlaceGridPhoto({ props }: any) {
  const [open, setOpen] = React.useState(false);
  const [locationIdForModal, setLocationIdForModal] = React.useState<number>();
  const [activityId, setActivityId] = React.useState<number>();
  const [zoneId, setZoneId] = React.useState<number>();
  const [eventId, setEventId] = React.useState<number>();
  const [timeFromForModal, setTimeFromForModal] =
    React.useState<Moment | null>();
  const [timeToForModal, setTimeToForModal] = React.useState<Moment | null>();
  const handleOpen = (e: any, activity: ActivityFull | undefined) => {
    e.stopPropagation();
    setTimeFromForModal(moment(activity?.startTime));
    setTimeToForModal(moment(activity?.endTime));
    setLocationIdForModal(activity?.locationId);
    setActivityId(activity?.id);
    setZoneId(activity?.zoneId);
    setEventId(activity?.eventId);
    setName(activity?.name);
    setDescription(activity?.description);
    setPriority(activity?.priority.toString());
    setOpen(true);
  };
  const handleClose = (e: any) => {
    e.stopPropagation();
    setOpen(false);
  };

  //for modal edit activity
  const [name, setName] = React.useState<string | undefined>("");
  const [description, setDescription] = React.useState<string | undefined>("");
  const [countPhotographers, setCountPhotographers] = React.useState<
    string | null
  >("");
  const [priority, setPriority] = React.useState<string | undefined>("");
  const [shootingTime, setShootingTime] = React.useState<string | null>("");
  const [shootingType, setShootingType] = React.useState<string | null>("");
  const [persons, setPersons] = React.useState<string | null>("");
  const navigate = useNavigate();

  const handleUpdateActivity = async () => {
    if (true) {
      const response = await axios.put(
        `https://photographersekb.ru:8080/admin/activity/${activityId}`,
        {
          locationId: locationIdForModal,
          eventId: eventId,
          zoneId: zoneId,
          name: name,
          description: description,
          startTime: timeFromForModal?.add(5, "h"),
          endTime: timeToForModal?.add(5, "h"),
          photographersCount: Number(countPhotographers),
          priority: Number(priority),
          shootingTime: Number(shootingTime),
          shootingType: shootingType,
          importantPersons: persons,
        },
        { withCredentials: true },
      );

      if (response.status === 200) {
        navigate(0);
      }
    }
  };

  const handleDeleteActivity = async () => {
    if (true) {
      const response = await axios.delete(
        `https://photographersekb.ru:8080/admin/activity/${activityId}`,
        { withCredentials: true },
      );

      if (response.status === 200) {
        navigate(0);
      }
    }
  };

  const COUNT_ROWS = 48;
  const [droppedCell, setDroppedCell] = React.useState<number>();

  function dragStartHandler(e: any, act: ActivityFull | undefined) {
    setActivityId(act?.id);
    setLocationIdForModal(act?.locationId);
    setZoneId(act?.zoneId);
    setEventId(act?.eventId);
    setName(act?.name);
    setDescription(act?.description);
    setPriority(act?.priority?.toString());
  }

  function dragEndHandler(e: any, act: ActivityFull | undefined) {
    handleUpdateActivityByDrag(droppedCell, act?.startTime, act?.endTime);
  }

  function dropHandler(e: any, index: number) {
    e.preventDefault();
    setDroppedCell(index);
  }

  function dragOverHandler(e: any) {
    e.preventDefault();
  }

  const handleUpdateActivityByDrag = async (
    index: any,
    startTimePrev: string | undefined,
    endTimePrev: string | undefined,
  ) => {
    let duration = moment.duration(
      moment(endTimePrev).diff(moment(startTimePrev)),
    );

    let timeFrom =
      index % 2 === 0
        ? moment().set({
            hour: index / 2,
            minute: 0,
          })
        : moment().set({ hour: index / 2, minute: 30 });
    let timeTo = moment(timeFrom).add(duration, "ms");
    const response = await axios.put(
      `https://photographersekb.ru:8080/admin/activity/${activityId}`,
      {
        locationId: locationIdForModal,
        eventId: eventId,
        zoneId: zoneId,
        name: name,
        description: description,
        startTime: timeFrom.add(5, "h"),
        endTime: timeTo.add(5, "h"),
        photographersCount: Number(countPhotographers),
        priority: Number(priority),
        shootingTime: Number(shootingTime),
        shootingType: shootingType,
        importantPersons: persons,
      },
      { withCredentials: true },
    );

    if (response.status === 200) {
      navigate(0);
    }
  };

  //for tempSchedulePartsByPhotographer
  const [responseAct, setResponseAct] = React.useState<ActivityFull>();
  const [activitiesByPhotographer, setActivitiesByPhotographer] =
    React.useState<ActivityFull[]>([]);

  useEffect(() => {
    const getActivities = () => {
      Promise.all(
        props.tempSchedulePartsByPhotographer.map((i: SchedulePart) => {
          return axios(
            `https://photographersekb.ru:8080/admin/activity/${i.activityId}`,
            { withCredentials: true },
          );
        }),
      ).then((res) =>
        setActivitiesByPhotographer(res.map((item) => item.data)),
      );
    };
    getActivities();
  }, []);

  return (
    <>
      <div
        className={styles.wrapper}
        style={{ height: 24 * HALF_HOUR_HEIGHT * 2 }}
      >
        {Array.from({ length: COUNT_ROWS }, (_, index) => {
          return (
            <div
              key={index}
              style={{ height: HALF_HOUR_HEIGHT }}
              className={styles.gridDiv}
              onDrop={(e: any) => {
                dropHandler(e, index);
              }}
              onDragOver={dragOverHandler}
              // onClick={(e) => props.handleOpenModal(e, props.locationId)}
            ></div>
          );
        })}

        {/*<Event />*/}
        {activitiesByPhotographer
          ?.filter(
            (i: ActivityFull) =>
              props.curDate?.isBetween(i.startTime, i.endTime) ||
              props.curDate?.isSame(i.endTime, "day"),
          )
          .map((responseAct: ActivityFull) => {
            let startTime = moment(responseAct?.startTime);
            let endTime = moment(responseAct?.endTime);
            let duration = moment.duration(endTime.diff(startTime));
            let element = document.getElementById(responseAct.id.toString());
            let height =
              element == null ? 30 : element.style.height.replace(/\D/g, "");

            const EVENT_TOP =
              startTime.hours() * HALF_HOUR_HEIGHT * 2 +
              HOUR_MARGIN_TOP +
              startTime.minutes() * 2;
            const EVENT_HEIGHT =
              duration.hours() * HALF_HOUR_HEIGHT * 2 + duration.minutes() * 2;

            return (
              <>
                <button
                  className={styles.eventBtn}
                  style={{
                    top: EVENT_TOP,
                    height: EVENT_HEIGHT,
                    borderColor:
                      // @ts-ignore
                      colorsByPriority[responseAct.priority.toString()],
                    boxShadow:
                      // @ts-ignore
                      `0px 1px 10px 0px ${colorsByPriority[responseAct.priority.toString()]} inset`,
                  }}
                  onClick={(e) => {
                    handleOpen(e, responseAct);
                  }}
                  draggable={true}
                  onDragStart={(e) => dragStartHandler(e, responseAct)}
                  onDragEnd={(e) => dragEndHandler(e, responseAct)}
                  id={responseAct.id.toString()}
                >
                  {
                    // @ts-ignore
                    Number(height) > 85 ? (
                      <div className={styles.btnWrapper}>
                        <div className={styles.btnName}>{responseAct.name}</div>
                        <div className={styles.btnTime}>
                          {moment(responseAct.startTime).format("HH:mm")} -{" "}
                          {moment(responseAct.endTime).format("HH:mm")}
                        </div>
                        <div className={styles.btnDescription}>
                          {responseAct.description}
                        </div>
                      </div>
                    ) : (
                      <div className={styles.btnWrapper}>
                        <div className={styles.btnName}>{responseAct.name}</div>
                      </div>
                    )
                  }
                </button>
              </>
            );
          })}

        {/*<div>*/}
        {/*    <Modal*/}
        {/*        open={open}*/}
        {/*        onClose={handleClose}*/}
        {/*        onClick={(e) => e.stopPropagation()}*/}
        {/*    >*/}
        {/*        <Box className={styles.modal}>*/}
        {/*            <h2>Редактировать</h2>*/}
        {/*            <TextField id="outlined-basic" label="Название" variant="outlined"*/}
        {/*                       defaultValue={name}*/}
        {/*                       onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}/>*/}
        {/*            <TextField id="outlined-basic" label="Описание" variant="outlined"*/}
        {/*                       defaultValue={description}*/}
        {/*                       onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDescription(e.target.value)}/>*/}
        {/*            <TextField*/}
        {/*                id="outlined-select-currency"*/}
        {/*                select*/}
        {/*                label="Адрес"*/}
        {/*                defaultValue={locationIdForModal}*/}
        {/*                helperText="Адрес"*/}
        {/*            >*/}
        {/*                {props.locations.map((location: Location) => (*/}
        {/*                    <MenuItem key={location.address} value={location.id}>*/}
        {/*                        {location.address}*/}
        {/*                    </MenuItem>*/}
        {/*                ))}*/}
        {/*            </TextField>*/}
        {/*            <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale="de">*/}
        {/*                <DemoContainer components={['TimePicker']}>*/}
        {/*                    <TimePicker label="Время начала" defaultValue={timeFromForModal}*/}
        {/*                                onChange={(newValue) => setTimeFromForModal(newValue)}/>*/}
        {/*                </DemoContainer>*/}
        {/*                <DemoContainer components={['TimePicker']}>*/}
        {/*                    <TimePicker label="Время конца" defaultValue={timeToForModal}*/}
        {/*                                onChange={(newValue) => setTimeToForModal(newValue)}/>*/}
        {/*                </DemoContainer>*/}
        {/*            </LocalizationProvider>*/}
        {/*            <TextField id="outlined-basic" label="Количество фотографов" variant="outlined"*/}
        {/*                       onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCountPhotographers(e.target.value)}/>*/}
        {/*            <TextField id="outlined-basic" label="Приоритет" variant="outlined"*/}
        {/*                       defaultValue={priority}*/}
        {/*                       onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPriority(e.target.value)}/>*/}
        {/*            <TextField id="outlined-basic" label="Время съемки" variant="outlined"*/}
        {/*                       onChange={(e: React.ChangeEvent<HTMLInputElement>) => setShootingTime(e.target.value)}/>*/}
        {/*            <TextField id="outlined-basic" label="Тип съемки" variant="outlined"*/}
        {/*                       onChange={(e: React.ChangeEvent<HTMLInputElement>) => setShootingType(e.target.value)}/>*/}
        {/*            <TextField id="outlined-basic" label="Важные персоны" variant="outlined"*/}
        {/*                       onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPersons(e.target.value)}/>*/}
        {/*            <Button onClick={handleUpdateActivity}>Сохранить</Button>*/}
        {/*            <Button onClick={handleDeleteActivity}>Удалить</Button>*/}
        {/*            /!*<ChildModal />*!/*/}
        {/*        </Box>*/}
        {/*    </Modal>*/}
        {/*</div>*/}
      </div>
    </>
  );
}
