import CandidateSidebar from "./CandidateSidebar";
import CandidateTopbar from "./CandidateTopbar";
import { auth } from "@/auth";


export default async function CandidateLayout({ children }) {
    const session = await auth();
    return (
        <div className="min-h-screen bg-slate-50">

            <div className="flex">

                <CandidateSidebar />

                <div className="flex-1">

                    <CandidateTopbar session={session} />

                    <main className="p-6">
                        {children}
                    </main>

                </div>

            </div>

        </div>
    );
}