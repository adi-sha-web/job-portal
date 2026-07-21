import { NextResponse } from "next/server";
import { auth } from "@/auth";

import connectDB from "@/lib/db";
import CandidateProfile from "@/models/CandidateProfile";

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

export async function GET() {
  try {
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

    const profile = await CandidateProfile.findOne({
      userId: session.user.id,
    });

    return NextResponse.json(
      {
        success: true,
        profile,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 }
    );
  }
}

export async function PUT(request) {
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

    const data = await request.json();

    const updatedProfile = await CandidateProfile.findOneAndUpdate(
      {
        userId: session.user.id,
      },
      data,
      {
        new: true,
      }
    );

    return NextResponse.json(
      {
        success: true,
        message: "Profile updated successfully",
        profile: updatedProfile,
      },
      {
        status: 200,
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