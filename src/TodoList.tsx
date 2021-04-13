import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValuesType, TaskType} from "./App";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";

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

function Todolist(props: TodoListPropsType) {
    const tasks = props.tasks.map(t => {
        const removeTask = () => props.removeTask(t.id, props.id)
        const changeStatus = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(t.id, e.currentTarget.checked, props.id)
        const changeTaskTitle = (title: string) => props.changeTaskTitle(t.id, title, props.id)

        return (
            <li key={t.id} className={t.isDone ? "is-done" : ""}>
                <Checkbox
                    color={"primary"}
                    checked={t.isDone}
                    onChange={changeStatus}
                />
                <EditableSpan title={t.title} changeTitle={changeTaskTitle}/>
                <IconButton onClick={removeTask}>
                    <Delete/>
                </IconButton>
            </li>
        )
    })
    const addTask = (title: string) => props.addTask(title, props.id)
    const setAllFilterValue = () => props.changeTodoListFilter("all", props.id)
    const setActiveFilterValue = () => props.changeTodoListFilter("active", props.id)
    const setCompletedFilterValue = () => props.changeTodoListFilter("completed", props.id)
    const changeTodoListTitle = (title: string) => props.changeTodoListTitle(title, props.id)
    const removeTodoList = () => props.removeTodoList(props.id)


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
                {tasks}
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
}

export default Todolist;