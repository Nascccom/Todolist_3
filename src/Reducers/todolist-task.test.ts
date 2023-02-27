import {addTodolistAC, removeTodolistAC, todolistReducer, TodolistType} from "./todolist-reducer";
import {tasksReducer, TasksType} from "./tasks-reducer";

test('id should be equal', () => {
    const startTodololistState: TodolistType[] = []
    const startTasksState: TasksType = {}

    const newTodo = "BLABLA"
    const action = addTodolistAC(newTodo)

    const endTodolistState: TodolistType[] = todolistReducer(startTodololistState, action)
    const endTasksState: TasksType = tasksReducer(startTasksState, action)

    const keys = Object.keys(endTasksState)
    const idTasks = keys[0]
    const idTodolist = endTodolistState[0].id

    expect(idTasks).toBe(idTodolist)
    expect(idTasks).toBe(action.payload.id)
    expect(idTodolist).toBe(action.payload.id)

})

test('tasks should be removed when todolist removed', () => {
    const startTodololistsState: TodolistType[] = [
        {id: "todolist1", title: 'My hobbies', filter: 'All'},
    ]
    const startTasksState: TasksType = {
        ["todolist1"]: [
            {id: '1', title: 'HTML', isDone: true},
            {id: '2', title: 'Css', isDone: true},
            {id: '3', title: 'React', isDone: false}
        ],
    }

    const action = removeTodolistAC("todolist1")

    const endTodolistState: TodolistType[] = todolistReducer(startTodololistsState, action)
    const endTasksState: TasksType = tasksReducer(startTasksState, action)

    const key = Object.keys(endTasksState)

    expect(endTodolistState.length).toBe(0)
    expect(key.length).toBe(0)

})