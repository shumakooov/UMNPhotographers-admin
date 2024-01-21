import React from "react";
import styles from "./placeHeader.module.css";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import { Zone } from "../../../../store/zoneSlice";
import {
  Box,
  Button,
  IconButton,
  MenuItem,
  Modal,
  TextField,
} from "@mui/material";
import { Location } from "../../../../store/locationSlice";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { TimePicker } from "@mui/x-date-pickers";
import moment from "moment/moment";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

export default function PlaceHeader({ props }: any) {
  const zone = props.zones.find(
    (zone: Zone) => zone.id === props.location.zoneId,
  );

  const [openModal, setOpenModal] = React.useState(false);
  const [locationIdForModal, setLocationIdForModal] = React.useState<number>();
  const [zoneIdForModal, setZoneIdForModal] = React.useState<number | null>();
  const [placeName, setPlaceName] = React.useState<string>("");
  const [zoneNumber, setZoneNumber] = React.useState<string>("");

  const handleOpenModal = (e: any) => {
    e.stopPropagation();
    e.preventDefault();
    setLocationIdForModal(props.location.id);
    setZoneIdForModal(zone.id);
    setPlaceName(props.location.address);
    setZoneNumber(zone.number);
    setOpenModal(true);
  };
  const handleCloseModal = (e: any) => {
    e.stopPropagation();
    setOpenModal(false);
  };

  const navigate = useNavigate();

  const handleUpdateZoneAndLocation = async () => {
    const response1 = await axios.put(
      `https://photographersekb.ru:8080/admin/zone/${zoneIdForModal}`,
      {
        number: Number(zoneNumber),
        description: zone.description,
        manager: zone.manager,
      },
      { withCredentials: true },
    );

    const response2 = await axios.put(
      `https://photographersekb.ru:8080/admin/location/${locationIdForModal}`,
      {
        name: props.location.name,
        description: props.location.description,
        startDate: props.location.startDate,
        startTime: props.location.startTime,
        endTime: props.location.endTime,
        address: placeName,
        manager: props.location.manager,
        zoneId: Number(zoneIdForModal),
      },
      { withCredentials: true },
    );

    if (response1.status === 200 || response2.status === 200) {
      navigate(0);
    }
  };

  const handleDeleteZoneAndLocation = async () => {
    const response2 = await axios.delete(
      `https://photographersekb.ru:8080/admin/location/${locationIdForModal}`,
      { withCredentials: true },
    );

    if (response2.status === 200) {
      navigate(0);
    }
  };

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <div>
            <div className={styles.zone}>Зона {zone?.number}</div>
            <div className={styles.place}>{props.location.address}</div>
          </div>
          <IconButton className={styles.btnInfo} onClick={handleOpenModal}>
            <InfoOutlinedIcon />
          </IconButton>
        </div>
      </div>

      {/*modal*/}
      <div>
        <Modal
          open={openModal}
          onClose={handleCloseModal}
          aria-labelledby="parent-modal-title"
          aria-describedby="parent-modal-description"
        >
          <Box className={styles.modal}>
            <h2>Редактировать линию активности</h2>
            <TextField
              id="outlined-basic"
              label="Название точки места"
              variant="outlined"
              defaultValue={props.location.address}
              margin="dense"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPlaceName(e.target.value)
              }
            />
            <TextField
              id="outlined-basic"
              helperText="Только числа от 1 до 1000"
              label="Зона"
              defaultValue={zone?.number}
              margin="dense"
              variant="outlined"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setZoneNumber(e.target.value)
              }
            />
            <Button onClick={handleUpdateZoneAndLocation}>Сохранить</Button>
            <Button onClick={handleDeleteZoneAndLocation}>Удалить</Button>
            {/*<ChildModal />*/}
          </Box>
        </Modal>
      </div>
    </>
  );
}
