import {FilterValuesType, TodoListType} from "../App";
import {v1} from "uuid";

export type RemoveTodoListsAT = {
    type: "REMOVE-TODOLIST"
    todoListID: string
}

export type AddTodoListAT = {
    type: "ADD-TODOLIST"
    title: string
    id: string
}

type ChangeTodoListTitleAT = {
    type: "CHANGE-TODOLIST-TITLE"
    title: string
    todoListID: string
}

type ChangeTodoListFilterAT = {
    type: "CHANGE-TODOLIST-FILTER"
    newFilterValue: FilterValuesType
    todoListID: string
}

export type ActionType = RemoveTodoListsAT | AddTodoListAT | ChangeTodoListTitleAT | ChangeTodoListFilterAT

export const todoListsReducer = (todoLists: Array<TodoListType>, action: ActionType): Array<TodoListType> => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return todoLists.filter(tl => tl.id !== action.todoListID)
        case "ADD-TODOLIST":
            const newTodoListID = action.id
            const newTodoList: TodoListType = {
                id: newTodoListID, title: action.title, filter: "all"
            }
            return [newTodoList, ...todoLists]
        case "CHANGE-TODOLIST-TITLE":
            return todoLists.map(tl => tl.id === action.todoListID ? {...tl, title: action.title} : tl)
        case "CHANGE-TODOLIST-FILTER":
            return todoLists.map(tl => tl.id === action.todoListID ? {...tl, filter: action.newFilterValue} : tl)
        default:
            return todoLists
    }
}

export const RemoveTodoListAC = (todoListID: string): RemoveTodoListsAT => {
    return {
        type: "REMOVE-TODOLIST",
        todoListID: todoListID,
    }
}
export const AddTodolistAC = (title: string): AddTodoListAT => {
    return {
        type: "ADD-TODOLIST",
        title: title,
        id: v1()
    }
}
export const ChangeTodoListTitleAC = (title: string, todolistId: string): ChangeTodoListTitleAT => {
    return {
        type: "CHANGE-TODOLIST-TITLE",
        title: title,
        todoListID: todolistId
    }
}

export const ChangeTodoListFilterAC = (newFilterValue: FilterValuesType, todolistId: string): ChangeTodoListFilterAT => {
    return {
        type: "CHANGE-TODOLIST-FILTER",
        newFilterValue: newFilterValue,
        todoListID: todolistId
    }
}