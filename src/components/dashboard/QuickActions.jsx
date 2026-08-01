import Link from "next/link";
import {
    Building2,
    BriefcaseBusiness,
    Users,
} from "lucide-react";

export default function QuickActions() {

    const actions = [
        {
            title: "Create Job",
            icon: <BriefcaseBusiness className="h-5 w-5" />,
            href: "/recruiter/jobs",
        },
        {
            title: "Company Profile",
            icon: <Building2 className="h-5 w-5" />,
            href: "/recruiter/company",
        },
        {
            title: "View Applicants",
            icon: <Users className="h-5 w-5" />,
            href: "/recruiter/jobs",
        },
    ];

    return (

        <div className="rounded-2xl border bg-white p-6 shadow-sm">

            <h2 className="text-xl font-bold">
                Quick Actions
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
                Frequently used shortcuts
            </p>

            <div className="mt-6 space-y-3">

                {actions.map((action) => (

                    <Link
                        key={action.title}
                        href={action.href}
                        className="flex items-center gap-3 rounded-xl border p-4 transition hover:bg-slate-50"
                    >

                        <div className="rounded-lg bg-indigo-100 p-2 text-indigo-600">

                            {action.icon}

                        </div>

                        <span className="font-medium">

                            {action.title}

                        </span>

                    </Link>

                ))}

            </div>

        </div>

    );

}