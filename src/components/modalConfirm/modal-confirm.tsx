import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Modal from '@mui/material/Modal';

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

export default function ModalConfirm(props: any) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>
            <Button onClick={handleOpen}>{props.name}</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description"
            >
                <Box sx={{...style, width: 300}}>
                    <h3 id="child-modal-title">Вы уверены, что хотите продолжить?</h3>
                    <Stack spacing={2} direction="row" className={'btn_group'}>
                        <Button onClick={handleClose}>Да, уверен</Button>
                        <Button onClick={handleClose}>Нет</Button>
                    </Stack>
                </Box>
            </Modal>
        </div>
    );
}
