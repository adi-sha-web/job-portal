import { Badge } from "@/components/ui/badge";

export default function JobSkills({ job }) {

    return (

        <div className="rounded-2xl border bg-white p-6 shadow-sm">

            <h2 className="text-2xl font-bold">
                Required Skills
            </h2>

            <div className="mt-6 flex flex-wrap gap-3">

                {job.skills.map((skill) => (

                    <Badge
                        key={skill}
                        variant="secondary"
                        className="px-4 py-2 text-sm"
                    >
                        {skill}
                    </Badge>

                ))}

            </div>

        </div>

    );

}