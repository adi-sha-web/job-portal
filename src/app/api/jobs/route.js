import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import { auth } from "@/auth";
import Company from "@/models/Company";
import Job from "@/models/Job";

export async function POST(request) {
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
        const company = await Company.findOne({
            recruiterId: session.user.id,
        });

        if (!company) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Please create your company profile first.",
                },
                {
                    status: 400,
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
            !title?.trim() ||
            !description?.trim() ||
            !location?.trim() ||
            !workMode ||
            !employmentType ||
            !experience ||
            !salary ||
            !skills
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

        const job = await Job.create({
            recruiterId: session.user.id,
            companyId: company._id,
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
        });

        return NextResponse.json(
            {
                success: true,
                message: "Job created successfully.",
                job,
            },
            {
                status: 201,
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
                message: "Access denied",
            },
            {
                status: 403,
            }
        );
    }

    try {
        const jobs = await Job.find({
            recruiterId: session.user.id,
        }).sort({ createdAt: -1 });

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