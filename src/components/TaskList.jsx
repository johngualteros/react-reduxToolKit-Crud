import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { deleteTask } from "../features/tasks/taskSlice";
import { Link } from "react-router-dom";
import Noty from 'noty';
export const TaskList = () => {
  const tasks = useSelector((state) => state.tasks);
  const dispatch=useDispatch();
  const handleDelete=(id)=>{
    dispatch(deleteTask(id));
    new Noty({
        type: "success",
        layout: "topRight",
        theme: "sunset",
        text: "Task Deleted successfully",
        closeWith: ["click", "button"],
        timeout: 3000,
      }).show();
  }
  return (
    <div className="w-96">
      <header className="flex w-full justify-between items-center text-white">
        <h1 className="text-white font-extrabold text-2xl">Tasks {tasks.length}</h1>
      <Link to="/create" className="bg-blue-300 py-2 px-6 font-bold rounded-md shadow-md hover:bg-blue-500">Add Task</Link>
      </header>
      {
        tasks.map((task)=>(
          <div key={task.id} className="bg-teal-600 rounded-lg shadow-xl p-4 my-3">
            <h1 className="text-center font-extrabold text-xl">{task.title}</h1>
            <p className="text-justify font-semibold text-md mb-3">{task.description}</p>
            <button onClick={()=>handleDelete(task.id)} className="py-1 px-3 bg-red-500 font-bold rounded-md shadow-md hover:bg-red-900">delete</button>
            <Link
                  to={`/edit-task/${task.id}`}
                  className="py-1 px-3 bg-cyan-500 font-bold rounded-md shadow-md hover:bg-cyan-900"
                >
                  Edit
                </Link>
          </div>
        ))
      }
    </div>
  );
};
