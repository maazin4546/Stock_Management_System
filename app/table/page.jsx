'use client'
import { useContext } from 'react';
import { GenContext } from '../../Components/ContextAPI';
import { FaEdit, FaTrashAlt, FaCartPlus } from 'react-icons/fa';
import * as XLSX from 'xlsx';
import ConfirmationModal from '../../Components/ConfirmationModal';
import Modal from '../../Components/Modal';
import SearchBar from '../../Components/SearchBar';
import Toast from '../../Components/Toast';

const Table = () => {

    const { toggleModal, confisModalOpen, confirmationtoggleModal, products, setmodalProduct, deleteProduct, addToCart} = useContext(GenContext)

    const downloadExcel = () => {
        const data = products.map(product => ({
            "Product Name": product.slug,
            "Quantity": product.quantity,
            "Price": product.price,
        }));

        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Products");

        XLSX.writeFile(workbook, "Products.xlsx");
    };

    return (
        <div className='container mx-auto p-12'>
            <SearchBar />
            <Toast/>
            <h1 className='text-3xl text-white mt-10 font-bold mb-4 text-center'>Display the Current Stock</h1>

            <div className="overflow-x-auto">
                <table className="min-w-full bg-gray-900 shadow-md rounded-lg overflow-hidden">
                    <thead>
                        <tr className="bg-gray-800 text-white">
                            <th className="py-3 px-4 text-center">Product Name</th>
                            <th className="py-3 px-4 text-center">Quantity</th>
                            <th className="py-3 px-4 text-center">Price</th>
                            <th className="py-3 px-4 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {(products || []).map((product, index) => (
                            <tr key={index} className="hover:bg-gray-800">
                                <td className="border border-gray-700 px-4 py-2 text-center text-gray-300">{product.slug}</td>
                                <td className="border border-gray-700 px-4 py-2 text-center text-gray-300">{product.quantity}</td>
                                <td className="border border-gray-700 px-4 py-2 text-center text-gray-300">₹{product.price}</td>
                                <td className="border border-gray-700 px-4 py-2 text-center">
                                    <button
                                        className="text-purple-400 hover:text-purple-600 mx-1"
                                        onClick={() => {
                                            setmodalProduct({
                                                slug: product.slug,
                                                quantity: product.quantity,
                                                price: product.price,
                                                _id: product._id,
                                            });
                                            toggleModal();
                                        }}
                                    >
                                        <FaEdit />
                                    </button>
                                    <button
                                        className="text-red-400 hover:text-red-600 mx-1"
                                        onClick={confirmationtoggleModal}
                                    >
                                        <FaTrashAlt />
                                    </button>
                                    {/* Delete confirmation modal */}
                                    <ConfirmationModal
                                        product={product}
                                        deleteProduct={deleteProduct}
                                        confisModalOpen={confisModalOpen}
                                        confirmationtoggleModal={confirmationtoggleModal}
                                    />
                                    <button className="text-green-400 hover:text-green-600 mx-1">
                                        <FaCartPlus onClick={() => addToCart(product._id,1)} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {products.length === 0 && (
                            <tr>
                                <td
                                    colSpan="4"
                                    className="text-center py-4 text-gray-300"
                                >
                                    No products available
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <button
                onClick={downloadExcel}
                className="mb-2 mt-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
                Download Excel
            </button>

            {/* Modal for updating product*/}
            <Modal />

        </div>
    )
}

export default Table