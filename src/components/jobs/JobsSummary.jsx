import { BriefcaseBusiness, CheckCircle2, XCircle } from "lucide-react";

export default function JobsSummary({
    total,
    open,
    closed,
}) {
    const stats = [
        {
            title: "Total Jobs",
            value: total,
            icon: BriefcaseBusiness,
        },
        {
            title: "Open",
            value: open,
            icon: CheckCircle2,
        },
        {
            title: "Closed",
            value: closed,
            icon: XCircle,
        },
    ];

    return (
        <div className="grid gap-6 md:grid-cols-3">
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