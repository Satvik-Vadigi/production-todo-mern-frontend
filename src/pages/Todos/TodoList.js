import React, { useState, useEffect, useMemo, useCallback } from "react";
import Navbar from "../../components/Layout/Navbar";
import TodoServices from "../../Services/TodoServices";
import Card from "../../components/Card/Card";
import Spinner from "../../components/Spinner";
import EditTodo from "../../components/EditTodo";

const TodoList = () => {
  const [todoStatus, setTodoStatus] = useState("");
  const [allTasks, setAllTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  // Fetch all todos
  const getUserTask = useCallback(async () => {
    const currentUser = JSON.parse(localStorage.getItem("todoapp"));
    if (!currentUser || !currentUser.user || !currentUser.user.id) {
      console.log("User not authenticated");
      return;
    }

    setLoading(true);
    try {
      const response = await TodoServices.getAllTodo(currentUser.user.id);
      setAllTasks(response.data.todos || []);
    } catch (error) {
      console.log(error);
      setAllTasks([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Filter tasks based on todoStatus and search term
  const filteredTask = useMemo(() => {
    let filtered = allTasks;

    // First filter by status
    if (todoStatus === "completed") {
      filtered = filtered.filter((task) => task.isCompleted === true);
    } else if (todoStatus === "incomplete") {
      filtered = filtered.filter((task) => task.isCompleted === false);
    }

    // Then filter by search term (case-insensitive)
    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (task) =>
          task.title.toLowerCase().includes(searchLower) ||
          task.description.toLowerCase().includes(searchLower),
      );
    }

    return filtered;
  }, [todoStatus, allTasks, searchTerm]);

  // Handle edit task
  const handleEdit = (task) => {
    setSelectedTask(task);
    setShowModal(true);
  };

  // Fetch tasks on component mount
  useEffect(() => {
    getUserTask();
  }, [getUserTask]);

  return (
    <>
      <Navbar />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "15px",
          marginBottom: "20px",
        }}
      >
        <h4 style={{ margin: "0", marginLeft: "15px" }}>
          Filter Todos by: {todoStatus || "All"}
        </h4>
        <select
          className="form-select"
          style={{ width: "150px" }}
          value={todoStatus}
          onChange={(e) => setTodoStatus(e.target.value)}
        >
          <option value="">All</option>
          <option value="incomplete">Incomplete</option>
          <option value="completed">Completed</option>
        </select>
        <input
          type="search"
          placeholder="Search tasks..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: "10px",
            borderRadius: "5px",
            width: "500px",
            marginLeft: "100px",
          }}
        />
      </div>
      <div style={{ marginTop: "30px" }}>
        <Card
          allTask={filteredTask}
          getUserTask={getUserTask}
          onEdit={handleEdit}
        />
        {loading && <Spinner />}

        {!loading && filteredTask.length === 0 && (
          <div className="text-center mt-4">
            <h5 className="text-muted">
              {searchTerm.trim()
                ? `No tasks found matching "${searchTerm}"`
                : todoStatus === "completed"
                  ? "No completed tasks found"
                  : todoStatus === "incomplete"
                    ? "No incomplete tasks found"
                    : "You don't have any Tasks"}
            </h5>
          </div>
        )}
      </div>

      {/* Edit Todo Modal */}
      {showModal && selectedTask && (
        <EditTodo
          task={selectedTask}
          setShowModal={setShowModal}
          getUserTask={getUserTask}
        />
      )}
    </>
  );
};

export default TodoList;
