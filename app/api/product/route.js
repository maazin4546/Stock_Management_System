import { MongoClient } from "mongodb"
import { NextResponse } from "next/server"

// API for getting product details
export async function GET(req) {
    const uri = process.env.MONGODB_URL
    const client = new MongoClient(uri)
    try {
        const database = client.db('test')
        const inventory = database.collection('stock_management')
        const query = {}
        const Products = await inventory.find(query).toArray()
        return NextResponse.json({ success: true, Products })

    } finally {
        await client.close()
    }
}


// API for adding new products 
// export async function POST(req) {
//     try {
//         const body = await req.json(); // Parse JSON from the request
//         let products = body.products;

//         // Normalize to an array if a single product is provided
//         if (!Array.isArray(products)) {
//             products = [products];
//         }

//         if (products.length === 0) {
//             return NextResponse.json({ error: 'No products provided' }, { status: 400 });
//         }

//         const uri = process.env.MONGODB_URL;
//         const client = new MongoClient(uri);

//         try {
//             const database = client.db('test');
//             const inventory = database.collection('stock_management');

//             // Insert the products (single or multiple)
//             const result = await inventory.insertMany(products);

//             return NextResponse.json({
//                 message: 'Products added successfully',
//                 insertedCount: result.insertedCount,
//             });
//         } finally {
//             await client.close();
//         }
//     } catch (error) {
//         console.error('Error adding products:', error);
//         return NextResponse.json({ error: 'Failed to add products' }, { status: 500 });
//     }
// }

export async function POST(req) {
    try {
        const body = await req.json(); // Parse JSON from the request
        let products = body.products;

        // Normalize to an array if a single product is provided
        if (!Array.isArray(products)) {
            products = [products];
        }

        if (products.length === 0) {
            return NextResponse.json({ error: 'No products provided' }, { status: 400 });
        }

        // Debug log to check the incoming products
        console.log("Received products:", products);

        const uri = process.env.MONGODB_URL;
        const client = new MongoClient(uri);

        try {
            const database = client.db('test');
            const inventory = database.collection('stock_management');

            // Insert the products (single or multiple)
            const result = await inventory.insertMany(products);
            console.log("Insert result:", result); // Debug log for the insert result

            return NextResponse.json({
                message: 'Products added successfully',
                insertedCount: result.insertedCount,
            });
        } finally {
            await client.close();
        }
    } catch (error) {
        console.error('Error adding products:', error);
        return NextResponse.json({ error: 'Failed to add products' }, { status: 500 });
    }
}
