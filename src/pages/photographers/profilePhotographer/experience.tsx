import { IconButton } from "@mui/material";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import ViewColumnIcon from "@mui/icons-material/ViewColumn";
import FilterListIcon from "@mui/icons-material/FilterList";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import WrapperWithActions from "../../../components/ui/wrapperWithActions/WrapperWithActions";
import "./index.css";

const columns: GridColDef[] = [
  { field: "event", headerName: "Мероприятие" },
  { field: "complexity", headerName: "Сложность" },
  { field: "quality", headerName: "Качество фото" },
  { field: "punctuality", headerName: "Пунктуальность" },
  { field: "total", headerName: "Общая оценка" },
  { field: "comment", headerName: "Комментарий" },
];

const rows: GridRowsProp = [
  {
    id: 1,
    event: "гиккон",
    complexity: 10,
    quality: 6,
    punctuality: 10,
    total: 8,
    comment:
      "Фотограф старался, но из-за плохого освещения его работы получились не очень.",
  },
  {
    id: 2,
    event: "гиккон",
    complexity: 10,
    quality: 6,
    punctuality: 10,
    total: 8,
    comment:
      "Фотограф старался, но из-за плохого освещения его работы получились не очень.",
  },
  {
    id: 3,
    event: "гиккон",
    complexity: 10,
    quality: 6,
    punctuality: 10,
    total: 8,
    comment:
      "Фотограф старался, но из-за плохого освещения его работы получились не очень.",
  },
];

export default function Experience() {
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
        </>
      }
    >
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
    </WrapperWithActions>
  );
}
