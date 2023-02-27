import React, {ChangeEvent, memo, useCallback, useMemo} from 'react';
import {AddingAnElementRM} from './AddingAnElement';
import {SuperButtonRM} from './SuperButton/SuperButton';
import '../App.css'
import { EditableSpanRM} from './EditableSpan';
import {FilterValuesType, TodolistType} from "../Reducers/todolist-reducer";
import {useSelector} from "react-redux";
import {AppRootState} from "../Reducers/store";
import {TaskType} from "../Reducers/tasks-reducer";


export type TodolistTypeProps = {
    todolist: TodolistType
    changeFilter: (todolistId: string, valueFilter: FilterValuesType) => void
    addTask: (todolistId: string, newTitle: string) => void
    removeTask: (todolistId: string, taskId: string) => void
    removeTodolist: (todolistId: string) => void
    changeStatus: (todolistId: string, taskId: string, checked: boolean) => void
    changeTasksTitle: (todolistId: string, taskId: string, changedTitle: string) => void
    changeTodolistsTitle: (todolistId: string, changedTitle: string) => void
}


const Todolist: React.FC<TodolistTypeProps> = ({
                                                          todolist,
                                                          changeFilter,
                                                          addTask,
                                                          removeTask,
                                                          removeTodolist,
                                                          changeStatus,
                                                          changeTasksTitle,
                                                          changeTodolistsTitle
                                                      }) => {
    const tasks = useSelector<AppRootState, TaskType[]>(state => state.tasks[todolist.id])

    const filteredTasks = useMemo(() => {
        let filteredTasksOfOneTodolist = tasks
        switch (todolist.filter) {
            case 'Active': {
                return filteredTasksOfOneTodolist = tasks.filter(el => !el.isDone)
            }
            case 'Completed': {
                return filteredTasksOfOneTodolist = tasks.filter(el => el.isDone)
            }
            default:
                return filteredTasksOfOneTodolist
        }
    }, [tasks, todolist.filter])

    const filterButtonHandler = useCallback((valueFilter: FilterValuesType) => {
        changeFilter(todolist.id, valueFilter)
    }, [todolist.id])


    const addItemHandler = useCallback((newTitle: string)  => {
        addTask(todolist.id, newTitle)
    }, [todolist.id])

    const removeTodolistHandler = useCallback(() => {
        removeTodolist(todolist.id)
    }, [todolist.id])

    const changeTodolistsTitleHandler = useCallback((changedTitle: string)  => {
        changeTodolistsTitle(todolist.id, changedTitle)
    },[todolist.id])

    const mappedTasks = useMemo(()=> {
        return(
          filteredTasks.map(el => {
              const removeTaskHandler = (): void => {
                  removeTask(todolist.id, el.id)
              }
              const changeStatusOfCheckbox = (e: ChangeEvent<HTMLInputElement>): void => {
                  changeStatus(todolist.id, el.id, e.currentTarget.checked)
              }
              const changeTitleHandler = (changedTitle: string) => {
                  changeTasksTitle(todolist.id, el.id, changedTitle)
              }

              return (
                <li key={el.id}>
                    <input type="checkbox"
                           checked={el.isDone}
                           onChange={changeStatusOfCheckbox}/>
                    <EditableSpanRM removeCallBack={removeTaskHandler}
                                    callBack={changeTitleHandler}
                                    title={el.title}/>
                    <SuperButtonRM buttonName={'x'}
                                   callBack={removeTaskHandler}/>
                </li>
              )
          })
        )
    }, [filteredTasks])


    return (
      <div>
          <h3>
              <EditableSpanRM title={todolist.title}
                            callBack={changeTodolistsTitleHandler}/>
          </h3>
          <SuperButtonRM buttonName={'Del'} callBack={removeTodolistHandler}/>
          <AddingAnElementRM addItem={addItemHandler}/>
          <ul>
              {mappedTasks}
          </ul>
          <SuperButtonRM buttonName={'All'}
                       callBack={() => filterButtonHandler('All')}
                       className={todolist.filter === 'All' ? 'activeFilter' : ''}/>
          <SuperButtonRM buttonName={'Active'}
                       callBack={() => filterButtonHandler('Active')}
                       className={todolist.filter === 'Active' ? 'activeFilter' : ''}/>
          <SuperButtonRM buttonName={'Completed'}
                       callBack={() => filterButtonHandler('Completed')}
                       className={todolist.filter === 'Completed' ? 'activeFilter' : ''}/>
      </div>
    );
};

export const TodolistRM = memo(Todolist)