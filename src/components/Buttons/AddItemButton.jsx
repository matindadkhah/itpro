import React from 'react'

const AddItemButton = ({ openAddModal }) => {
    return (
        <button
            onClick={openAddModal}
            className="relative inline-flex items-center justify-start py-2 pl-4 pr-12 
             overflow-hidden font-semibold text-white transition-all duration-150 
             ease-in-out rounded-2xl hover:pl-10 hover:pr-6 bg-gradient-to-r 
          from-blue-400 via-indigo-500 to-purple-400 group"
        >
            <span className="absolute bottom-0 left-0 w-full h-1 transition-all duration-150 ease-in-out bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-400 group-hover:h-full"></span>

            <span className="absolute right-0 pr-4 duration-200 ease-out group-hover:translate-x-12">
                <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
            </span>

            <span className="absolute left-0 pl-2.5 -translate-x-12 group-hover:translate-x-0 ease-out duration-200">
                <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
            </span>

            <span className="relative w-full text-left transition-colors duration-200 ease-in-out group-hover:text-white">
                ثبت جدید
            </span>
        </button>


    )
}

export default AddItemButton;