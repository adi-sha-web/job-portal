import { NextResponse } from "next/server";
import { auth } from "@/auth";

import connectDB from "@/lib/db";

import Company from "@/models/Company";

export async function POST(request) {
    try {
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
                    message: "Only recruiters are allowed",
                },
                {
                    status: 403,
                }
            );
        }

        const body = await request.json();
        const { companyName, website, industry, location, about, companySize, } = body;

        const companycheck = await Company.findOne({
            recruiterId: session.user.id,
        });

        if (companycheck) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Company profile already exists",
                },
                {
                    status: 409,
                }
            );
        }

        if (!companyName) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Company name is required",
                },
                {
                    status: 400,
                }
            );
        }

        const company = await Company.create({
            recruiterId: session.user.id,
            companyName,
            website,
            industry,
            location,
            about,
            companySize,
        });


        if (!company) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Company not found",
                },
                {
                    status: 404,
                }
            );
        }


        return NextResponse.json(
            {
                success: true,
                message: "Company created successfully",
                company,
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

export async function GET(request) {
    try {
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
                    message: "Only recruiters are allowed",
                },
                {
                    status: 403,
                }
            );
        }

        const company = await Company.findOne({
            recruiterId: session.user.id,
        });


        if (!company) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Company not found",
                },
                {
                    status: 404,
                }
            );
        }

        return NextResponse.json(
            {
                success: true,
                company,
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

export async function PUT(request) {
    try {
        await connectDB();

        const session = await auth();

        // Check authentication
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

        // Check authorization
        if (session.user.role !== "recruiter") {
            return NextResponse.json(
                {
                    success: false,
                    message: "Only recruiters are allowed",
                },
                {
                    status: 403,
                }
            );
        }

        // Get request body
        const body = await request.json();

        const {
            companyName,
            website,
            industry,
            location,
            about,
            companySize,
        } = body;

        // Validate required field
        if (!companyName?.trim()) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Company name is required",
                },
                {
                    status: 400,
                }
            );
        }

        // Check if company exists
        const company = await Company.findOne({
            recruiterId: session.user.id,
        });

        if (!company) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Company not found",
                },
                {
                    status: 404,
                }
            );
        }

        // Update company
        const updatedCompany = await Company.findOneAndUpdate(
            {
                recruiterId: session.user.id,
            },
            {
                companyName,
                website,
                industry,
                location,
                about,
                companySize,
            },
            {
                new: true,
                runValidators: true,
            }
        );

        return NextResponse.json(
            {
                success: true,
                message: "Company updated successfully",
                company: updatedCompany,
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