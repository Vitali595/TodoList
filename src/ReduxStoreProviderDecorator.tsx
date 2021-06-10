import React from 'react';
import {Provider} from 'react-redux';
import {combineReducers, createStore} from 'redux';
import {tasksReducer} from "./state/tasks-reducer";
import {todolistsReducer} from "./state/todolists-reducer";
import {AppRootStateType} from "./state/store";
import {v1} from "uuid";
import {TaskPriorities, TaskStatuses} from "./stories/api/todolist-api";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
})

const initialGlobalState: AppRootStateType = {
    todolists: [
        {id: "todolistId1", title: "What to learn", filter: "all", order: 0, addedDate: ""},
        {id: "todolistId2", title: "What to buy", filter: "all", order: 0, addedDate: ""}
    ],
    tasks: {
        ["todolistId1"]: [
            {
                id: v1(), title: "HTML&CSS", status: TaskStatuses.New,
                todoListId: "todolistId1",
                addedDate: "",
                deadline: "",
                description: "",
                order: 0,
                priority: TaskPriorities.Low,
                startDate: ""
            },
            {
                id: v1(), title: "JS", status: TaskStatuses.New,
                todoListId: "todolistId1",
                addedDate: "",
                deadline: "",
                description: "",
                order: 0,
                priority: TaskPriorities.Low,
                startDate: ""
            }
        ],
        ["todolistId2"]: [
            {
                id: v1(), title: "Milk", status: TaskStatuses.New,
                todoListId: "todolistId2",
                addedDate: "",
                deadline: "",
                description: "",
                order: 0,
                priority: TaskPriorities.Low,
                startDate: ""
            },
            {
                id: v1(), title: "React Book", status: TaskStatuses.New,
                todoListId: "todolistId2",
                addedDate: "",
                deadline: "",
                description: "",
                order: 0,
                priority: TaskPriorities.Low,
                startDate: ""
            }
        ]
    }
};

export const storyBookStore = createStore(rootReducer, initialGlobalState);

export const ReduxStoreProviderDecorator = (storyFn: () => React.ReactNode) => (
    <Provider
        store={storyBookStore}>{storyFn()}
    </Provider>)