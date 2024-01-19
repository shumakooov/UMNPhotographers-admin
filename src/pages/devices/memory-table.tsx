import * as React from "react";
import {
  DataGrid,
  GridColDef,
  GridRowModel,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import Alert, { AlertProps } from "@mui/material/Alert";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Snackbar from "@mui/material/Snackbar";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import DeviceController from "../../api/deviceController";
import { Memory } from "../../types/device";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID" },

  {
    field: "manufacturer",
    headerName: "Производитель",
    width: 200,
    editable: true,
  },
  {
    field: "model",
    headerName: "Модель",
    width: 200,
    editable: true,
  },
  { field: "size", headerName: "Объем", width: 200, editable: true },
  { field: "rating", headerName: "Рейтинг", width: 200, editable: true },
];

const useFakeMutation = () => {
  return React.useCallback(
    (photographer: Partial<Memory>) =>
      new Promise<Partial<Memory>>((resolve, reject) => {
        setTimeout(() => {
          if (photographer.manufacturer?.name.trim() === "") {
            reject();
          } else {
            resolve(photographer);
          }
        }, 200);
      }),
    [],
  );
};

function computeMutation(newRow: GridRowModel, oldRow: GridRowModel) {
  if (newRow.rating !== oldRow.rating) {
    return `Last name from '${oldRow.rating}' to '${newRow.rating}'`;
  }
  if (newRow.brand !== oldRow.brand) {
    return `First name from '${oldRow.brand}' to '${newRow.brand}'`;
  }
  if (newRow.size !== oldRow.size) {
    return `First name from '${oldRow.size}' to '${newRow.size}'`;
  }
  if (newRow.owner !== oldRow.owner) {
    return `First name from '${oldRow.owner}' to '${newRow.owner}'`;
  }
  return null;
}

export default function MemoryTable() {
  const mutateRow = useFakeMutation();
  const noButtonRef = React.useRef<HTMLButtonElement>(null);
  const [promiseArguments, setPromiseArguments] = React.useState<any>(null);
  const [rows, setRows] = useState<any>([]);

  useEffect(() => {
    // @ts-ignore
    DeviceController.getAllByType("memory").then((res: Memory[]) => {
      const newValue = res.map((item: Memory) => ({
        ...item,
        rating: item.rating ? item.rating : "-",
        manufacturer: item.manufacturer.name,
        model: item.model.name,
      }));
      setRows(newValue);
    });
  }, []);

  const [snackbar, setSnackbar] = React.useState<Pick<
    AlertProps,
    "children" | "severity"
  > | null>(null);

  const handleCloseSnackbar = () => setSnackbar(null);

  const processRowUpdate = React.useCallback(
    (newRow: GridRowModel, oldRow: GridRowModel) =>
      new Promise<GridRowModel>((resolve, reject) => {
        const mutation = computeMutation(newRow, oldRow);
        if (mutation) {
          // Save the arguments to resolve or reject the promise later
          setPromiseArguments({ resolve, reject, newRow, oldRow });
        } else {
          resolve(oldRow); // Nothing was changed
        }
      }),
    [],
  );

  const handleNo = () => {
    const { oldRow, resolve } = promiseArguments;
    resolve(oldRow); // Resolve with the old row to not update the internal state
    setPromiseArguments(null);
  };

  const handleYes = async () => {
    const { newRow, oldRow, reject, resolve } = promiseArguments;

    try {
      // Make the HTTP request to save in the backend
      const response = await mutateRow(newRow);
      setSnackbar({
        children: "Photographer successfully saved",
        severity: "success",
      });
      resolve(response);
      setPromiseArguments(null);
    } catch (error) {
      setSnackbar({ children: "Field can't be empty", severity: "error" });
      reject(oldRow);
      setPromiseArguments(null);
    }
  };

  const renderConfirmDialog = () => {
    if (!promiseArguments) {
      return null;
    }

    const { newRow, oldRow } = promiseArguments;
    const mutation = computeMutation(newRow, oldRow);

    return (
      <Dialog maxWidth="xs" open={!!promiseArguments}>
        <DialogTitle>Are you sure?</DialogTitle>
        <DialogContent dividers>
          {`Pressing 'Yes' will change ${mutation}.`}
        </DialogContent>
        <DialogActions>
          <Button ref={noButtonRef} onClick={handleNo}>
            No
          </Button>
          <Button onClick={handleYes}>Yes</Button>
        </DialogActions>
      </Dialog>
    );
  };

  return (
    <div>
      <div style={{ height: 400, width: "100%" }}>
        {renderConfirmDialog()}
        <DataGrid
          rows={rows}
          columns={columns}
          processRowUpdate={processRowUpdate}
          checkboxSelection
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
          initialState={{
            sorting: {
              sortModel: [{ field: "rating", sort: "desc" }],
            },
          }}
        />
        {!!snackbar && (
          <Snackbar open onClose={handleCloseSnackbar} autoHideDuration={6000}>
            <Alert {...snackbar} onClose={handleCloseSnackbar} />
          </Snackbar>
        )}
      </div>
    </div>
  );
}
