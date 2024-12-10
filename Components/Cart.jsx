import React from 'react'
import { FaTrashAlt } from 'react-icons/fa';

const Cart = ({ cart, setCart }) => {

    return (
        <div>
            {cart.length > 0 && (
                <div className="mt-6">
                    <h1 className='text-3xl mt-10 font-bold mb-4 text-center text-white'>Items in the Cart</h1>

                    <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden mt-4">
                        <thead>
                            <tr className="bg-green-500 text-white">
                                <th className="py-3 px-4 text-center">Product Name</th>
                                <th className="py-3 px-4 text-center">Quantity</th>
                                <th className="py-3 px-4 text-center">Price</th>
                                <th className="py-3 px-4 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cart.map((item, index) => (
                                <tr key={index} className="hover:bg-gray-100">
                                    <td className="border px-4 py-2 text-center">{item.slug}</td>
                                    <td className="border px-4 py-2 text-center">{item.quantity}</td>
                                    <td className="border px-4 py-2 text-center">₹{item.price}</td>
                                    <td className="border px-4 py-2 text-center">
                                        <button
                                            className="text-red-500 hover:text-red-700 mx-1"
                                            onClick={() => setCart(cart.filter(cartItem => cartItem._id !== item._id))} // Filter out the clicked item by its _id
                                        >
                                            <FaTrashAlt />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr className="bg-gray-200">
                                <td colSpan="2" className="text-right font-bold py-2 px-4">Total:</td>
                                <td className="text-center font-bold py-2 px-4">
                                    ₹{cart.reduce((total, item) => total + parseFloat(item.price), 0)}
                                </td>
                                <td className="text-center px-4">
                                    <button
                                        className="bg-green-500 text-white font-bold py-1 px-6 rounded hover:bg-green-600"
                                        onClick={() => alert('Payment process initiated!')}
                                    >
                                        Pay
                                    </button>
                                </td>
                            </tr>
                        </tfoot>

                    </table>
                </div>
            )}

        </div>
    )
}

export default Cart