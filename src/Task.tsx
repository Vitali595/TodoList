import React, {ChangeEvent} from 'react';
import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@material-ui/icons";
import {TaskType} from "./AppWithRedux";

type TaskPropsType = {
    task: TaskType
    changeTaskStatus: (taskId: string, newIsDoneValue: boolean) => void
    removeTask: (taskId: string) => void
    changeTaskTitle: (taskId: string, newValue: string) => void
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
        <li key={task.id} className={task.isDone ? "is-done" : ""}>
            <Checkbox
                color={"primary"}
                checked={task.isDone}
                onChange={changeTaskStatusHandler}
            />
            <EditableSpan title={task.title} changeTitle={changeTaskTitleHandler}/>
            <IconButton onClick={removeTaskHandler}>
                <Delete/>
            </IconButton>
        </li>
    )
})