import {combineReducers, legacy_createStore} from "redux";
import {todolistReducer} from "./todolist-reducer";
import {tasksReducer} from "./tasks-reducer";

const rootReducers = combineReducers({
    todolists: todolistReducer,
    tasks: tasksReducer
})

export type AppRootState = ReturnType<typeof rootReducers>

export const store = legacy_createStore(rootReducers)