import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";
import bcrypt from 'bcryptjs';

export async function POST(req) {
    const uri = process.env.MONGODB_URL;

    if (!uri) {
        return NextResponse.json({ error: "Database URL is not defined in environment variables" }, { status: 500 });
    }

    const client = new MongoClient(uri);

    try {
        // Parse request body
        const body = await req.json();
        const { name, email, password } = body;

        if (!name || !email || !password) {
            return NextResponse.json({ error: "Name, email, and password are required" }, { status: 400 });
        }

        const database = client.db('test');
        const stock_user = database.collection('stock_user');

        // Check if user already exists
        const existingUser = await stock_user.findOne({ email });
        if (existingUser) {
            return NextResponse.json({ error: "User with this email already exists" }, { status: 400 });
        }

        const salt = bcrypt.genSaltSync(10);
        const hash_password = bcrypt.hashSync(password, salt);

        // Create new user document
        const new_user = {
            name,
            email,
            password: hash_password, // You should hash the password before storing it
            role:"user",
        };

        // Insert the user into the database
        const save_user = await stock_user.insertOne(new_user);

        return NextResponse.json({ message: "User registered successfully", userId: save_user.insertedId }, { status: 201 });
    } catch (error) {
        console.error("Error in register user:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    } finally {
        // Ensure client connection is closed
        await client.close();
    }
}
