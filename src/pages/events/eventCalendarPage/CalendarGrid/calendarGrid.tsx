import React from "react";
import styles from "./calendarGrid.module.css";
import PlaceGrid from "../Place/placeGrid";
import PlaceHeader from "../PlaceHeader/placeHeader";
import axios from "axios";
import { HALF_HOUR_HEIGHT, HOUR_MARGIN_TOP } from "../globals";
import moment, { Moment } from "moment";
import {
  Box,
  Button,
  IconButton,
  MenuItem,
  Modal,
  TextField,
} from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { TimePicker } from "@mui/x-date-pickers";
import "moment/locale/de";
import { useNavigate } from "react-router-dom";
import { Location } from "../../../../store/locationSlice";
import { Activity } from "../../../../store/activitySlice";
import CreateTimelineDrawer from "../../../../components/createTimeLineDrawer/create-timeline-drawer";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import AddTaskIcon from "@mui/icons-material/AddTask";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import ShareIcon from "@mui/icons-material/Share";

export default function CalendarGrid({ props }: any) {
  const time = [];
  for (let i = 0; i < 24; i++) {
    for (let j = 0; j < 2; j++) {
      time.push(`${i}:${j === 0 ? `00` : 30 * j}`);
    }
  }

  const hourNow = moment().hour();
  const minutesNow = moment().minutes();
  const TIME_NOW_TOP =
    hourNow * HALF_HOUR_HEIGHT * 2 + HOUR_MARGIN_TOP + minutesNow * 2;

  //for modal start
  const [openModal, setOpenModal] = React.useState(false);
  const [locationIdForModal, setLocationIdForModal] = React.useState<number>();
  const [zoneIdForModal, setZoneIdForModal] = React.useState<number | null>();
  const handleOpenModal = (e: any, id: number) => {
    e.stopPropagation();
    e.preventDefault();
    handleTopByMouse(e);
    setLocationIdForModal(id);
    let ta = props.items.find((activity: any) => activity.locationId === id);
    setZoneIdForModal(ta?.zoneId);
    setOpenModal(true);
  };
  const handleCloseModal = (e: any) => {
    e.stopPropagation();
    setOpenModal(false);
  };

  const handleTopByMouse = (event: any) => {
    let hours = Math.floor(
      (event.clientY - HOUR_MARGIN_TOP + window.scrollY) /
        (HALF_HOUR_HEIGHT * 2),
    );
    let minutesFull =
      (event.clientY - HOUR_MARGIN_TOP + window.scrollY) %
      (HALF_HOUR_HEIGHT * 2);
    let minutesMultipleTen = minutesFull - (minutesFull % 10);

    let time = moment(
      hours.toString() + ":" + minutesMultipleTen.toString(),
      "HH:mm",
    );

    setTimeFromCreate(time);
    setTimeToCreate(moment(time).add(10, "m"));
  };

  const [nameCreate, setNameCreate] = React.useState<string>("");
  const [descriptionCreate, setDescriptionCreate] = React.useState<string>("");
  const [timeFromCreate, setTimeFromCreate] = React.useState<Moment | null>();
  const [timeToCreate, setTimeToCreate] = React.useState<Moment>();
  const [countPhotographers, setCountPhotographers] = React.useState<
    string | null
  >("");
  const [priority, setPriority] = React.useState<string | null>("");
  const [shootingTime, setShootingTime] = React.useState<string | null>("");
  const [shootingType, setShootingType] = React.useState<string | null>("");
  const [persons, setPersons] = React.useState<string | null>("");

  const navigate = useNavigate();

  const handleCreateActivity = async () => {
    if (true) {
      const response = await axios.post(
        `https://photographersekb.ru:8080/admin/activity`,
        {
          locationId: locationIdForModal,
          eventId: 1,
          zoneId: zoneIdForModal,
          name: nameCreate,
          description: descriptionCreate,
          startTime: timeFromCreate?.add(5, "h"),
          endTime: timeToCreate?.add(5, "h"),
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

  //drawer
  const [openDrawer, setOpenDrawer] = React.useState(false);
  const toggleDrawer = (newOpen: boolean) => () => {
    setOpenDrawer(newOpen);
  };

  return (
    <div className={styles.root}>
      <div className={styles.wrapperZones}>
        <div className={styles.actions}>
          <IconButton
            aria-label="add location"
            color="primary"
            onClick={toggleDrawer(true)}
          >
            <AddLocationAltIcon />
          </IconButton>
          <IconButton aria-label="add task" color="primary">
            <AddTaskIcon />
          </IconButton>
          <IconButton aria-label="save" color="primary">
            <SaveAltIcon />
          </IconButton>
          <IconButton
            aria-label="share"
            color="primary"
            sx={{
              color: "#FFF",
              backgroundColor: "#2196F3",
              borderRadius: "4px",
              "&:hover": {
                color: "#FFF",
                backgroundColor: "#2196F3",
                opacity: 0.8,
                transition: "opacity 0.3s",
              },
            }}
          >
            <ShareIcon />
          </IconButton>
        </div>

        <div className={styles.gridWrapper}>
          {time.map((i) => (
            <span
              className={styles.timeItem}
              style={{ height: HALF_HOUR_HEIGHT }}
            >
              {i}
              {/*<span className={styles.line}></span>*/}
            </span>
          ))}
          <span className={styles.timeNow} style={{ top: TIME_NOW_TOP }}></span>
        </div>

        <div className={styles.zones}>
          {props.locations.map((location: Location) => {
            const tempActivitiesByLocation = props.items.filter(
              (activity: Activity) => activity.locationId === location.id,
            );

            if (tempActivitiesByLocation.length > 0) {
              return (
                <div key={location.id} className={styles.timeLine}>
                  <PlaceHeader
                    props={{
                      location: location,
                      tempActivitiesByLocation: tempActivitiesByLocation,
                      zones: props.zones,
                    }}
                    className={styles.header}
                  />
                  <PlaceGrid
                    props={{
                      locationId: location.id,
                      startDate: location.startDate,
                      tempActivitiesByLocation: tempActivitiesByLocation,
                      locations: props.locations,
                      curDate: props.curDate,
                      handleOpenModal: handleOpenModal,
                    }}
                  />
                </div>
              );
            }
          })}

          {/*Drawer*/}
          <div>
            <CreateTimelineDrawer
              props={{
                zones: props.zones,
                toggleDrawer: toggleDrawer,
                openDrawer: openDrawer,
              }}
            />
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
                <TextField
                  id="outlined-basic"
                  label="Название"
                  variant="outlined"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setNameCreate(e.target.value)
                  }
                />
                <TextField
                  id="outlined-basic"
                  label="Описание"
                  variant="outlined"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setDescriptionCreate(e.target.value)
                  }
                />
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
                <LocalizationProvider
                  dateAdapter={AdapterMoment}
                  adapterLocale="de"
                >
                  <DemoContainer components={["TimePicker"]}>
                    <TimePicker
                      label="Время начала"
                      value={timeFromCreate}
                      onChange={(newValue) => setTimeFromCreate(newValue)}
                    />
                  </DemoContainer>
                  <DemoContainer components={["TimePicker"]}>
                    <TimePicker
                      label="Время конца"
                      value={timeToCreate}
                      onChange={(newValue) => setTimeToCreate(moment(newValue))}
                    />
                  </DemoContainer>
                </LocalizationProvider>
                <TextField
                  id="outlined-basic"
                  label="Количество фотографов"
                  variant="outlined"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setCountPhotographers(e.target.value)
                  }
                />
                <TextField
                  id="outlined-basic"
                  label="Приоритет"
                  variant="outlined"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setPriority(e.target.value)
                  }
                />
                <TextField
                  id="outlined-basic"
                  label="Время съемки"
                  variant="outlined"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setShootingTime(e.target.value)
                  }
                />
                <TextField
                  id="outlined-basic"
                  label="Тип съемки"
                  variant="outlined"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setShootingType(e.target.value)
                  }
                />
                <TextField
                  id="outlined-basic"
                  label="Важные персоны"
                  variant="outlined"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setPersons(e.target.value)
                  }
                />
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
