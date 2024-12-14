import { NextResponse } from "next/server";

export async function POST() {
    try {
        // Clear the token cookie by setting it to an empty value with an immediate expiration
        const response = NextResponse.json({ message: "User logged out successfully!" }, { status: 200 });
        response.cookies.set('token', '', { httpOnly: true, expires: new Date(0) });

        return response;
    } catch (error) {
        console.error("Logout error:", error);
        return NextResponse.json({ error: "Logout failed" }, { status: 500 });
    }
}
