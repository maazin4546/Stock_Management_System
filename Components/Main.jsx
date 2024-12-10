'use client'
import React, { useEffect, useState } from 'react';
import Cart from './Cart';
import Table from './Table';
import Form from './Form';
import SearchBar from './SearchBar';
import Modal from './Modal';


const AddProducts = () => {

    const [productForm, setproductForm] = useState({})
    const [products, setproducts] = useState([])
    const [cart, setCart] = useState([]);
    const [alert, setalert] = useState("")
    const [query, setquery] = useState("")
    const [loading, setloading] = useState(false)
    const [laodingAction, setlaodingAction] = useState(false)
    const [dropdown, setdropdown] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [tempProductList, setTempProductList] = useState([{ slug: "", quantity: "", price: "" }]);
    const [productList, setProductList] = useState([
        { slug: '', quantity: '', price: '' }, // Ensure all fields have default values
    ]);
    const [showFields, setShowFields] = useState(false);
    const [modalProduct, setmodalProduct] = useState({
        slug: '',
        quantity: '',
        price: '',
        _id: ''
    })

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };


    useEffect(() => {
        const fetchProduct = async () => {
            const response = await fetch('/api/product');
            const rjson = await response.json();
            if (rjson.Products) {
                setproducts(rjson.Products);
            } else {
                console.error('API response does not contain "Products" key:', rjson);
            }
        };
        fetchProduct();
    }, []);

    // const addProduct = async (e) => {
    //     e.preventDefault();

    //     // Ensure there's either a tempProductList or a single product
    //     if (tempProductList.length === 0) {
    //         return;
    //     }

    //     try {
    //         const payload =
    //             tempProductList.length === 1
    //                 ? { products: tempProductList[0] } // Single product
    //                 : { products: tempProductList };  // Multiple products

    //         // Send the product(s) to the backend
    //         const response = await fetch('/api/product', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify(payload),
    //         });

    //         if (response.ok) {
    //             console.log('Product(s) added successfully');
    //             setTempProductList([]); // Clear the temporary list
    //         } else {
    //             const errorText = await response.text();
    //             console.error('Failed to add product(s):', errorText);
    //         }
    //     } catch (error) {
    //         console.error('Error occurred while adding product(s):', error);
    //     }
    // };

    const addProduct = async () => {
        // Filter out empty or invalid products from productList
        const validProductList = productList.filter(
            (product) => product.slug && product.quantity && product.price
        );

        // Prepare the products array
        const products = [
            ...(productForm.slug && productForm.quantity && productForm.price
                ? [
                    {
                        slug: productForm.slug,
                        quantity: productForm.quantity,
                        price: productForm.price,
                    },
                ]
                : []), // Include productForm only if valid
            ...validProductList, // Add only valid productList entries
        ];

        if (products.length === 0) {
            console.warn("No valid product data to send.");
            return; // Exit if no valid products
        }

        const productData = { products };

        console.log("Sending product data:", productData); // Debug to ensure correct data structure

        try {
            const response = await fetch("/api/product", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(productData), // Send valid data
            });

            if (!response.ok) {
                throw new Error("Failed to save product");
            }

            const result = await response.json();
            console.log("Product added successfully:", result);
        } catch (error) {
            console.error("Error saving product:", error);
        }
    };

    const handleInputChange = (index, event) => {
        const { name, value } = event.target;
        const updatedProducts = [...productList];
        updatedProducts[index][name] = value; // Update the specific field of the product
        setProductList(updatedProducts);
    };

    const addProductForm = () => {
        // Prevent adding multiple forms at once
        if (!showFields) {
            setShowFields(true);
            setProductList([{ name: "", quantity: "", price: "" }]);  // Reset list if necessary
        } else {
            // Only add a new form if there's already at least one
            setProductList((prevList) => [...prevList, { name: "", quantity: "", price: "" }]);
        }
    };


    const deleteProduct = async (productId) => {
        try {
            const response = await fetch('/api/delete', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: productId }), // Send the product ID in the request body
            });

            if (!response.ok) {
                throw new Error('Failed to delete the product');
            }

            const result = await response.json();
            console.log('Product deleted successfully:', result);
            setalert("Product has been deleted successfully!");
        } catch (error) {
            console.error('Error occurred while deleting product:', error);
        }
    };

    const updateProduct = async () => {
        const updatedFields = {
            slug: modalProduct.slug,
            quantity: parseInt(modalProduct.quantity),
            price: parseInt(modalProduct.price),
        };

        // Log data before making the request to debug
        console.log('Updated Fields:', updatedFields);
        console.log('Product ID:', modalProduct._id);

        setIsModalOpen(false);
        try {
            const response = await fetch('/api/update', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: modalProduct._id,
                    updates: updatedFields,
                }),
            });

            if (!response.ok) {
                const errorResponse = await response.json();
                console.error('Backend Error:', errorResponse.details);
                throw new Error('Failed to update the product');
            }

            const result = await response.json();
            console.log('Product updated successfully:', result);
            setalert("Product has been updated successfully!");
        } catch (error) {
            console.error('Error occurred while updating product:', error);
        }
    };



    const handleChange = (e) => {
        const { name, value } = e.target;
        setproductForm((prevState) => ({
            ...prevState,
            [name]: value,  // Dynamically update the field name with the value
        }));
    };


    const handleUpdateChange = (e) => {
        const { name, value } = e.target;
        setmodalProduct((prevProducts) => ({
            ...prevProducts,
            [name]: value, // Update the specific field based on name
        }));
    }

    const onDropdownEdit = async (e) => {
        setquery(e.target.value)
        if (!loading) {
            setloading(true)
            const response = await fetch('/api/search?query=' + query);
            const rjson = await response.json();
            setdropdown(rjson.Products)
            setloading(false)
        }
    }

    const buttonAction = async (action, slug, initialQuanity) => {
        console.log(action, slug)
        setlaodingAction(true)
        try {
            const response = await fetch('/api/action', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ action, slug, initialQuanity }),
            });
            let r = await response.json()
            console.log(r)
            setlaodingAction(false)

        } catch (error) {
            console.error('Error occurred while adding product:', error);
        }
    }

    const addToCart = (product) => {
        setCart([...cart, product]); // Add product to cart
    };

    return (
        <div className='container mx-auto p-6'>

            {/* Seach bar */}
            <SearchBar query={query} onDropdownEdit={onDropdownEdit} setdropdown={setdropdown} loading={loading} dropdown={dropdown} buttonAction={buttonAction} laodingAction={laodingAction} />

            {/* Form to add product */}
            <Form addProductForm={addProductForm} handleInputChange={handleInputChange} showFields={showFields} setShowFields={setShowFields} productList={productList} setProductList={setProductList} alert={alert} handleChange={handleChange} tempProductList={tempProductList} setTempProductList={setTempProductList} productForm={productForm} setproductForm={setproductForm} addProduct={addProduct} />

            {/* Table */}
            <Table products={products} setmodalProduct={setmodalProduct} toggleModal={toggleModal} deleteProduct={deleteProduct} addToCart={addToCart} />

            {/* Cart Table */}
            <Cart cart={cart} setCart={setCart} />

            {/* ModaL */}
            <Modal isModalOpen={isModalOpen} toggleModal={toggleModal} handleUpdateChange={handleUpdateChange} modalProduct={modalProduct} updateProduct={updateProduct} />


        </div>

    );
}

export default AddProducts;
