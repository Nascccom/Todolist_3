import {v1} from "uuid";
import {
    addTodolistAC,
    changeFilterAC,
    changeTodolistsTitleAC,
    removeTodolistAC,
    todolistReducer, TodolistType
} from "./todolist-reducer";

let todolist1: string;
let todolist2: string;
let startState: TodolistType[]

beforeEach(()=> {
    todolist1 = v1();
    todolist2 = v1();

    startState = [
        {id: todolist1, title: 'My hobbies', filter: 'All'},
        {id: todolist2, title: 'My technologies', filter: 'All'},
    ]
})

test('filter should be changed correctly', () => {
    const newFilter = 'Completed'

    const action = changeFilterAC(todolist1, newFilter)
    const endState: TodolistType[] = todolistReducer(startState, action)

    expect(endState.length).toBe(2)
    expect(endState[0].filter).toEqual(newFilter)
    expect(endState[0].filter).toBe('Completed')
})

test('todolist should be remove correctly', () => {
    const action = removeTodolistAC(todolist1)
    const endState: TodolistType[] = todolistReducer(startState, action)

    expect(endState.length).toBe(1)
    expect(endState[0].filter).toBe('All')
    expect(endState[0].title).toBe('My technologies')
})

test('todolist title should be changed correctly', () => {
    const newTitle = 'New York'

    const action = changeTodolistsTitleAC(todolist2, newTitle)
    const endState: TodolistType[] = todolistReducer(startState, action)

    expect(endState.length).toBe(2)
    expect(endState[0].title).toBe('My hobbies')
    expect(endState[1].title).toBe('New York')
    expect(endState[1].title).toEqual(newTitle)
})

test('todolist should be added correctly', () => {
    const newTitle = "Example"

    const action = addTodolistAC(newTitle )
    const endState: TodolistType[] = todolistReducer(startState, action)

    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe('My hobbies')
    expect(endState[2].title).toBe('Example')

})