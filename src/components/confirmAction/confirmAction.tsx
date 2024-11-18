import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from "@mui/material";
import React from "react";

interface IConfirmActionsProps {
    title: string
    message: string
    open: boolean
    confirmAction: () => Promise<void>
    closeAction: () => void
}

const ConfirmAction: React.FC<IConfirmActionsProps> = ({ title, open, message, closeAction, confirmAction }) => {

    return (
        <Dialog
            open={open}
            onClose={closeAction}
            aria-labelledby="responsive-dialog-title"
        >
            <DialogTitle id="responsive-dialog-title">{title}</DialogTitle>
            <DialogContent>
                <DialogContentText color="error">{message}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button
                    autoFocus
                    onClick={closeAction}
                    variant="outlined"
                    size="small"
                    color="warning"
                >
                    Cancelar
                </Button>
                <Button
                    onClick={confirmAction}
                    autoFocus
                    variant="outlined"
                    size="small"
                >
                    Eliminar
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default ConfirmAction