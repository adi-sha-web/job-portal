"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";

export default function EditJob() {

    const { id } = useParams();

    const router = useRouter();

    const [form, setForm] = useState({
        title: "",
        description: "",
        location: "",
        workMode: "",
        employmentType: "",
        experience: "",
        salary: "",
        skills: "",
        openings: "",
        deadline: "",
    });

    useEffect(() => {
        const fetchJob = async () => {
            const res = await fetch(`/api/jobs/${id}`);
            const data = await res.json();

            if (data.success) {
                alert("Job updated successfully.");
                router.push("/recruiter/jobs");
            }
        };

        if (id) {
            fetchJob();
        }
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch(`/api/jobs/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(form),
            });
            console.log(res.status);
            const data = await res.json();

            alert(data.message);

            if (data.success) {
                setForm({
                    title: "",
                    description: "",
                    location: "",
                    workMode: "",
                    employmentType: "",
                    experience: "",
                    salary: "",
                    skills: "",
                    openings: "",
                    deadline: "",
                });
            }
        } catch (error) {
            console.error(error);
            alert("Something went wrong.");
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">
                Update Job
            </h1>
            <form onSubmit={handleSubmit}
                className="space-y-4">
                <input
                    type="text"
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    placeholder="Job Title"
                    className="w-full border rounded-lg p-3"
                />
                <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    placeholder="Description"
                    rows={6}
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
                <div>
                    <label
                        htmlFor="workMode"
                        className="block mb-2 font-medium"
                    >
                        Work Mode
                    </label>

                    <select
                        id="workMode"
                        name="workMode"
                        value={form.workMode}
                        onChange={handleChange}
                        className="w-full border rounded-lg p-3"
                    >
                        <option value="">Select Work Mode</option>
                        <option value="Remote">Remote</option>
                        <option value="Hybrid">Hybrid</option>
                        <option value="Onsite">Onsite</option>
                    </select>
                </div>
                <div>
                    <label
                        htmlFor="employmentType"
                        className="block mb-2 font-medium"
                    >
                        Choose a Employment Type:</label>
                    <select
                        name="employmentType"
                        id="employmentType"
                        value={form.employmentType}
                        onChange={handleChange}
                        className="w-full border rounded-lg p-3"
                    ><option value="">Select Employment Type</option>
                        <option value="Full-time">Full-time</option>
                        <option value="Part-time">Part-time</option>
                        <option value="Contract">Contract</option>
                        <option value="Internship">Internship</option>
                    </select>
                </div>
                <input
                    type="text"
                    name="experience"
                    value={form.experience}
                    onChange={handleChange}
                    placeholder="Experience"
                    className="w-full border rounded-lg p-3"
                />
                <input
                    type="number"
                    name="salary"
                    value={form.salary}
                    onChange={handleChange}
                    placeholder="Salary"
                    className="w-full border rounded-lg p-3"
                />
                <input
                    type="text"
                    name="skills"
                    value={form.skills}
                    onChange={handleChange}
                    placeholder="Skills"
                    className="w-full border rounded-lg p-3"
                />
                <input
                    type="number"
                    name="openings"
                    value={form.openings}
                    onChange={handleChange}
                    placeholder="Openings"
                    className="w-full border rounded-lg p-3"
                />
                <input
                    type="date"
                    name="deadline"
                    value={form.deadline}
                    onChange={handleChange}
                    placeholder="Deadline"
                    className="w-full border rounded-lg p-3"
                />
                <button type="submit" className="bg-blue-600 text-white px-5 py-3 rounded-lg">
                    Update Job
                </button>
            </form>
        </div>
    );
}