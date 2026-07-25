import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import { auth } from "@/auth";
import Application from "@/models/Application";

export async function PUT(request, { params }) {
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
        const { id } = await params;

        const application = await Application.findById(id);

        if (!application) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Application not found.",
                },
                {
                    status: 404,
                }
            );
        }

        if (application.recruiterId.toString() !== session.user.id) {
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

        const { status } = await request.json();

        if (!["Accepted", "Rejected", "Pending"].includes(status)) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Invalid status.",
                },
                {
                    status: 400,
                }
            );
        }

        application.status = status;

        await application.save();

        return NextResponse.json(
            {
                success: true,
                message: "Application updated successfully.",
                application,
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