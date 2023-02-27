import React, {memo, useCallback} from 'react';
import {TodolistRM} from './Components/Todolist';
import './App.css'
import {addTaskAC, changeStatusTaskAC, changeTitleTaskAC, removeTaskAC} from './Reducers/tasks-reducer';
import {
    addTodolistAC,
    changeFilterAC,
    changeTodolistsTitleAC,
    FilterValuesType,
    removeTodolistAC,
    TodolistType
} from './Reducers/todolist-reducer';
import {AddingAnElementRM} from './Components/AddingAnElement';
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./Reducers/store";


const App = () => {

    const todolists = useSelector<AppRootState, TodolistType[]>(state => state.todolists)
    const dispatch = useDispatch()

    const addTask = useCallback((todolistId: string, newTitle: string)=> {
        dispatch(addTaskAC(todolistId, newTitle))
    }, [])
    const removeTask = useCallback((todolistId: string, taskId: string)  => {
        dispatch(removeTaskAC(todolistId, taskId))
    }, [])
    const changeStatus = useCallback((todolistId: string, taskId: string, checked: boolean) => {
        dispatch(changeStatusTaskAC(todolistId, taskId, checked))
    }, [])
    const changeTitle = useCallback((todolistId: string, taskId: string, changedTitle: string)  => {
        dispatch(changeTitleTaskAC(todolistId, taskId, changedTitle))
    }, [])


    const changeTodolistsTitle = useCallback((todolistId: string, changedTitle: string)  => {
        dispatch(changeTodolistsTitleAC(todolistId, changedTitle))
    }, [])
    const removeTodolist = useCallback((todolistId: string) => {
        dispatch(removeTodolistAC(todolistId))

    }, [])
    const changeFilter = useCallback((todolistId: string, valueFilter: FilterValuesType) => {
        dispatch(changeFilterAC(todolistId, valueFilter))
    }, [])
    const addTodolist = useCallback((newTitle: string)  => {
        dispatch(addTodolistAC(newTitle))
    }, [])


    return (
      <div className={'App'}>
          <AddingAnElementRM addItem={addTodolist}/>
          {todolists.map(todo => {

                return <TodolistRM key={todo.id}
                                   todolist={todo}
                                   changeFilter={changeFilter}
                                   addTask={addTask}
                                   removeTask={removeTask}
                                   removeTodolist={removeTodolist}
                                   changeStatus={changeStatus}
                                   changeTasksTitle={changeTitle}
                                   changeTodolistsTitle={changeTodolistsTitle}
                />
            }
          )}
      </div>
    );
};

export default memo(App)


