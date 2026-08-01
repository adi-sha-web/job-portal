import RecruiterLayout from "@/components/layout/RecruiterLayout";
import { Toaster } from "sonner";

export default function Layout({ children }) {
    return (
        <RecruiterLayout>
            <Toaster richColors position="top-right" />
            {children}
        </RecruiterLayout>
    );
}