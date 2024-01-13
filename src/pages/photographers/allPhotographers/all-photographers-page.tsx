import * as React from "react";
import {
  DataGrid,
  GridColDef,
  GridRowModel,
  GridRowsProp,
  GridSortModel,
  GridToolbar,
} from "@mui/x-data-grid";
import ModalCED from "../../../components/modalCED/modal-ced";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "../profilePhotographer/profile-photographer-page.css";

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
        const photosTemp: Photographer[] = [];
        const result = await axios
          .get(
            `https://photographersekb.ru:8080/admin/photographer/all?page=0&size=30`,
            { withCredentials: true }
          )
          .then((res) => {
            res.data.list.map((e: any) =>
              photosTemp.push({
                id: e.id,
                surname: e.surname,
                firstname: e.firstname,
                phone: e.phone,
                vk: e.contacts?.vk,
                tg: e.contacts?.tg,
                email: e.email,
                technic: e.technique_info_id,
                portfolio: e.portfolio,
                trainee: e.trainee,
                status: e.status,
                description: e.description,
                score: e.score,
              })
            );
          });
        setPhotographers(photosTemp);
      } catch (e) {
        console.error(e);
      }
    };

    getData();
  }, []);

  return (
    <div style={{ padding: "16px" }}>
      <div className="shadow-container" style={{ padding: "10px" }}>
        <ModalCED name={"Добавить фотографа"}>
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
        </ModalCED>

        <div style={{ height: 600, width: "100%" }}>
          <DataGrid
            rows={photographers}
            columns={columns}
            slots={{
              toolbar: GridToolbar,
            }}
            onRowClick={useHandleRowClick}
            density="compact"
          />
        </div>
      </div>
    </div>
  );
}
