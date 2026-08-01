import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import { auth } from "@/auth";
import Job from "@/models/Job";
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

    try {
        const { id } = params;

const job = await Job.findById(id);

        if (!job) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Job not found.",
                },
                { status: 404 }
            );
        }

        return NextResponse.json(
            {
                success: true,
                job,
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
                message: "Access denied",
            },
            {
                status: 403,
            }
        );
    }

    try {

        const { id } = await params;


        const job = await Job.findById(id);

        if (!job) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Job not found.",
                },
                {
                    status: 404,
                }
            );
        }
        if (job.recruiterId.toString() !== session.user.id) {
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

        const body = await request.json();

        const {
            title,
            description,
            location,
            workMode,
            employmentType,
            experience,
            salary,
            skills,
            openings,
            deadline,
        } = body;

        if (
            !title ||
            !description ||
            !location ||
            !workMode ||
            !employmentType
        ) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Please fill all required fields.",
                },
                {
                    status: 400,
                }
            );
        }

        const updatedJob = await Job.findByIdAndUpdate(
            id,
            {
                title,
                description,
                location,
                workMode,
                employmentType,
                experience,
                salary,
                skills: skills
                    .split(",")
                    .map((skill) => skill.trim())
                    .filter(Boolean),
                openings,
                deadline,
            },
            {
                new: true,
                runValidators: true,
            }
        );

        return NextResponse.json(
            {
                success: true,
                message: "Job updated successfully.",
                job: updatedJob,
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

export async function DELETE(request, { params }) {
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
                message: "Access denied",
            },
            {
                status: 403,
            }
        );
    }

    try {
        const { id } = await params;

        const job = await Job.findById(id);

        if (!job) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Job not found.",
                },
                {
                    status: 404,
                }
            );
        }

        if (job.recruiterId.toString() !== session.user.id) {
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
        
        await Application.deleteMany({
            jobId: id,
        });

        await job.deleteOne();


        return NextResponse.json(
            {
                success: true,
                message: "Job deleted successfully.",
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