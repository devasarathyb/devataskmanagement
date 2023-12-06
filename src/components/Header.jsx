import React, { useState } from 'react'
import logo from '../assets/logo-mobile.svg'
import iconDown from "../assets/icon-chevron-down.svg"
import iconUp from "../assets/icon-chevron-up.svg"
import elipsis from "../assets/icon-vertical-ellipsis.svg"
import  HeaderDropdown  from './HeaderDropdown'
import AddBoardModal from '../modals/AddBoardModal'
import { useDispatch, useSelector } from 'react-redux'
import AddEditTaskModal from '../modals/AddEditTaskModal'
import { ElipsisMenu } from './ElipsisMenu'
import DeletModal from '../modals/DeletModal'
import { boardSlice } from '../redux/boardSlice'


export const Header = ({boardModalopen,setBoardmodelopen}) => {
  const [openAddEditTask, setOpenAddEditTask] = useState(false)
  const dispatch = useDispatch()
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [boardType,setBoardType ] = useState('add')
  const boards = useSelector((state) => state.boards)
  const boardName = boards.find(board => board.isActive)
  const [isElipsisOpen, setIsElipsisOpen] = useState(false)
  
const setOpenEditModal = () => {
  setBoardmodelopen(true);
  setIsElipsisOpen(false)
}

const setDeleteMOdal = () => {
  setIsDeleteModalOpen(true);
  setIsElipsisOpen(false)
}

const onDeleteBtnClick = () => {
  dispatch(boardSlice.actions.deleteBoard())
  dispatch(boardSlice.actions.setBoardActive({index:0}))
  setIsDeleteModalOpen(false)
}

const onDropDownClick = () => {
  setDropdownOpen((state) => !state)
  setIsElipsisOpen(false)
  setBoardType('add')
}

  return (
    <div className='p-4 fixed left-0 bg-white dark:bg-[#2b2c37] z-50 right-0'>
      <header className='flex justify-between dark:text-white items-center'>
        {/* {Left Side} */}
        <div className='flex items-center space-x-2 md:space-x-4'>
          <img src = {logo} alt='logo' className='h-6 w-6'/> 
          <h3 className='hidden md:inline-block font-bold font-sans md:text-4xl '>
            Deva Task Management
          </h3>

          <div className='flex items-center'>
            <h3 className='truncate max-w-[200px] md:text-2xl text-xl font-bold md:ml-20 font-sans '>
                {boardName.name}
            </h3>
            <img src={dropdownOpen ? iconUp : iconDown} alt="dropdown-icon" className="w-3 ml-2 cursor-pointer"
            onClick = {() =>onDropDownClick()} />
          </div>
        </div>
        {/* {Right side} */}
        <div className='flex space-x-4 items-center md:space-x-6'>
          <button className='button hidden md:block' onClick={() => setOpenAddEditTask(state => !state)}>
              + Add New Task
          </button>
          <button className='button py-1 px-3 ' onClick={() => setOpenAddEditTask(state => !state)}>
              +
          </button>
          <img src={elipsis} alt='elipsis' className='cursor-pointer h-6' 
          onClick={() => {setIsElipsisOpen(state => !state); setBoardType('edit'); setDropdownOpen(false)}}/>
          {isElipsisOpen && <ElipsisMenu type='Boards' setOpenEditModal={setOpenEditModal} setOpenDeleteModal=
          {setDeleteMOdal}/>}
        </div>

      </header>
      {dropdownOpen && <HeaderDropdown setDropdownOpen={setDropdownOpen} setBoardmodelopen={setBoardmodelopen}/>}

      {boardModalopen && <AddBoardModal type={boardType} setBoardmodelopen={setBoardmodelopen}/>}

      {openAddEditTask && <AddEditTaskModal device='mobile' setOpenAddEditTask = {setOpenAddEditTask} type="add"/>}

      {isDeleteModalOpen && <DeletModal type='board' title={boardName.name} setIsDeleteModalOpen={setIsDeleteModalOpen} onDeleteBtnClick={onDeleteBtnClick}/>}
    </div>
  )
}
