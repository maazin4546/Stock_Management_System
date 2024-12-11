'use client'
import { useContext } from 'react';
import { GenContext } from './ContextAPI';
import LoadingSpinner from './LoadingSpinner'

const SearchBar = () => {

    const { dropdown, query, onDropdownEdit, loading, laodingAction, buttonAction } = useContext(GenContext)

    return (
        <>
            <form className="max-w-md mx-auto">
                <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                        </svg>
                    </div>
                    <input type="search"
                        id="default-search"
                        value={query}
                        placeholder="Search a Product..."
                        className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-900 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        onChange={onDropdownEdit}
                    // onBlur={() => { setdropdown([]) }}
                    />
                    <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Search</button>
                </div>
            </form>

            {loading && <LoadingSpinner />}
            <div className="mt-10">
                {dropdown.map((elem, index) => (
                    <div
                        className="container w-full flex flex-col md:flex-row justify-between items-center bg-white shadow-md rounded-lg p-6 mb-4"
                        key={index}
                    >
                        <span className="text-lg font-semibold text-gray-800">
                            {elem.slug} ({elem.quantity} available for ₹{elem.price})
                        </span>
                        <div className="flex items-center space-x-2 mx-5">
                            <button disabled={laodingAction} onClick={() => { buttonAction("plus", elem.slug, elem.quantity) }} className="bg-blue-500 disabled:bg-slate-500 text-white font-bold py-1 px-3 rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600">
                                +
                            </button>
                            <span className="text-lg text-gray-600">{elem.quantity}</span>
                            <button disabled={laodingAction} onClick={() => { buttonAction("minus", elem.slug, elem.quantity) }} className="bg-red-500 disabled:bg-slate-500 text-white font-bold py-1 px-3 rounded-full hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600">
                                -
                            </button>
                        </div>
                    </div>

                ))}
            </div>
        </>
    )
}

export default SearchBar