import API from "./api";

//create todo
const createTodo = (data) => {
  return API.post("/api/v1/todo/create", data);
};

//get all todo
const getAllTodo = (id) => {
  return API.post(`/api/v1/todo/getAll/${id}`);
};

//delete todo
const deleteTodo = (id) => {
  return API.delete(`/api/v1/todo/delete/${id}`);
};

//update todo
const updateTodo = (id, data) => {
  return API.patch(`/api/v1/todo/update/${id}`, data);
};

const TodoServices = {
  createTodo,
  getAllTodo,
  deleteTodo,
  updateTodo,
};

export default TodoServices;
