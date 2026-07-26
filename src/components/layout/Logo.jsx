import Link from "next/link";
import { BriefcaseBusiness } from "lucide-react";

export default function Logo() {
    return (
        <Link
            href="/"
            className="flex items-center gap-2"
        >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-md">
                <BriefcaseBusiness size={22} />
            </div>

            <div className="leading-tight">
                <h1 className="text-lg font-bold tracking-tight">
                    JobPortal
                </h1>

                <p className="text-xs text-muted-foreground">
                    Find your dream career
                </p>
            </div>
        </Link>
    );
}