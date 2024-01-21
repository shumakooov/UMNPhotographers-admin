import { useState, useEffect } from "react";
import {
  TextField,
  Box,
  Typography,
  IconButton,
  Grid,
  Checkbox,
  FormControlLabel,
  Select,
  MenuItem,
} from "@mui/material";
import "./index.css";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../store/store";
import {
  receiveUserById,
  changeUserInfo,
} from "../../../store/photographerSlice";
import ShareIcon from "@mui/icons-material/Share";
import SettingsBackupRestoreIcon from "@mui/icons-material/SettingsBackupRestore";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import SaveIcon from "@mui/icons-material/Save";
import WrapperWithActions from "../../../components/ui/wrapperWithActions/wrapper-with-actions";

type userInfo = {
  id: number;
  email: string;
  firstname: string;
  surname: string;
  middleName: string;
  birthdate: string;
  phone: string;
  contacts:
    | {
        vk: string | null;
        tg: string | null;
      }
    | null
    | any;
  score: number;
  status: "created" | "blocked" | "approved";
  registrationDate: string;
  description: string | null;
  trainee: boolean;
  portfolio: string | null;
  techniqueInfoId: number;
};

export default function AboutPhotographer() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const photographerProfileInfo = useSelector(
    (state: any) => state.photographer.photographerProfileInfo,
  );
  const [userData, setUserData] = useState<userInfo>({
    id: 0,
    email: "",
    firstname: "",
    surname: "",
    middleName: "",
    birthdate: "",
    phone: "",
    contacts: {
      vk: "",
      tg: "",
    },
    score: 0,
    status: "created",
    registrationDate: "",
    description: "",
    trainee: true,
    portfolio: "",
    techniqueInfoId: 0,
  });

  const handleChange = (event: any) => {
    const target = event.target;

    if (target.name === "trainee") {
      setUserData({
        ...userData,
        trainee: target.checked,
      });

      return;
    }

    if (target.name === "vk" || target.name === "tg") {
      setUserData({
        ...userData,
        contacts: { ...userData.contacts, [target.name]: target.value },
      });

      return;
    }

    setUserData({
      ...userData,
      [target.name]: target.value,
    });
  };

  const handleSave = () => {
    const { registrationDate, techniqueInfoId, ...formData } = userData;
    dispatch(changeUserInfo(formData));
  };

  useEffect(() => {
    if (Boolean(photographerProfileInfo)) {
      setUserData(photographerProfileInfo);
    }
  }, [photographerProfileInfo]);

  return (
    <WrapperWithActions
      actions={
        <>
          <IconButton aria-label="share" color="primary">
            <ShareIcon />
          </IconButton>
          <IconButton aria-label="reset" color="primary">
            <SettingsBackupRestoreIcon />
          </IconButton>
          <IconButton
            aria-label="save"
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
            onClick={handleSave}
          >
            <SaveIcon />
          </IconButton>
          <IconButton
            aria-label="delete user"
            sx={{
              color: "#FFF",
              backgroundColor: "#D32F2F",
              borderRadius: "4px",
              "&:hover": {
                color: "#FFF",
                backgroundColor: "#D32F2F",
                opacity: 0.8,
                transition: "opacity 0.3s",
              },
            }}
          >
            <DeleteForeverIcon />
          </IconButton>
        </>
      }
    >
      <Grid container spacing="34px" sx={{ padding: "34px" }}>
        <Grid
          item
          container
          direction="column"
          xs={3}
          spacing="34px"
          wrap="nowrap"
        >
          <Grid item xs={6}>
            <Box
              component="img"
              className="user-info__avatar shadow-container"
              sx={{
                width: "100%",
              }}
              alt="The house from the offer."
              src="/empty-avatar.jpg"
            />
          </Grid>
          <Grid item>
            <div className="form-container shadow-container">
              <TextField
                required
                id="outlined-required"
                label="Фамилия"
                name="surname"
                value={userData.surname}
                onChange={handleChange}
              />
              <TextField
                required
                id="outlined-required"
                label="Имя"
                name="firstname"
                value={userData.firstname}
                onChange={handleChange}
              />
              <TextField
                id="outlined-required"
                label="Отчество"
                name="middleName"
                value={userData.middleName}
                onChange={handleChange}
              />
              <Box
                sx={{
                  padding: "0 10px",
                  display: {
                    xs: "flex",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                  },
                }}
              >
                <Typography>
                  <span style={{ opacity: 0.8 }}>Дата рождения:</span> <br />
                  {userData.birthdate}
                </Typography>
                <Typography>
                  <span style={{ opacity: 0.8 }}>Зарегестрирован:</span> <br />
                  {userData.registrationDate}
                </Typography>
              </Box>
            </div>
          </Grid>
        </Grid>
        <Grid item container direction="column" xs={4} spacing="34px">
          <Grid item>
            <div className="form-container shadow-container">
              <Typography variant="h6">Контакты</Typography>
              <TextField
                label="Телефона"
                name="phone"
                value={userData.phone}
                onChange={handleChange}
              />
              <TextField
                label="VK"
                name="vk"
                value={userData.contacts?.vk}
                onChange={handleChange}
              />
              <TextField
                label="Telegram"
                name="tg"
                value={userData.contacts?.tg}
                onChange={handleChange}
              />
              <TextField
                label="yandex.mail"
                name="email"
                value={userData.email}
                onChange={handleChange}
              />
            </div>
          </Grid>
          <Grid item>
            <div className="form-container shadow-container">
              <Typography variant="h6">Статус</Typography>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={userData.status}
                name="status"
                onChange={handleChange}
              >
                <MenuItem value="approved">Активен</MenuItem>
                <MenuItem value="blocked">Заблокирован</MenuItem>
                <MenuItem value="created">Не подтвержден</MenuItem>
              </Select>
              <FormControlLabel
                control={
                  <Checkbox
                    name="trainee"
                    checked={userData.trainee}
                    onChange={handleChange}
                  />
                }
                label="Практикант"
              />
              <TextField
                label="Калибровочный уровень фотографа"
                name="score"
                value={userData.score === 0 ? "" : userData.score}
                onChange={handleChange}
              />
            </div>
          </Grid>
        </Grid>
        <Grid item xs={5}>
          <div className="form-container shadow-container">
            <Typography variant="h6">Краткая характеристика</Typography>
            <TextField
              id="outlined-multiline-static"
              label="Описание фотографа"
              name="description"
              multiline
              rows={6}
              value={userData.description}
              onChange={handleChange}
            />
            <TextField
              id="outlined-required"
              label="Портфолио"
              name="portfolio"
              value={userData.portfolio}
              onChange={handleChange}
            />
          </div>
        </Grid>
      </Grid>
    </WrapperWithActions>
  );
}
