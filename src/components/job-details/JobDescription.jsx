export default function JobDescription({ job }) {

    return (

        <div className="rounded-2xl border bg-white p-6 shadow-sm">

            <h2 className="text-2xl font-bold">
                Job Description
            </h2>

            <p className="mt-4 whitespace-pre-line leading-8 text-muted-foreground">
                {job.description}
            </p>

        </div>

    );

}