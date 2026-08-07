import {
    BriefcaseBusiness,
    Clock3,
    CheckCircle2,
    XCircle,
} from "lucide-react";

export default function DashboardStats({ applications }) {

    const stats = [

        {
            title: "Applications",
            value: applications.length,
            icon: BriefcaseBusiness,
        },

        {
            title: "Pending",
            value: applications.filter(
                app => app.status === "Pending"
            ).length,
            icon: Clock3,
        },

        {
            title: "Accepted",
            value: applications.filter(
                app => app.status === "Accepted"
            ).length,
            icon: CheckCircle2,
        },

        {
            title: "Rejected",
            value: applications.filter(
                app => app.status === "Rejected"
            ).length,
            icon: XCircle,
        },

    ];

    return (

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

            {stats.map((stat) => {

                const Icon = stat.icon;

                return (

                    <div
                        key={stat.title}
                        className="rounded-2xl border bg-white p-6 shadow-sm"
                    >

                        <div className="flex items-center justify-between">

                            <div>

                                <p className="text-sm text-muted-foreground">
                                    {stat.title}
                                </p>

                                <h2 className="mt-2 text-3xl font-bold">
                                    {stat.value}
                                </h2>

                            </div>

                            <div className="rounded-xl bg-indigo-50 p-3">

                                <Icon className="h-6 w-6 text-indigo-600" />

                            </div>

                        </div>

                    </div>

                );

            })}

        </div>

    );

}