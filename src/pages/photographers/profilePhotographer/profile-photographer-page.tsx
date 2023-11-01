import * as React from 'react';
import TextField from '@mui/material/TextField';
import './profile-photographer-page.css'
import {DataGrid, GridColDef, GridRowsProp} from "@mui/x-data-grid";

const columns: GridColDef[] = [
    {field: 'id', headerName: 'ID', width: 40},
    {field: 'event', headerName: 'Мероприятие', width: 100},
    {field: 'importance', headerName: 'Важность', width: 100},
    {field: 'evaluation', headerName: 'Оценка работы', width: 100},
];

const rows: GridRowsProp = [
    {id: 1, event: 'гиккон', importance: 'Важно', evaluation: '100',},
    {id: 2, event: 'гиккон', importance: 'Важно', evaluation: '100',},
    {id: 3, event: 'гиккон', importance: 'Важно', evaluation: '100',},
];

export default function ProfilePhotographerPage() {
    return (
        <>
            <div className={'wrapper_profile'}>
                <div>
                    <div>
                        <img
                            src='https://cdn.fishki.net/upload/post/2021/02/16/3613203/dc3783e0069bb6e3b35750bc62606fe3.jpg'
                            style={{width: 200, height: 200, borderRadius: 5}}/>
                    </div>
                    <div className={'profile_name'}>
                        <TextField required id="outlined-required" label="Фамилия" defaultValue="Шумаков"/>
                        <TextField required id="outlined-required" label="Имя" defaultValue="Глеб"/>
                        <TextField id="outlined-required" label="Отчество" defaultValue="Николаевич"/>
                    </div>
                    <div>
                        <TextField
                            id="outlined-multiline-static"
                            label="Описание фотографа"
                            multiline
                            rows={6}
                            defaultValue="Default Value"
                        />
                    </div>
                </div>
                <div>
                    <div>
                        <TextField required id="outlined-required" label="Уровень"/>
                    </div>
                    <div>
                        <p>
                            Дата регистрации: 30.11.2023
                        </p>
                    </div>
                    <div>
                        <p>
                            Контакты:
                        </p>
                        <p>
                            +79999999999
                        </p>
                        <p>
                            @asdasd
                        </p>
                        <p>
                            @asdasd
                        </p>
                        <p>
                            pochta@pochta.ru
                        </p>
                    </div>
                    <div>
                        <p>
                            Статус: Практикант
                        </p>
                    </div>
                    <div>
                        <button>сброс пароля</button>
                    </div>
                </div>
            </div>
            <div>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: {page: 0, pageSize: 5},
                        },
                    }}
                    pageSizeOptions={[5, 10]}
                    checkboxSelection
                />
            </div>
        </>
    );
}
