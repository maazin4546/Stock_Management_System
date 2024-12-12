import { MongoClient, ObjectId } from 'mongodb'; // Import ObjectId correctly
import { NextResponse } from 'next/server';


export async function DELETE(req) {
    try {
        const body = await req.json(); // Parse JSON from the request
        const { productId } = body; // Expect an array of product IDs in the request body

        if (!productId) {
            return NextResponse.json({ error: 'Product ID is required' }, { status: 400 });
        }


        // Debug log to check the incoming productId
        console.log("Received product ID for deletion:", productId);

        const uri = process.env.MONGODB_URL;
        const client = new MongoClient(uri);

        try {
            const database = client.db('test'); // Replace 'test' with your database name
            const stock_management = database.collection('stock_management'); // "Cart" collection

            // Convert the productId to ObjectId
            const objectId = new ObjectId(productId);

            // Delete the product from the "stock_management" collection
            const result = await stock_management.deleteOne({ _id: objectId });

            if (result.deletedCount === 0) {
                return NextResponse.json({ error: 'Product not found in the table' }, { status: 404 });
            }

            return NextResponse.json({
                message: 'Product removed from table successfully',
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
