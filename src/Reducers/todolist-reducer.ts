import {v1} from "uuid";

export const todolist1 = v1()
export const todolist2 = v1()

const initialState: TodolistType[] = [
    {id: todolist1, title: 'My hobbies', filter: 'All'} as TodolistType,
    {id: todolist2, title: 'My technologies', filter: 'All'} as TodolistType,
]


export const todolistReducer = (state: TodolistType[] = initialState, action: GeneralTypeForTodolist): TodolistType[] => {
    switch (action.type) {
        case 'CHANGE-FILTER':
            return state.map(el => el.id === action.payload.todolistId
              ? {...el, filter: action.payload.valueFilter}
              : el)
        case 'REMOVE-TODOLIST':
            return state.filter(s => s.id !== action.payload.todolistId)
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(s => s.id === action.payload.todolistId
              ? {...s, title: action.payload.changedTitle}
              : s)
        case 'ADD-NEW-TODOLIST':
            const newTodoList: TodolistType = {id: action.payload.id, title: action.payload.newTitle, filter: 'All'}
            return [...state, newTodoList]
        default:
            return state
    }
}

export type changeFilterACType = ReturnType<typeof changeFilterAC>
export const changeFilterAC = (todolistId: string, valueFilter: FilterValuesType) => {
    return {
        type: 'CHANGE-FILTER',
        payload: {
            todolistId: todolistId,
            valueFilter: valueFilter
        }
    } as const
}

export type removeTodolistACType = ReturnType<typeof removeTodolistAC>
export const removeTodolistAC = (todolistId: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        payload: {
            todolistId: todolistId,
        }
    } as const
}

type changeTodolistsTitleACType = ReturnType<typeof changeTodolistsTitleAC>
export const changeTodolistsTitleAC = (todolistId: string, changedTitle: string) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        payload: {
            todolistId: todolistId,
            changedTitle: changedTitle
        }
    } as const
}

export type addTodolistACType = ReturnType<typeof addTodolistAC>
export const addTodolistAC = (newTitle: string) => {
    return {
        type: 'ADD-NEW-TODOLIST',
        payload: {
            id: v1(),
            newTitle
        }
    } as const
}

//types
export type FilterValuesType = 'All' | 'Completed' | 'Active'
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}


type GeneralTypeForTodolist = changeFilterACType
  | removeTodolistACType
  | changeTodolistsTitleACType
  | addTodolistACType