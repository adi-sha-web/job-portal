import {
    CalendarDays,
    BriefcaseBusiness,
    Users,
    Clock3,
} from "lucide-react";

export default function JobMeta({ job }) {

    return (

        <div className="rounded-2xl border bg-white p-6 shadow-sm">

            <h2 className="text-xl font-bold">
                Job Information
            </h2>

            <div className="mt-6 space-y-5">

                <MetaItem
                    icon={<BriefcaseBusiness className="h-5 w-5 text-indigo-600" />}
                    title="Work Mode"
                    value={job.workMode}
                />

                <MetaItem
                    icon={<Users className="h-5 w-5 text-indigo-600" />}
                    title="Openings"
                    value={job.openings}
                />

                <MetaItem
                    icon={<Clock3 className="h-5 w-5 text-indigo-600" />}
                    title="Experience"
                    value={job.experience}
                />

                <MetaItem
                    icon={<CalendarDays className="h-5 w-5 text-indigo-600" />}
                    title="Deadline"
                    value={
                        job.deadline
                            ? new Date(job.deadline).toLocaleDateString()
                            : "Not Specified"
                    }
                />

            </div>

        </div>

    );

}

function MetaItem({ icon, title, value }) {

    return (

        <div className="flex gap-3">

            <div>
                {icon}
            </div>

            <div>

                <p className="text-sm text-muted-foreground">
                    {title}
                </p>

                <p className="font-medium">
                    {value}
                </p>

            </div>

        </div>

    );

}