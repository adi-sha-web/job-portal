import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Job from "@/models/Job";

export async function GET() {
    await connectDB();

    try {
        const jobs = await Job.find().sort({ createdAt: -1 });

        return NextResponse.json(
            {
                success: true,
                jobs,
            },
            {
                status: 200,
            }
        );
    } catch (error) {
        console.error(error);

        return NextResponse.json(
            {
                success: false,
                message: "Internal Server Error",
            },
            {
                status: 500,
            }
        );
    }
}