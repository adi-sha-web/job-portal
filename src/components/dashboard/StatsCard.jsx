export default function StatsCard({
    title,
    value,
    icon,
}) {

    return (

        <div className="rounded-2xl border bg-white p-6 shadow-sm transition hover:shadow-lg">

            <div className="flex items-center justify-between">

                <div>

                    <p className="text-sm text-muted-foreground">
                        {title}
                    </p>

                    <h2 className="mt-3 text-3xl font-bold">
                        {value}
                    </h2>

                </div>

                <div className="rounded-xl bg-indigo-100 p-3 text-indigo-600">

                    {icon}

                </div>

            </div>

        </div>

    );

}