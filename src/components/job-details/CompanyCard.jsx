import {
    Building2,
    Globe,
    MapPin,
} from "lucide-react";

export default function CompanyCard({ job }) {

    return (

        <div className="rounded-2xl border bg-white p-6 shadow-sm">

            <h2 className="text-xl font-bold">
                Company
            </h2>

            <div className="mt-6 space-y-5">

                <div className="flex gap-3">

                    <Building2 className="mt-1 h-5 w-5 text-indigo-600" />

                    <div>

                        <p className="text-sm text-muted-foreground">
                            Company
                        </p>

                        <p className="font-medium">
                            {job.companyId.companyName}
                        </p>

                    </div>

                </div>

                <div className="flex gap-3">

                    <Globe className="mt-1 h-5 w-5 text-indigo-600" />

                    <div>

                        <p className="text-sm text-muted-foreground">
                            Website
                        </p>

                        <a
                            href={job.companyId.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                        >
                            {job.companyId.website}
                        </a>

                    </div>

                </div>

                <div className="flex gap-3">

                    <MapPin className="mt-1 h-5 w-5 text-indigo-600" />

                    <div>

                        <p className="text-sm text-muted-foreground">
                            Location
                        </p>

                        <p>
                            {job.companyId.location}
                        </p>

                    </div>

                </div>

            </div>

        </div>

    );

}