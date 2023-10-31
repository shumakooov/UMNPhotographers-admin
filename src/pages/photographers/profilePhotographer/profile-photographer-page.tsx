import * as React from 'react';
import TextField from '@mui/material/TextField';
import './profile-photographer-page.css'

export default function ProfilePhotographerPage() {
    return (
        <div>
            <div>
                <img src='https://cdn.fishki.net/upload/post/2021/02/16/3613203/dc3783e0069bb6e3b35750bc62606fe3.jpg'
                     style={{width: 200, height: 200, borderRadius: 5}}/>
            </div>
            <div className={'profile_name'}>
                <TextField required id="outlined-required" label="Фамилия" defaultValue="Шумаков" />
                <TextField required id="outlined-required" label="Имя" defaultValue="Глеб" />
                <TextField id="outlined-required" label="Отчество" defaultValue="Николаевич" />
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
            <div>
                <TextField required id="outlined-required" label="Уровень" />
            </div>
            <div>
                <p>
                    30.11.2023
                </p>
            </div>
            <div>
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
                    Практикант
                </p>
            </div>
            <div>
                тут инфа о предыдущих меро
            </div>
            <div>
                <button>сброс пароля</button>
            </div>
        </div>
    );
}
