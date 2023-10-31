import * as React from 'react';
import {DataGrid, GridColDef, GridRowModel, GridRowsProp, GridToolbar} from '@mui/x-data-grid';
import Alert, {AlertProps} from '@mui/material/Alert';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Snackbar from '@mui/material/Snackbar';
import Button from '@mui/material/Button';



function computeMutation(newRow: GridRowModel, oldRow: GridRowModel) {
    if (newRow.lastName !== oldRow.lastName) {
        return `Last name from '${oldRow.lastName}' to '${newRow.lastName}'`;
    }
    if (newRow.firstName !== oldRow.firstName) {
        return `First name from '${oldRow.firstName}' to '${newRow.firstName}'`;
    }
    return null;
}

export default function TableTechnics(myInterface: any, columns: GridColDef[], rows: GridRowsProp) {
    const useFakeMutation = () => {
        return React.useCallback(
            (items: Partial<typeof myInterface>) =>
                new Promise<Partial<typeof myInterface>>((resolve, reject) => {
                    setTimeout(() => {
                        if (items.owner?.trim() === '') {
                            reject();
                        } else {
                            resolve(items);
                        }
                    }, 200);
                }),
            [],
        );
    };

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
