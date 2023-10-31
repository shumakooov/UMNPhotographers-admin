import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Modal from '@mui/material/Modal';
import './modal-ced.css';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function ModalCED(props: any) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [openChild, setOpenChild] = React.useState(false);
    const handleOpenChild = () => {
        setOpenChild(true);
    };
    const handleCloseChild = () => {
        setOpenChild(false);
    };

    return (
        <div>
            <Button onClick={handleOpen}>{props.name}</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    {props.children}

                    <Stack spacing={2} direction="row" className={'btn_group'}>
                        <Button onClick={handleOpenChild} variant="contained">Сохранить</Button>
                        <Button onClick={handleOpenChild} variant="contained">Удалить</Button>
                        <Button onClick={handleClose} variant="contained">Отменить</Button>
                    </Stack>
                </Box>
            </Modal>

            <React.Fragment>
                <Modal
                    open={openChild}
                    onClose={handleCloseChild}
                    aria-labelledby="child-modal-title"
                    aria-describedby="child-modal-description"
                >
                    <Box sx={{...style, width: 300}}>
                        <h3 id="child-modal-title">Вы уверены, что хотите продолжить?</h3>
                        <Stack spacing={2} direction="row" className={'btn_group'}>
                            <Button onClick={() => {
                                handleCloseChild();
                                handleClose()
                            }}>Да, уверен</Button>
                            <Button onClick={() => {
                                handleCloseChild();
                                handleClose()
                            }}>Нет</Button>
                        </Stack>
                    </Box>
                </Modal>
            </React.Fragment>
        </div>
    );
}
