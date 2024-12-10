import React from 'react'

const Modal = ({ isModalOpen, toggleModal, handleUpdateChange, modalProduct, updateProduct }) => {
    return (
        <div>
            {isModalOpen && (
                <div
                    id="authentication-modal"
                    tabIndex="-1"
                    aria-hidden="true"
                    className="fixed top-0 right-0 left-0 z-50 justify-center items-center w-full h-full overflow-y-auto bg-black bg-opacity-50 flex"
                >
                    <div className="relative p-4 w-full max-w-md max-h-full">
                        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                    Update Product Details
                                </h3>
                                <button
                                    onClick={toggleModal}
                                    type="button"
                                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                >
                                    <svg
                                        className="w-3 h-3"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 14 14"
                                    >
                                        <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                        />
                                    </svg>
                                    <span className="sr-only">Close modal</span>
                                </button>
                            </div>
                            <div className="p-4 md:p-5">
                                <form className="space-y-4" action="#">
                                    <div>
                                        <label
                                            htmlFor="text"
                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                        >
                                            Product
                                        </label>
                                        <input
                                            type="text"
                                            name="slug"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                            onChange={handleUpdateChange}
                                            value={modalProduct.slug}
                                        />
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="number"
                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                        >
                                            Quantity
                                        </label>
                                        <input
                                            type="number"
                                            name="quantity"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                            onChange={handleUpdateChange}
                                            value={modalProduct.quantity}
                                        />
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="number"
                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                        >
                                            Price
                                        </label>
                                        <input
                                            type="number"
                                            name="price"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                            onChange={handleUpdateChange}
                                            value={modalProduct.price}
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                        onClick={() => updateProduct(modalProduct._id)}
                                    >
                                        Update Product
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )
            }
        </div>
    )
}

export default Modal