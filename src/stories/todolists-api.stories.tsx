import React, {ChangeEvent, useEffect, useState} from 'react'
import {todolistAPI} from "./api/todolist-api";

export default {
    title: 'API'
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.getTodolists().then((res) => {
            setState(res.data)
        })

    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [title, setTitle] = useState<string>("")

    const createTodolist = () => {
        todolistAPI.createTodolist(title).then((res) => {
            setState(res.data)
        })
    }

    return <div> {JSON.stringify(state)}
        <div>
            <input placeholder={"title"} value={title} onChange={(e) => {
                setTitle(e.currentTarget.value)
            }}/>
            <button onClick={createTodolist}>create todolist</button>
        </div>
    </div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>("")

    const deleteTodolist = () => {
        todolistAPI.deleteTodolist(todolistId).then((res) => {
            setState(res.data)
        })
    }

    return <div> {JSON.stringify(state)}
        <div>
            <input placeholder={"todolistId"} value={todolistId} onChange={(e) => {
                setTodolistId(e.currentTarget.value)
            }}/>
            <button onClick={deleteTodolist}>delete todolist</button>
        </div>
    </div>
}
export const UpdateTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>("")
    const [title, setTitle] = useState<string>("")

    const updateTodolist = () => {
        todolistAPI.updateTodolist(todolistId, title).then((res) => {
            setState(res.data)
        })
    }

    return <div> {JSON.stringify(state)}
        <div>
            <input placeholder={"todolistId"} value={todolistId} onChange={(e) => {
                setTodolistId(e.currentTarget.value)
            }}/>
            <input placeholder={"title"} value={title} onChange={(e) => {
                setTitle(e.currentTarget.value)
            }}/>
            <button onClick={updateTodolist}>update todolist</button>
        </div>
    </div>
}


export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>("")

    const getTasks = () => {
        todolistAPI.getTasks(todolistId).then((res) => {
            setState(res.data)
        })
    }

    return <div> {JSON.stringify(state)}
        <div>
            <input placeholder={"todolistId"} value={todolistId} onChange={(e) => {
                setTodolistId(e.currentTarget.value)
            }}/>
            <button onClick={getTasks}>get tasks</button>
        </div>
    </div>
}
export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>("")
    const [title, setTitle] = useState<string>("")

    const createTask = () => {
        todolistAPI.createTask(todolistId, title).then((res) => {
            setState(res.data)
        })
    }

    return <div> {JSON.stringify(state)}
        <div>
            <input placeholder={"todolistId"} value={todolistId} onChange={(e) => {
                setTodolistId(e.currentTarget.value)
            }}/>
            <input placeholder={"title"} value={title} onChange={(e) => {
                setTitle(e.currentTarget.value)
            }}/>
            <button onClick={createTask}>create task</button>
        </div>
    </div>
}
export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>("")
    const [taskId, setTaskId] = useState<string>("")

    const deleteTask = () => {
        todolistAPI.deleteTask(todolistId, taskId).then((res) => {
            setState(res.data)
        })
    }

    return <div> {JSON.stringify(state)}
        <div>
            <input placeholder={"todolistId"} value={todolistId} onChange={(e) => {
                setTodolistId(e.currentTarget.value)
            }}/>
            <input placeholder={"taskId"} value={taskId} onChange={(e) => {
                setTaskId(e.currentTarget.value)
            }}/>
            <button onClick={deleteTask}>delete task</button>
        </div>
    </div>
}
export const UpdateTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>("")
    const [taskId, setTaskId] = useState<string>("")
    const [title, setTitle] = useState<string>("")

    const updateTask = () => {
        todolistAPI.updateTask(todolistId, taskId, title).then((res) => {
            setState(res.data)
        })
    }

    return <div> {JSON.stringify(state)}
        <div>
            <input placeholder={"todolistId"} value={todolistId} onChange={(e) => {
                setTodolistId(e.currentTarget.value)
            }}/>
            <input placeholder={"taskId"} value={taskId} onChange={(e) => {
                setTaskId(e.currentTarget.value)
            }}/>
            <input placeholder={"title"} value={title} onChange={(e) => {
                setTitle(e.currentTarget.value)
            }}/>
            <button onClick={updateTask}>update task</button>
        </div>
    </div>
}
