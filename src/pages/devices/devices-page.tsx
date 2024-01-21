import { useState, useEffect } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import DeviceController from "../../api/deviceController";
import CustomTableToolbar from "../../components/custom-table-toolbar";
import Loader from "../../components/ui/Loader";

const typeLabels = [
  {
    type: "camera",
    label: "Камера",
  },

  {
    type: "flash",
    label: "Вспышка",
  },
  {
    type: "lens",
    label: "Отпика",
  },
  {
    type: "memory",
    label: "Карта памяти",
  },
  {
    type: "battery",
    label: "Аккумулятор",
  },
];

const columns: GridColDef[] = [
  {
    field: "manufacturer",
    headerName: "Производитель",
    width: 196,
  },
  {
    field: "model",
    headerName: "Модель",
    width: 196,
  },

  {
    field: "type",
    headerName: "Тип",
    width: 196,
    valueFormatter: (params) => {
      return typeLabels.find((item) => item.type === params.value)?.label;
    },
  },
  {
    field: "rating",
    headerName: "Рейтинг",
    width: 196,
  },
];

export default function DevicesPage() {
  const [rows, setRows] = useState([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const getData = async () => {
      return Promise.all(
        ["camera", "flash", "lens", "memory", "battery"].map((type) =>
          DeviceController.getAllByType(type),
        ),
      ).then((res: any) =>
        res.flat(1).map((item: any) => ({
          ...item,
          manufacturer: item.manufacturer.name,
          model: item.model.name,
          rating: item.rating ? item.rating : "-",
        })),
      );
    };

    getData().then((res) => {
      setRows(res);
      setIsLoading(false);
    });
  }, []);

  return (
    <DataGrid
      columns={columns}
      rows={rows}
      checkboxSelection
      style={rows.length === 0 ? { height: "646px" } : {}}
      loading={isLoading}
      initialState={{
        pagination: {
          paginationModel: {
            pageSize: 10,
          },
        },
        sorting: {
          sortModel: [{ field: "manufacturer", sort: "asc" }],
        },
      }}
      pageSizeOptions={[]}
      localeText={{
        noRowsLabel: "Нет техники",
      }}
      slots={{
        toolbar: CustomTableToolbar,
        loadIcon: Loader,
      }}
    />
  );
}
