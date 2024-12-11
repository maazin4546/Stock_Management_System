import { MongoClient, ObjectId } from 'mongodb'; // Import ObjectId separately
import { NextResponse } from 'next/server';


// Adding products to cart
export async function POST(req) {
    try {
        const body = await req.json(); // Parse JSON from the request
        const { productId, quantity } = body; // Get the product ID and quantity from the request body

        if (!productId) {
            return NextResponse.json({ error: 'Product ID is required' }, { status: 400 });
        }

        if (quantity <= 0 || !Number.isInteger(quantity)) {
            return NextResponse.json({ error: 'Quantity must be a positive integer' }, { status: 400 });
        }

        // Debug log to check the incoming productId and quantity
        console.log("Received product ID for cart:", productId);
        console.log("Quantity:", quantity);

        const uri = process.env.MONGODB_URL;
        const client = new MongoClient(uri);

        try {
            const database = client.db('test'); // Replace 'test' with your database name
            const productsCollection = database.collection('stock_management'); // "Products" collection
            const cartCollection = database.collection('cart'); // "Cart" collection

            // Fetch the specific product from the "Products" collection by ID
            const product = await productsCollection.findOne({ _id: new ObjectId(productId) });

            if (!product) {
                return NextResponse.json({ error: 'Product not found' }, { status: 404 });
            }

            // Create an array of the product repeated 'quantity' times with a new unique _id for each
            const productsToAdd = Array(quantity).fill().map(() => ({
                ...product,
                _id: new ObjectId() // Generate a new _id for each product
            }));

            // Insert the product(s) into the "Cart" collection
            const result = await cartCollection.insertMany(productsToAdd);
            console.log("Cart insert result:", result); // Debug log for the insert result

            return NextResponse.json({
                message: `Product added to cart ${quantity} times successfully`,
                insertedCount: result.insertedCount,
            });
        } finally {
            await client.close();
        }
    } catch (error) {
        console.error('Error adding product to cart:', error);
        return NextResponse.json({ error: 'Failed to add product to cart' }, { status: 500 });
    }
}


// GET products from cart
export async function GET(req) {
    try {
        const uri = process.env.MONGODB_URL;
        const client = new MongoClient(uri);

        try {
            const database = client.db('test'); // Replace 'test' with your database name
            const cartCollection = database.collection('cart'); // "Cart" collection

            // Fetch all products from the "Cart" collection
            const cartProducts = await cartCollection.find().toArray();

            return NextResponse.json({
                message: 'Cart products fetched successfully',
                cartProducts,
            });
        } finally {
            await client.close();
        }
    } catch (error) {
        console.error('Error fetching cart products:', error);
        return NextResponse.json({ error: 'Failed to fetch cart products' }, { status: 500 });
    }
}



// Delete cart product
export async function DELETE(req) {
    try {
        const body = await req.json(); // Parse JSON from the request
        const { productId } = body; // Get the product ID from the request body

        if (!productId) {
            return NextResponse.json({ error: 'Product ID is required' }, { status: 400 });
        }

        // Debug log to check the incoming productId
        console.log("Received product ID for deletion:", productId);

        const uri = process.env.MONGODB_URL;
        const client = new MongoClient(uri);

        try {
            const database = client.db('test'); // Replace 'test' with your database name
            const cartCollection = database.collection('cart'); // "Cart" collection

            // Convert the productId to ObjectId
            const objectId = new ObjectId(productId);

            // Delete the product from the "Cart" collection
            const result = await cartCollection.deleteOne({ _id: objectId });

            if (result.deletedCount === 0) {
                return NextResponse.json({ error: 'Product not found in the cart' }, { status: 404 });
            }

            return NextResponse.json({
                message: 'Product removed from cart successfully',
                deletedCount: result.deletedCount,
            });
        } finally {
            await client.close();
        }
    } catch (error) {
        console.error('Error removing product from cart:', error);
        return NextResponse.json({ error: 'Failed to remove product from cart' }, { status: 500 });
    }
}

