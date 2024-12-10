import { MongoClient } from "mongodb"
import { NextResponse } from "next/server"

export async function POST(req) {
    let { action, slug, initialQuanity } = await req.json()
    const uri = process.env.MONGODB_URL
    const client = new MongoClient(uri)
    try {
        const database = client.db('test')
        const stock_management = database.collection('stock_management')

        const filter = { slug: slug };

        let newQunatity = action == 'plus' ? (parseInt(initialQuanity) + 1) : (parseInt(initialQuanity) - 1)
        const updateDoc = {
            $set: {
                quantity: newQunatity
            },
        };

        const result = await stock_management.updateOne(filter, updateDoc, {});
        return NextResponse.json({ success: true, message: `${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)` })

    } finally {
        await client.close();
    }
}
