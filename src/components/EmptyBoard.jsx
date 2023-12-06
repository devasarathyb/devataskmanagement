import React, { useState } from 'react'
import AddBoardModal from '../modals/AddBoardModal'

export const EmptyBoard = ({type}) => {
    const [isBoardModelOpen, setIsBoardModelOpen] = useState(false)

  return (
    <div className='bg-white dark:bg-[#2b2c37] h-screen w-screen flex flex-col items-center justify-center'>

    <h3 className='text-gray-500 font-bold '>
        {
            type === 'edit' ? 'This board is empty. Create a new column to get started' : 
            'There are no boards available. Create a new board to get started'
        }
    </h3>


        <button className='w-full items-center max-w-xs font-bold 
        hover:opacity-70 dark:text-white dark:[#635fc7] mt-8 relative text-white bg-[#635fc7] py-2 rounded-full'
        onClick={() => {
            setIsBoardModelOpen(true)
        }}>
            {type === 'edit' ?  ' + Add New Column' : ' + Add New Board'}
        </button>

        {
            isBoardModelOpen && (
                <AddBoardModal type={type} setBoardmodelopen={setIsBoardModelOpen}/>
            )
        }
    </div>
  )
}
