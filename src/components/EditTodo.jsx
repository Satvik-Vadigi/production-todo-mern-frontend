import React, { useState } from "react";
import toast from "react-hot-toast";
import TodoServices from "../Services/TodoServices";

const EditTodo = ({ task, setShowModal, getUserTask }) => {
  const [title, setTitle] = useState(task?.title);
  const [description, setDescription] = useState(task?.description);
  const [isCompleted, setIsCompleted] = useState(task?.isCompleted);

  const handleClose = () => {
    setShowModal(false);
  };

  const handleSelectChange = (e) => {
    // `<select>` values come back as strings; convert to boolean.
    setIsCompleted(e.target.value === "true");
  };
  //   console.log(isCompleted);
  const id = task?._id;

  //update
  const handleSubmit = async () => {
    try {
      if (!id) {
        return toast.error("Unable to update task: missing task ID");
      }

      const userData = JSON.parse(localStorage.getItem("todoapp"));
      const createdBy = userData && userData.user.id;
      const data = { title, description, createdBy, isCompleted };

      if (!title || !description) {
        return toast.error("Please fill all the fields");
      }

      await TodoServices.updateTodo(id, data);
      setShowModal(false);
      toast.success("Task updated successfully");

      setTitle("");
      setDescription("");
      getUserTask();
    } catch (error) {
      console.log(error);
      toast.error("Failed to update task");
    }
  };
  return (
    <>
      {task && (
        <div
          className="modal"
          tabIndex="-1"
          role="dialog"
          style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Update Your Task</h5>
                <button
                  className="btn-close"
                  aria-label="close"
                  onClick={handleClose}
                >
                  <span aria-hidden="true">&times</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Title</label>
                  <input
                    type="text"
                    className="form-control"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div className="form-floating">
                  <textarea
                    className="form-control"
                    id="floatigTextarea"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                  <label htmlFor="floatigTextarea">Description</label>
                </div>
                <div className="my-3">
                  <select
                    className="form-select"
                    value={isCompleted === undefined ? "" : String(isCompleted)}
                    onChange={handleSelectChange}
                  >
                    <option value="" disabled>
                      Select Status
                    </option>
                    <option value={"true"}>Task Completed</option>
                    <option value={"false"}>Task In Progress</option>
                  </select>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleClose}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleSubmit}
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EditTodo;
