import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import CamerasTable from "./cameras-table";
import OpticsTable from "./optics-table";
import MemoryTable from "./memory-table";
import LaptopTable from "./laptops-table";
import FlashesTable from "./flashes-table";
import AccumulatorsTable from "./accumulators-table";
import AdditionalEquipTable from "./additional-equip-table";

export default function DevicesPage() {
    const [value, setValue] = React.useState('1');

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    return (
        <>
            <Box sx={{ width: '100%', typography: 'body1' }}>
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={handleChange} aria-label="lab API tabs example">
                            <Tab label="Камеры" value="1" />
                            <Tab label="Оптика" value="2" />
                            <Tab label="Карты памяти" value="3" />
                            <Tab label="Ноутбуки" value="4" />
                            <Tab label="Вспышка" value="5" />
                            <Tab label="Аккумуляторы" value="6" />
                            <Tab label="Доп. техника" value="7" />
                        </TabList>
                    </Box>
                    <TabPanel value="1"><CamerasTable /></TabPanel>
                    <TabPanel value="2"><OpticsTable /></TabPanel>
                    <TabPanel value="3"><MemoryTable /></TabPanel>
                    <TabPanel value="4"><LaptopTable /></TabPanel>
                    <TabPanel value="5"><FlashesTable /></TabPanel>
                    <TabPanel value="6"><AccumulatorsTable /></TabPanel>
                    <TabPanel value="7"><AdditionalEquipTable /></TabPanel>
                </TabContext>
            </Box>
        </>
    );
}
