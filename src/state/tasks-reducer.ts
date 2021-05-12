import {TasksStateType, TaskType} from "../AppWithRedux";
import {v1} from "uuid";
import {AddTodoListAT, RemoveTodoListsAT} from "./todolists-reducer";

export type RemoveTaskActionType = {
    type: "REMOVE_TASK"
    taskId: string
    todolistId: string
}

export type AddTaskActionType = {
    type: "ADD_TASK"
    title: string
    todolistId: string
}

export type ChangeTaskStatusActionType = {
    type: "CHANGE_TASK_STATUS"
    taskId: string
    isDone: boolean
    todolistId: string
}

export type ChangeTaskTitleActionType = {
    type: "CHANGE_TASK_TITLE"
    taskId: string
    newTitle: string
    todolistId: string
}

export type ActionsType = RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodoListAT
    | RemoveTodoListsAT

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case "REMOVE_TASK": {
            let stateCopy = {...state}
            stateCopy[action.todolistId] = stateCopy[action.todolistId].filter(task => task.id !== action.taskId)
            return stateCopy
        }
        case "ADD_TASK": {
            const newTask: TaskType = {
                id: v1(),
                title: action.title,
                isDone: false
            }
            const updatedTasks = [newTask, ...state[action.todolistId]]
            return {...state, [action.todolistId]: updatedTasks}
        }
        case "CHANGE_TASK_STATUS": {
            let stateCopy = {...state}
            const updatedTasks = stateCopy[action.todolistId].map(t => t.id === action.taskId ? {
                ...t,
                isDone: action.isDone
            } : t)
            return {...state, [action.todolistId]: updatedTasks}
        }
        case "CHANGE_TASK_TITLE": {
            let stateCopy = {...state}
            const updatedTasks = stateCopy[action.todolistId].map(t => t.id === action.taskId ? {
                ...t,
                title: action.newTitle
            } : t)
            return {...state, [action.todolistId]: updatedTasks}
        }
        case "ADD-TODOLIST": {
            return {...state, [action.id]: []}
        }
        case "REMOVE-TODOLIST": {
            let stateCopy = {...state}
            delete stateCopy[action.todoListID]
            return stateCopy
        }
        default:
            return state
    }
}

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return {type: "REMOVE_TASK", taskId, todolistId}
}
export const addTaskAC = (title: string, todolistId: string): AddTaskActionType => {
    return {type: "ADD_TASK", title, todolistId}
}
export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string): ChangeTaskStatusActionType => {
    return {type: "CHANGE_TASK_STATUS", taskId, isDone, todolistId}
}
export const changeTaskTitleAC = (taskId: string, newTitle: string, todolistId: string): ChangeTaskTitleActionType => {
    return {type: "CHANGE_TASK_TITLE", taskId, newTitle, todolistId}
}