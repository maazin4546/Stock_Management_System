import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function POST(req) {
    const uri = process.env.MONGODB_URL;

    if (!uri) {
        return NextResponse.json({ error: "Database URL is not defined in environment variables" }, { status: 500 });
    }

    const client = new MongoClient(uri);

    try {
        await client.connect();
        const database = client.db('test');
        const stock_user = database.collection('stock_user');

        // Parse request body
        const body = await req.json();
        const { email, password } = body;

        if (!email || !password) {
            return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
        }

        // Find user by email
        const existingUser = await stock_user.findOne({ email });
        if (!existingUser) {
            return NextResponse.json({ error: "User with this email does not exist" }, { status: 400 });
        }

        // Compare password
        const isPasswordValid = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordValid) {
            return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
        }

        // Generate JWT token
        const token = jwt.sign(
            { userId: existingUser._id, email: existingUser.email, role: existingUser.role }, // Payload
            process.env.JWT_SECRET, // Secret key from env variable
            { expiresIn: '1h' } // Token expires in 1 hour
        );

        // Set token in HTTP-only cookie
        const response = NextResponse.json({ message: "User logged in successfully!" }, { status: 200 });
        response.cookies.set('token', token, { httpOnly: true}); // 1 hour        

        return response;

    } catch (error) {
        console.error("Login error:", error);
        return NextResponse.json({ error: "Login failed" }, { status: 500 });
    } finally {
        await client.close(); // Ensure client is closed
    }
}
