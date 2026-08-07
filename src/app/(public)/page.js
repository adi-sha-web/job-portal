import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/home/Hero";
import TrustedCompanies from "@/components/home/TrustedCompanies";
import FeaturedJobs from "@/components/home/FeaturedJobs";
import Features from "@/components/home/Features";
import HowItWorks from "@/components/home/HowItWorks";
import CTA from "@/components/home/CTA";
import Footer from "@/components/home/Footer";
import { auth } from "@/auth";


export default async function Home() {
    const session = await auth();

    return (
        <>
            <Navbar session={ session } />
            
            <Hero />

            <TrustedCompanies />

            <FeaturedJobs />

            <Features />

            <HowItWorks />

            <CTA />

            <Footer />
        </>
    );
} 