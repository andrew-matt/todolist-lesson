import { FilterValuesType, TaskType } from 'App';
import { ChangeEvent } from 'react';
import { Button } from 'Button';
import { AddItemForm } from 'AddItemForm';
import { EditableSpan } from 'EditableSpan';

type PropsType = {
  title: string
  todolistId: string
  tasks: TaskType[]
  removeTask: (taskId: string, todolistId: string) => void
  changeFilter: (filter: FilterValuesType, todolistId: string) => void
  addItem: (title: string, todolistId: string) => void
  changeTodolistTitle: (todolistId: string, title: string) => void
  changeTaskTitle: (taskId: string, title: string, todolistId: string) => void
  changeTaskStatus: (taskId: string, taskStatus: boolean, todolistId: string) => void
  filter: FilterValuesType
  removeTodolist: (todolistId: string) => void
}

export const Todolist = (props: PropsType) => {
  const {
    title,
    tasks,
    filter,
    removeTask,
    changeFilter,
    addItem,
    changeTodolistTitle,
    changeTaskTitle,
    changeTaskStatus,
    todolistId,
    removeTodolist,
  } = props;

  const addItemHandle = (title: string) => {
    addItem(title, todolistId);
  };

  const changeFilterTasksHandler = (filter: FilterValuesType) => {
    changeFilter(filter, props.todolistId);
  };

  const removeTodolistHandler = () => {
    removeTodolist(todolistId);
  };

  const changeTodolistTitleHandler = (title: string) => {
    changeTodolistTitle(todolistId, title);
  }

  return (
    <div>
      <div className={'todolist-title-container'}>
        <h3>
          <EditableSpan title={title} onClick={changeTodolistTitleHandler}/>
        </h3>
        <Button title={'x'} onClick={removeTodolistHandler}/>
      </div>
      <AddItemForm onClick={addItemHandle}/>
      {
        tasks.length === 0
          ? <p>Тасок нет</p>
          : <ul>
            {tasks.map((task) => {

              const removeTaskHandler = () => {
                removeTask(task.id, todolistId);
              };

              const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                const newStatusValue = e.currentTarget.checked;
                changeTaskStatus(task.id, newStatusValue, todolistId);
              };

              const changeTaskTitleHandler = (title: string) => {
                changeTaskTitle(task.id, title, todolistId);
              }

              return <li key={task.id} className={task.isDone ? 'is-done' : ''}>
                <input type="checkbox" checked={task.isDone}
                       onChange={changeTaskStatusHandler}/>
                <EditableSpan title={task.title} onClick={changeTaskTitleHandler}/>
                <Button onClick={removeTaskHandler} title={'x'}/>
              </li>;
            })}
          </ul>
      }
      <div>
        <Button className={filter === 'all' ? 'active-filter' : ''} title={'All'}
                onClick={() => changeFilterTasksHandler('all')}/>
        <Button className={filter === 'active' ? 'active-filter' : ''} title={'Active'}
                onClick={() => changeFilterTasksHandler('active')}/>
        <Button className={filter === 'completed' ? 'active-filter' : ''}
                title={'Completed'}
                onClick={() => changeFilterTasksHandler('completed')}/>
      </div>
    </div>
  );
};
