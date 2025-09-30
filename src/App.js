import React, {useEffect, useState } from'react';
import { Moon, Sun } from 'lucide-react';

import "./App.css"
const listItems = [{
  id: 1,
  task: 'Learn to code',
  completed: false,
},{
id:2,
task: 'Read a book',
completed: true,
},
{
  id: 3,
  task: 'Complete online courses',
  completed: false,
}

]
function App() {
  const [tasks, setTasks] = useState(() => {
  const savedTasks = localStorage.getItem('tasks');
  return savedTasks ? JSON.parse(savedTasks) : listItems;
});
const [darkMode,setDarkMode]=useState(false)
  const [taskInput, setTaskInput] = useState('');
  useEffect(()=>{
    localStorage.setItem('tasks',JSON.stringify(tasks))
  },[tasks])
  
  useEffect(()=>{
  const savedTheme=localStorage.getItem('theme');
  if(savedTheme==='dark'){
    setDarkMode(true)
    document.documentElement.classList.add('dark')
  }
  },[])
  const toggleTheme=()=>{
  setDarkMode(!darkMode)
    if(!darkMode){
      document.documentElement.classList.add('dark')
      setDarkMode(true)
      localStorage.setItem('theme','dark')
  
  }
  else{
    document.documentElement.classList.remove('dark')
      localStorage.setItem('theme','light')

      setDarkMode(false)
  }
}
function updateTask(id){
  setTasks((tasks)=>tasks.map((task)=>task.id===id? {...task, completed:!task.completed}:task));
  console.log(tasks)
}
if(!tasks){
  return
}
 const completedTasks = tasks.filter((task)=>task.completed);
  function addTask(){
    const newTask={
      id: Date.now(),
      task: taskInput,
      completed: false
    }
    if(taskInput.trim() === '') return
    setTasks((task)=> [...task, newTask]);
    setTaskInput('');
  }
function deleted(id){
setTasks((prev)=>prev.filter((task)=>task.id!==id));
}

  return (
     <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-r from-red-600 to-blue-400">
    <div className='absolute top-4 right-4 flex space-x-4'>
      <button onClick={toggleTheme}>
        {darkMode ? <Sun className='w-6 h-6 text-yellow-400'/> : <Moon className='w-6 h-6 text-gray-800'/>}
      </button>
     
    </div>
    <div className='bg-white shadow-lg rounded-3xl p-6 sm:p-10 w-full max-w-xl dark:bg-gray-800 dark:text-white'>
      <h1 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-6">My Todo List</h1>
      <TaskInput taskInput={taskInput} setTaskInput={setTaskInput} addTask={addTask} />
      <TaskList tasks={tasks} deleted={deleted} update={updateTask} />
      <div className="mt-6 text-center">
        {completedTasks.length > 0 ? (
          <span className="font-bold text-gray-800">Hanbalyo! You have done ({completedTasks.length} tasks)</span>
        ) : (
          <span className="font-bold text-gray-900">Let us see what you have done</span>
        )}
     
      </div>
    </div>
  </div>
  
  );
}
//Task input
function TaskInput({taskInput, setTaskInput,addTask}){
  return(
    <div className="mb-4 flex flex-col sm:flex-row gap-2">
    <input
      type="text"
      className='flex-grow px-3 py-2 border rounded-lg sm:rounded-l-lg sm:rounded-r-none focus:outline-none focus:ring-2 focus:ring-blue-500'
      placeholder='Add a new todo'
      value={taskInput}
      onChange={(e) => setTaskInput(e.target.value)}
    />
    <button
      onClick={addTask}
      className='bg-blue-500 text-white px-4 py-2 rounded-lg sm:rounded-r-lg sm:rounded-l-none hover:bg-blue-600'
    >
      Add
    </button>
  </div>
  

  )
}
function TaskList({tasks,deleted,update}){
  return(
  <div>
<ul className='space-y-2'>{tasks.map((item)=><Item key={item.id} item={item}  deleted={deleted} update={update}/>)}</ul>
  </div>
  )
}
function Item({item,deleted,update}){
return(
<li className='flex flex-col sm:flex-row sm:items-center p-3 gap-2 sm:gap-0 rounded-lg bg-slate-100 border border-gray-200 even:bg-slate-700'>
  <div className="flex items-center gap-2 flex-grow">
    <input
      type="checkbox"
      checked={item.completed}
      onChange={() => update(item.id)}
      className='h-5 w-5 text-blue-600'
    />
    <span className={`flex-grow ${item.completed ? "line-through text-gray-500" : "text-gray-800"}`}>
      {item.task}
    </span>
  </div>
  <button
    className="self-end sm:self-auto sm:ml-4 border-none px-3 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600"
    onClick={() => deleted(item.id)}
  >
    Delete
  </button>

</li>

)
}

export default App;
