import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import { auth } from "@/auth";
import Application from "@/models/Application";
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

    if (session.user.role !== "candidate") {
        return NextResponse.json(
            {
                success: false,
                message: "Only candidates can apply.",
            },
            {
                status: 403,
            }
        );
    }

    try {

        const { jobId } = await request.json();

        const job = await Job.findById(jobId);

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

        const existingApplication = await Application.findOne({
            candidateId: session.user.id,
            jobId,
        });

        if (existingApplication) {
            return NextResponse.json(
                {
                    success: false,
                    message: "You have already applied for this job.",
                },
                {
                    status: 400,
                }
            );
        }

        const application = await Application.create({
            candidateId: session.user.id,
            recruiterId: job.recruiterId,
            companyId: job.companyId,
            jobId,
        });

        return NextResponse.json(
            {
                success: true,
                message: "Application submitted successfully.",
                application,
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