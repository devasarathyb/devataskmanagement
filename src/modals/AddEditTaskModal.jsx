import React from 'react'
import { useState } from 'react'
import {v4 as uuidv4, validate} from 'uuid'
import crossIcon from '../assets/icon-cross.svg'
import { useDispatch, useSelector } from 'react-redux'
import { boardSlice } from '../redux/boardSlice'


const AddEditTaskModal = ({type, device, setOpenAddEditTask, taskIndex, prevColIndex = 0, setIsTaskModalOpen}) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [isValid, setIsValid] = useState(true)
  
  const dispatch = useDispatch()
  
  const [subtasks, setSubTasks] = useState(
    [
      {title: "", isCompleted: false, id: uuidv4()},
      {title: "", isCompleted: false, id: uuidv4()}
    ]
  )
  const board = useSelector((state) => state.boards).find((board) => board.isActive)
  const columns = board.columns
  const col = columns.find(((col,index) => index === prevColIndex))
  const task = col ? col.tasks.find((task, index ) => index === taskIndex) : []
   const [status, setStatus] = useState(columns[prevColIndex].name)
   const [newColIndex, setNewColIndex] = useState(prevColIndex)
   const [isFirstLoad, setIsFirstLoad] = useState(true)
  

   console.log(type, 'typeee')

   

  const onDelete = (id) => {
    setSubTasks((perState) => perState.filter((el) => el.id != id))
  }

  const onChange = (id, newValue) => {
    setSubTasks((prevState) => {
      const newState = [...prevState]
      const subTask = newState.find((subtask) => subtask.id === id)
      subTask.title = newValue;
      return newState  
    })
  }

  const validate = () => {
    setIsValid(false);
    if(!title.trim()){
        return false
    }

    for(let i =0; i< subtasks.length ; i++){
        if(!subtasks[i].title.trim()){
            return false
        }
    }
    setIsValid(true)
    return true
}



  if(type=== 'edit' && isFirstLoad){
    setSubTasks(
      task.subtasks.map((subtask) => {
        console.log('coming')
        return { ...subtask, id: uuidv4() }
      })
    )
    setTitle(task.title)
    setDescription(task.description)
    setIsFirstLoad(false)
 }

  
const onChangeStatus = (e) => {
  setStatus(e.target.value)
  setNewColIndex(e.target.selectedIndex)
}

const onSubmit = (type) => {
  if(type==='add'){
    console.log('yes')
    dispatch(boardSlice.actions.addTask({
      title,
      description,
      subtasks,
      status, newColIndex
    }))
  } else {
    console.log('edit')
    dispatch(
      boardSlice.actions.editTask({
        title,
      description,
      subtasks,
      status,
      
      prevColIndex,
      newColIndex,
      taskIndex
      })
    )
  }
}

  return (
    <div className={
      device === 'mobile' ? 
      'py-6 px-6 pb-40 absolute overflow-y-scroll left-0 flex right-0 bottom-[-100vh] top-0 bg-[#00000080] ' : 
      'py-6 px-6 pb-40 absolute overflow-y-scroll left-0 flex right-0 bottom-0 top-0 bg-[#00000080]'
    }
    onClick={(e) => {
      if(e.target !== e.currentTarget){
        return
      }

      setOpenAddEditTask(false)
    }}
    >
      {/* {Task NAme} */}
       <div className='scrollbar-hide overflow-y-scroll max-h-[95vh] my-auto bg-white
       dark:bg-[#2b2c37] text-black dark:text-white font-bold shadow-md shadow-[#364e7e1a] min-w-md mx-auto 
       w-full px-8 py-8 rounded-xl'>

        <h3 className='text-lg'>
          {type === 'edit' ? 'Edit' : 'Add New'} Task
        </h3>
        <div className='mt-8 flex flex-col space-y-1 '>
              <label className='text-sm dark:text-white text-gray-500'>Task Name</label>
              <input type='text' value={title} 
              onChange={(e) => setTitle(e.target.value)}
              className='bg-transparent px-4 py-2 focus:border-0 rounded-md text-sm border border-gray-600 
              focus:outline-[#635fc7] ring-0 '
              placeholder='e.g Take Coffee Break'
              />
        </div>


      {/* {Description} */}


        <div className='mt-8 flex flex-col space-y-1 '>
              <label className='text-sm dark:text-white text-gray-500'>Description</label>
              <textarea type='text' value={description} 
              onChange={(e) => setDescription(e.target.value)}
              className='bg-transparent px-4 py-2 focus:border-0 rounded-md text-sm border border-gray-600 
              focus:outline-[#635fc7] ring-0 min-h-[200px]'
              placeholder='e.g It is always better to take a break from continous engaged work'
              />
        </div>

        
      {/* {subtasks section} */}

      <div className='mt-8 flex flex-col space-y-1 '>
          <label className='text-sm dark:text-white text-gray-500'>Sub Tasks</label>
          {subtasks.map((subtask, index)=>{
            return(
              <div key={index} className='flex items-center w-full'>
              <input type='text' value={subtask.title} 
              onChange={(e) => onChange(subtask.id,e.target.value)}
              className='bg-transparent outline-none focus:border-0 flex-grow px-4 py-2 rounded-md text-sm border border-gray-600
              focus:outline-[#635fc7] '
              placeholder='e.g Take Coffee Break'
              
              />
            <img src={crossIcon} className='m-4 cursor-pointer' onClick={() => {
              onDelete(subtask.id)
            }}/>
              </div>
            )
          })}
          
      </div>
      <button className='w-full items-center dark:text-[#635fc7] dark:bg-white text-white bg-[#635fc7]
      py-2 rounded-full' onClick={() => {
        setSubTasks((state) => [
          ...state,
          {title:'' , isCompleted: false, id: uuidv4()}
        ])
      }}> + Add New Subtask</button>


      {/* {current status section} */}

      <div className='mt-8 flex flex-col space-y-3 '>
        <label className='text-sm dark:text-white text-gray-500'> Current Status</label>
        <select className='select-status flex flex-grow px-4 py-2 rounded-md text-sm bg-transparent
        focus:border-0 border border-gray-300 focus:outline-[#635fc7] outline-none'
        value={status}
        onChange={(e) => onChangeStatus(e)}>
          {columns.map((column, index) => (
            <option value={column.name} key={index}>
              {column.name}
            </option>
          ))}
        </select>
        <button className='w-full items-center text-white bg-[#635fc7] py-2 rounded-full '
        onClick={() => {
          const isValid = validate()
          if(isValid === true){
            onSubmit(type)
            setOpenAddEditTask(false)
          }
        }}
        >
            {type === 'edit' ? 'Save Task' : 'Create Task'}
        </button>

      </div>
      

      </div>


    </div>

   
  )
}

export default AddEditTaskModal
