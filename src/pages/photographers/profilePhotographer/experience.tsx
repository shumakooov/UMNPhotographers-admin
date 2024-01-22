import { IconButton } from "@mui/material";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import ViewColumnIcon from "@mui/icons-material/ViewColumn";
import FilterListIcon from "@mui/icons-material/FilterList";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import WrapperWithActions from "../../../components/ui/wrapperWithActions/wrapper-with-actions";
import "./index.css";

const columns: GridColDef[] = [
  { field: "event", headerName: "Мероприятие", width: 196 },
  { field: "complexity", headerName: "Сложность", width: 196 },
  { field: "quality", headerName: "Качество фото", width: 196 },
  { field: "punctuality", headerName: "Пунктуальность", width: 196 },
  { field: "total", headerName: "Общая оценка", width: 196 },
  { field: "comment", headerName: "Комментарий", width: 196 },
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
            <ViewColumnIcon fontSize="small" />
          </IconButton>
          <IconButton aria-label="reset" color="primary">
            <FilterListIcon fontSize="small" />
          </IconButton>
          <IconButton aria-label="save" color="primary">
            <SaveAltIcon fontSize="small" />
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
