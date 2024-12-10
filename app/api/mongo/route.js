import { MongoClient } from "mongodb"
import { NextResponse } from "next/server"

export async function GET(req) {
    const uri = process.env.MONGODB_URL
    const client = new MongoClient(uri)
    try {
        const database = client.db('test')
        const movies = database.collection('stock_management')
        const query = {}
        const movie = await movies.find(query).toArray()
        console.log(movie)
        return NextResponse.json({ "a": 34, movie })

    } finally {
        await client.close()
    }
}