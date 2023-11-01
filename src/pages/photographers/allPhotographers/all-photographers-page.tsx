import * as React from 'react';
import {DataGrid, GridColDef, GridRowModel, GridRowsProp, GridSortModel, GridToolbar} from '@mui/x-data-grid';
import ModalCED from "../../../components/modalCED/modal-ced";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Alert, {AlertProps} from '@mui/material/Alert';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Snackbar from '@mui/material/Snackbar';
import Button from '@mui/material/Button';
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";

interface Photographer {
    id: number;
    lastName: string;
    firstName: string;
    contact: string;
    telegram: string;
    vkontakte: string;
    mail: string;
    technic: string;
    intern: boolean;
    statusPhoto: string;
    statusUser: string;
    lvl: number;
}

const columns: GridColDef[] = [
    {field: 'id', headerName: 'ID', width: 30},
    {field: 'lastName', headerName: 'Фамилия', width: 150},
    {field: 'firstName', headerName: 'Имя', width: 110, editable: true},
    {field: 'contact', headerName: 'Номер телефона', width: 110,},
    {field: 'telegram', headerName: 'ВКонтакте', width: 110,},
    {field: 'vkontakte', headerName: 'Телеграм', width: 110,},
    {field: 'mail', headerName: 'Почта (Я. Диск)', width: 180,},
    {field: 'technic', headerName: 'Техника', width: 90,},
    {field: 'intern', headerName: 'Практикант', width: 60,},
    {field: 'statusPhoto', headerName: 'Статус фотографа', width: 150,},
    {field: 'statusUser', headerName: 'Статус пользователя', width: 150,},
    {field: 'lvl', headerName: 'Уровень', width: 50,},
];

const rows: GridRowsProp = [
    {
        id: 1,
        lastName: 'Шумаков',
        firstName: 'Глеб',
        contact: '89999999999',
        telegram: 'asdasda',
        vkontakte: 'asdasasdda',
        mail: 'zhopa@yandex.ru',
        technic: 'link',
        intern: true,
        statusPhoto: 'Норм чел',
        statusUser: 'Активный',
        lvl: '70'
    },
    {
        id: 2,
        lastName: 'Иванов',
        firstName: 'Никита',
        contact: '89999999999',
        telegram: 'asdasda',
        vkontakte: 'asdasasdda',
        mail: 'zhopa@yandex.ru',
        technic: 'link',
        intern: true,
        statusPhoto: 'Норм чел',
        statusUser: 'Активный',
        lvl: '70'
    },
    {
        id: 3,
        lastName: 'Коваленко',
        firstName: 'Даниил',
        contact: '89999999999',
        telegram: 'asdasda',
        vkontakte: 'asdasasdda',
        mail: 'zhopa@yandex.ru',
        technic: 'link',
        intern: true,
        statusPhoto: 'Норм чел',
        statusUser: 'Активный',
        lvl: '70'
    },
    {
        id: 4,
        lastName: 'Ослина',
        firstName: 'Анастасия',
        contact: '89999999999',
        telegram: 'asdasda',
        vkontakte: 'asdasasdda',
        mail: 'zhopa@yandex.ru',
        technic: 'link',
        intern: true,
        statusPhoto: 'Норм чел',
        statusUser: 'Активный',
        lvl: '70'
    },
];

const useFakeMutation = () => {
    return React.useCallback(
        (photographer: Partial<Photographer>) =>
            new Promise<Partial<Photographer>>((resolve, reject) => {
                setTimeout(() => {
                    if (photographer.lastName?.trim() === '') {
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
    if (newRow.firstName !== oldRow.firstName) {
        return `First name from '${oldRow.firstName}' to '${newRow.firstName}'`;
    }
    return null;
}

export default function AllPhotographersPage() {
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

    const navigate = useNavigate();
    const useHandleRowClick = (params: any) => {
        console.log(params.id)
        navigate(`/photographers/${params.id}` )
    };

    const [photographers, photographersChange] = useState([]);

    useEffect(() => {
        fetch("http://158.160.32.142:8080/admin/photograpger/all")
            .then((response) => response.json())
            .then((value) => {
                photographersChange(value)
            });
    }, [])

    return (
        <div>
            <ModalCED name={'Добавить фотографа'}>
                <Box
                    component="form"
                    sx={{
                        '& .MuiTextField-root': {m: 1, width: '100%'},
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <TextField required id="outlined-required" label="Фамилия"/>
                    <TextField required id="outlined-required" label="Имя"/>
                    <TextField id="outlined-required" label="Номер телефона"/>
                    <TextField id="outlined-required" label="Ссылка ТГ"/>
                    <TextField id="outlined-required" label="Ссылка ВК"/>
                    <TextField required id="outlined-required" label="Почта от Я.Диска"/>
                    <TextField id="outlined-required" label="Практикант (да/нет)"/>
                    <TextField id="outlined-required" label="Статус фотографа"/>
                    <TextField id="outlined-required" label="Статус пользователя"/>
                </Box>
            </ModalCED>

            <div style={{height: 400, width: '100%'}}>
                {renderConfirmDialog()}
                <DataGrid rows={rows} columns={columns} processRowUpdate={processRowUpdate}
                          slots={{
                              toolbar: GridToolbar,
                          }}
                          onRowClick={useHandleRowClick}
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
