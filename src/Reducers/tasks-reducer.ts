import {v1} from 'uuid';
import {addTodolistACType, removeTodolistACType, todolist1, todolist2} from "./todolist-reducer";



const initialState: TasksType = {
    [todolist1]: [
        {id: v1(), title: 'HTML', isDone: true},
        {id: v1(), title: 'Css', isDone: true},
        {id: v1(), title: 'React', isDone: false}
    ] as TaskType[],
    [todolist2]: [
        {id: v1(), title: 'HTML', isDone: true},
        {id: v1(), title: 'SQL', isDone: false},
        {id: v1(), title: 'React Native', isDone: false}
    ] as TaskType[],
}

export const tasksReducer = (state: TasksType = initialState, action: GenericTypeForTaskReducer): TasksType => {
    switch (action.type) {
        case 'ADD-TASK': {
            let newTask = {id: v1(), title: action.payload.newTitle, isDone: false};
            return {
                ...state,
                [action.payload.todolistId]: [...state[action.payload.todolistId], newTask]
            }
        }
        case 'REMOVE-TASK': {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId]
                  .filter(el => el.id !== action.payload.taskId)
            }
        }
        case 'CHANGE-STATUS-TASK': {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId]
                  .map(el => el.id === action.payload.taskId ? {...el, isDone: action.payload.checked} : el)
            }
        }
        case 'CHANGE-TITLE-TASK': {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId]
                  .map(el => el.id === action.payload.taskId ? {...el, title: action.payload.changedTitle} : el)
            }
        }
        case "ADD-NEW-TODOLIST":
            return {
                ...state,
                [action.payload.id]: []
            }
        case "REMOVE-TODOLIST":
            const copyState = {...state}
            delete copyState[action.payload.todolistId]
            return copyState

        default: {
            return state
        }
    }
}

export type addTaskACType = ReturnType<typeof addTaskAC>
export const addTaskAC = (todolistId: string, newTitle: string) => {
    return {
        type: 'ADD-TASK',
        payload: {
            todolistId: todolistId,
            newTitle: newTitle
        }
    } as const
}

export type removeTaskACType = ReturnType<typeof removeTaskAC>
export const removeTaskAC = (todolistId: string, taskId: string) => {
    return {
        type: 'REMOVE-TASK',
        payload: {
            todolistId: todolistId,
            taskId: taskId,
        }
    } as const
}

export type changeStatusTaskACType = ReturnType<typeof changeStatusTaskAC>
export const changeStatusTaskAC = (todolistId: string, taskId: string, checked: boolean) => {
    return {
        type: 'CHANGE-STATUS-TASK',
        payload: {
            todolistId: todolistId,
            taskId: taskId,
            checked: checked
        }
    } as const
}

export type changeTitleTaskACType = ReturnType<typeof changeTitleTaskAC>
export const changeTitleTaskAC = (todolistId: string, taskId: string, changedTitle: string) => {
    return {
        type: 'CHANGE-TITLE-TASK',
        payload: {
            todolistId: todolistId,
            taskId: taskId,
            changedTitle: changedTitle
        }
    } as const
}


//types

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type TasksType = {
    [key: string]: TaskType[]
}


export type GenericTypeForTaskReducer = addTaskACType
  | removeTaskACType
  | changeStatusTaskACType
  | changeTitleTaskACType
  | addTodolistACType
  | removeTodolistACType