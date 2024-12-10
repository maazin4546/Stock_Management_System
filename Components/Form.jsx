
const Form = ({ addProductForm, handleInputChange, productList, setProductList, showFields, setShowFields, alert, addProduct, productForm, setproductForm, handleChange, tempProductList, setTempProductList }) => {

    return (
        <div>
            <div className='text-green-700 text-center'>{alert}</div>
            <h1 className='text-3xl text-white font-bold mb-4 text-center mt-6'>Add a Product</h1>

            <form className="bg-gray-900 shadow-xl rounded-lg px-12 py-14 mb-8 max-w-md mx-auto">
                <div className="mb-6">
                    <label className="block text-gray-300 text-sm font-semibold mb-2" htmlFor="productName">
                        Product Name
                    </label>
                    <input
                        className="shadow-md bg-gray-800 appearance-none border border-gray-700 rounded-lg w-full py-3 px-4 text-gray-300 leading-tight focus:outline-none focus:ring-2 focus:ring-white"
                        id="productName"
                        type="text"
                        placeholder="Enter product name"
                        name="slug"
                        onChange={handleChange}
                        value={productForm?.slug || ""}
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-300 text-sm font-semibold mb-2" htmlFor="quantity">
                        Quantity
                    </label>
                    <input
                        className="shadow-md bg-gray-800 appearance-none border border-gray-700 rounded-lg w-full py-3 px-4 text-gray-300 leading-tight focus:outline-none focus:ring-2 focus:ring-white"
                        id="quantity"
                        type="number"
                        placeholder="Enter quantity"
                        name="quantity"
                        onChange={handleChange}
                        value={productForm?.quantity || ""}
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-300 text-sm font-semibold mb-2" htmlFor="price">
                        Price
                    </label>
                    <input
                        className="shadow-md bg-gray-800 appearance-none border border-gray-700 rounded-lg w-full py-3 px-4 text-gray-300 leading-tight focus:outline-none focus:ring-2 focus:ring-white"
                        id="price"
                        type="number"
                        placeholder="Enter price"
                        name="price"
                        onChange={handleChange}
                        value={productForm?.price || ""}
                    />
                </div>

                <div className="flex justify-start">
                    <button
                        className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                        type="button"
                        onClick={addProduct}
                    >
                        Save All
                    </button>
                    <button
                        className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                        type="button"
                        onClick={addProductForm}
                    >
                        Add Multiple Product
                    </button>

                </div>



            </form>


            {showFields &&
                productList.map((product, index) => (
                    <div
                        key={index}
                        className="flex space-x-4 mb-6 border p-4 rounded-md bg-gray-800 items-center"
                    >
                        <input
                            className="shadow-md bg-gray-800 appearance-none border border-gray-700 rounded-lg py-2 px-4 text-gray-300 leading-tight focus:outline-none focus:ring-2 focus:ring-white flex-1"
                            type="text"
                            placeholder="Enter product name"
                            name="slug"
                            value={product.slug || ''} // Default to an empty string
                            onChange={(event) => handleInputChange(index, event)}
                        />
                        <input
                            className="shadow-md bg-gray-800 appearance-none border border-gray-700 rounded-lg py-2 px-4 text-gray-300 leading-tight focus:outline-none focus:ring-2 focus:ring-white w-1/3"
                            type="number"
                            placeholder="Enter quantity"
                            name="quantity"
                            value={product.quantity || ''} // Default to an empty string
                            onChange={(event) => handleInputChange(index, event)}
                        />
                        <input
                            className="shadow-md bg-gray-800 appearance-none border border-gray-700 rounded-lg py-2 px-4 text-gray-300 leading-tight focus:outline-none focus:ring-2 focus:ring-white w-1/3"
                            type="number"
                            placeholder="Enter price"
                            name="price"
                            value={product.price || ''} // Default to an empty string
                            onChange={(event) => handleInputChange(index, event)}
                        />
                    </div>
                ))}
        </div>
    )
}

export default Form