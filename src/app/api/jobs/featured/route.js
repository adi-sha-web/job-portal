import { NextResponse } from "next/server";
import connectDB from "@/lib/db";

import Job from "@/models/Job";
import "@/models/Company";

export async function GET() {

    await connectDB();

    try {

        const jobs = await Job.find({
            status: "Open",
        })
            .populate("companyId")
            .sort({
                createdAt: -1,
            })
            .limit(6);

        return NextResponse.json({
            success: true,
            jobs,
        });

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