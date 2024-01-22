import { useState, useEffect } from "react";
import { IconButton } from "@mui/material";
import { DataGrid, GridColDef, GridCellParams } from "@mui/x-data-grid";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import styles from "./priority-zones-page.module.css";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  receivePhotographerPriority,
  resetPhotographerPriority,
  changeApprovedZone,
} from "../../../store/eventSlice";
import { AppDispatch } from "../../../store/store";
import Loader from "../../../components/ui/Loader";
import CustomTableToolbar from "../../../components/custom-table-toolbar";

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

  if (params.value === "✔") {
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
          const resColumns = payload.zones.map(({ number }) => ({
            field: `zone${number}`,
            headerName: `Зона ${number}`,
            width: 84,
            cellClassName: cellColor,
          }));

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

  const handleApprovedZone = (e: any) => {
    if (e.field.includes("zone")) {
      dispatch(
        changeApprovedZone({
          photographerId: e.id,
          numberZone: e.field.replace("zone", ""),
        }),
      ).then(() => {
        uploadData();
      });
    }
  };

  useEffect(() => {
    uploadData();
  }, []);

  return (
    <div style={{ padding: "16px 120px" }}>
      <div
        className="shadow-container"
        style={{ height: "631px", width: "100%" }}
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
            sorting: {
              sortModel: [{ field: "id", sort: "asc" }],
            },
          }}
          pageSizeOptions={[5]}
          slots={{
            loadIcon: Loader,
            toolbar: () => (
              <CustomTableToolbar>
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
                  <AutorenewIcon fontSize="small" />
                </IconButton>
              </CustomTableToolbar>
            ),
          }}
          loading={isLoading}
          checkboxSelection
          onCellClick={handleApprovedZone}
          disableRowSelectionOnClick
          getCellClassName={(params) =>
            params.field === "firstname" ? styles.firstname : ""
          }
        />
      </div>
    </div>
  );
}
