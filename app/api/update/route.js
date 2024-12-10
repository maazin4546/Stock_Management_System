import { MongoClient, ObjectId } from 'mongodb'; // Import ObjectId correctly
import { NextResponse } from 'next/server';

export async function PUT(req) {
    const { id, updates } = await req.json(); // Extract the product ID and updates from the request body
    const uri = process.env.MONGODB_URL; // Use your MongoDB connection string
    const client = new MongoClient(uri);

    try {
        const database = client.db('test'); // Use the database name
        const inventory = database.collection('stock_management'); // Use the collection name

        // Update the product by ID
        const result = await inventory.updateOne(
            { _id: new ObjectId(id) }, // Filter by ID
            { $set: updates } // Set the fields to update
        );

        if (result.matchedCount === 0) {
            return NextResponse.json(
                { error: 'Product not found or could not be updated.' },
                { status: 404 }
            );
        }

        return NextResponse.json({ message: 'Product updated successfully', result });
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to update product', details: error.message },
            { status: 500 }
        );
    } finally {
        await client.close();
    }
}
