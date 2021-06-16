import React, {ChangeEvent} from 'react';
import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "../../../../components/EditableSpan/EditableSpan";
import {Delete} from "@material-ui/icons";
import {TaskStatuses, TaskType} from "../../../../api/todolist-api";

export type TaskPropsType = {
    task: TaskType
    changeTaskStatus: (taskId: string, newIsDoneValue: boolean) => void
    removeTask: (taskId: string) => void
    changeTaskTitle: (taskId: string, newValue: string) => void
    disabled?: boolean
}

export const Task = React.memo(({
                                    task,
                                    changeTaskStatus,
                                    changeTaskTitle,
                                    removeTask,
                                    ...props
                                }: TaskPropsType) => {

    console.log("Task called")

    const removeTaskHandler = () => removeTask(task.id)
    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => changeTaskStatus(task.id, e.currentTarget.checked)
    const changeTaskTitleHandler = (newValue: string) => changeTaskTitle(task.id, newValue)


    return (
        <li key={task.id} className={task.status ? "is-done" : ""}>
            <Checkbox
                color={"primary"}
                checked={task.status === TaskStatuses.Completed}
                onChange={changeTaskStatusHandler}
                disabled={props.disabled}
            />
            <EditableSpan title={task.title} changeTitle={changeTaskTitleHandler} disabled={props.disabled}/>
            <IconButton onClick={removeTaskHandler} disabled={props.disabled}>
                <Delete/>
            </IconButton>
        </li>
    )
})