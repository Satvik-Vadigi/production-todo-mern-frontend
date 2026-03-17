import React from "react";
import toast from "react-hot-toast";
import TodoServices from "../../Services/TodoServices";

const Card = ({ allTask, getUserTask, onEdit }) => {
  //handle edit
  const handleEdit = (task) => {
    onEdit(task);
  };

  //handle delete
  const handleDelete = async (id) => {
    try {
      await TodoServices.deleteTodo(id);
      toast.success("Task deleted successfully");
      getUserTask();
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete task");
    }
  };

  return (
    <>
      <div className="card-container">
        {allTask?.map((task) => (
          <React.Fragment key={task?._id}>
            <div
              className="card border-primary mb-3"
              style={{ maxWidth: "18rem" }}
            >
              <div className="card-header">
                <div className="chead">
                  <h6>{task?.title.substring(0, 10)}</h6>
                  <h6
                    className={
                      task?.isCompleted === true ? "task-cmp" : "task-inc"
                    }
                  >
                    {task?.isCompleted === true ? "Completed" : "Not Completed"}
                  </h6>
                </div>
              </div>
              <div className="card-body">
                <h6 style={{ fontWeight: "bold" }}>{task?.title}</h6>
                <p className="card-text">{task?.description}</p>
                <h6>Date: {task?.createdAt.substring(0, 10)}</h6>
              </div>
              <div className="card-footer bg-transparent border-primary">
                <button
                  className="btn btn-warning"
                  title="Edit Task"
                  onClick={() => handleEdit(task)}
                >
                  <i className="fa-solid fa-pen-to-square"></i>
                </button>
                <button
                  className="btn btn-danger ms-2"
                  title="Delete Task"
                  onClick={() => handleDelete(task?._id)}
                >
                  <i className="fa-solid fa-trash"></i>
                </button>
              </div>
            </div>
          </React.Fragment>
        ))}
      </div>
    </>
  );
};

export default Card;
