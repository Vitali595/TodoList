import {setIsLoggedInAC} from "../features/Login/auth-reducer";
import {Dispatch} from "redux";
import {authAPI} from "../api/todolist-api";

export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed"

const initialState = {
    status: "loading" as RequestStatusType,
    error: null as string | null,
    isInitialized: false
}

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case "APP/SET_STATUS":
            return {...state, status: action.status}
        case "APP/SET_ERROR":
            return {...state, error: action.error}
        case "APP/SET_IS_INITIALIZED":
            return {...state, isInitialized: action.isInitialized}
        default:
            return state
    }
}

export const setAppStatusAC = (status: RequestStatusType) => ({type: "APP/SET_STATUS", status} as const)
export const setAppErrorAC = (error: string | null) => ({type: "APP/SET_ERROR", error} as const)
export const setIsInitializedAC = (isInitialized: boolean) => ({type: "APP/SET_IS_INITIALIZED", isInitialized} as const)

export const initializeAppTC = () => (dispatch: Dispatch) => {
    authAPI.me()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC(true))
            } else {
                // handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error) => {
            // handleServerNetworkError(error, dispatch)
        })
        .finally(() => {
            dispatch(setIsInitializedAC(true))
        })
}

export type InitialStateType = typeof initialState

export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>
export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>
export type SetIsInitializedActionType = ReturnType<typeof setIsInitializedAC>

type ActionsType = SetAppStatusActionType | SetAppErrorActionType | SetIsInitializedActionType