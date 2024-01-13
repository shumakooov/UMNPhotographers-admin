import { useState, useEffect } from "react";
import {
  CircularProgress,
  TextField,
  Box,
  Typography,
  Tabs,
  Tab,
  IconButton,
  Grid,
  Checkbox,
  FormControlLabel,
  Select,
  MenuItem,
} from "@mui/material";
import "./profile-photographer-page.css";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../store/store";
import {
  receiveUserById,
  changeUserInfo,
} from "../../../store/photographerSlice";
import ErrorPage from "../../errorPage/error-page";
import ShareIcon from "@mui/icons-material/Share";
import SettingsBackupRestoreIcon from "@mui/icons-material/SettingsBackupRestore";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import SaveIcon from "@mui/icons-material/Save";

const columns: GridColDef[] = [
  { field: "event", headerName: "Мероприятие", width: 150 },
  { field: "importance", headerName: "Сложность", width: 150 },
  { field: "evaluation", headerName: "Оценка работы", width: 150 },
];

const rows: GridRowsProp = [
  { id: 1, event: "гиккон", importance: "10", evaluation: "100" },
  { id: 2, event: "гиккон", importance: "10", evaluation: "100" },
  { id: 3, event: "гиккон", importance: "10", evaluation: "100" },
];

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
  score: number | null;
  status: "created" | "blocked" | "approved";
  registrationDate: string;
  description: string | null;
  trainee: boolean;
  portfolio: string | null;
  techniqueInfoId: number;
};

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      style={{ flex: 7 }}
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && children}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

export default function ProfilePhotographerPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const photographerProfileInfo = useSelector(
    (state: any) => state.photographer.photographerProfileInfo
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
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    dispatch(receiveUserById(id)).then(() => {
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    if (Boolean(photographerProfileInfo)) {
      setUserData(photographerProfileInfo);
    }
  }, [photographerProfileInfo]);

  const [value, setValue] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleChange = (event: any) => {
    const target = event.target;

    if (target.name === "trainee") {
      console.log(target.checked);

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

  const handleSubmit = () => {
    const { registrationDate, techniqueInfoId, ...formData } = userData;
    dispatch(changeUserInfo(formData));
    navigate("/photographers");
  };

  if (isLoading) {
    return (
      <Box
        sx={{
          height: "90vh",
          display: {
            xs: "flex",
            justifyContent: "center",
            alignItems: "center",
          },
        }}
      >
        <CircularProgress color="primary" />
      </Box>
    );
  }

  if (!Object.hasOwn(photographerProfileInfo, "surname")) {
    return <ErrorPage />;
  }

  return (
    <div className="profile-wrapper">
      <div className="aside">
        <div className="aside-container shadow-container">
          {/* <div className="aside-container__header">
            <Typography variant="h5">Профиль пользователя</Typography>
            <Typography variant="h5" color="primary">
              {userData.surname} {userData.firstname}
            </Typography>
          </div> */}
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={value}
            onChange={handleTabChange}
            aria-label="Vertical tabs"
            sx={{
              borderRight: 1,
              borderColor: "divider",
            }}
          >
            <Tab
              sx={{ alignItems: "flex-end" }}
              label="О фотографе"
              {...a11yProps(0)}
            />
            <Tab
              sx={{ alignItems: "flex-end" }}
              label="Опыт"
              {...a11yProps(1)}
            />
          </Tabs>
        </div>
      </div>
      <TabPanel value={value} index={0}>
        <div className="profile">
          <div className="profile__actions shadow-container">
            <IconButton aria-label="share" disabled>
              <ShareIcon />
            </IconButton>
            <IconButton
              aria-label="save"
              color="primary"
              onClick={handleSubmit}
            >
              <SaveIcon />
            </IconButton>
            <IconButton aria-label="reset" disabled>
              <SettingsBackupRestoreIcon />
            </IconButton>
            <IconButton color="error" aria-label="delete user" disabled>
              <DeleteForeverIcon />
            </IconButton>
          </div>
          <div className="user-info shadow-container">
            <Grid
              container
              spacing="34px"
              direction="column"
              sx={{ height: "727px" }}
            >
              <Grid item xs={6}>
                <div className="user-info__avatar shadow-container"></div>
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
                    name="surname"
                    value={userData.middleName}
                    onChange={handleChange}
                  />
                  <Typography sx={{ paddingLeft: "10px" }}>
                    <span style={{ opacity: 0.8 }}>Зарегестрирован:</span>{" "}
                    <br />
                    {userData.registrationDate}
                  </Typography>
                </div>
              </Grid>
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
                    id="outlined-multiline-static"
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
                    <MenuItem value="created">Создан</MenuItem>
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
                </div>
              </Grid>
              <Grid item>
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
                  <Typography sx={{ paddingLeft: "10px" }}>
                    <span style={{ opacity: 0.8 }}>Дата рождения:</span> <br />
                    {userData.birthdate}
                  </Typography>
                </div>
              </Grid>
            </Grid>
          </div>
        </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <div className="shadow-container">
          <DataGrid
            sx={{ borderRadius: "10px" }}
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10]}
            checkboxSelection
          />
        </div>
      </TabPanel>
    </div>
  );
}
