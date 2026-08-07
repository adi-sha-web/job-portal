import { auth } from "@/auth";
import { redirect } from "next/navigation";

import RegisterForm from "@/components/auth/RegisterForm";

export default async function RegisterPage() {

    const session = await auth();

    if (session) {
        redirect(
            session.user.role === "recruiter"
                ? "/recruiter/dashboard"
                : "/candidate/dashboard"
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 py-10">
            <RegisterForm />
        </div>
    );
}