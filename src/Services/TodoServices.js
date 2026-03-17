import axios from "axios";

//get user token
const user = JSON.parse(localStorage.getItem("todoapp"));

const baseUrl = process.env.REACT_APP_BASEURL;

//deafult auth header
axios.defaults.headers.common["Authorization"] = `Bearer ${user.token}`;

//create todo
const createTodo = (data) => {
  return axios.post(`${baseUrl}/api/v1/todo/create`, data);
};

//get all todo
const getAllTodo = (id) => {
  return axios.post(`${baseUrl}/api/v1/todo/getAll/${id}`);
};

//delete todo
const deleteTodo = (id) => {
  return axios.delete(`${baseUrl}/api/v1/todo/delete/${id}`);
};

//update todo
const updateTodo = (id, data) => {
  return axios.patch(`${baseUrl}/api/v1/todo/update/${id}`, data);
};

const TodoServices = { createTodo, getAllTodo, deleteTodo, updateTodo };
export default TodoServices;
