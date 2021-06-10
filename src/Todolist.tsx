import React, {useCallback, useEffect} from "react";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {Task} from "./Task";
import {FilterValuesType} from "./state/todolists-reducer";
import {TaskStatuses, TaskType} from "./stories/api/todolist-api";
import {fetchTasksTC} from "./state/tasks-reducer";
import {useDispatch} from "react-redux";

type TodoListPropsType = {
    id: string
    title: string
    todoListFilter: FilterValuesType
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
        dispatch(fetchTasksTC(props.id))
    }, [])

    let allTodolistTasks = props.tasks
    let tasksForTodolist = allTodolistTasks

    if (props.todoListFilter === "active") {
        tasksForTodolist = allTodolistTasks.filter(t => t.status === TaskStatuses.New)
    }
    if (props.todoListFilter === "completed") {
        tasksForTodolist = allTodolistTasks.filter(t => t.status === TaskStatuses.Completed)
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