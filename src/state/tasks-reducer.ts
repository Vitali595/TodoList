import {AddTodoListAT, RemoveTodoListsAT, SetTodolistsAT} from "./todolists-reducer";
import {TasksStateType} from "../AppWithRedux";
import {TaskPriorities, TaskStatuses, TaskType, todolistAPI, UpdateTaskType} from "../stories/api/todolist-api";
import {v1} from "uuid";
import {Dispatch} from "redux";
import {AppRootStateType} from "./store";

export type RemoveTaskActionType = {
    type: "REMOVE_TASK"
    taskId: string
    todolistId: string
}

export type AddTaskActionType = {
    type: "ADD_TASK"
    task: TaskType
}

export type UpdateTaskActionType = {
    type: "UPDATE_TASK"
    taskId: string
    model: UpdateDomainTaskModelType
    todolistId: string
}

export type SetTasksActionType = {
    type: "SET_TASKS"
    tasks: Array<TaskType>
    todolistId: string
}

export type ActionsType = RemoveTaskActionType
    | AddTaskActionType
    | UpdateTaskActionType
    | AddTodoListAT
    | RemoveTodoListsAT
    | SetTodolistsAT
    | SetTasksActionType

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case "REMOVE_TASK": {
            let stateCopy = {...state}
            stateCopy[action.todolistId] = stateCopy[action.todolistId].filter(task => task.id !== action.taskId)
            return stateCopy
        }
        case "ADD_TASK": {
            const newTask = action.task
            const updatedTasks = [newTask, ...state[action.task.todoListId]]
            return {...state, [action.task.todoListId]: updatedTasks}
        }
        case "UPDATE_TASK": {
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(t => t.id === action.taskId ? {
                    ...t,
                    ...action.model
                } : t)
            }
        }
        case "ADD-TODOLIST": {
            return {...state, [action.todolist.id]: []}
        }
        case "REMOVE-TODOLIST": {
            let stateCopy = {...state}
            delete stateCopy[action.todolistId]
            return stateCopy
        }
        case "SET-TODOLISTS": {
            const copyState = {...state}
            action.todolists.forEach(tl => {
                copyState[tl.id] = []
            })
            return copyState
        }
        case "SET_TASKS": {
            const copyState = {...state}
            copyState[action.todolistId] = action.tasks
            return copyState
        }
        default:
            return state
    }
}

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return {type: "REMOVE_TASK", taskId, todolistId}
}

export const addTaskAC = (task: TaskType): AddTaskActionType => {
    return {type: "ADD_TASK", task}
}

export const updateTaskAC = (taskId: string, model: UpdateDomainTaskModelType, todolistId: string): UpdateTaskActionType => {
    return {type: "UPDATE_TASK", taskId, model, todolistId}
}

export const setTasksAC = (tasks: Array<TaskType>, todolistId: string): SetTasksActionType => {
    return {type: "SET_TASKS", tasks, todolistId}
}

export const fetchTasksTC = (todolistId: string) => {
    return (dispatch: Dispatch) => {
        todolistAPI.getTasks(todolistId)
            .then(res => {
                dispatch(setTasksAC(res.data.items, todolistId))
            })
    }
}

export const removeTaskTC = (taskId: string, todolistId: string) => {
    return (dispatch: Dispatch) => {
        todolistAPI.deleteTask(todolistId, taskId)
            .then(res => {
                dispatch(removeTaskAC(taskId, todolistId))
            })
    }
}

export const addTaskTC = (title: string, todolistId: string) => {
    return (dispatch: Dispatch) => {
        todolistAPI.createTask(todolistId, title)
            .then(res => {
                dispatch(addTaskAC(res.data.data.item))
            })
    }
}

export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}

export const updateTaskTC = (taskId: string, domainModel: UpdateDomainTaskModelType, todolistId: string) => {
    return (dispatch: Dispatch, getState: () => AppRootStateType) => {

        const state = getState()

        const task = state.tasks[todolistId].find(t => t.id === taskId)
        if (!task) {
            console.warn("task not found in the state")
            return
        }

        const apiModel: UpdateTaskType = {
            deadline: task.deadline,
            description: task.description,
            priority: task.priority,
            startDate: task.startDate,
            status: task.status,
            title: task.title,
            ...domainModel
        }
        todolistAPI.updateTask(todolistId, taskId, apiModel)
            .then(res => {
                dispatch(updateTaskAC(taskId, domainModel, todolistId))
            })
    }
}