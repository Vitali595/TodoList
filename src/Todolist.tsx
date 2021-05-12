import React, {ChangeEvent, useCallback} from "react";
import {FilterValuesType, TaskType, TodoListType} from "./AppWithRedux";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {Task} from "./Task";

type TodoListPropsType = {
    id: string
    title: string
    todoListFilter: FilterValuesType
    tasks: Array<TaskType>
    addTask: (title: string, todoListID: string) => void
    removeTask: (taskID: string, todoListID: string) => void
    changeTodoListFilter: (newFilterValue: FilterValuesType, todoListID: string) => void
    changeTaskStatus: (taskID: string, newIsDoneValue: boolean, todoListID: string) => void
    removeTodoList: (todolistID: string) => void
    addTodoList: (title: string) => void
    changeTaskTitle: (taskID: string, title: string, todoListID: string) => void
    changeTodoListTitle: (title: string, todoListID: string) => void
}

export const Todolist = React.memo((props: TodoListPropsType) => {

    console.log("Todolist is called")

    let allTodolistTasks = props.tasks
    let tasksForTodolist = allTodolistTasks

    if (props.todoListFilter === "active") {
        tasksForTodolist = allTodolistTasks.filter(t => t.isDone === false)
    }
    if (props.todoListFilter === "completed") {
        tasksForTodolist = allTodolistTasks.filter(t => t.isDone === true)
    }

    const addTask = useCallback((title: string) => props.addTask(title, props.id), [props.addTask, props.id])

    const changeTodoListTitle =
        useCallback((title: string) => props.changeTodoListTitle(title, props.id),
            [props.changeTodoListTitle, props.id])

    const removeTodoList = () => props.removeTodoList(props.id)

    const setAllFilterValue =
        useCallback(() => props.changeTodoListFilter("all", props.id),
            [props.changeTodoListFilter, props.id])

    const setActiveFilterValue =
        useCallback(() => props.changeTodoListFilter("active", props.id),
            [props.changeTodoListFilter, props.id])

    const setCompletedFilterValue =
        useCallback(() => props.changeTodoListFilter("completed", props.id),
            [props.changeTodoListFilter, props.id])


    const removeTask =
        useCallback((taskId: string) => props.removeTask(taskId, props.id),
            [props.removeTask, props.id])

    const changeTaskStatus =
        useCallback((taskId: string, newIsDoneValue: boolean) => props.changeTaskStatus(taskId, newIsDoneValue, props.id),
            [props.changeTaskStatus, props.id])

    const changeTaskTitle =
        useCallback((taskId: string, newValue: string) => props.changeTaskTitle(taskId, newValue, props.id),
            [props.changeTaskTitle, props.id])


    return (
        <div>
            <h3>
                <EditableSpan title={props.title} changeTitle={changeTodoListTitle}/>
                <IconButton onClick={removeTodoList}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask}/>
            <ul style={{listStyle: "none", padding: "0px"}}>
                {
                    tasksForTodolist.map(t => <Task
                        key={t.id} task={t}
                        changeTaskStatus={changeTaskStatus}
                        removeTask={removeTask}
                        changeTaskTitle={changeTaskTitle}/>
                    )}
            </ul>
            <div>
                <Button
                    style={{marginRight: "5px"}}
                    size={"small"}
                    color={"default"}
                    variant={props.todoListFilter === "all" ? "contained" : "outlined"}
                    onClick={setAllFilterValue}>All
                </Button>
                <Button
                    style={{marginRight: "5px"}}
                    size={"small"}
                    color={"primary"}
                    variant={props.todoListFilter === "active" ? "contained" : "outlined"}
                    onClick={setActiveFilterValue}>Active
                </Button>
                <Button
                    style={{marginRight: "5px"}}
                    size={"small"}
                    color={"secondary"}
                    variant={props.todoListFilter === "completed" ? "contained" : "outlined"}
                    onClick={setCompletedFilterValue}>Completed
                </Button>
            </div>
        </div>
    )
})