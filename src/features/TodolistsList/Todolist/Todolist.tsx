import React, {useCallback, useEffect} from "react";
import {AddItemForm} from "../../../components/AddItemForm/AddItemForm";
import {EditableSpan} from "../../../components/EditableSpan/EditableSpan";
import {Button, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {Task} from "./Task/Task";
import {FilterValuesType, TodolistDomainType} from "./todolists-reducer";
import {TaskStatuses, TaskType} from "../../../api/todolist-api";
import {fetchTasksTC} from "./Task/tasks-reducer";
import {useDispatch} from "react-redux";

type TodoListPropsType = {
    todolist: TodolistDomainType
    tasks: Array<TaskType>
    addTask: (title: string, todolistId: string) => void
    removeTask: (taskId: string, todolistId: string) => void
    changeTodoListFilter: (newFilterValue: FilterValuesType, todolistId: string) => void
    changeTaskStatus: (taskId: string, newIsDoneValue: boolean, todolistId: string) => void
    removeTodoList: (todolistId: string) => void
    addTodoList: (title: string) => void
    changeTaskTitle: (taskId: string, title: string, todolistId: string) => void
    changeTodoListTitle: (title: string, todolistId: string) => void
}

export const Todolist = React.memo((props: TodoListPropsType) => {

    console.log("Todolist is called")

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchTasksTC(props.todolist.id))
    }, [])

    let allTodolistTasks = props.tasks
    let tasksForTodolist = allTodolistTasks

    if (props.todolist.filter === "active") {
        tasksForTodolist = allTodolistTasks.filter(t => t.status === TaskStatuses.New)
    }
    if (props.todolist.filter === "completed") {
        tasksForTodolist = allTodolistTasks.filter(t => t.status === TaskStatuses.Completed)
    }

    const addTask = useCallback((title: string) => props.addTask(title, props.todolist.id), [props.addTask, props.todolist.id])

    const changeTodoListTitle =
        useCallback((title: string) => props.changeTodoListTitle(title, props.todolist.id),
            [props.changeTodoListTitle, props.todolist.id])

    const removeTodoList = () => props.removeTodoList(props.todolist.id)

    const setAllFilterValue =
        useCallback(() => props.changeTodoListFilter("all", props.todolist.id),
            [props.changeTodoListFilter, props.todolist.id])

    const setActiveFilterValue =
        useCallback(() => props.changeTodoListFilter("active", props.todolist.id),
            [props.changeTodoListFilter, props.todolist.id])

    const setCompletedFilterValue =
        useCallback(() => props.changeTodoListFilter("completed", props.todolist.id),
            [props.changeTodoListFilter, props.todolist.id])


    const removeTask =
        useCallback((taskId: string) => props.removeTask(taskId, props.todolist.id),
            [props.removeTask, props.todolist.id])

    const changeTaskStatus =
        useCallback((taskId: string, newIsDoneValue: boolean) => props.changeTaskStatus(taskId, newIsDoneValue, props.todolist.id),
            [props.changeTaskStatus, props.todolist.id])

    const changeTaskTitle =
        useCallback((taskId: string, newValue: string) => props.changeTaskTitle(taskId, newValue, props.todolist.id),
            [props.changeTaskTitle, props.todolist.id])


    return (
        <div>
            <h3>
                <EditableSpan title={props.todolist.title} changeTitle={changeTodoListTitle} disabled={props.todolist.entityStatus === "loading"}/>
                <IconButton onClick={removeTodoList} disabled={props.todolist.entityStatus === "loading"}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask} disabled={props.todolist.entityStatus === "loading"}/>
            <ul style={{listStyle: "none", padding: "0px"}}>
                {
                    tasksForTodolist.map(t => <Task
                        key={t.id} task={t}
                        changeTaskStatus={changeTaskStatus}
                        removeTask={removeTask}
                        changeTaskTitle={changeTaskTitle}
                        disabled={props.todolist.entityStatus === "loading"}/>
                    )}
            </ul>
            <div>
                <Button
                    style={{marginRight: "5px"}}
                    size={"small"}
                    color={"default"}
                    variant={props.todolist.filter === "all" ? "contained" : "outlined"}
                    onClick={setAllFilterValue}
                    disabled={props.todolist.entityStatus === "loading"}>All
                </Button>
                <Button
                    style={{marginRight: "5px"}}
                    size={"small"}
                    color={"primary"}
                    variant={props.todolist.filter === "active" ? "contained" : "outlined"}
                    onClick={setActiveFilterValue}
                    disabled={props.todolist.entityStatus === "loading"}>Active
                </Button>
                <Button
                    style={{marginRight: "5px"}}
                    size={"small"}
                    color={"secondary"}
                    variant={props.todolist.filter === "completed" ? "contained" : "outlined"}
                    onClick={setCompletedFilterValue}
                    disabled={props.todolist.entityStatus === "loading"}>Completed
                </Button>
            </div>
        </div>
    )
})