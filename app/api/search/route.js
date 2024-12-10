import { MongoClient } from "mongodb"
import { NextResponse } from "next/server"

// API to search product details
export async function GET(req) {
    
    const query = req.nextUrl.searchParams.get("query")

    const uri = process.env.MONGODB_URL
    const client = new MongoClient(uri)
    try {
        const database = client.db('test')
        const stock_management = database.collection('stock_management')

        const Products = await stock_management.aggregate([
            {
                $match: {
                    $or: [
                        { slug: { $regex: query, $options: "i" } },
                    ]
                }
            },
        ]).toArray()

        return NextResponse.json({ success: true, Products })

    } finally {
        await client.close()
    }
}