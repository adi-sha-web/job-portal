import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Job from "@/models/Job";
import { auth } from "@/auth";

export async function GET() {
    await connectDB();

    const session = await auth();
    
    if (!session) {
        return NextResponse.json(
            {
                success: false,
                message: "Unauthorized",
            },
            {
                status: 401,
            }
        );
    }

    if (session.user.role !== "recruiter") {
        return NextResponse.json(
            {
                success: false,
                message: "Access denied.",
            },
            {
                status: 403,
            }
        );
    }

    try {

        const jobs = await Job.find({
            recruiterId: session.user.id,
        }).sort({
            createdAt: -1,
        });

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