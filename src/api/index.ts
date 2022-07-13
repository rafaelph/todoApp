import axios from "axios";
import Task from "./Task";

export const baseApiClient = axios.create({
    baseURL: `${process.env.REACT_APP_API_BASE_URL}/`,
  });

  const api = {
    task: new Task(baseApiClient),
  };

  export default api;