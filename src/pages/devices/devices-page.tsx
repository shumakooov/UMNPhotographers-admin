import { useState, useEffect } from "react";
import {
  DataGrid,
  GridColDef,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import DeviceController from "../../api/deviceController";

const columns: GridColDef[] = [
  {
    field: "id",
    headerName: "ID",
  },
  {
    field: "manufacturer",
    headerName: "Производитель",
    width: 200,
  },
  {
    field: "model",
    headerName: "Модель",
    width: 200,
  },
  {
    field: "rating",
    headerName: "Рейтинг",
    width: 200,
  },
  {
    field: "type",
    headerName: "Тип",
    width: 200,
  },
];

export default function DevicesPage() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    Promise.all(
      ["camera", "flash", "lens", "memory", "battery"].map((type) =>
        DeviceController.getAllByType(type),
      ),
    )
      .then((res: any) =>
        res.flat(1).map((item: any) => ({
          ...item,
          manufacturer: item.manufacturer.name,
          model: item.model.name,
          rating: item.rating ? item.rating : "-",
        })),
      )
      .then((res) => setRows(res));
  }, []);

  return (
    <DataGrid
      columns={columns}
      rows={rows}
      checkboxSelection
      style={rows.length === 0 ? { height: "80vh" } : {}}
      localeText={{
        noRowsLabel: "Нет техники",
        toolbarExport: "Экспорт",
        toolbarExportCSV: "CSV",
        toolbarFilters: "Фильтры",
        toolbarColumns: "Столбцы",
      }}
      slots={{
        toolbar: () => (
          <GridToolbarContainer>
            <GridToolbarColumnsButton />
            <GridToolbarFilterButton />
            <GridToolbarExport />
          </GridToolbarContainer>
        ),
      }}
    />
  );
}
