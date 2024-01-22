import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridEventListener,
  GridRowEditStopReasons,
  GridRowId,
  GridRowModel,
  GridRowModes,
  GridRowModesModel,
} from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import ModalCED from "../../../components/modalCED/modal-ced";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import { MenuItem } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDateTimePicker } from "@mui/x-date-pickers/DesktopDateTimePicker";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import styles from "./events-page.module.css";
import { TIMEZONES } from "../../../timezones";
import CustomTableToolbar from "../../../components/custom-table-toolbar";
import { Moment } from "moment";
import Loader from "../../../components/ui/Loader";

const difficults = [
  { value: 1 },
  { value: 2 },
  { value: 3 },
  { value: 4 },
  { value: 5 },
  { value: 6 },
  { value: 7 },
  { value: 8 },
  { value: 9 },
  { value: 10 },
];

const timeZones = [
  { offset: "-12:00" },
  { offset: "-11:00" },
  { offset: "-10:00" },
  { offset: "-9:00" },
  { offset: "-8:00" },
  { offset: "-7:00" },
  { offset: "-6:00" },
  { offset: "-5:00" },
  { offset: "-4:00" },
  { offset: "-3:00" },
  { offset: "-2:00" },
  { offset: "-1:00" },
  { offset: "00:00" },
  { offset: "+01:00" },
  { offset: "+02:00" },
  { offset: "+03:00" },
  { offset: "+04:00" },
  { offset: "+05:00" },
  { offset: "+06:00" },
  { offset: "+07:00" },
  { offset: "+08:00" },
  { offset: "+09:00" },
  { offset: "+10:00" },
  { offset: "+11:00" },
  { offset: "+12:00" },
  { offset: "+13:00" },
  { offset: "+14:00" },
];

interface Event {
  id: number;
  address: string | null;
  startTime: string | null;
  endTime: string | null;
  name: string | null;
  lvl: number | null;
}

