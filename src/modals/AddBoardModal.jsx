import React, { useState } from 'react'
import {v4 as uuidv4, validate} from 'uuid'
import crossIcon from '../assets/icon-cross.svg'
import { useDispatch, useSelector } from 'react-redux'
import { boardSlice } from '../redux/boardSlice';

function AddBoardModal({setBoardmodelopen, type}) {
    const dispatch = useDispatch();
    const [name ,setName] = useState('')
    const [isValid, setIsValid] = useState(true)
    const [isFirstLoad, setIsFirstLoad] = useState(true)
    const board = useSelector((state) => state.boards).find(
        (board) => board.isActive 
    )
    const [newColumns, setnewColumns] = useState(
        [
            {name:'Todo', task:[], id:uuidv4() },
             {name:'Doing', task:[], id:uuidv4() }
        ]
    )

    if(type === 'edit' && isFirstLoad){
        console.log('edit')
        setnewColumns(board.columns.map((col) => {
            return {...col, id: uuidv4()}
        }))
        setName(board.name)
        setIsFirstLoad(false)
    }

    const changeValue = (id, newValue) => {
        console.log(id, newValue)
        
        setnewColumns((prevState) => {
            const newState = [...prevState]
            const column = newState.find((col) => col.id === id)
            column.name = newValue;
            return newState
        })
    }
    const onDelete = (id) => {
        setnewColumns((perState) => perState.filter((el) => el.id !== id))
    }


    const validate = () => {
        setIsValid(false);
        if(!name.trim()){
            return false
        }

        for(let i =0; i< newColumns.length ; i++){
            if(!newColumns[i].name.trim()){
                return false
            }
        }
        setIsValid(true)
        return true
    }


    const onSubmit = (type) => {
        setBoardmodelopen(false);
        if(type === 'add'){
            dispatch(boardSlice.actions.addBoard({name, newColumns}))
        }
        else {
            dispatch(boardSlice.actions.editBoard({name, newColumns}))
        }
    }
  return (
    <div 
    onClick={ (e) => {
        if(e.target !== e.currentTarget){
            return
        }
        setBoardmodelopen(false)
    } }
    className='fixed right-0 left-0 top-0 bottom-0 px-2 py-2 scrollbar-hide
     overflow-scroll z-50 justify-center items-center flex bg-[#00000080] cursor-pointer' >
        <div className='scrollbar-hide overflow-y-scroll max-h-[95vh] bg-white dark:bg-[#2b2c37] text-black dark:text-white
        font-bold shadow-md  shadow-[#364e7e1a] max-w-md mx-auto w-full px-8 py-8 rounded-xl'>
            <h3 className='text-lg'>
                {type === 'edit' ? 'Edit' : 'Add New'} Board
            </h3>
            <div className='mt-8 flex flex-col space-y-3'>
                <label className='text-sm dark:text-white text-gray-500'>
                    Board Columns
                </label>
                <input className='bg-transparent px-4 py-2 rounded-md text-sm border border-gray-600 
                focus:outline-[#635fc7] outline-1 ring-0' 
                placeholder='e.g Web Design'
                value={name}
                onChange={(e) => {
                    setName(e.target.value)
                }}
                id='board-name-input'/>
            </div>
            <div className='mt-8 flex flex-col space-y-3'>
                <label className='text-sm dark:text-white text-gray-500'> 
                    Board Columns
                </label>
                {
                    newColumns.map((columns, index) => (
                        <div className='flex items-center w-full' key={index}>
                            <input 
                            className='bg-transparent flex-grow px-4 py-2 rounded-md text-sm 
                            border border-gray-600 outline-none focus:outline-[#735fc7]'
                           
                            onChange={(e) => {changeValue(columns.id, e.target.value)
                            }}
                            value={columns.name}
                            type='text'
                            />
                            <img src={crossIcon}  className='cursor-pointer m-4 ' onClick={() => onDelete(columns.id)}/>
                        </div>
                    ))
                }
            </div>
            <div>
                <button className='w-full items-center hover:opacity-75 
                dark:text-[#635fc7] dark:bg-white text-white bg-[#635fc7] py-2 mt-2 rounded-full' 
                onClick={() => {setnewColumns((state) => [
                    ...state,
                    {name:'' , task:[] , id: uuidv4()}
                ])}}>
                    + Add New Column
                </button>
                <button className='w-full items-center hover:opacity-75 dark:text-white 
                dark:bg-[#635fc7] mt-8 relative text-white bg-[#635fc7] py-2 rounded-full'
                onClick={
                    () => {
                        const isValid = validate()
                        if(isValid === true){
                            onSubmit(type)
                        }
                    }
                }
                >
                    {type=== 'add' ? 'Create New Board' : 'Save Changes'}
                </button>
            </div>
        </div>
    </div>
  )
}

export default AddBoardModal
