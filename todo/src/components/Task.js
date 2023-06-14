import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import "./style.css";
import {
  createTask,
  getCompletedTasks,
  getComplitionRate,
  getTasks,
  updateStatus,
} from "../function/task";
import Table from "react-bootstrap/Table";
import CompletedTask from "./CompletedTask";
import CompletionRate from "./CompletionRate";

const Task = () => {
  const [title, setTitle] = useState("");
  const [tasks, setTasks] = useState("");
  const [completedTask, setCompletedTask] = useState("");
  const [complitionRate, setComplitionRate] = useState("");

  const [completed, setCompleted] = useState();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadTasks();
    loadCompletedTasks();
    loadComplitionRate();
  }, []);

  const loadTasks = () => getTasks().then((t) => setTasks(t.data));
  const loadCompletedTasks = () =>
    getCompletedTasks().then((t) => setCompletedTask(t.data));

  const loadComplitionRate = () =>
    getComplitionRate().then((t) => setComplitionRate(t.data));

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    createTask({ title })
      .then((res) => {
        setLoading(false);
        setTitle("");
        toast.success(`"${res.data.title}" is created.`);
        loadTasks();
        loadCompletedTasks();
        loadComplitionRate();
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        if (err.response.status === 400) toast.error(err.response.data);
      });
  };

  const updateTask = (taskId, completed) => {
    setLoading(true);
    updateStatus({ taskId, completed })
      .then((res) => {
        setLoading(false);
        toast.success(`Your task is updated.`);
        loadTasks();
        loadCompletedTasks();
        loadComplitionRate();
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        if (err.response.status === 400) toast.error(err.response.data);
      });
  };

  return (
    <div>
      <div className="container">
        <Toaster
          position="top-right"
          reverseOrder={false}
          toastOptions={{
            style: {
              fontSize: "14px",
            },
          }}
        />
        <h2>Add Task</h2>
        <div className="forms">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              id="title"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="enter task"
              required
            />
            <button>Add</button>
          </form>
        </div>
        <h3 className="pt-5 pb-2 text-white">All Tasks</h3>
        <div className="all-task">
          {loading ? (
            <div>Loading</div>
          ) : (
            <div>
              <Table striped>
                <thead>
                  <tr>
                    <th>S.N</th>
                    <th>Title</th>
                    <th>Complition Status</th>
                    <th>Update Status</th>
                  </tr>
                </thead>
                <tbody>
                  {tasks &&
                    tasks.map((t, i) => (
                      <tr key={t._id}>
                        <td>{i + 1}</td>
                        <td>{t.title}</td>
                        <td>{t.completed === true ? <>True</> : <>False</>}</td>
                        <td>
                          <select
                            name="completed"
                            id="completed"
                            onChange={(e) => setCompleted(e.target.value)}
                          >
                            <option>Select Option</option>
                            <option value={true}>Yes</option>
                            <option value={false}>No</option>
                          </select>
                          <button
                            onClick={() => {
                              updateTask(t._id, completed);
                            }}
                          >
                            Update
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </Table>
            </div>
          )}
        </div>
        <CompletedTask completedTask={completedTask} />
        <CompletionRate complitionRate={complitionRate} />
      </div>
    </div>
  );
};

export default Task;
