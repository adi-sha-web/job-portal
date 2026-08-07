import {
    UserPlus,
    Search,
    BadgeCheck,
} from "lucide-react";

const steps = [
    {
        icon: UserPlus,
        title: "Create Your Profile",
        description:
            "Sign up and complete your professional profile with skills, education, and experience.",
    },
    {
        icon: Search,
        title: "Search & Apply",
        description:
            "Browse thousands of opportunities and apply to your dream job with a single click.",
    },
    {
        icon: BadgeCheck,
        title: "Get Hired",
        description:
            "Recruiters review your application, schedule interviews, and help you land your next job.",
    },
];

export default function HowItWorks() {

    return (

        <section className="py-24">

            <div className="mx-auto max-w-7xl px-6">

                <div className="mx-auto max-w-3xl text-center">

                    <p className="font-semibold uppercase tracking-wide text-indigo-600">
                        How It Works
                    </p>

                    <h2 className="mt-4 text-4xl font-bold">
                        Find Your Dream Job in 3 Easy Steps
                    </h2>

                    <p className="mt-4 text-lg text-muted-foreground">
                        Our hiring process is designed to be fast, simple, and efficient for both candidates and recruiters.
                    </p>

                </div>

                <div className="mt-20 grid gap-8 md:grid-cols-3">

                    {steps.map((step, index) => {

                        const Icon = step.icon;

                        return (

                            <div
                                key={step.title}
                                className="relative rounded-2xl border bg-white p-8 shadow-sm transition hover:-translate-y-2 hover:shadow-xl"
                            >

                                <div className="absolute -top-5 left-8 flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600 text-lg font-bold text-white">

                                    {index + 1}

                                </div>

                                <div className="mt-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-100">

                                    <Icon className="h-8 w-8 text-indigo-600" />

                                </div>

                                <h3 className="mt-6 text-2xl font-semibold">

                                    {step.title}

                                </h3>

                                <p className="mt-4 leading-7 text-muted-foreground">

                                    {step.description}

                                </p>

                            </div>

                        );

                    })}

                </div>

            </div>

        </section>

    );

}