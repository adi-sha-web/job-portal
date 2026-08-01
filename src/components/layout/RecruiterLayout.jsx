import { auth } from "@/auth";
import RecruiterSidebar from "./RecruiterSidebar";
import RecruiterTopbar from "./RecruiterTopbar";

export default async function RecruiterLayout({ children }) {

    const session = await auth();
    return (
        <div className="flex min-h-screen bg-slate-50">

            <RecruiterSidebar />

            <div className="flex flex-1 flex-col">

                <RecruiterTopbar user={session?.user}  />

                <main className="flex-1 p-8">

                    {children}

                </main>

            </div>

        </div>
    );
}