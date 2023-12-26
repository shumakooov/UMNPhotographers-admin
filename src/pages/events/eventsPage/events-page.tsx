import {
    DataGrid, GridActionsCellItem,
    GridColDef, GridEventListener, GridRowEditStopReasons, GridRowId, GridRowModel,
    GridRowModes,
    GridRowModesModel,
    GridRowsProp,
} from "@mui/x-data-grid";
import * as React from "react";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import ModalCED from "../../../components/modalCED/modal-ced";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';

interface Event {
    id: number;
    address: string | null;
    startTime: string | null;
    endTime: string | null;
    name: string | null;
    lvl: number | null;
}

export default function EventsPage() {
    const [events, setEvents] = useState<Event[]>([])
    const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>({});

    const handleRowEditStop: GridEventListener<'rowEditStop'> = (params, event) => {
        if (params.reason === GridRowEditStopReasons.rowFocusOut) {
            event.defaultMuiPrevented = true;
        }
    };

    const handleEditClick = (id: GridRowId) => () => {
        setRowModesModel({...rowModesModel, [id]: {mode: GridRowModes.Edit}});
    };

    const handleSaveClick = (id: GridRowId) => () => {
        setRowModesModel({...rowModesModel, [id]: {mode: GridRowModes.View}});
    };

    const handleDeleteClick = (id: GridRowId) => () => {
        setEvents(events.filter((row) => row.id !== id));
    };

    const handleCancelClick = (id: GridRowId) => () => {
        setRowModesModel({
            ...rowModesModel,
            [id]: {mode: GridRowModes.View, ignoreModifications: true},
        });

        console.log('handle cancel click')
    };

    const processRowUpdate = (newRow: GridRowModel) => {
        const updatedRow = {...newRow, isNew: false};
        console.log('process row update')
        return updatedRow;
    };

    const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
        setRowModesModel(newRowModesModel);
    };

    const columns: GridColDef[] = [
        {field: 'id', headerName: 'ID', width: 30},
        {field: 'name', headerName: 'Название мероприятия', width: 170, editable: true},
        {field: 'lvl', headerName: 'Важность мероприятия', width: 150, editable: true},
        {field: 'startTime', headerName: 'Время начала', width: 200, editable: true},
        {field: 'endTime', headerName: 'Время окончания', width: 200, editable: true},
        {field: 'address', headerName: 'Место проведения', width: 170, editable: true},
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            width: 100,
            cellClassName: 'actions',
            getActions: ({id}) => {
                const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

                if (isInEditMode) {
                    return [
                        <GridActionsCellItem
                            icon={<SaveIcon/>}
                            label="Save"
                            sx={{
                                color: 'primary.main',
                            }}
                            onClick={handleSaveClick(id)}
                        />,
                        <GridActionsCellItem
                            icon={<CancelIcon/>}
                            label="Cancel"
                            className="textPrimary"
                            onClick={handleCancelClick(id)}
                            color="inherit"
                        />,
                    ];
                }
                return [
                    <GridActionsCellItem
                        icon={<EditIcon/>}
                        label="Edit"
                        className="textPrimary"
                        onClick={handleEditClick(id)}
                        color="inherit"
                    />,
                    <GridActionsCellItem
                        icon={<DeleteIcon/>}
                        label="Delete"
                        onClick={handleDeleteClick(id)}
                        color="inherit"
                    />,
                ];
            },
        },
    ];

    const navigate = useNavigate();
    const useHandleRowClick = (params: any) => {
        navigate(`/events/${params.id}`)
    };

    useEffect(() => {

        const getData = async () => {
            try {
                const eventsTemp: Event[] = []
                await axios.get(`${process.env.REACT_APP_API_URL}/admin/event/all`, {withCredentials: true})
                    .then((res) => {
                        res.data.list.map((e: any) => eventsTemp.push({
                            id: e.id,
                            address: e.address,
                            startTime: e.startTime,
                            endTime: e.endTime,
                            lvl: e.level,
                            name: e.name
                        }))
                    })
                setEvents(eventsTemp)
            } catch (e) {
                console.error(e)
            }
        }

        getData()
    }, [])

    return (
        <div>
            <ModalCED name={'Добавить мероприятие'}>
                <Box
                    component="form"
                    sx={{
                        '& .MuiTextField-root': {m: 1, width: '100%'},
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <TextField required id="outlined-required" label="Название мероприятия"/>
                    <TextField required id="outlined-required" label="Важность (от 1 до 10)"/>
                    <TextField id="outlined-required" label="Время начала и окончания"/>
                    <TextField id="outlined-required" label="Часовой пояс"/>
                    <TextField id="outlined-required" label="Место проведения"/>
                    <TextField required id="outlined-required" label="Публикация мероприятия"/>
                </Box>
            </ModalCED>

            <div style={{height: 400, width: '100%'}}>
                <DataGrid rows={events}
                          columns={columns}
                          onRowClick={useHandleRowClick}
                          editMode="row"
                          rowModesModel={rowModesModel}
                          onRowModesModelChange={handleRowModesModelChange}
                          onRowEditStop={handleRowEditStop}
                          processRowUpdate={processRowUpdate}
                          slotProps={{
                              toolbar: {setEvents, setRowModesModel},
                          }}
                />
            </div>
        </div>
    );
}
