import React,{useState} from "react";
import { ITask } from "../model/taskModel";
import { List, Pagination } from "@mui/material"
import TaskItem from "./taskitem/taskitem";

interface ITaskListProps {
    list: ITask[]
    completeTask: (id: number) => Promise<void>
    deleteTask: (id: number, title: string) => Promise<void>
}

const Tasklist: React.FC<ITaskListProps> = ({ list, completeTask, deleteTask }) => {

    const [currentPage, setCurrentPage] = useState<number>(1);
    const itemsPerPage = 5;


    const indexOfLastTask = currentPage * itemsPerPage;
    const indexOfFirstTask = indexOfLastTask - itemsPerPage;
    const currentTasks = list.slice(indexOfFirstTask, indexOfLastTask);

    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setCurrentPage(value);
    };

    const totalPages = Math.ceil(list.length / itemsPerPage);


    return (
        <>
            <List dense={true}>
                {currentTasks.map(task => (
                    <TaskItem
                        key={task.id}
                        taskItem={task}
                        completeTask={completeTask}
                        deleteTask={deleteTask}
                    />
                ))}
            </List>

            <Pagination
                count={totalPages}
                page={currentPage}
                onChange={handlePageChange}
                color="primary"
                variant="outlined"
                shape="rounded"
            />
        </>
    )
}

export default Tasklist