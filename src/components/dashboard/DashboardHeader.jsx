import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plus } from "lucide-react";

export default function DashboardHeader() {
    return (
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

            <div>

                <p className="text-sm text-muted-foreground">
                    Welcome back 👋
                </p>

                <h1 className="mt-2 text-4xl font-bold tracking-tight">
                    Recruiter Dashboard
                </h1>

                <p className="mt-2 text-muted-foreground">
                    Manage jobs, applicants and company profile.
                </p>

            </div>

            <Link href="/recruiter/jobs">

                <Button size="lg">

                    <Plus className="mr-2 h-4 w-4"/>

                    Create Job

                </Button>

            </Link>

        </div>
    );
}