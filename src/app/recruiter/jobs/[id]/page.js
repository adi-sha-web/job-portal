"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function ApplicantsPage() {
    const { id } = useParams();

    const [applications, setApplications] = useState([]);

    useEffect(() => {
        fetchApplicants();
    }, []);

    const fetchApplicants = async () => {
        const res = await fetch(`/api/applications/job/${id}`);
        console.log(res)
        const data = await res.json();

        if (data.success) {
            setApplications(data.applications);
        }
    };

    const updateStatus = async (applicationId, status) => {
        const res = await fetch(`/api/applications/${applicationId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ status }),
        });

        const data = await res.json();

        alert(data.message);

        if (data.success) {
            fetchApplicants();
        }
    };

    return (
        <div className="max-w-6xl mx-auto p-6">

            <h1 className="text-3xl font-bold mb-6">
                Applicants
            </h1>

            <table className="w-full border">

                <thead>
                    <tr className="bg-gray-200">
                        <th className="border p-3">Candidate</th>
                        <th className="border p-3">Email</th>
                        <th className="border p-3">Status</th>
                        <th className="border p-3">Applied On</th>
                        <th className="border p-3">Action</th>
                    </tr>
                </thead>

                <tbody>

                    {applications.map((application) => (

                        <tr key={application._id}>

                            <td className="border p-3">
                                {application.candidateId.name}
                            </td>

                            <td className="border p-3">
                                {application.candidateId.email}
                            </td>

                            <td className="border p-3">
                                {application.status}
                            </td>

                            <td className="border p-3">
                                {new Date(application.createdAt).toLocaleDateString()}
                            </td>

                            <td className="border p-3">

                                <button
                                    onClick={() =>
                                        updateStatus(application._id, "Accepted")
                                    }
                                    className="bg-green-600 text-white px-3 py-1 rounded mr-2"
                                >
                                    Accept
                                </button>

                                <button
                                    onClick={() =>
                                        updateStatus(application._id, "Rejected")
                                    }
                                    className="bg-red-600 text-white px-3 py-1 rounded"
                                >
                                    Reject
                                </button>

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>
    );
}