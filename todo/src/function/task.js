import axios from "axios";

export const getTasks = async () => {
  return await axios.get(`api/tasks`);
};
export const getCompletedTasks = async () => {
  return await axios.get(`api/all-completed-tasks`);
};
export const getComplitionRate = async () => {
  return await axios.get(`api/completion-rate`);
};
export const createTask = async (task) => {
  return await axios.post(`api/task`, task);
};
export const updateStatus = async ({ taskId, completed }) => {
  return await axios.put(`api/task/${taskId}`, { completed });
};
