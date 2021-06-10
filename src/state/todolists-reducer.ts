import {v1} from "uuid";
import {todolistAPI, TodolistType} from "../stories/api/todolist-api";
import {Dispatch} from "redux";

export type RemoveTodoListsAT = {
    type: "REMOVE-TODOLIST"
    todolistId: string
}

export type AddTodoListAT = {
    type: "ADD-TODOLIST"
    todolist: TodolistType
}

type ChangeTodoListTitleAT = {
    type: "CHANGE-TODOLIST-TITLE"
    title: string
    todolistId: string
}

type ChangeTodoListFilterAT = {
    type: "CHANGE-TODOLIST-FILTER"
    newFilterValue: FilterValuesType
    todolistId: string
}

export type SetTodolistsAT = {
    type: "SET-TODOLISTS"
    todolists: Array<TodolistType>
}

export type ActionType = RemoveTodoListsAT
    | AddTodoListAT
    | ChangeTodoListTitleAT
    | ChangeTodoListFilterAT
    | SetTodolistsAT

const initialState: Array<TodolistDomainType> = []

export type FilterValuesType = "all" | "completed" | "active"

export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
}

export const todolistsReducer = (todoLists: Array<TodolistDomainType> = initialState, action: ActionType): Array<TodolistDomainType> => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return todoLists.filter(tl => tl.id !== action.todolistId)
        case "ADD-TODOLIST":
            const newTodoList: TodolistDomainType = {
                ...action.todolist, filter: "all"
            }
            return [newTodoList, ...todoLists]
        case "CHANGE-TODOLIST-TITLE":
            return todoLists.map(tl => tl.id === action.todolistId ? {...tl, title: action.title} : tl)
        case "CHANGE-TODOLIST-FILTER":
            return todoLists.map(tl => tl.id === action.todolistId ? {...tl, filter: action.newFilterValue} : tl)
        case "SET-TODOLISTS": {
            return action.todolists.map(tl => {
                return {
                    ...tl,
                    filter: "all"
                }
            })
        }
        default:
            return todoLists
    }
}

export const removeTodoListAC = (todolistId: string): RemoveTodoListsAT => {
    return {
        type: "REMOVE-TODOLIST",
        todolistId: todolistId,
    }
}
export const addTodolistAC = (todolist: TodolistType): AddTodoListAT => {
    return {type: "ADD-TODOLIST", todolist}
}
export const changeTodoListTitleAC = (title: string, todolistId: string): ChangeTodoListTitleAT => {
    return {
        type: "CHANGE-TODOLIST-TITLE",
        title: title,
        todolistId: todolistId
    }
}

export const changeTodoListFilterAC = (newFilterValue: FilterValuesType, todolistId: string): ChangeTodoListFilterAT => {
    return {
        type: "CHANGE-TODOLIST-FILTER",
        newFilterValue: newFilterValue,
        todolistId: todolistId
    }
}

export const setTodolistsAC = (todolists: Array<TodolistType>): SetTodolistsAT => {
    return {type: "SET-TODOLISTS", todolists}
}

export const fetchTodolistsTC = () => {
    return (dispatch: Dispatch) => {
        todolistAPI.getTodolists()
            .then((res) => {
                dispatch(setTodolistsAC(res.data))
            })
    }
}

export const removeTodolistTC = (todolistId: string) => {
    return (dispatch: Dispatch) => {
        todolistAPI.deleteTodolist(todolistId)
            .then(res => {
                dispatch(removeTodoListAC(todolistId))
            })
    }
}

export const addTodolistTC = (title: string) => {
    return (dispatch: Dispatch) => {
        todolistAPI.createTodolist(title)
            .then(res => {
                dispatch(addTodolistAC(res.data.data.item))
            })
    }
}

export const changeTodolistTitleTC = (todolistId: string, title: string) => {
    return (dispatch: Dispatch) => {
        todolistAPI.updateTodolist(todolistId, title)
            .then(res => {
                dispatch(changeTodoListTitleAC(title, todolistId))
            })
    }
}