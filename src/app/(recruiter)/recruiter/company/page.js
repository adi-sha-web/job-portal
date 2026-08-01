"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function CompanyPage() {
    const [loading, setLoading] = useState(false);
    const [companyExists, setCompanyExists] = useState(false);

    useEffect(() => {
        const fetchCompany = async () => {
            try {
                const res = await fetch("/api/company");
                const data = await res.json();

                if (data.success && data.company) {
                    setCompanyExists(true);


                    setForm({
                        companyName: data.company.companyName || "",
                        website: data.company.website || "",
                        industry: data.company.industry || "",
                        location: data.company.location || "",
                        about: data.company.about || "",
                        companySize: data.company.companySize || "",
                    });
                }
            } catch (error) {
                console.error("Failed to fetch company:", error);
            }
        };

        fetchCompany();
    }, []);

    const [form, setForm] = useState({
        companyName: "",
        website: "",
        industry: "",
        location: "",
        about: "",
        companySize: "",
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            const res = await fetch("/api/company", {
                method: companyExists ? "PUT" : "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(form),
            });

            const data = await res.json();
            if (data.success) {
                toast.success(data.message)
                setCompanyExists(true);
            } else {
                toast.error(data.message);

            }
        } catch (error) {
            console.error(error);
            alert("Something went wrong.");
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">
                {companyExists ? "Update Company" : "Create Company"}
            </h1>
            <form onSubmit={handleSubmit}
                className="space-y-4">
                <div className="grid gap-6 md:grid-cols-2">
                    <div>

                        <Label
                            htmlFor="about"
                            className="text-sm pb-3 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            Company Name
                        </Label>
                        <Input
                            type="text"
                            name="companyName"
                            value={form.companyName}
                            onChange={handleChange}
                            placeholder="Company Name"
                            className="w-full border rounded-lg p-3"
                        />
                    </div>

                    <div>
                        <Label
                            htmlFor="about"
                            className="text-sm pb-3 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            Website
                        </Label>
                        <Input
                            type="url"
                            name="website"
                            value={form.website}
                            onChange={handleChange}
                            placeholder="Website"
                            className="w-full border rounded-lg p-3"
                        />
                    </div>

                    <div>
                        <Label
                            htmlFor="about"
                            className="text-sm pb-3 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            Industry
                        </Label>
                        <Input
                            type="text"
                            name="industry"
                            value={form.industry}
                            onChange={handleChange}
                            placeholder="Industry"
                            className="w-full border rounded-lg p-3"
                        />
                    </div>
                    <div>
                        <Label
                            htmlFor="about"
                            className="text-sm pb-3 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            Location
                        </Label>
                        <Input
                            type="text"
                            name="location"
                            value={form.location}
                            onChange={handleChange}
                            placeholder="Location"
                            className="w-full border rounded-lg p-3"
                        />
                    </div>
                    <div>
                        <Label
                            htmlFor="about"
                            className="text-sm pb-3 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            Company Size
                        </Label>
                        <Input
                            type="text"
                            name="companySize"
                            value={form.companySize}
                            onChange={handleChange}
                            placeholder="Company Size"
                            className="w-full border rounded-lg p-3"
                        />
                    </div>
                    </div>
                    <Label
                        htmlFor="about"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                        About Company
                    </Label>
                    <textarea
                        name="about"
                        value={form.about}
                        onChange={handleChange}
                        placeholder="About Company"
                        rows={6}
                        className="w-full border rounded-lg p-3"
                    />

                    <Button
                        type="submit"
                        disabled={loading}
                    >
                        {loading
                            ? "Saving..."
                            : companyExists
                                ? "Update Company"
                                : "Create Company"}
                    </Button>
                
            </form>
        </div>
    );
}