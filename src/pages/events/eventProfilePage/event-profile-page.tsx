import { useState, useEffect } from "react";
import WrapperWithActions from "../../../components/ui/wrapperWithActions/wrapper-with-actions";
import {
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";
import SaveIcon from "@mui/icons-material/Save";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import FormControl from "@mui/material/FormControl";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useParams } from "react-router-dom";
import EventController from "../../../api/eventContoller";
import { Event } from "../../../types/event";
import styles from "./event-profile-page.module.css";
import { useDispatch } from "react-redux";
import { changeEvent } from "../../../store/eventSlice";
import { AppDispatch } from "../../../store/store";
import { useNavigate } from "react-router-dom";

const levels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const columnsPhotographers: GridColDef[] = [
  {
    field: "number",
    headerName: "Номер",
  },
  {
    field: "photographer",
    headerName: "Фотограф",
    width: 400,
  },
];

const columnsManager: GridColDef[] = [
  {
    field: "number",
    headerName: "Номер",
  },
  {
    field: "manager",
    headerName: "Ответственный",
    width: 300,
  },
  {
    field: "locations",
    headerName: "Количество локаций",
    width: 150,
  },
];

const rowsManager = [
  {
    id: 1,
    number: 1,
    manager: "Алексеев Алексей Алексеевич",
    locations: 10,
    published: false,
  },
  {
    id: 2,
    number: 2,
    manager: "Антонов Антон Антонович",
    locations: 5,
    published: true,
  },
  {
    id: 3,
    number: 1,
    manager: "Алексеев Алексей Алексеевич",
    locations: 6,
    published: false,
  },
];

export default function EventProfilePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [eventData, setEventData] = useState<Omit<Event, "id">>({
    name: "",
    level: 0,
    startTime: "",
    endTime: "",
    timeZone: "",
    address: "",
    driveLink: "",
    photographersCount: 0,
    published: false,
    description: "",
  });
  const [rowsPhotographers, setRowsPhotographers] = useState<any>([]);
  const { id: eventId } = useParams();

  const handleChange = ({ target }: { target: any }) => {
    setEventData({ ...eventData, [target.name]: target.value });
  };

  const handleSave = () => {
    if (eventId) {
      dispatch(changeEvent([eventId, eventData])).then(() => {
        navigate("/events");
      });
    }
  };

  const handleDelete = () => {
    if (eventId) {
      EventController.deleteEvent(eventId).finally(() => {
        navigate("/events");
      });
    }
  };

  useEffect(() => {
    if (eventId) {
      EventController.getEvent(eventId).then((res) => setEventData(res.data));
      Promise.all([
        EventController.getScheduleList(eventId),
        EventController.getEventZones(eventId),
      ]).then((res) => {
        const newValue = res[0].map((item) => {
          return {
            id: item.id,
            number: res[1].find((zone) => zone.id === item.zoneId)?.number ?? 0,
            photographer: `${item.surname} ${item.firstname} ${item.middleName}`,
          };
        });
        setRowsPhotographers(newValue);
      });
    }
  }, []);

  return (
    <WrapperWithActions
      actions={
        <>
          <IconButton aria-label="share" color="primary">
            <ShareIcon />
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
            onClick={handleDelete}
          >
            <DeleteForeverIcon />
          </IconButton>
        </>
      }
      p="16px 64px"
    >
      <Grid container spacing="34px" sx={{ padding: "34px" }}>
        <Grid item container direction="column" xs={3} spacing="34px">
          <Grid item>
            <div className="form-container shadow-container">
              <Typography variant="h6">Краткое описание</Typography>
              <TextField
                required
                id="outlined-required"
                label="Название"
                name="name"
                value={eventData.name}
                onChange={handleChange}
              />
              <TextField
                id="outlined-multiline-static"
                label="Описание"
                name="description"
                multiline
                rows={6}
                value={eventData.description || ""}
                onChange={handleChange}
              />
              <FormControl>
                <InputLabel>Сложность</InputLabel>
                <Select
                  id="demo-simple-select"
                  label="Сложность"
                  name="level"
                  value={eventData.level}
                  onChange={handleChange}
                >
                  {levels.map((level: number) => (
                    <MenuItem value={level} key={level}>
                      {level}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                id="outlined-required"
                label="Ссылка на диск"
                name="driveLink"
                value={eventData.driveLink || ""}
                onChange={handleChange}
              />
            </div>
          </Grid>
          <Grid item>
            <div className="form-container shadow-container">
              <Typography variant="h6">Место и время</Typography>
              <TextField
                label="Место проведения"
                name="address"
                value={eventData.address}
                onChange={handleChange}
              />
              <TextField
                label="Часовой пояс"
                name="timeZone"
                value={eventData.timeZone}
                onChange={handleChange}
              />
              <TextField
                label="Начало мероприятия"
                name="startTime"
                value={eventData.startTime}
                onChange={handleChange}
              />
              <TextField
                label="Конец мероприятия"
                name="endTime"
                value={eventData.endTime}
                onChange={handleChange}
              />
            </div>
          </Grid>
        </Grid>
        <Grid item container direction="column" xs={5} spacing="34px">
          <Grid item>
            <div
              className="shadow-container"
              style={{ display: "flex", flexDirection: "column", gap: "16px" }}
            >
              <Typography variant="h6" style={{ padding: "24px 22px 0" }}>
                Фотографы/зоны
              </Typography>
              <div style={{ height: "371px" }}>
                <DataGrid
                  columns={columnsPhotographers}
                  rows={rowsPhotographers}
                  initialState={{
                    pagination: {
                      paginationModel: {
                        pageSize: 5,
                      },
                    },
                  }}
                  pageSizeOptions={[5]}
                  checkboxSelection
                />
              </div>
            </div>
          </Grid>
          <Grid item>
            <div
              className="shadow-container"
              style={{ display: "flex", flexDirection: "column", gap: "16px" }}
            >
              <Typography variant="h6" style={{ padding: "24px 22px 0" }}>
                Зоны/ответственные
              </Typography>
              <div style={{ height: "371px" }}>
                <DataGrid
                  columns={columnsManager}
                  rows={rowsManager}
                  checkboxSelection
                  initialState={{
                    pagination: {
                      paginationModel: {
                        pageSize: 5,
                      },
                    },
                  }}
                  pageSizeOptions={[5]}
                />
              </div>
            </div>
          </Grid>
        </Grid>
        <Grid item xs={4}>
          <div className="form-container shadow-container">
            <Typography variant="h6">Краткая сводка</Typography>
            <div
              style={{
                display: "flex",
                gap: "16px",
                flexDirection: "column",
                paddingLeft: "5px",
              }}
            >
              <Typography>Количество фотографов: 34</Typography>
              <Typography>Количество зон: 16</Typography>
              <Typography>Количество локаций: 70</Typography>
              <Typography>Количество активностей: 700</Typography>
              <Typography>Общие трудозатраты: 150 чел/час</Typography>
            </div>
          </div>
        </Grid>
      </Grid>
    </WrapperWithActions>
  );
}
