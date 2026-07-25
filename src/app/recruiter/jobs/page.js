"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function jobsPage() {
    const [jobs, setJobs] = useState([]);

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
        const fetchJobs = async () => {
            try {
                const res = await fetch("/api/jobs");
                const data = await res.json();

                if (data.success) {
                    setJobs(data.jobs);
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchJobs();
    }, []);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch("/api/jobs", {
                method: "POST",
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

    const handleDelete = async (id) => {
        const confirmDelete = confirm("Are you sure you want to delete this job?");

        if (!confirmDelete) return;

        try {
            const res = await fetch(`/api/jobs/${id}`, {
                method: "DELETE",
            });

            const data = await res.json();

            alert(data.message);

            if (data.success) {
                setJobs((prevJobs) =>
                    prevJobs.filter((job) => job._id !== id)
                );
            }
        } catch (error) {
            console.error(error);
            alert("Something went wrong.");
        }
    };


    return (
        <div className="max-w-3xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">
                {jobs.length > 0 ? "Update Job" : "Create Job"}
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
                    Create Job
                </button>
            </form>


            <hr className="my-10" />

            <h2 className="text-2xl font-bold mb-4">
                My Jobs
            </h2>

            <table className="w-full border-collapse border">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border p-2">Title</th>
                        <th className="border p-2">Location</th>
                        <th className="border p-2">Type</th>
                        <th className="border p-2">Salary</th>
                        <th className="border p-2">Status</th>
                        <th className="border p-2">Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {jobs.map((job) => (
                        <tr key={job._id}>
                            <td className="border p-2">{job.title}</td>
                            <td className="border p-2">{job.location}</td>
                            <td className="border p-2">{job.employmentType}</td>
                            <td className="border p-2">₹{job.salary}</td>
                            <td className="border p-2">{job.status}</td>

                            <td className="border p-2">
                                <Link
                                    href={`/jobs/edit/${job._id}`}
                                    className="bg-yellow-500 text-white px-3 py-1 rounded mr-2"
                                >
                                    Edit
                                </Link>

                                <button
                                    type="button"
                                    className="bg-red-600 text-white px-3 py-1 rounded"
                                    onClick={() => handleDelete(job._id)}
                                >
                                    Delete
                                </button>

                                <Link
                                    href={`/recruiter/jobs/${job._id}`}
                                    className="bg-indigo-600 text-white px-3 py-1 rounded mr-2"
                                >
                                    View Applicants
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}