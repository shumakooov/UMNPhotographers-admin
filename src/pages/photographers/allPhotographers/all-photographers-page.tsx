import * as React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import ModalCED from "../../../components/modalCED/modal-ced";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import PhotographerController from "../../../api/photographerContoller";
import CustomTableToolbar from "../../../components/custom-table-toolbar";

interface Photographer {
  id: number;
  surname: string | null;
  firstname: string | null;
  phone: string | null;
  vk: string | null;
  tg: string | null;
  email: string | null;
  technic: string | null;
  portfolio: string | null;
  trainee: boolean | null;
  status: string | null;
  description: string | null;
  score: number | null;
}

const statusLabels = [
  {
    status: "approved",
    label: "Активный",
  },

  {
    status: "created",
    label: "Не подтвержден",
  },
  {
    status: "blocked",
    label: "Заблокирован",
  },
];

const columns: GridColDef[] = [
  { field: "surname", headerName: "Фамилия", width: 196 },
  { field: "firstname", headerName: "Имя", width: 196 },
  { field: "middleName", headerName: "Отчество", width: 196 },
  { field: "phone", headerName: "Телефон", width: 196 },
  { field: "tg", headerName: "Telegram", width: 196 },
  { field: "vk", headerName: "VK", width: 196 },
  { field: "email", headerName: "Яндекс почта", width: 196 },
  { field: "portfolio", headerName: "Портфолио", width: 196 },
  {
    field: "trainee",
    headerName: "Практикант",
    width: 196,
    valueFormatter: (params) => {
      return params.value ? "Да" : "Нет";
    },
  },
  {
    field: "status",
    headerName: "Статус фотографа",
    width: 196,
    valueFormatter: (params) => {
      return statusLabels.find((item) => item.status === params.value)?.label;
    },
  },
  { field: "score", headerName: "Уровень", width: 196 },
];

export default function AllPhotographersPage() {
  const navigate = useNavigate();
  const useHandleRowClick = (params: any) => {
    navigate(`/photographers/${params.id}`);
  };

  const [photographers, setPhotographers] = useState<Photographer[]>([]);

  useEffect(() => {
    const getData = async () => {
      try {
        PhotographerController.getAll()
          .then((res) => {
            return res.map((e: any) => ({
              id: e.id,
              surname: e.surname,
              firstname: e.firstname,
              middleName: e.middleName,
              phone: e.phone,
              vk: e.contacts?.vk,
              tg: e.contacts?.tg,
              email: e.email,
              technic: e.techniqueInfoId,
              portfolio: e.portfolio,
              trainee: e.trainee,
              status: e.status,
              description: e.description,
              score: e.score,
            }));
          })
          .then((res) => setPhotographers(res));
      } catch (e) {
        console.error(e);
      }
    };

    getData();
  }, []);

  return (
    <div style={{ padding: "16px 120px" }}>
      <div className="shadow-container">
        {/*        <ModalCED name={"Добавить фотографа"}>
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "100%" },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField required id="outlined-required" label="Фамилия" />
            <TextField required id="outlined-required" label="Имя" />
            <TextField id="outlined-required" label="Номер телефона" />
            <TextField id="outlined-required" label="Ссылка ТГ" />
            <TextField id="outlined-required" label="Ссылка ВК" />
            <TextField
              required
              id="outlined-required"
              label="Почта от Я.Диска"
            />
            <TextField id="outlined-required" label="Практикант (да/нет)" />
            <TextField id="outlined-required" label="Статус фотографа" />
            <TextField id="outlined-required" label="Статус пользователя" />
          </Box>
        </ModalCED>*/}

        <div style={{ height: "646px", width: "100%" }}>
          <DataGrid
            rows={photographers}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 10,
                },
              },
              sorting: {
                sortModel: [{ field: "surname", sort: "asc" }],
              },
            }}
            pageSizeOptions={[]}
            checkboxSelection
            slots={{
              toolbar: CustomTableToolbar,
            }}
            onRowClick={useHandleRowClick}
          />
        </div>
      </div>
    </div>
  );
}
