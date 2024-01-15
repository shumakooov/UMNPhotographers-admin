import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import styles from './create-timeline-drawer.module.css';
import {Moment} from "moment/moment";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {Drawer, MenuItem, TextField} from "@mui/material";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterMoment} from "@mui/x-date-pickers/AdapterMoment";
import {DemoContainer} from "@mui/x-date-pickers/internals/demo";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import {TimePicker} from "@mui/x-date-pickers";
import {Location} from "../../store/locationSlice";
import {Zone} from "../../store/zoneSlice";


export default function CreateTimelineDrawer({props}: any) {

    const [open, setOpen] = React.useState(false);
    const toggleDrawer = (newOpen: boolean) => () => {

        setOpen(newOpen);
    };
    const [date, setDate] = React.useState<Moment | null>();
    const [timeFrom, setTimeFrom] = React.useState<Moment | null>();
    const [timeTo, setTimeTo] = React.useState<Moment | null>();
    const [name, setName] = React.useState<string>("");
    const [description, setDescription] = React.useState<string>("");
    const [address, setAddress] = React.useState<string>("");
    const [manager, setManager] = React.useState<string>("");
    const [zoneId, setZoneId] = React.useState<number>()
    const navigate = useNavigate();

    const createTimeLine = async () => {
        if (name.length > 0 && address.length > 0 && zoneId) {
            const response = await axios.post(`https://photographersekb.ru:8080/admin/location`, {
                name: name,
                description: description,
                startDate: date,
                startTime: timeFrom,
                endTime: timeTo,
                address: address,
                manager: manager,
                zoneId: zoneId,
            }, {withCredentials: true})

            if (response.status === 200) {
                navigate(0)
            }
        }
    };

    return (
        <React.Fragment>
            <Button onClick={toggleDrawer(true)} style={{background: "black"}}>Добавить</Button>
            <Drawer
                anchor={"right"}
                open={open}
                onClose={toggleDrawer(false)}
            >
                <Box
                    sx={{width: 400}}
                    role="presentation"
                    className={styles.createTimeLine}
                >
                    <TextField id="outlined-basic" label="Название" variant="outlined"
                               onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}/>
                    <TextField id="outlined-basic" label="Описание" variant="outlined"
                               onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDescription(e.target.value)}/>
                    <TextField
                        id="outlined-select-currency"
                        select
                        label="Зона"
                        helperText="Зона"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setZoneId(Number(e.target.value))}
                    >
                        {props.zones?.map((zone: Zone) => (
                            <MenuItem key={zone.number} value={zone.id}>
                                {zone.number}
                            </MenuItem>
                        ))}
                    </TextField>
                    <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale="de">
                        <DemoContainer components={['DatePicker']}>
                            <DatePicker label="Выберите дату" value={date}
                                        onChange={(newValue) => setDate(newValue)}/>
                        </DemoContainer>
                        <DemoContainer components={['TimePicker']}>
                            <TimePicker label="Время начала" value={timeFrom}
                                        onChange={(newValue) => setTimeFrom(newValue)}/>
                        </DemoContainer>
                        <DemoContainer components={['TimePicker']}>
                            <TimePicker label="Время конца" value={timeTo}
                                        onChange={(newValue) => setTimeTo(newValue)}/>
                        </DemoContainer>
                    </LocalizationProvider>
                    <TextField id="outlined-basic" label="Адрес" variant="outlined"
                               onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAddress(e.target.value)}/>
                    <TextField id="outlined-basic" label="Менеджер" variant="outlined"
                               onChange={(e: React.ChangeEvent<HTMLInputElement>) => setManager(e.target.value)}/>
                    <Button onClick={createTimeLine}>Сохранить</Button>
                </Box>
            </Drawer>
        </React.Fragment>
    );
}
