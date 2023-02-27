import {v1} from 'uuid';
import {
    addTaskACType,
    changeStatusTaskACType,
    changeTitleTaskACType,
    removeTaskACType,
    tasksReducer,
    TasksType
} from './tasks-reducer';
import {addTodolistAC} from "./todolist-reducer";

let startState: TasksType

beforeEach(()=> {
    startState = {
        ['todolist1']: [
            {id: '1', title: 'HTML', isDone: true},
            {id: '2', title: 'Css', isDone: true},
            {id: '3', title: 'React', isDone: false}
        ],
        ['todolist2']: [
            {id: '4', title: 'HTML', isDone: true},
            {id: '5', title: 'SQL', isDone: false},
            {id: '6', title: 'React Native', isDone: false}
        ]
    }
})


test('task should be added correctly to the existing array', () => {

    const action: addTaskACType = {
        type: 'ADD-TASK',
        payload: {
            todolistId: "todolist1",
            newTitle: 'JS'
        }
    }

    const endState = tasksReducer(startState, action)

    expect(endState["todolist1"].length).toBe(4)
    expect(endState["todolist1"][0].title).toBe('HTML')
    expect(endState["todolist1"][3].title).toBe("JS")
    expect(endState["todolist1"][3].isDone).toBe(false)
})

test('task should be removed correctly', () => {
    const action: removeTaskACType = {
        type: 'REMOVE-TASK',
        payload: {
            todolistId: "todolist2",
            taskId: '5'
        }
    }

    const endState = tasksReducer(startState, action)

    expect(endState['todolist1'].length).toBe(3)
    expect(endState['todolist2'].length).toBe(2)
    expect(endState['todolist2'][0].id).toBe('4')
    expect(endState['todolist2'][1].id).toBe('6')
})

test('task status should be changed correctly', () => {
    const action: changeStatusTaskACType = {
        type: 'CHANGE-STATUS-TASK',
        payload: {
            todolistId: 'todolist2',
            taskId: '5',
            checked: true
        }
    }

    const endState = tasksReducer(startState, action)

    expect(endState['todolist1'].length).toBe(endState['todolist2'].length)
    expect(endState['todolist2'][0].id).toBe('4')
    expect(endState['todolist2'][1].id).toBe('5')
    expect(endState['todolist2'][1].isDone).toBe(true)
})

test('task title should be changed correctly', () => {
    const newTitle = 'changedTitle'

    const action: changeTitleTaskACType = {
        type: 'CHANGE-TITLE-TASK',
        payload: {
            todolistId: 'todolist1',
            taskId: '2',
            changedTitle: 'changedTitle'
        }
    }

    const endState = tasksReducer(startState, action)

    expect(endState['todolist1'].length).toBe(endState['todolist2'].length)
    expect(endState['todolist1'][1].id).toBe('2')
    expect(endState['todolist1'][1].title).toBe(newTitle)
})

test('correctly should be added tasks when we will add new todolist', () => {

    const startState: TasksType = {
        'todolist1': [
            {id: '1', title: 'HTML', isDone: true},
            {id: '2', title: 'Css', isDone: true},
            {id: '3', title: 'React', isDone: false}
        ],
        'todolist2': [
            {id: '1', title: 'HTML', isDone: true},
            {id: '2', title: 'SQL', isDone: false},
            {id: '3', title: 'React Native', isDone: false}
        ]
    }

    const newTitle = "Example"

    const action = addTodolistAC(newTitle)
    const endState: TasksType = tasksReducer(startState, action)

    const keys = Object.keys(endState)
    const newKey = keys.find(k => k !== 'todolist1' && k !=='todolist2')
    if (!newKey) {
        throw Error('new key should be added')
    }

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])
})