export default function EventsPage() {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [place, setPlace] = useState<string>("");
  const [difficult, setDifficult] = useState<string>("");
  const [timezone, setTimezone] = useState<string>("");
  const [driveLink, setDriveLink] = useState<string>("");
  const [photographersCount, setPhotographersCount] = useState<number>();
  const [published, setPublished] = useState<boolean>();
  const [startTime, setStartTime] = useState<Moment | null>();
  const [endTime, setEndTime] = useState<Moment | null>();
  const [isLoading, setIsLoadging] = useState<boolean>(true);

  const [events, setEvents] = useState<Event[]>([]);
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});

  const handleRowEditStop: GridEventListener<"rowEditStop"> = (
    params,
    event,
  ) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id: GridRowId, row: any) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleDeleteClick = (id: GridRowId) => async () => {
    const response = await axios.delete(
      `https://photographersekb.ru:8080/admin/event/${id}`,
      { withCredentials: true },
    );

    if (response.status === 200) {
      navigate(0);
    }
  };

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    console.log("handle cancel click");
  };

  const handleSaveClick = (id: GridRowId, row: any) => () => {
    setName(row.name);
    setDifficult(row.level);
    setStartTime(row.startTime);
    setEndTime(row.endTime);
    setTimezone(row.timeZone);
    setPlace(row.address);
    setDriveLink(row.driveLink);
    setPublished(row.published);
    setPhotographersCount(row.photographersCount);
    setDescription(row.description);
    console.log("save click");
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  //TODO: доделать запрос, не хватает данных
  const processRowUpdate = (newRow: GridRowModel) => {
    const updatedRow = { ...newRow, isNew: false };
    console.log(newRow);
    console.log("process row update");
    setName(newRow.name);
    setDifficult(newRow.level);
    setStartTime(newRow.startTime);
    setEndTime(newRow.endTime);
    setTimezone(newRow.timeZone);
    setPlace(newRow.address);
    setDriveLink(newRow.driveLink);
    setPublished(newRow.published);
    setPhotographersCount(newRow.photographersCount);
    setDescription(newRow.description);

    handleUpdateEvent(newRow.id);
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "Название мероприятия",
      width: 196,
      editable: true,
    },
    {
      field: "lvl",
      headerName: "Важность мероприятия",
      width: 196,
      editable: true,
    },
    {
      field: "startTime",
      headerName: "Время начала",
      width: 196,
      editable: true,
      valueFormatter: (params) => {
        const date = new Date(params.value);
        return date.toLocaleString();
      },
    },
    {
      field: "endTime",
      headerName: "Время окончания",
      width: 196,
      editable: true,
      valueFormatter: (params) => {
        const date = new Date(params.value);
        return date.toLocaleString();
      },
    },
    {
      field: "address",
      headerName: "Место проведения",
      width: 196,
      editable: true,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Действия",
      width: 196,
      cellClassName: "actions",
      getActions: ({ id, row }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: "primary.main",
              }}
              onClick={handleSaveClick(id, row)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }
        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id, row)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  const navigate = useNavigate();
  const useHandleRowClick = (params: any) => {
    navigate(`/events/${params.id}`);
  };

  useEffect(() => {
    const getData = async () => {
      try {
        await axios
          //TODO: захардкодил ссылку
          .get(`https://photographersekb.ru:8080/admin/event/all`, {
            withCredentials: true,
          })
          .then((res) =>
            res.data.list.map((e: any) => ({
              id: e.id,
              address: e.address,
              startTime: e.startTime,
              endTime: e.endTime,
              lvl: e.level,
              name: e.name,
            })),
          )
          .then((res: Event[]) => {
            setEvents(res);
            setIsLoadging(false);
          });
      } catch (e) {
        console.error(e);
      }
    };

    getData();
  }, []);

  const handleUpdateEvent = async (id: number) => {
    if (true) {
      const response = await axios.put(
        `https://photographersekb.ru:8080/admin/event/${id}`,
        {
          name: name,
          level: difficult,
          startTime: startTime?.add(5, "h"),
          endTime: endTime?.add(5, "h"),
          timeZone: timezone,
          address: place,
          driveLink: null,
          published: false,
          photographersCount: null,
          description: description,
        },
        { withCredentials: true },
      );

      if (response.status === 200) {
        // navigate(0);
      }
    }
  };

  const handleCreateEvent = async () => {
    if (true) {
      const response = await axios.post(
        `https://photographersekb.ru:8080/admin/event`,
        {
          name: name,
          level: difficult,
          startTime: startTime?.add(5, "h"),
          endTime: endTime?.add(5, "h"),
          timeZone: timezone,
          address: place,
          driveLink: null,
          published: false,
          photographersCount: null,
          description: description,
        },
        { withCredentials: true },
      );

      if (response.status === 200) {
        navigate(0);
      }
    }
  };

  return (
    <div style={{ padding: "16px 120px" }}>
      <div
        className="shadow-container"
        style={{ height: "631px", width: "100%" }}
      >
        <DataGrid
          rows={events}
          columns={columns}
          onRowClick={useHandleRowClick}
          editMode="row"
          rowModesModel={rowModesModel}
          loading={isLoading}
          onRowModesModelChange={handleRowModesModelChange}
          onRowEditStop={handleRowEditStop}
          processRowUpdate={processRowUpdate}
          style={{
            height: events.length === 0 ? "631px" : "100%",
            borderRadius: "10px",
          }}
          checkboxSelection
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          pageSizeOptions={[]}
          slots={{
            loadIcon: Loader,
            toolbar: () => (
              <CustomTableToolbar>
                <ModalCED
                  name={"Добавить мероприятие"}
                  variant="iconbutton"
                  icon={<AddIcon fontSize="small" />}
                  aria-label="add"
                  buttons={"saveOnly"}
                  onClickSave={handleCreateEvent}
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
                  <Box
                    component="form"
                    sx={{
                      "& .MuiTextField-root": { m: 1, maxWidth: "100%" },
                    }}
                    noValidate
                    autoComplete="off"
                  >
                    <div className={styles.box_style}>
                      <TextField
                        required
                        id="outlined-required"
                        label="Название мероприятия"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                      <TextField
                        id="outlined-multiline-static"
                        label="Описание"
                        multiline
                        rows={5}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      />
                      <TextField
                        id="outlined-required"
                        label="Место проведения"
                        value={place}
                        onChange={(e) => setPlace(e.target.value)}
                      />
                    </div>
                    <div className={styles.column_modal}>
                      <TextField
                        id="outlined-select-currency"
                        select
                        label="Сложность"
                        fullWidth
                        value={difficult}
                        onChange={(e) => setDifficult(e.target.value)}
                      >
                        {difficults.map((value) => (
                          <MenuItem key={value.value} value={value.value}>
                            {value.value}
                          </MenuItem>
                        ))}
                      </TextField>
                      <TextField
                        id="outlined-select-currency"
                        select
                        label="Часовой пояс"
                        fullWidth
                        value={timezone}
                        onChange={(e) => setTimezone(e.target.value)}
                      >
                        {TIMEZONES.map((value) => (
                          <MenuItem key={value.offset} value={value.name}>
                            {value.offset + " " + value.name}
                          </MenuItem>
                        ))}
                      </TextField>
                    </div>
                    <div>
                      <LocalizationProvider
                        dateAdapter={AdapterMoment}
                        adapterLocale="en-gb"
                      >
                        <div className={styles.column_modal}>
                          <DesktopDateTimePicker
                            ampm={false}
                            label={"Начало мероприятия"}
                            value={startTime}
                            onChange={(newValue) => setStartTime(newValue)}
                          />
                          <DesktopDateTimePicker
                            ampm={false}
                            label={"Конец мероприятия"}
                            value={endTime}
                            onChange={(newValue) => setEndTime(newValue)}
                          />
                        </div>
                      </LocalizationProvider>
                    </div>
                  </Box>
                </ModalCED>
              </CustomTableToolbar>
            ),
          }}
          slotProps={{
            toolbar: { setEvents, setRowModesModel },
          }}
        />
      </div>
    </div>
  );
}
