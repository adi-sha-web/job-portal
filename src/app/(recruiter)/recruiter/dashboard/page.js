import { auth } from "@/auth";
import { redirect } from "next/navigation";

import Job from "@/models/Job";
import Application from "@/models/Application";
import connectDB from "@/lib/db";
import RecentJobs from "@/components/dashboard/RecentJobs";
import QuickActions from "@/components/dashboard/QuickActions";
import LatestApplicants from "@/components/dashboard/LatestApplicants";
import RecruiterSidebar from "@/components/layout/RecruiterSidebar";

import {
  BriefcaseBusiness,
  Users,
  CheckCircle2,
  XCircle,
} from "lucide-react";

import DashboardHeader from "@/components/dashboard/DashboardHeader";
import StatsCard from "@/components/dashboard/StatsCard";

export default async function Dashboard() {

  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  await connectDB();

  const totalJobs = await Job.countDocuments({
    recruiterId: session.user.id,
  });

  const totalApplicants = await Application.countDocuments({
    recruiterId: session.user.id,
  });

  const acceptedApplicants = await Application.countDocuments({
    recruiterId: session.user.id,
    status: "Accepted",
  });

  const rejectedApplicants = await Application.countDocuments({
    recruiterId: session.user.id,
    status: "Rejected",
  });

  const recentJobs = await Job.find({
    recruiterId: session.user.id,
  })
    .sort({ createdAt: -1 })
    .limit(5)
    .lean();

  const latestApplications = await Application.find({
    recruiterId: session.user.id,
  })
    .populate("candidateId", "name email")
    .populate("jobId", "title")
    .sort({ createdAt: -1 })
    .limit(5)
    .lean();

  return (
    <main className="min-h-screen bg-slate-50 flex">

      

      <div className="flex-1 p-10 mx-auto max-w-7xl px-6 py-10">

        <DashboardHeader />

        {/* Stats */}

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

          <StatsCard
            title="Total Jobs"
            value={totalJobs}
            icon={<BriefcaseBusiness className="h-6 w-6" />}
          />

          <StatsCard
            title="Applicants"
            value={totalApplicants}
            icon={<Users className="h-6 w-6" />}
          />

          <StatsCard
            title="Accepted"
            value={acceptedApplicants}
            icon={<CheckCircle2 className="h-6 w-6" />}
          />

          <StatsCard
            title="Rejected"
            value={rejectedApplicants}
            icon={<XCircle className="h-6 w-6" />}
          />

          <div className="lg:col-span-2">

            <RecentJobs jobs={recentJobs} />

          </div>

          <div>

            <QuickActions />

          </div>
          <div className="">

            <LatestApplicants
              applications={latestApplications}
            />

          </div>

        </div>

      </div>

    </main>
  );
}