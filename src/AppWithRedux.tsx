import React from 'react';
import './App.css';
import Todolist from "./TodoList";
import AddItemForm from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    addTodolistAC,
    changeTodoListFilterAC,
    changeTodoListTitleAC,
    removeTodoListAC
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type FilterValuesType = "all" | "active" | "completed"

export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function AppWithRedux() {
// BLL:

    let todolists = useSelector<AppRootStateType, Array<TodoListType>>(state => state.todolists)

    let tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)

    let dispatch = useDispatch()

    function removeTask(taskID: string, todoListID: string) {
        dispatch(removeTaskAC(taskID, todoListID))
    }
    function addTask(title: string, todoListID: string) {
        dispatch(addTaskAC(title, todoListID))
    }
    function changeTaskStatus(taskID: string, newIsDoneValue: boolean, todoListID: string) {
        dispatch(changeTaskStatusAC(taskID, newIsDoneValue, todoListID))
    }
    function changeTaskTitle(taskID: string, title: string, todoListID: string) {
        dispatch(changeTaskTitleAC(taskID, title, todoListID))
    }

    function changeTodoListFilter(newFilterValue: FilterValuesType, todoListID: string) {
        dispatch(changeTodoListFilterAC(newFilterValue, todoListID))
    }
    function removeTodoList(todolistID: string) {
        let action = removeTodoListAC(todolistID)
        dispatch(action)
    }
    function addTodoList(title: string) {
        let action = addTodolistAC(title)
        dispatch(action)
    }
    function changeTodoListTitle(title: string, todoListID: string) {
        dispatch(changeTodoListTitleAC(title, todoListID))
    }

// UI:

    function getTasksForTodoList(todoList: TodoListType) {
        switch (todoList.filter) {
            case "active":
                return tasks[todoList.id].filter(t => t.isDone === false)
            case "completed":
                return tasks[todoList.id].filter(t => t.isDone === true)
            default:
                return tasks[todoList.id]
        }
    }
    const todolistComponents = todolists.map(tl => {
        return (
            <Grid item key={tl.id}>
            <Paper elevation={6} style={{padding: "20px"}}>
            <Todolist
                id={tl.id}
                title={tl.title}
                tasks={getTasksForTodoList(tl)}
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

