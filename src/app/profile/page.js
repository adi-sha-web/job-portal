"use client";

import { useState } from "react";
import { useEffect } from "react";

export default function ProfilePage() {
    
    
    const [form, setForm] = useState({
        phone: "",
        location: "",
        bio: "",
        skills: "",
        education: "",
        experience: "",
        github: "",
        linkedin: "",
        portfolio: "",
    });
    
    const [profileExists, setProfileExists] = useState(false);


useEffect(() => {
    const fetchProfile = async () => {
        const res = await fetch("/api/profile");
        const data = await res.json();

        if (data.success && data.profile) {
            setProfileExists(true);
            
            setForm({
                phone: data.profile.phone || "",
                location: data.profile.location || "",
                bio: data.profile.bio || "",
                skills: data.profile.skills.join(", "),
                education: data.profile.education || "",
                experience: data.profile.experience || "",
                github: data.profile.github || "",
                linkedin: data.profile.linkedin || "",
                portfolio: data.profile.portfolio || "",
            });
        }
    };

    fetchProfile();

}, []);

const handleChange = (e) => {
    setForm({
        ...form,
        [e.target.name]: e.target.value,
    });
};

const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/profile", {
        method: profileExists ? "PUT" : "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            ...form,
            skills: form.skills
                .split(",")
                .map((skill) => skill.trim())
                .filter(Boolean),
        }),
    });

    const data = await res.json();

    alert(data.message);
};

return (
    <div className="max-w-3xl mx-auto p-10">
        <h1 className="text-3xl font-bold mb-6">
            Complete Your Profile
        </h1>

        <form
            onSubmit={handleSubmit}
            className="space-y-4"
        >
            <input
                name="phone"
                placeholder="Phone"
                value={form.phone}
                onChange={handleChange}
                className="w-full border p-2 rounded"
            />

            <input
                name="location"
                placeholder="Location"
                value={form.location}
                onChange={handleChange}
                className="w-full border p-2 rounded"
            />

            <textarea
                name="bio"
                placeholder="Bio"
                value={form.bio}
                onChange={handleChange}
                className="w-full border p-2 rounded"
            />

            <input
                name="skills"
                placeholder="Skills (React, Node, MongoDB)"
                value={form.skills}
                onChange={handleChange}
                className="w-full border p-2 rounded"
            />

            <input
                name="education"
                placeholder="Education"
                value={form.education}
                onChange={handleChange}
                className="w-full border p-2 rounded"
            />

            <input
                name="experience"
                placeholder="Experience"
                value={form.experience}
                onChange={handleChange}
                className="w-full border p-2 rounded"
            />

            <input
                name="github"
                placeholder="GitHub"
                value={form.github}
                onChange={handleChange}
                className="w-full border p-2 rounded"
            />

            <input
                name="linkedin"
                placeholder="LinkedIn"
                value={form.linkedin}
                onChange={handleChange}
                className="w-full border p-2 rounded"
            />

            <input
                name="portfolio"
                placeholder="Portfolio"
                value={form.portfolio}
                onChange={handleChange}
                className="w-full border p-2 rounded"
            />

            <button className="bg-black text-white px-5 py-2 rounded">
                Save Profile
            </button>
        </form>
    </div>
);
}