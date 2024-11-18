import React, { useEffect, useState } from "react";
import { Button, Typography } from "@mui/material";
import Grid from '@mui/material/Grid2';
import axios from "axios";
import Tasklist from "./taskList/taskList";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import ConfirmAction from "../components/confirmAction/confirmAction";
import AddTaskForm from "./createTask/createTask";
import { ITask } from "./model/taskModel";

const baseURL = "https://jsonplaceholder.typicode.com/todos";


const Task: React.FC<{}> = () => {

    const [tasks, setTaks] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [messageConfirm, setMessageConfirm] = useState('');
    const [idTask, setIdTask] = useState<number>(0);
    const [openMessage, setOpenMessage] = useState(false);
    const [message, setMessage] = useState('')
    const [openMessageError, setOpenMessageError] = useState(false)
    const [openCreateTask, setOpenCreateTask] = useState(false)

    useEffect(() => {
        setOpenDialog(false)
        setOpenMessage(false)
        setOpenMessageError(false)
        getTodos();
    }, [])

    const getTodos = async () => {
        axios
            .get(baseURL)
            .then((response) => {
                setTaks(response.data);
            })
            .catch((error) => {
                console.log(error.messsage);
            });
    };

    const completeTask = async (id: number): Promise<void> => {
        await axios
            .patch(`${baseURL}/${id}`, {
                status: "completed",
            })
            .then(() => {
                setMessage('La tarea fue completada exitosamente.')
                setOpenMessage(true)
            })
            .catch(() => {
                setMessage('Ha ocurrido un error al completar la Tarea.')
                setOpenMessageError(true)
            });
    };

    const deleteTask = async (id: number, title: string): Promise<void> => {
        setMessageConfirm(`Estas seguro que deseas eliminar la tarea: ${title}?`);
        setIdTask(id);
        setOpenDialog(true);
    };

    const removeTask = async () => {
        setOpenDialog(false);
        await axios
            .delete(`${baseURL}/${idTask}`)
            .then(() => {
                setMessage('La tarea fue eliminada exitosamente.')
                setOpenMessage(true)
            })
            .catch(() => {
                setMessage('Ha ocurrido un error al intentar eliminar la tarea.')
                setOpenMessageError(true)
            });
    };

    const closeAction = () => {
        setOpenDialog(false);
    };

    const saveTask = async (title: string, userId: number): Promise<void> => {
        setOpenCreateTask(false)
        const data: ITask = {
            userId: userId,
            title: title,
            completed: false
        }
        await axios.post(`${baseURL}`, { data }).then(() => {
            setMessage(`La tarea: ${title} fue creada exitosamente.`)
            setOpenMessage(true)
        }).catch(() => {
            setMessage(`Ha ocurrido un error al intentar crear la Tarea.`)
            setOpenMessageError(true)
        })
    }

    return (
        <Grid container spacing={2}>
            <Stack sx={{ width: "100%" }}>
                {openMessage && <Alert severity="success" onClose={() => setOpenMessage(false)}>
                    <AlertTitle>Éxito</AlertTitle>
                    {message}
                </Alert>}

                {
                    openMessageError && <Alert severity="warning" onClose={() => { setOpenMessageError(false) }}>
                        {message}
                    </Alert>
                }
            </Stack>
            <Grid size={12}>
                <Typography variant="h5" marginLeft={3}>
                    Gestion de tareas
                </Typography>
            </Grid>
            <Grid size={12} marginLeft={3} marginTop={2}>
                <Button type="button" color="primary" variant="contained" size="small" onClick={() => setOpenCreateTask(true)}>
                    Crear Tarea
                </Button>
            </Grid>
            <Grid size={12}>
                <Tasklist
                    list={tasks}
                    completeTask={completeTask}
                    deleteTask={deleteTask}
                />
            </Grid>
            <ConfirmAction
                open={openDialog}
                message={messageConfirm}
                closeAction={closeAction}
                confirmAction={removeTask}
                title="Eliminar Tarea"
            />

            <AddTaskForm
                open={openCreateTask}
                save={saveTask}
                close={() => setOpenCreateTask(false)}
            />
        </Grid>
    );
}

export default Task
