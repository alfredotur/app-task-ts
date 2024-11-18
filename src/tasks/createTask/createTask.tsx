import React, { ChangeEvent, useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import Grid from '@mui/material/Grid2';

interface IAddTaskFormProps {
    open: boolean
    close: () => void
    save: (titleParams: string, userIdParams: number) => Promise<void>
}

const AddTaskForm: React.FC<IAddTaskFormProps> = ({ open, close, save }) => {

    const [title, setTitle] = useState<string>('')
    const [userId, setUserId] = useState<number>(0)

    const handleChangeUser = (event: SelectChangeEvent) => {
        setUserId(parseInt(event.target.value))
    }

    const handleChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value)
    }

    const validForm = (): Boolean => {
        if (title === '') {
            return false
        }

        if (userId === 0) {
            return false
        }

        return true
    }

    const savTask = () => {
        if (validForm()) {
            save(title, userId)
            setTitle('')
            setUserId(0)
        }
    }

    const cancelTask = () => {
        close()
        setTitle('')
        setUserId(0)
    }

    return (
        <Dialog
            open={open}
            onClose={close}
        >
            <DialogTitle>Crear Tarea</DialogTitle>
            <DialogContent>
                <Grid container spacing={1} marginTop={1} gap={3}>
                    <Grid size={12}>
                        <TextField
                            error={title === ''}
                            id="outlined-disabled"
                            label="Titulo"
                            placeholder="Titulo de la tarea"
                            size="small"
                            fullWidth
                            value={title}
                            onChange={handleChangeTitle}
                        />
                    </Grid>
                    <Grid size={12}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Age</InputLabel>
                            <Select
                                error={userId === 0}
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={userId.toString()}
                                label="Age"
                                onChange={handleChangeUser}
                                size="small"
                            >
                                <MenuItem value={1}>Pedro</MenuItem>
                                <MenuItem value={2}>Juan</MenuItem>
                                <MenuItem value={3}>Ana</MenuItem>
                            </Select>
                        </FormControl>

                    </Grid>
                </Grid>

            </DialogContent>
            <DialogActions>
                <DialogActions>
                    <Button
                        autoFocus
                        onClick={cancelTask}
                        variant="outlined"
                        size="small"
                        color="warning"
                    >
                        Cancelar
                    </Button>
                    <Button
                        onClick={savTask}
                        autoFocus
                        variant="outlined"
                        size="small"
                    >
                        Crear
                    </Button>
                </DialogActions>
            </DialogActions>
        </Dialog>

    )
}

export default AddTaskForm