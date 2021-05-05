import React, {useReducer, useState} from 'react';
import './App.css';
import Todolist from "./TodoList";
import {v1} from "uuid";
import AddItemForm from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    addTodolistAC,
    changeTodoListFilterAC,
    changeTodoListTitleAC,
    removeTodoListAC,
    todolistsReducer
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";

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

function AppWithReducer() {
// BLL:
    const todoListID_1 = v1();
    const todoListID_2 = v1();

    const [todoLists, dispatchToTodolists] = useReducer(todolistsReducer, [
        {id: todoListID_1, title: "What to learn", filter: "all"},
        {id: todoListID_2, title: "What to buy", filter: "all"},
    ])

    const [tasks, dispatchToTasks] = useReducer(tasksReducer, {
        [todoListID_1]: [
            {id: v1(), title: "HTML", isDone: true},
            {id: v1(), title: "CSS", isDone: true},
            {id: v1(), title: "React", isDone: false}
        ],
        [todoListID_2]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "Meat", isDone: true},
            {id: v1(), title: "Book", isDone: false}
        ]
    })

    function removeTask(taskID: string, todoListID: string) {
        dispatchToTasks(removeTaskAC(taskID, todoListID))
    }
    function addTask(title: string, todoListID: string) {
        dispatchToTasks(addTaskAC(title, todoListID))
    }
    function changeTaskStatus(taskID: string, newIsDoneValue: boolean, todoListID: string) {
        dispatchToTasks(changeTaskStatusAC(taskID, newIsDoneValue, todoListID))
    }
    function changeTaskTitle(taskID: string, title: string, todoListID: string) {
        dispatchToTasks(changeTaskTitleAC(taskID, title, todoListID))
    }

    function changeTodoListFilter(newFilterValue: FilterValuesType, todoListID: string) {
        dispatchToTodolists(changeTodoListFilterAC(newFilterValue, todoListID))
    }
    function removeTodoList(todolistID: string) {
        let action = removeTodoListAC(todolistID)
        dispatchToTodolists(action)
        dispatchToTasks(action)
    }
    function addTodoList(title: string) {
        let action = addTodolistAC(title)
        dispatchToTodolists(action)
        dispatchToTasks(action)
    }
    function changeTodoListTitle(title: string, todoListID: string) {
        dispatchToTodolists(changeTodoListTitleAC(title, todoListID))
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
    const todolistComponents = todoLists.map(tl => {
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

export default AppWithReducer;

