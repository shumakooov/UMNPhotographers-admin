import * as React from 'react';
import {DataGrid, GridColDef, GridRowModel, GridRowsProp, GridToolbar} from '@mui/x-data-grid';
import Alert, {AlertProps} from '@mui/material/Alert';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Snackbar from '@mui/material/Snackbar';
import Button from '@mui/material/Button';

interface Accumulators {
    id: number;
    brand: string;
    model: string;
    quantity: number;
    owner: string;
}

const columns: GridColDef[] = [
    {field: 'id', headerName: 'ID', width: 30},
    {field: 'brand', headerName: 'Производитель', width: 150, editable: true},
    {field: 'model', headerName: 'Модель', width: 150, editable: true},
    {field: 'quantity', headerName: 'Количество', width: 150, editable: true},
    {field: 'owner', headerName: 'Владелец', width: 200, editable: true},
];

const rows: GridRowsProp = [
    {
        id: 1,
        brand: 'nikon',
        model: 'cool',
        quantity: 400,
        owner: 'Шумаков Глеб',
    },
    {
        id: 2,
        brand: 'bikon',
        model: 'cooler',
        quantity: 400,
        owner: 'Шумаков Глеб',
    },
    {
        id: 3,
        brand: 'wikon',
        model: 'coolest',
        quantity: 400,
        owner: 'Шумаков Глеб',
    },
];

const useFakeMutation = () => {
    return React.useCallback(
        (photographer: Partial<Accumulators>) =>
            new Promise<Partial<Accumulators>>((resolve, reject) => {
                setTimeout(() => {
                    if (photographer.owner?.trim() === '') {
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
    if (newRow.brand !== oldRow.brand) {
        return `First name from '${oldRow.brand}' to '${newRow.brand}'`;
    }
    if (newRow.model !== oldRow.model) {
        return `First name from '${oldRow.model}' to '${newRow.model}'`;
    }
    if (newRow.quantity !== oldRow.quantity) {
        return `First name from '${oldRow.quantity}' to '${newRow.quantity}'`;
    }
    if (newRow.owner !== oldRow.owner) {
        return `First name from '${oldRow.owner}' to '${newRow.owner}'`;
    }
    return null;
}

export default function AccumulatorsTable() {
    const mutateRow = useFakeMutation();
    const noButtonRef = React.useRef<HTMLButtonElement>(null);
    const [promiseArguments, setPromiseArguments] = React.useState<any>(null);

    const [snackbar, setSnackbar] = React.useState<Pick<
        AlertProps,
        'children' | 'severity'
    > | null>(null);

    const handleCloseSnackbar = () => setSnackbar(null);

    const processRowUpdate = React.useCallback(
        (newRow: GridRowModel, oldRow: GridRowModel) =>
            new Promise<GridRowModel>((resolve, reject) => {
                const mutation = computeMutation(newRow, oldRow);
                if (mutation) {
                    // Save the arguments to resolve or reject the promise later
                    setPromiseArguments({resolve, reject, newRow, oldRow});
                } else {
                    resolve(oldRow); // Nothing was changed
                }
            }),
        [],
    );

    const handleNo = () => {
        const {oldRow, resolve} = promiseArguments;
        resolve(oldRow); // Resolve with the old row to not update the internal state
        setPromiseArguments(null);
    };

    const handleYes = async () => {
        const {newRow, oldRow, reject, resolve} = promiseArguments;

        try {
            // Make the HTTP request to save in the backend
            const response = await mutateRow(newRow);
            setSnackbar({children: 'Photographer successfully saved', severity: 'success'});
            resolve(response);
            setPromiseArguments(null);
        } catch (error) {
            setSnackbar({children: "Field can't be empty", severity: 'error'});
            reject(oldRow);
            setPromiseArguments(null);
        }
    };

    const renderConfirmDialog = () => {
        if (!promiseArguments) {
            return null;
        }

        const {newRow, oldRow} = promiseArguments;
        const mutation = computeMutation(newRow, oldRow);

        return (
            <Dialog
                maxWidth="xs"
                open={!!promiseArguments}
            >
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
            <div style={{height: 400, width: '100%'}}>
                {renderConfirmDialog()}
                <DataGrid rows={rows} columns={columns} processRowUpdate={processRowUpdate}
                          slots={{
                              toolbar: GridToolbar,
                          }}
                          initialState={{
                              sorting: {
                                  sortModel: [{ field: 'brand', sort: 'desc' }],
                              },
                          }}
                />
                {!!snackbar && (
                    <Snackbar open onClose={handleCloseSnackbar} autoHideDuration={6000}>
                        <Alert {...snackbar} onClose={handleCloseSnackbar}/>
                    </Snackbar>
                )}
            </div>
        </div>
    );
}
