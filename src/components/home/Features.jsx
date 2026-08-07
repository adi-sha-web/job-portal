import {
    BriefcaseBusiness,
    Search,
    ShieldCheck,
    Rocket,
} from "lucide-react";

const features = [
    {
        icon: Search,
        title: "Smart Job Search",
        description:
            "Quickly find jobs that match your skills, experience, and career goals.",
    },
    {
        icon: BriefcaseBusiness,
        title: "Top Companies",
        description:
            "Apply to verified companies hiring across multiple industries.",
    },
    {
        icon: ShieldCheck,
        title: "Secure Applications",
        description:
            "Your profile and applications are protected with secure authentication.",
    },
    {
        icon: Rocket,
        title: "Fast Hiring",
        description:
            "Recruiters can review applications, schedule interviews, and hire faster.",
    },
];

export default function Features() {

    return (

        <section className="bg-slate-50 py-24">

            <div className="mx-auto max-w-7xl px-6">

                <div className="mx-auto max-w-3xl text-center">

                    <p className="font-semibold uppercase tracking-wide text-indigo-600">
                        Why Choose Us
                    </p>

                    <h2 className="mt-4 text-4xl font-bold">
                        Everything You Need to Get Hired
                    </h2>

                    <p className="mt-4 text-lg text-muted-foreground">
                        We connect talented candidates with top companies through
                        a fast, secure, and modern hiring platform.
                    </p>

                </div>

                <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-4">

                    {features.map((feature) => {

                        const Icon = feature.icon;

                        return (

                            <div
                                key={feature.title}
                                className="group rounded-2xl border bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
                            >

                                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-100 transition-colors group-hover:bg-indigo-600">

                                    <Icon className="h-7 w-7 text-indigo-600 transition-colors group-hover:text-white" />

                                </div>

                                <h3 className="text-xl font-semibold">

                                    {feature.title}

                                </h3>

                                <p className="mt-3 leading-7 text-muted-foreground">

                                    {feature.description}

                                </p>

                            </div>

                        );

                    })}

                </div>

            </div>

        </section>

    );

}