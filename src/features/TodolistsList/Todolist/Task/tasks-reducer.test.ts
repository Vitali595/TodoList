import {
    addTaskAC,
    updateTaskAC,
    removeTaskAC,
    setTasksAC,
    tasksReducer, TasksStateType
} from './tasks-reducer';
import {addTodolistAC, removeTodoListAC, setTodolistsAC} from "../todolists-reducer";
import {TaskPriorities, TaskStatuses} from "../../../../api/todolist-api";

let startState: TasksStateType = {}
beforeEach(() => {
    startState = {
        "todolistId1": [
            { id: "1", title: "CSS", status: TaskStatuses.New,
                addedDate: "",
                deadline: "",
                description: "",
                order: 0,
                priority: TaskPriorities.Low,
                startDate: "",
                todoListId: "todolistId1" },
            { id: "2", title: "JS", status: TaskStatuses.Completed,
                addedDate: "",
                deadline: "",
                description: "",
                order: 0,
                priority: TaskPriorities.Low,
                startDate: "",
                todoListId: "todolistId1" },
            { id: "3", title: "React", status: TaskStatuses.New,
                addedDate: "",
                deadline: "",
                description: "",
                order: 0,
                priority: TaskPriorities.Low,
                startDate: "",
                todoListId: "todolistId1" }
        ],
        "todolistId2": [
            { id: "1", title: "bread", status: TaskStatuses.New,
                addedDate: "",
                deadline: "",
                description: "",
                order: 0,
                priority: TaskPriorities.Low,
                startDate: "",
                todoListId: "todolistId2" },
            { id: "2", title: "milk", status: TaskStatuses.Completed,
                addedDate: "",
                deadline: "",
                description: "",
                order: 0,
                priority: TaskPriorities.Low,
                startDate: "",
                todoListId: "todolistId2" },
            { id: "3", title: "tea", status: TaskStatuses.New,
                addedDate: "",
                deadline: "",
                description: "",
                order: 0,
                priority: TaskPriorities.Low,
                startDate: "",
                todoListId: "todolistId2" }
        ]
    }
})

test('correct task should be deleted from correct array', () => {

    const action = removeTaskAC("2", "todolistId2");

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(2);
    expect(endState["todolistId2"].every(t => t.id != "2")).toBeTruthy();

});



test('correct task should be added to correct array', () => {

    const action = addTaskAC({
        todoListId: "todolistId2",
        title: "juce",
        status: TaskStatuses.New,
        addedDate: "",
        startDate: "",
        priority: 0,
        order: 0,
        description: "",
        deadline: "",
        id: "atatatata"
    });

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(4);
    expect(endState["todolistId2"][0].id).toBeDefined();
    expect(endState["todolistId2"][0].title).toBe("juce");
    expect(endState["todolistId2"][0].status).toBe(TaskStatuses.New);
})

test('status of specified task should be changed', () => {

    const action = updateTaskAC("2", {status: TaskStatuses.New}, "todolistId2");

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId2"][1].status).toBe(TaskStatuses.New);
    expect(endState["todolistId1"][1].status).toBe(TaskStatuses.Completed);
});

test('title of specified task should be changed', () => {

    const action = updateTaskAC("2", {title: "beer"}, "todolistId2");

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId2"][1].title).toBe("beer");
    expect(endState["todolistId1"][1].title).toBe("JS");
});

test('new array should be added when new todolist is added', () => {

    const action = addTodolistAC({
        id: "dsfsdfsdf",
        title: "new todolist",
        order: 0,
        addedDate: ""
    });

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState);
    const newKey = keys.find(k => k != "todolistId1" && k != "todolistId2");
    if (!newKey) {
        throw Error("new key should be added")
    }

    expect(keys.length).toBe(3);
    expect(endState[newKey]).toEqual([]);
});

test('property with todolistId should be deleted', () => {

    const action = removeTodoListAC("todolistId2");

    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState["todolistId2"]).not.toBeDefined();
});

test('empty arrays should be added when we set todolists', () => {

    const action = setTodolistsAC([
        {id: "1", title: "title 1", addedDate: "", order: 0},
        {id: "2", title: "title 2", addedDate: "", order: 0}
    ])

    const endState = tasksReducer({}, action)


    const keys = Object.keys(endState);

    expect(keys.length).toBe(2);
    expect(endState["1"]).toStrictEqual([])
    expect(endState["2"]).toStrictEqual([])
});

test('tasks should be added for todolist', () => {

    const action = setTasksAC(startState["todolistId1"], "todolistId1")

    const endState = tasksReducer({
            "todolistId2": [],
            "todolistId1": []
        },
        action)

    expect(endState["todolistId1"].length).toBe(3)
    expect(endState["todolistId2"].length).toBe(0)
});
