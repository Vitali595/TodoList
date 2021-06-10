import React, {useCallback, useEffect} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    addTodolistTC,
    changeTodoListFilterAC,
    changeTodolistTitleTC,
    fetchTodolistsTC,
    FilterValuesType,
    removeTodolistTC,
    TodolistDomainType
} from "./state/todolists-reducer";
import {addTaskTC, removeTaskTC, updateTaskTC} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {TaskStatuses, TaskType} from "./stories/api/todolist-api";

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function AppWithRedux() {
// BLL:

    useEffect(() => {
        dispatch(fetchTodolistsTC())
    }, [])

    let todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists)
    let tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    let dispatch = useDispatch()

    const removeTask = useCallback((taskId: string, todolistId: string) => {
        dispatch(removeTaskTC(taskId, todolistId))
    }, [dispatch])
    const addTask = useCallback((title: string, todolistId: string) => {
        dispatch(addTaskTC(title, todolistId))
    }, [dispatch])
    const changeTaskStatus = useCallback((taskId: string, newIsDoneValue: boolean, todolistId: string) => {
        dispatch(updateTaskTC(taskId, {status: newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New}, todolistId))
    }, [dispatch])
    const changeTaskTitle = useCallback((taskId: string, title: string, todolistId: string) => {
        dispatch(updateTaskTC(taskId, {title}, todolistId))
    }, [dispatch])

    const removeTodoList = useCallback((todolistId: string) => {
        dispatch(removeTodolistTC(todolistId))
    }, [dispatch])
    const addTodoList = useCallback((title: string) => {
        dispatch(addTodolistTC(title))
    }, [dispatch])
    const changeTodoListFilter = useCallback((newFilterValue: FilterValuesType, todolistId: string) => {
        dispatch(changeTodoListFilterAC(newFilterValue, todolistId))
    }, [dispatch])
    const changeTodoListTitle = useCallback((title: string, todolistId: string) => {
        dispatch(changeTodolistTitleTC(todolistId, title))
    }, [dispatch])

// UI:

    const todolistComponents = todolists.map(tl => {
        return (
            <Grid item key={tl.id}>
                <Paper elevation={6} style={{padding: "20px"}}>
                    <Todolist
                        id={tl.id}
                        title={tl.title}
                        tasks={tasks[tl.id]}
                        removeTask={removeTask}
                        todoListFilter={tl.filter}
                        addTask={addTask}
                        changeTodoListFilter={changeTodoListFilter}
                        changeTaskStatus={changeTaskStatus}
                        removeTodoList={removeTodoList}
                        addTodoList={addTodoList}
                        changeTaskTitle={changeTaskTitle}
                        changeTodoListTitle={changeTodoListTitle}
                    />
                </Paper>
            </Grid>
        )
    })
    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar style={{justifyContent: "space-between"}}>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        Todolists
                    </Typography>
                    <Button variant={"outlined"} color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: "20px 0px"}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={3}>
                    {todolistComponents}
                </Grid>
            </Container>
        </div>
    );
}

export default AppWithRedux;

