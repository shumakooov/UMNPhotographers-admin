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

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 30 },
  { field: "surname", headerName: "Фамилия", width: 150 },
  { field: "firstname", headerName: "Имя", width: 110, editable: true },
  { field: "phone", headerName: "Номер телефона", width: 110 },
  { field: "vk", headerName: "ВКонтакте", width: 110 },
  { field: "tg", headerName: "Телеграм", width: 110 },
  { field: "email", headerName: "Почта (Я. Диск)", width: 180 },
  { field: "technic", headerName: "Техника", width: 90 },
  { field: "portfolio", headerName: "Портфолио", width: 100 },
  { field: "trainee", headerName: "Практикант", width: 60 },
  { field: "status", headerName: "Статус фотографа", width: 150 },
  { field: "description", headerName: "Статус пользователя", width: 150 },
  { field: "score", headerName: "Уровень", width: 70 },
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

        <div style={{ height: 600, width: "100%" }}>
          <DataGrid
            rows={photographers}
            columns={columns}
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
