import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTask, editTask } from "../features/tasks/taskSlice";
import { v4 } from "uuid";
import { useNavigate, Link, useParams } from "react-router-dom";
import Noty from "noty";
export const TaskForm = () => {
  const [task, setTask] = useState({
    title: "",
    description: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const tasks = useSelector((state) => state.tasks);

  const handleChange = (e) => {
    setTask({
      ...task,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (params.id) {
      dispatch(editTask({ ...task, id: params.id }));
      new Noty({
        type: "success",
        theme: "sunset",
        layout: "topRight",
        text: "Task Update successfully",
        closeWith: ["click", "button"],
        timeout: 3000,
      }).show();
    } else {
      dispatch(
        addTask({
          ...task,
          id: v4(),
        })
      );
      new Noty({
        type: "success",
        theme: "sunset",

        layout: "topRight",
        text: "Task Created successfully",
        closeWith: ["click", "button"],
        timeout: 3000,
      }).show();
    }

    navigate("/");
  };

  useEffect(() => {
    if (params.id) {
      setTask(tasks.find((task) => task.id === params.id));
    }
  }, [params, tasks]);

  return (
    <form onSubmit={handleSubmit} className="bg-zinc-800 max-w-sm p-4">
      <label className="block text-sm font-bold">Task:</label>
      <input
        type="text"
        name="title"
        onChange={handleChange}
        value={task.title}
        className="w-full p-2 rounded-md bg-zinc-600 mb-2"
        placeholder="Write a title"
        autoFocus
      />
      <label>
        Description:
        <textarea
          type="text"
          name="description"
          onChange={handleChange}
          value={task.description}
          className="w-full p-2 rounded-md bg-zinc-600 mb-2"
          placeholder="Write a description"
        />
      </label>
      <button type="submit" className="bg-indigo-600 px-2 py-1">
        Submit
      </button>
    </form>
  );
};
