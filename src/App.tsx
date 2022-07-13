import React, { useState } from 'react';

//Components
import TodoList from './Components/TodoList';

//Mock_Data
import data from './mock_data.json';

//interfaces
import ITask from './interfaces/task';

//styles
import './App.css'
import {FilterEnum} from "./enums/filter.enum";

function App() {
  const [taskList, setTaskList] = useState<ITask[]>(data);
  const [filter, setFilter] = useState<string>(FilterEnum.ALL);
  const [newTask, setNewTask] = useState<string>('');

  const onCompleteTask = (taskId: number): void => {
    const updatedTask: ITask[] = taskList.map((task: ITask) => {
      return task.id === taskId ? { ...task, completed: !task.completed } : { ...task };
    });
    setTaskList(updatedTask);
  }

  const deleteTask = (taskId: number): void => {
    const newTaskList: ITask[] = taskList.filter((task: ITask) => task.id !== taskId);
    setTaskList(newTaskList);
  }

  const addTask = (): void => {
    if (newTask === '') return;

    const newTaskData: ITask = {
      id: Number(new Date()),
      task: newTask,
      completed: false
    }
    setTaskList([...taskList, newTaskData]);
    setNewTask('');
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    addTask();
  }

  return (
    <div className="container p-4 ">
      <div className="card bg-secondary mb-3" >
        <div className="card-header">TODO APP</div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className='row'>
              <div className='col-md-6 offset-md-3'>
                <div className="input-group gap-2">
                  <input type="text" className='form-control' value={newTask} onChange={(e) => setNewTask(e.target.value)} />
                  <button className='btn btn-block btn-primary'>Add Task</button>
                  <select onChange={(e)=>setFilter(e.target.value)}>
                    <option value={FilterEnum.ALL}>All Task</option>
                    <option value={FilterEnum.PENDING}>Pending</option>
                    <option value={FilterEnum.COMPLETED}>Completed</option>
                  </select>
                </div>
              </div>
            </div>
          </form>
          <TodoList
            taskList={taskList}
            onCompleteTask={onCompleteTask}
            deleteTask={deleteTask}
            filter={filter}
          />
        </div>
      </div>

    </div>
  );
}

export default App;
