"use client";

import { useEffect, useState } from "react";

export default function CompanyPage() {
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
                alert(data.message);
                setCompanyExists(true);
            } else {
                alert(data.message);

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
                <input
                    type="text"
                    name="companyName"
                    value={form.companyName}
                    onChange={handleChange}
                    placeholder="Company Name"
                    className="w-full border rounded-lg p-3"
                />
                <input
                    type="url"
                    name="website"
                    value={form.website}
                    onChange={handleChange}
                    placeholder="Website"
                    className="w-full border rounded-lg p-3"
                />
                <input
                    type="text"
                    name="industry"
                    value={form.industry}
                    onChange={handleChange}
                    placeholder="Industry"
                    className="w-full border rounded-lg p-3"
                />
                <input
                    type="text"
                    name="location"
                    value={form.location}
                    onChange={handleChange}
                    placeholder="Location"
                    className="w-full border rounded-lg p-3"
                />
                <input
                    type="text"
                    name="companySize"
                    value={form.companySize}
                    onChange={handleChange}
                    placeholder="Company Size"
                    className="w-full border rounded-lg p-3"
                />


                <textarea
                    name="about"
                    value={form.about}
                    onChange={handleChange}
                    placeholder="About Company"
                    rows={6}
                    className="w-full border rounded-lg p-3"
                />

                <button type="submit" className="bg-blue-600 text-white px-5 py-3 rounded-lg">
                    {companyExists ? "Update Company" : "Create Company"}
                </button>
            </form>
        </div>
    );
}