import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function JobsHeader() {
    return (
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

            <div>

                <p className="text-sm text-muted-foreground">
                    Recruiter Panel
                </p>

                <h1 className="text-4xl font-bold tracking-tight">
                    Jobs
                </h1>

                <p className="mt-2 text-muted-foreground">
                    Manage all your job postings from one place.
                </p>

            </div>

            <Button asChild size="lg">

                <Link href="/recruiter/jobs/new">

                    <Plus className="mr-2 h-4 w-4" />

                    Create Job

                </Link>

            </Button>

        </div>
    );
}