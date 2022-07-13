
import { AxiosInstance } from "axios";
import ITask from "../interfaces/task";

class Task {

  private client: AxiosInstance;

  constructor(task: AxiosInstance) {
    this.client = task;
  }

  addTask(payload: ITask) {
    return this.client.post(`/addTask`, payload);
  }

  getAllTask() {
    return this.client.get(`/tasks`);
  }

  deleteTask(id: number) {
    return this.client.delete(`/tasks/${id}`);
  }

  completeTask(id: number) {
    return this.client.put(`/tasks/${id}`);
  }
}

export default Task;
