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
import * as React from "react";
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
import WrapperWithActions from "../../../components/ui/wrapperWithActions/wrapper-with-actions";
import { IconButton, MenuItem } from "@mui/material";
import ViewColumnIcon from "@mui/icons-material/ViewColumn";
import FilterListIcon from "@mui/icons-material/FilterList";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import AddIcon from "@mui/icons-material/Add";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDateTimePicker } from "@mui/x-date-pickers/MobileDateTimePicker";
import { DesktopDateTimePicker } from "@mui/x-date-pickers/DesktopDateTimePicker";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import styles from "./events-page.module.css";
import moment, { Moment } from "moment";
import { TIMEZONES } from "../../../timezones";

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
  const [name, setName] = React.useState<string>("");
  const [description, setDescription] = React.useState<string>("");
  const [place, setPlace] = React.useState<string>("");
  const [difficult, setDifficult] = React.useState<string>("");
  const [timezone, setTimezone] = React.useState<string>("");
  const [driveLink, setDriveLink] = React.useState<string>("");
  const [photographersCount, setPhotographersCount] = React.useState<number>();
  const [published, setPublished] = React.useState<boolean>();
  const [startTime, setStartTime] = React.useState<Moment | null>();
  const [endTime, setEndTime] = React.useState<Moment | null>();

  const [events, setEvents] = useState<Event[]>([]);
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>(
    {},
  );

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
    { field: "id", headerName: "ID", width: 30 },
    {
      field: "name",
      headerName: "Название мероприятия",
      width: 170,
      editable: true,
    },
    {
      field: "lvl",
      headerName: "Важность мероприятия",
      width: 150,
      editable: true,
    },
    {
      field: "startTime",
      headerName: "Время начала",
      width: 200,
      editable: true,
    },
    {
      field: "endTime",
      headerName: "Время окончания",
      width: 200,
      editable: true,
    },
    {
      field: "address",
      headerName: "Место проведения",
      width: 170,
      editable: true,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
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
        const eventsTemp: Event[] = [];
        await axios
          //TODO: захардкодил ссылку
          .get(`https://photographersekb.ru:8080/admin/event/all`, {
            withCredentials: true,
          })
          .then((res) => {
            res.data.list.map((e: any) =>
              eventsTemp.push({
                id: e.id,
                address: e.address,
                startTime: e.startTime,
                endTime: e.endTime,
                lvl: e.level,
                name: e.name,
              }),
            );
          });
        setEvents(eventsTemp);
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
    <WrapperWithActions
      actions={
        <>
          <IconButton aria-label="share" color="primary">
            <ViewColumnIcon />
          </IconButton>
          <IconButton aria-label="reset" color="primary">
            <FilterListIcon />
          </IconButton>
          <IconButton aria-label="save" color="primary">
            <SaveAltIcon />
          </IconButton>
          <ModalCED
            name={"Добавить мероприятие"}
            variant="iconbutton"
            icon={<AddIcon />}
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
        </>
      }
      p="16px 64px"
    >
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={events}
          columns={columns}
          onRowClick={useHandleRowClick}
          editMode="row"
          rowModesModel={rowModesModel}
          onRowModesModelChange={handleRowModesModelChange}
          onRowEditStop={handleRowEditStop}
          processRowUpdate={processRowUpdate}
          slotProps={{
            toolbar: { setEvents, setRowModesModel },
          }}
        />
      </div>
    </WrapperWithActions>
  );
}
