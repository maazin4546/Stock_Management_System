'use client'
import React, { useContext } from 'react';
import { GenContext } from '../../Components/ContextAPI';
import Link from 'next/link';
import Toast from '../../Components/Toast';

const Cart = () => {

  const { payment_function, cartProducts, deleteProductFromCart } = useContext(GenContext)

  return (
    <div className='container mx-auto py-12 px-8 sm:px-24'>
    <Toast/>
      {cartProducts.length > 0 ? (
        <div className="mt-6">
          <h1 className='text-3xl mt-10 font-bold mb-4 text-center text-white'>Items in the Cart</h1>

          <div className="overflow-x-auto">
            <table className="min-w-full bg-gray-800 shadow-md rounded-lg overflow-hidden mt-4">
              <thead>
                <tr className="bg-gray-900 text-white">
                  <th className="py-3 px-4 text-center">Product Name</th>
                  <th className="py-3 px-4 text-center">Quantity</th>
                  <th className="py-3 px-4 text-center">Price</th>
                  <th className="py-3 px-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {cartProducts.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-700">
                    <td className="border border-gray-700 px-4 py-2 text-center text-white">{item.slug}</td>
                    <td className="border border-gray-700 px-4 py-2 text-center text-white">{item.quantity}</td>
                    <td className="border border-gray-700 px-4 py-2 text-center text-white">₹{item.price}</td>
                    <td className="border border-gray-700 px-4 py-2 text-center">
                      <button type="button" onClick={() => deleteProductFromCart(item._id)} className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-1 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900">
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-gray-900">
                  <td colSpan="2" className="text-right font-bold py-2 px-4 text-white">Total Amount:</td>
                  <td className="text-center font-bold py-2 px-4 text-white">
                    ₹{cartProducts.reduce((total, item) => total + parseFloat(item.price), 0)}
                  </td>
                  <td className="text-center px-4">               
                    <button
                      onClick={payment_function}
                      className="bg-green-600 text-white font-bold py-1 px-6 rounded hover:bg-green-700">
                      Pay
                    </button>                  
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>


        </div>
      ) : (
        <div className="h-screen flex items-center justify-center">
          <div className="text-center p-8 bg-gray-800 text-white rounded-lg shadow-lg w-3/4 max-w-lg">
            <h1 className="mb-4">There is no Product in the Cart right now<br /> You can add from below button.</h1>
            <Link href='/table'>
              <button className="bg-green-500 text-white font-bold py-2 px-6 rounded hover:bg-green-600">
                Add Product
              </button>
            </Link>
          </div>
        </div>

      )}


    </div>
  )
}

export default Cart