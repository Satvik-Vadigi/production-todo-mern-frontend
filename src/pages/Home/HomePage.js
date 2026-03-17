import { useEffect, useState, useCallback, useMemo } from "react";
import React from "react";
import Navbar from "../../components/Layout/Navbar";
import Popmodal from "../../components/PopModel";
import TodoServices from "../../Services/TodoServices";
import Card from "../../components/Card/Card";
import Spinner from "../../components/Spinner";

const HomePage = () => {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [allTasks, setAllTasks] = useState([]);
  //handle modal
  const openModalHandler = () => {
    setShowModal(true);
  };

  //get User Todo
  const userData = useMemo(
    () => JSON.parse(localStorage.getItem("todoapp")),
    [],
  );
  const id = useMemo(() => userData && userData.user.id, [userData]);
  console.log(id);
  const getUserTask = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await TodoServices.getAllTodo(id);
      setLoading(false);
      // console.log(data);
      setAllTasks(data?.todos || []);
    } catch (error) {
      setLoading(false);
      console.log(error);
      setAllTasks([]);
    }
  }, [id]);

  useEffect(() => {
    getUserTask();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <Navbar />
      <div className="container">
        <div className="add-task">
          <h1>Your To-Do</h1>
          <input type="search" placeholder="Search tasks..." />
          <button className="btn btn-primary" onClick={openModalHandler}>
            List Task <i className="fa-solid fa-plus"></i>
          </button>
        </div>
        {loading ? (
          <Spinner />
        ) : (
          <Card allTask={allTasks} getUserTask={getUserTask} />
        )}
        {/* ============modal============ */}
        <Popmodal
          showModal={showModal}
          setShowModal={setShowModal}
          title={title}
          setTitle={setTitle}
          description={description}
          setDescription={setDescription}
          getUserTask={getUserTask}
        />
      </div>
    </>
  );
};

export default HomePage;
