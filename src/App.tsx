import React, { useState } from 'react';

//Components
import TodoList from './Components/TodoList';

//interfaces
import ITask from './interfaces/task';

//styles
import './App.css'
import {FilterEnum} from "./enums/filter.enum";

//Api
import api from './api';

function App() {
  const [taskList, setTaskList] = useState<ITask[]>([]);
  const [filter, setFilter] = useState<string>(FilterEnum.ALL);
  const [newTask, setNewTask] = useState<string>('');

  React.useEffect(() => {
    api.task.getAllTask().then((taskList: ITask[]) => {
      setTaskList(taskList);
    });
  }, []);

  const onCompleteTask = (taskId: number): void => {
    const { completed } = taskList.find((task: ITask) => task.id === taskId) as ITask;
    api.task.completeTask(taskId, !completed)
        .then((res) => {
            if (res) {
                const updatedTask: ITask[] = taskList.map((task: ITask) => {
                    return task.id === taskId ? {...task, completed: !task.completed} : {...task};
                });
                setTaskList(updatedTask)
            }
        })
        .catch(err => console.log('GOT ERR', err))
  }

  const deleteTask = (taskId: number): void => {
    api.task.deleteTask(taskId)
        .catch(err => console.log(err))
        .then(() => {
            const updatedTask: ITask[] = taskList.filter((task: ITask) => task.id !== taskId);
            setTaskList(updatedTask);
        });
  }

  const addTask = (): void => {
    if (newTask === '') return;

    const newTaskData = {
      name: newTask
    }
    api.task.addTask(newTaskData)
        .then((task) => {
            const updatedTask: ITask[] = [...taskList, task];
            setTaskList(updatedTask);
            setNewTask('');
        })
        .catch(err => console.log(err))
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
