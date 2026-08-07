"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { toast } from "sonner";

export default function CandidateProfilePage() {

    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({
        phone: "",
        education: "",
        experience: "",
        skills: "",
        portfolio: "",
        resume: "",
        bio: "",
    });

    useEffect(() => {
        fetchProfile();
    }, []);

    async function fetchProfile() {

        try {

            const res = await fetch("/api/profile");

            const data = await res.json();

            if (data.success) {

                setForm({
                    phone: data.profile.phone || "",
                    education: data.profile.education || "",
                    experience: data.profile.experience || "",
                    skills: data.profile.skills?.join(", ") || "",
                    portfolio: data.profile.portfolio || "",
                    resume: data.profile.resume || "",
                    bio: data.profile.bio || "",
                });

            }

        } catch (error) {
            console.error(error);
        }

    }

    function handleChange(e) {

        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });

    }

    async function handleSubmit(e) {

        e.preventDefault();

        setLoading(true);

        try {

            const res = await fetch("/api/profile", {

                method: "PUT",

                headers: {
                    "Content-Type": "application/json",
                },

                body: JSON.stringify(form),

            });

            const data = await res.json();

            if (data.success) {

                toast.success(data.message);

            } else {

                toast.error(data.message);

            }

        } catch (error) {

            console.error(error);

            toast.error("Something went wrong.");

        }

        setLoading(false);

    }

    return (

        <div className="max-w-5xl mx-auto space-y-8">

            <div>

                <h1 className="text-4xl font-bold">
                    Candidate Profile
                </h1>

                <p className="text-muted-foreground mt-2">
                    Keep your profile updated to improve your chances of getting hired.
                </p>

            </div>

            <form
                onSubmit={handleSubmit}
                className="space-y-8"
            >

                <div className="rounded-2xl border bg-white p-6 shadow-sm">

                    <h2 className="text-xl font-semibold mb-6">
                        Personal Information
                    </h2>

                    <div className="grid gap-6 md:grid-cols-2">

                        <div>
                            <Label>Phone</Label>
                            <Input
                                name="phone"
                                value={form.phone}
                                onChange={handleChange}
                            />
                        </div>

                        <div>
                            <Label>Portfolio</Label>
                            <Input
                                name="portfolio"
                                value={form.portfolio}
                                onChange={handleChange}
                            />
                        </div>

                        <div>
                            <Label>Education</Label>
                            <Input
                                name="education"
                                value={form.education}
                                onChange={handleChange}
                            />
                        </div>

                        <div>
                            <Label>Experience</Label>
                            <Input
                                name="experience"
                                value={form.experience}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="md:col-span-2">
                            <Label>Skills</Label>
                            <Input
                                name="skills"
                                value={form.skills}
                                onChange={handleChange}
                                placeholder="React, Next.js, Node.js"
                            />
                        </div>

                        <div className="md:col-span-2">
                            <Label>Resume URL</Label>
                            <Input
                                name="resume"
                                value={form.resume}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="md:col-span-2">
                            <Label>Bio</Label>

                            <Textarea
                                rows={5}
                                name="bio"
                                value={form.bio}
                                onChange={handleChange}
                            />

                        </div>

                    </div>

                </div>

                <Button
                    disabled={loading}
                >
                    {loading ? "Saving..." : "Save Changes"}
                </Button>

            </form>

        </div>

    );

}