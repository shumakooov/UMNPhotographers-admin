import * as React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './login-page.css'
import {useState} from "react";
import {useNavigate} from "react-router-dom";

export default function LoginPage() {
    const [login, setLogin] = useState<string>("");
    const [password, setPassword] = useState<string>("");


    const navigate = useNavigate();

    const submit = async () => {
        if (login.length > 0 && password.length > 0) {
            const response = await fetch("http://158.160.32.142:8080/admin/auth/login", {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({
                    email: login,
                    password: password,
                }),
            });
            if (response.status === 200) {
                navigate("/")
            }
        }
    };

    return (
        <div className='wrapper_login'>
            <TextField
                required
                id="outlined-required"
                label="Логин"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLogin(e.target.value)}
            />
            <TextField
                required
                id="outlined-required"
                label="Пароль"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
            />
            <Button variant="contained" onClick={() => submit()}>Войти</Button>
        </div>
    );
}
