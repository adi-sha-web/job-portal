import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import { auth } from "@/auth";

import CandidateProfile from "@/models/CandidateProfile";

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

    try {

        let profile = await CandidateProfile.findOne({
            userId: session.user.id,
        });

        if (!profile) {

            profile = await CandidateProfile.create({
                userId: session.user.id,
            });

        }

        return NextResponse.json({
            success: true,
            profile,
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

    const {
      phone,
      location,
      bio,
      skills,
      education,
      experience,
      github,
      linkedin,
      portfolio,
      resume,
      profileImage,
    } = await request.json();

    const existingProfile = await CandidateProfile.findOne({
      userId: session.user.id,
    });

    if (existingProfile) {
      return NextResponse.json(
        {
          success: false,
          message: "Profile already exists",
        },
        {
          status: 400,
        }
      );
    }

    const profile = await CandidateProfile.create({
      userId: session.user.id,
      phone,
      location,
      bio,
      skills,
      education,
      experience,
      github,
      linkedin,
      portfolio,
      resume,
      profileImage,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Profile created successfully",
        profile,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }
}

export async function PUT(request) {

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

    try {

        const body = await request.json();

        const profile = await CandidateProfile.findOneAndUpdate(

            {
                userId: session.user.id,
            },

            {
                phone: body.phone,
                location: body.location,
                bio: body.bio,
                education: body.education,
                experience: body.experience,
                github: body.github,
                linkedin: body.linkedin,
                portfolio: body.portfolio,
                resume: body.resume,
                profileImage: body.profileImage,

                skills: body.skills
                    .split(",")
                    .map(skill => skill.trim())
                    .filter(Boolean),

                jobTitle: body.jobTitle,
                availability: body.availability,

            },

            {
                new: true,
                upsert: true,
            }

        );

        return NextResponse.json({

            success: true,

            message: "Profile updated successfully.",

            profile,

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