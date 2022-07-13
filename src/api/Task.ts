
import {AxiosInstance, AxiosResponse} from "axios";
import ITask from "../interfaces/task";

class Task {

  private client: AxiosInstance;

  constructor(task: AxiosInstance) {
    this.client = task;
  }

  async addTask(payload: { name: string }): Promise<ITask> {
    return this.mapResponse<ITask>(await this.client.post<{ name: string }>(`/todo`, payload));
  }

  async getAllTask() {
    return this.mapResponse<ITask[]>(await this.client.get<void>(`/todo`));
  }

  async deleteTask(id: number) {
    return this.mapResponse<ITask>(await this.client.delete(`/todo/${id}`));
  }

  async completeTask(id: number, completed: boolean) {
    const obj = [{
      op: "add",
      path: "/completed",
      value: completed
    }];

    return this.mapResponse<ITask>(await this.client.patch(`/todo/${id}`, obj));
  }

  mapResponse <T>(response: AxiosResponse): T {
    return response.data;
  }
}

export default Task;
