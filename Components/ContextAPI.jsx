// Creaing Context
"use client"
import React, { createContext, useState, useEffect } from 'react'
import { toast } from "react-toastify";

export const GenContext = createContext()

export const ContextProvider = ({ children }) => {

    const [productForm, setproductForm] = useState({})
    const [products, setproducts] = useState([])
    const [cart, setCart] = useState([]);
    const [alert, setalert] = useState("")
    const [query, setquery] = useState("")
    const [loading, setloading] = useState(false)
    const [laodingAction, setlaodingAction] = useState(false)
    const [dropdown, setdropdown] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [confisModalOpen, setconfIsModalOpen] = useState(false);
    const [cartProducts, setCartProducts] = useState([]);
    const [productList, setProductList] = useState([
        { slug: '', quantity: '', price: '' },
    ]);
    const [showFields, setShowFields] = useState(false);
    const [modalProduct, setmodalProduct] = useState({
        slug: '',
        quantity: '',
        price: '',
        _id: ''
    })


    // ---------------------Form Fucntions----------------------------
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
                toast.error("Error saving product:");
                throw new Error("Failed to save product");
            }

            const result = await response.json();
            console.log("Product added successfully:", result);
            toast.success("Added successfully!");

            // Clear the form fields and productList after successful submission
            setproductForm({
                slug: "",
                quantity: "",
                price: "",
            });

            setProductList([]); // Reset productList to an empty array

        } catch (error) {
            console.error("Error saving product:", error);
            toast.error("Error saving product:");
        }
    };


    const handleChange = (e) => {
        const { name, value } = e.target;
        setproductForm((prevState) => ({
            ...prevState,
            [name]: value,  // Dynamically update the field name with the value
        }));
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


    // ----------------Table Functions-----------------------
    const confirmationtoggleModal = () => {
        setconfIsModalOpen(!confisModalOpen);
    };

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    const deleteProduct = async (productId) => {
        try {
            const response = await fetch('/api/delete', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ productId }),
            });

            setconfIsModalOpen(false);

            if (response.ok) {
                console.log("deleted successfully"); // Success message
                toast.success("Deleted successfully!");

            } else {
                console.log(data.error); // Error message
                toast.error("Failed to delete products!");
            }
        } catch (error) {
            console.error('Error deleting product:', error);
            toast.error("Failed to delete products!");
        }
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
            toast.success("Updated Scuessfully")

        } catch (error) {
            console.error('Error occurred while updating product:', error);
            toast.error("Failed to Update")
        }
    };


    const handleUpdateChange = (e) => {
        const { name, value } = e.target;
        setmodalProduct((prevProducts) => ({
            ...prevProducts,
            [name]: value, // Update the specific field based on name
        }));
    }

    const addToCart = async (productId, quantity) => {
        try {
            const response = await fetch('/api/cart', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ productId, quantity }),
            });

            const data = await response.json();

            if (response.ok) {
                console.log(data.message);
                toast.success("Added Successfully")
            } else {
                console.log(data.error);
                toast.error("Failed to Add")
            }
        } catch (err) {
            console.log('Failed to add product to cart');
        }
    };



    // ---------------------Searchbar Fucntions----------------------------
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


    // ------------Cart functions-------------------
    const deleteProductFromCart = async (productId) => {
        try {
            const response = await fetch('/api/cart', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ productId }),  // This should be properly stringified JSON
            });

            const data = await response.json();

            if (response.ok) {
                console.log("deleted successfully"); // Success message
                toast.success("Deleted Successfully")

            } else {
                console.log(data.error); // Error message
                toast.error("Failed to Remove")
            }
        } catch (error) {
            console.error('Error deleting product:', error);
            toast.error("Failed to Remove")
        }
    };

    useEffect(() => {
        const fetchCartProducts = async () => {
            try {
                const response = await fetch('/api/cart');
                const data = await response.json();

                if (response.ok) {
                    setCartProducts(data.cartProducts); // Set the cart products data
                } else {
                    console.log(data.error || 'Failed to fetch cart products');
                }
            } catch (err) {
                console.log('Failed to fetch cart products');
            }
        };

        fetchCartProducts();
    }, []);

    const payment_function = async (req, response) => {
        try {
            const res = await fetch("/api/payment", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ products: cartProducts }),
            });

            // Parse the response JSON
            const data = await res.json();

            if (data.url) {
                window.location.href = data.url;
                console.log(data.url);
                toast.success("Payment Successfull")
            } else {
                console.log("Error: Missing URL in response", data);
            }
        } catch (error) {
            console.log("Error in buying:", error);
        }
    };

    return (
        <GenContext.Provider value={{ payment_function, cartProducts, deleteProductFromCart, buttonAction, dropdown, query, onDropdownEdit, loading, laodingAction, cart, setCart, modalProduct, handleUpdateChange, updateProduct, isModalOpen, confirmationtoggleModal, addToCart, deleteProduct, toggleModal, setmodalProduct, products, confisModalOpen, alert, showFields, addProductForm, setProductList, handleInputChange, handleChange, addProduct, productForm, productList }}>
            {children}
        </GenContext.Provider>
    )
}

