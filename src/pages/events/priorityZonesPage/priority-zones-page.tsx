import { useState, useEffect } from "react";
import { IconButton } from "@mui/material";
import { DataGrid, GridColDef, GridCellParams } from "@mui/x-data-grid";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import WrapperWithActions from "../../../components/ui/wrapperWithActions/wrapper-with-actions";
import styles from "./priority-zones-page.module.css";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  receivePhotographerPriority,
  resetPhotographerPriority,
} from "../../../store/eventSlice";
import { AppDispatch } from "../../../store/store";
import Loader from "../../../components/ui/Loader";

const cellColor = (params: GridCellParams<any>): any => {
  if (params.value === 1) {
    return styles.red;
  }

  if (params.value === 2) {
    return styles.yellow;
  }

  if (params.value === 3) {
    return styles.green;
  }

  if (params.value === 4) {
    return styles.blue;
  }
};

export default function PriorityZonesPage() {
  const { id: eventId } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [columns, setColumns] = useState<GridColDef[]>([]);
  const [rows, setRows] = useState([]);

  const uploadData = () => {
    if (eventId) {
      dispatch(receivePhotographerPriority(eventId))
        .then(({ payload }: { payload: any }) => {
          // @ts-ignore
          const resColumns = [...Array(payload.zoneCount).keys()].map(
            (index) => ({
              field: `zone${index + 1}`,
              headerName: `Зона ${index + 1}`,
              width: 84,
              cellClassName: cellColor,
            }),
          );

          setColumns([
            {
              field: "surname",
              headerName: "Фамилия",
              width: 212,
            },
            {
              field: "firstname",
              headerName: "Имя",
              width: 196,
              headerClassName: styles.firstname,
            },
            ...resColumns,
          ]);
          setRows(payload.data);
        })
        .then(() => {
          setIsLoading(false);
        });
    }
  };

  useEffect(() => {
    uploadData();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <WrapperWithActions
      actions={
        <>
          <IconButton aria-label="save" color="primary">
            <SaveAltIcon />
          </IconButton>
          <IconButton
            aria-label="delete user"
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
            onClick={() => {
              setIsLoading(true);
              dispatch(resetPhotographerPriority()).then(() => {
                uploadData();
              });
            }}
          >
            <AutorenewIcon />
          </IconButton>
        </>
      }
      p="16px 64px"
    >
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
        getCellClassName={(params) =>
          params.field === "firstname" ? styles.firstname : ""
        }
      />
    </WrapperWithActions>
  );
}
