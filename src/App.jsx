import { useState } from 'react'
import './App.css'
import { useSelector,useDispatch } from "react-redux";
import { TaskForm } from './components/taskForm';
import { TaskList } from './components/taskList';
import { BrowserRouter,Routes,Route} from 'react-router-dom';
import 'noty/lib/noty.css';
import 'noty/lib/themes/sunset.css';
import Noty from 'noty'
function App() {
  const taskState=useSelector(state => state.tasks)
  console.log(taskState)
  return (
    <div className="h-screen w-screen bg-neutral-900 flex justify-center items-center">
      <div>
      <BrowserRouter>
        <Routes>
          <Route path="/create" element={<TaskForm/>} />
          <Route path="/" element={<TaskList/>} />
          <Route path="/edit-task/:id" element={<TaskForm />} />
        </Routes>
      </BrowserRouter>
      </div>
    </div>
  )
}

export default App
