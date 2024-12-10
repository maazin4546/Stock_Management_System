import { MongoClient, ObjectId } from 'mongodb'; // Import ObjectId correctly
import { NextResponse } from 'next/server';

export async function DELETE(req) {
    const { id } = await req.json(); // Extract the product ID from the request body
    const uri = process.env.MONGODB_URL; // Use your MongoDB connection string
    const client = new MongoClient(uri);

    try {
        const database = client.db('test'); // Use the database name
        const inventory = database.collection('stock_management'); // Use the collection name

        // Convert the id to ObjectId
        const result = await inventory.deleteOne({ _id: new ObjectId(id) });

        if (result.deletedCount === 0) {
            return NextResponse.json(
                { error: 'Product not found or could not be deleted.' },
                { status: 404 }
            );
        }

        return NextResponse.json({ message: 'Product deleted successfully', result });
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to delete product', details: error.message },
            { status: 500 }
        );
    } finally {
        await client.close();
    }
}
