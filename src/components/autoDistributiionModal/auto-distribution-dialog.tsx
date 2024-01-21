import { useState, useEffect, useRef } from "react";
import {
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Snackbar,
  Alert,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import AlarmOnIcon from "@mui/icons-material/AlarmOn";
import {
  DataGrid,
  GridColDef,
  GridRowClassNameParams,
  GridRowSelectionModel,
} from "@mui/x-data-grid";
import styles from "./auto-distribution-dialog.module.css";
import { useParams } from "react-router-dom";
import Loader from "../ui/Loader";
import EventController from "../../api/eventContoller";

type Row = {
  id: number;
  priority: number;
  photographer: string;
  isApproved: boolean;
};

const style = {
  display: "flex",
  flexDirection: "column",
  gap: "16px",
};

const rowColor = (params: GridRowClassNameParams<Row>): any => {
  if (params.row.isApproved) {
    return styles.blue;
  }

  if (params.row.priority === 1) {
    return styles.red;
  }

  if (params.row.priority === 2) {
    return styles.yellow;
  }

  if (params.row.priority === 3) {
    return styles.green;
  }
};

const zonesId = ["1", "2", "3", "4"];

const columns: GridColDef[] = [
  {
    field: "priority",
    headerName: "Приоритет",
    width: 110,
  },
  {
    field: "photographer",
    headerName: "Ответственный",
    width: 220,
  },
];

export default function AutoDistributionDialog() {
  const { id: eventId } = useParams();
  const [isVisibleDialog, setIsVisibleDialog] = useState<boolean>(false);
  const [selectedZoneId, setSelectedZoneId] = useState<string>(zonesId[0]);
  const [zones, setZones] = useState<any>([]);
  const [rows, setRows] = useState<any>([]);
  const [isLoadingZones, setIsLoadingZones] = useState<boolean>(true);
  const [isLoadingPriority, setIsLoadingPriority] = useState<boolean>(true);
  const [isLoadingCheck, setIsLoadingCheck] = useState<boolean>(false);
  const [isLoadingDistribute, setIsLoadingDistribute] =
    useState<boolean>(false);
  const [rowSelectionModel, setRowSelectionModel] =
    useState<GridRowSelectionModel>([]);
  const [isVisibleSnackbar, setIsVisibleSnackbar] = useState<boolean>(false);

  const checkResultRef = useRef<any>(null);

  const changeVisibleModal = () => {
    setIsVisibleDialog(!isVisibleDialog);
  };

  const handleSelectZone = (event: SelectChangeEvent) => {
    setRowSelectionModel([]);
    setSelectedZoneId(event.target.value);
  };

  const handleSelectPhotographer = (
    newRowSelectionModel: GridRowSelectionModel,
  ) => {
    setRowSelectionModel(newRowSelectionModel);
  };

  const changeVisibleSnackbar = () => {
    setIsVisibleSnackbar(!isVisibleSnackbar);
  };

  const handleCheck = () => {
    if (rowSelectionModel.length !== 0) {
      setIsLoadingCheck(true);
      EventController.checkDistribution({
        eventId: Number(eventId),
        zoneId: Number(selectedZoneId),
        photographers: rowSelectionModel.map((id) => Number(id)),
      })
        .then((res) => {
          checkResultRef.current = { arrayId: rowSelectionModel, ...res };
          changeVisibleSnackbar();
        })
        .finally(() => {
          setIsLoadingCheck(false);
        });
    }
  };

  const handleDistribute = () => {
    // Проверка на изменение массива после успешной проверки
    if (checkResultRef.current.arrayId.length !== rowSelectionModel.length) {
      return;
    }

    for (let item of checkResultRef.current.arrayId.map(String)) {
      if (!rowSelectionModel.includes(item)) {
        return;
      }
    }

    if (
      checkResultRef.current.result &&
      rowSelectionModel.length !== 0
      // && isIDsEqual
    ) {
      setIsLoadingDistribute(true);
      EventController.checkDistribution({
        eventId: Number(eventId),
        zoneId: Number(selectedZoneId),
        photographers: rowSelectionModel.map((id) => Number(id)),
      })
        .then((res) => {
          if (res.result) {
            window.location.reload();
          }
        })
        .finally(() => {
          setIsLoadingDistribute(false);
        });
    }
  };

  useEffect(() => {
    // Получение зон
    if (eventId) {
      EventController.getEventZones(eventId)
        .then((res) => {
          setZones(res);
          return res.map((zone) => ({
            id: String(zone.id),
            number: zone.number,
          }));
        })
        .then((newValue) => {
          setSelectedZoneId(newValue[0]?.id);
          setIsLoadingZones(false);
        });
    }
  }, []);

  useEffect(() => {
    // Обновление приоритетов при выборе другой зоны
    if (eventId) {
      setIsLoadingPriority(true);
      Promise.all([
        EventController.getAllZoneInfo(eventId, selectedZoneId),
        EventController.getScheduleList(eventId),
      ])
        .then((res) => {
          if (res[0].length === 0) {
            setRows([]);
            throw new Error("Нет приоритетов на эту зону");
          }

          const newValue = res[0].map((zoneInfo) => {
            const schedule = res[1].find(
              (schedule) => schedule.photographerId === zoneInfo.photographerId,
            );
            return {
              id: zoneInfo.photographerId,
              priority: zoneInfo.priority,
              photographer: `${zoneInfo.surname} ${zoneInfo.firstname} ${zoneInfo.middleName}`,
              isApproved: schedule?.zoneId === Number(selectedZoneId),
            };
          });

          setRows(newValue);
        })
        .catch((err) => {})
        .finally(() => {
          setIsLoadingPriority(false);
        });
    }
  }, [selectedZoneId]);

  return (
    <Box>
      <IconButton onClick={changeVisibleModal} color="primary">
        <AlarmOnIcon />
      </IconButton>
      <Dialog
        open={isVisibleDialog}
        onClose={changeVisibleModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle>Автораспределение</DialogTitle>
        <DialogContent sx={style}>
          {isLoadingZones ? (
            <Loader fullPage={false} />
          ) : (
            <>
              {zones.length === 0 ? (
                <Typography align="center">Зоны не добавлены</Typography>
              ) : (
                <FormControl style={{ width: "396px", marginTop: "5px" }}>
                  <InputLabel>Зона</InputLabel>
                  <Select
                    label="Зона"
                    value={selectedZoneId}
                    onChange={handleSelectZone}
                  >
                    {zones.map((zone: any) => (
                      <MenuItem value={zone.id} key={zone.id}>
                        Зона {zone.number}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}

              <Box
                style={{
                  borderRadius: "10px",
                  border:
                    "1px solid var(--components-input-outlined-enabledBorder, rgba(0, 0, 0, 0.23))",
                }}
              >
                <Typography variant="h6" p="16px">
                  Фотографы/приоритеты
                </Typography>

                <DataGrid
                  columns={columns}
                  rows={rows}
                  checkboxSelection
                  disableRowSelectionOnClick
                  onRowSelectionModelChange={handleSelectPhotographer}
                  rowSelectionModel={rowSelectionModel}
                  getRowClassName={rowColor}
                  localeText={{ noRowsLabel: "Нет приоритетов на эту зону" }}
                  initialState={{
                    pagination: {
                      paginationModel: {
                        pageSize: 5,
                      },
                    },
                  }}
                  loading={isLoadingPriority}
                  slots={{ loadIcon: Loader }}
                  pageSizeOptions={[]}
                  style={{ height: "373px" }}
                />
              </Box>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={changeVisibleModal}>Назад</Button>
          <LoadingButton
            disabled={rowSelectionModel.length === 0}
            onClick={handleCheck}
            loading={isLoadingCheck}
          >
            Проверка
          </LoadingButton>
          <LoadingButton
            disabled={!checkResultRef.current || !checkResultRef.current.result}
            onClick={handleDistribute}
            loading={isLoadingDistribute}
          >
            Распределить
          </LoadingButton>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={isVisibleSnackbar}
        autoHideDuration={6000}
        onClose={changeVisibleSnackbar}
      >
        <Alert
          onClose={changeVisibleSnackbar}
          severity={checkResultRef.current?.result ? "success" : "error"}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {checkResultRef.current?.result
            ? "Данные проверены"
            : "Не хватает фотографов или у них не указано время"}
        </Alert>
      </Snackbar>
    </Box>
  );
}
