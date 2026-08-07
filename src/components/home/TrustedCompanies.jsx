import {
    Building2,
    BriefcaseBusiness,
    Landmark,
    Cpu,
    Globe,
    Rocket,
} from "lucide-react";

export default function TrustedCompanies() {

    const companies = [
        {
            name: "Google",
            icon: Cpu,
        },
        {
            name: "Microsoft",
            icon: Building2,
        },
        {
            name: "Amazon",
            icon: BriefcaseBusiness,
        },
        {
            name: "Adobe",
            icon: Landmark,
        },
        {
            name: "Netflix",
            icon: Rocket,
        },
        {
            name: "Meta",
            icon: Globe,
        },
    ];

    return (

        <section className="border-y bg-slate-50 py-16">

            <div className="mx-auto max-w-7xl px-6">

                <div className="text-center">

                    <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600">

                        Trusted by Top Companies

                    </p>

                    <h2 className="mt-3 text-3xl font-bold">

                        Companies Hiring Through Our Platform

                    </h2>

                </div>

                <div className="mt-12 grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-6">

                    {companies.map((company) => {

                        const Icon = company.icon;

                        return (

                            <div
                                key={company.name}
                                className="flex flex-col items-center justify-center rounded-2xl border bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                            >

                                <Icon className="h-10 w-10 text-indigo-600" />

                                <p className="mt-4 font-semibold">
                                    {company.name}
                                </p>

                            </div>

                        );

                    })}

                </div>

            </div>

        </section>

    );

}