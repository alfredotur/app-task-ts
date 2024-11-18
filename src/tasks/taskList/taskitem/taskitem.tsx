import {
    ListItem,
    IconButton,
    Tooltip,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { ITask } from '../../model/taskModel';
import {StyledCard, StyledListItemText, StyledCheckIconCircle} from '../../styles/taskStyle'

interface ITaskItemProps {
    taskItem: ITask
    completeTask: (id: number) => Promise<void>
    deleteTask: (id: number, title: string) => Promise<void>

}
const TaskItem: React.FC<ITaskItemProps> = ({ taskItem, completeTask, deleteTask }) => {
    return (
        <ListItem>
            <StyledCard style={{width: '100%'}}>
            <ListItem>
                <StyledListItemText primary={taskItem.title} completed={taskItem.completed}/>
                { !taskItem.completed && <IconButton edge="end" onClick={() => completeTask(taskItem.id!)}>
                    <Tooltip title="Completar Tarea">
                        <StyledCheckIconCircle/>
                    </Tooltip>
                </IconButton>}
                <IconButton edge="end" aria-label="delete" onClick={() => deleteTask(taskItem.id!, taskItem.title)}>
                    <Tooltip title="Eliminar">
                        <DeleteIcon color="error"/>
                    </Tooltip>
                </IconButton>
            </ListItem>
            </StyledCard>
        </ListItem>
    )
}

export default TaskItem