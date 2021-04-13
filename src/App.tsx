import React, {useState} from 'react';
import './App.css';
import Todolist from "./TodoList";
import {v1} from "uuid";
import AddItemForm from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type FilterValuesType = "all" | "active" | "completed"

export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function App() {
// BLL:
    const todoListID_1 = v1();
    const todoListID_2 = v1();

    const [todoLists, setTodoLists] = useState<Array<TodolistType>>([
        {id: todoListID_1, title: "What to learn", filter: "all"},
        {id: todoListID_2, title: "What to buy", filter: "all"},
    ])

    const [tasks, setTasks] = useState<TasksStateType>({
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
        const updatedTasks = tasks[todoListID].filter(t => t.id !== taskID)
        setTasks({...tasks, [todoListID]: updatedTasks})
    }

    function addTask(title: string, todoListID: string) {
        const newTask: TaskType = {
            id: v1(),
            title: title,
            isDone: false
        }
        const updatedTasks = [newTask, ...tasks[todoListID]]
        setTasks({...tasks, [todoListID]: updatedTasks})
    }

    function changeTaskStatus(taskID: string, newIsDoneValue: boolean, todoListID: string) {
        const updatedTasks = tasks[todoListID].map(t => t.id === taskID ? {...t, isDone: newIsDoneValue} : t)
        setTasks({...tasks, [todoListID]: updatedTasks})
    }

    function changeTaskTitle(taskID: string, title: string, todoListID: string) {
        const updatedTasks = tasks[todoListID].map(t => t.id === taskID ? {...t, title} : t)
        setTasks({...tasks, [todoListID]: updatedTasks})
    }

    function changeTodoListFilter(newFilterValue: FilterValuesType, todoListID: string) {
        const updatedTodoLists = todoLists.map(tl => tl.id === todoListID ? {...tl, filter: newFilterValue} : tl)
        setTodoLists(updatedTodoLists)
    }

    function removeTodoList(todolistID: string) {
        const updatedTodoLists = todoLists.filter(tl => tl.id !== todolistID)
        setTodoLists(updatedTodoLists)
        delete tasks[todolistID]
    }

    function addTodoList(title: string) {
        const newTodoListID = v1()
        const newTodoList: TodolistType = {
            id: newTodoListID, title, filter: "all"
        }
        setTodoLists([newTodoList, ...todoLists])
        setTasks({...tasks, [newTodoListID]: []})
    }

    function changeTodoListTitle(title: string, todoListID: string) {
        const updateTodoLists  = todoLists.map(tl => tl.id === todoListID ? {...tl, title} : tl)
        setTodoLists(updateTodoLists)
    }

    function getTasksForTodoList(todoList: TodolistType) {
        switch (todoList.filter) {
            case "active":
                return tasks[todoList.id].filter(t => t.isDone === false)
            case "completed":
                return tasks[todoList.id].filter(t => t.isDone === true)
            default:
                return tasks[todoList.id]
        }
    }
// UI:
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

export default App;

