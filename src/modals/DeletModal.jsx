import React from 'react'

export default function DeletModal({type, title, onDeleteBtnClick, setIsDeleteModalOpen}) {
  return (
    <div
    className='fixed right-0 bottom-0 left-0 top-0 px-2 py-4 overflow-scroll 
    scrollbar-hide z-50 justify-center items-center flex bg-[#00000080]'
    onClick={(e) => {
        if(e.target !== e.currentTarget){
            return
        }
        setIsDeleteModalOpen(false)
    }}
    >
        <div className='scrollbar-hide overflow-y-scroll max-h-[95vh] my-auto bg-white dark:bg-[#2b2c37]
        text-black dark:text-white w-full px-8 py-8 rounded-xl max-w-md
        '
        >
            <h3 className='font-bold text-red-500 text-xl'>
                Delete This {type} ?
            </h3>

            { type === 'task' ? (<p className='text-gray-500 font-semibold tracking-wide text-sm pt-6 '>
                Are You sure want to delete this "{title}" task and subtasks
            </p>) : (<p className='text-gray-500 font-semibold tracking-wide text-sm pt-6'>
            Are You sure want to delete this "{title}" task and subtasks
            </p>)}

            <div className='flex w-full mt-4 items-center justify-center space-x-4'>
                <button 
                onClick={onDeleteBtnClick}
                className='w-full items-center text-white hover:opacity-75 bg-red-500 font-semibold py-2 rounded-full'>
                    Delete
                </button>
                <button 
                onClick={() => setIsDeleteModalOpen(false)}
                className='w-full items-center text-[#635fc7] hover:opacity-75 bg-[#635fc71a] font-semibold py-2 rounded-full'>
                    Cancel
                </button>
            </div>
        </div>
    </div>
  )
}
