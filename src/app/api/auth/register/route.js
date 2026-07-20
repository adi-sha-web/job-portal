import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import User from "@/models/user";
import bcrypt from "bcryptjs";

export async function POST(request) {
    try {
        await connectDB();

        const { name, email, password, role } = await request.json();

        if (!name || !email || !password || !role) {
            return NextResponse.json(
                { success: false ,
                 message: "Please provide all required fields" },
            );
        }

        const userexists = await User.findOne({ email });

        if (userexists) {
            return NextResponse.json(
                { message: "User already exists" ,
                 success: false }
            );
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role,
        });

        return NextResponse.json(
            { message: "User registered successfully" },
            { status: 201 }
        );
    } catch (error) {
        return NextResponse.json(
            { message: error.message },
            { status: 500 }
        );
    }
}