import { useState, useEffect } from "react";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  useGridApiContext,
  GridColDef,
} from "@mui/x-data-grid";
import WrapperWithActions from "../../../components/ui/wrapperWithActions/wrapper-with-actions";
import { IconButton } from "@mui/material";
import ViewColumnIcon from "@mui/icons-material/ViewColumn";
import FilterListIcon from "@mui/icons-material/FilterList";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import PhotographerController from "../../../api/photographerContoller";
import { useParams } from "react-router-dom";
import { Evaluation, EvaluationRow } from "../../../types/photographer";
import Loader from "../../../components/ui/Loader";
import CustomTableToolbar from "../../../components/custom-table-toolbar";

const columns: GridColDef[] = [
  {
    field: "photographer",
    headerName: "Фотограф",
    width: 320,
  },
  {
    field: "zone",
    headerName: "Зона",
    width: 136,
  },
  {
    field: "quality",
    headerName: "Качество фото",
    width: 136,
  },
  {
    field: "punctuality",
    headerName: "Пунктуальность",
    width: 136,
  },
  {
    field: "judgment",
    headerName: "Общая оценка",
    width: 136,
  },
  {
    field: "comment",
    headerName: "Комментарий",
    width: 616,
  },
];

export default function RatePhotographersPage() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { id: eventId } = useParams();
  const [rows, setRows] = useState<EvaluationRow[]>([]);

  useEffect(() => {
    if (eventId) {
      PhotographerController.getEvaluationAll(eventId)
        .then((res: Evaluation[]) => {
          const newValue: EvaluationRow[] = res.map((item: Evaluation) => ({
            id: item.id,
            photographer: `${item.photographer.surname} ${item.photographer.firstname} ${item.photographer.middleName}`,
            zone: item.zone.number,
            quality: item.quality,
            punctuality: item.punctuality,
            judgment: item.judgment,
            comment: item.comment,
          }));

          setRows(newValue);
        })
        .finally(() => setIsLoading(false));
    }
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <WrapperWithActions p="16px 120px">
      <DataGrid
        columns={columns}
        rows={rows}
        checkboxSelection
        style={rows.length === 0 ? { height: "80vh" } : {}}
        localeText={{
          noRowsLabel: "Нет оценок",
        }}
        slots={{
          toolbar: CustomTableToolbar,
        }}
      />
    </WrapperWithActions>
  );
}
