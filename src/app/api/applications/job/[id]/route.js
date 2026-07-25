import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import { auth } from "@/auth";
import Application from "@/models/Application";

export async function GET(request, { params }) {
    await connectDB();

    const session = await auth();

    if (!session) {
        return NextResponse.json(
            {
                success: false,
                message: "Unauthorized",
            },
            { status: 401 }
        );
    }

    if (session.user.role !== "recruiter") {
        return NextResponse.json(
            {
                success: false,
                message: "Access denied.",
            },
            { status: 403 }
        );
    }

    try {
        const { id } = await params;

        const applications = await Application.find({
            jobId: id,
            recruiterId: session.user.id,
        })
            .populate("candidateId")
            .sort({ createdAt: -1 });

        return NextResponse.json(
            {
                success: true,
                applications,
            },
            { status: 200 }
        );
    } catch (error) {
        console.error(error);

        return NextResponse.json(
            {
                success: false,
                message: "Internal Server Error",
            },
            { status: 500 }
        );
    }
}