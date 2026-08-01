"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

import { Textarea } from "@/components/ui/textarea";

import { Label } from "@/components/ui/label";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export default function createPage() {

    const [loading, setLoading] = useState(false);

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


    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch("/api/jobs", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(form),
            });
            const data = await res.json();

            
            toast.error(data.message);

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
                toast.success("Job created successfully");

                router.push("/recruiter/jobs");
            }
        } catch (error) {
            
            toast.error("Something went wrong.");
        } finally {
            setLoading(false);
        }
    };




    return (
        <div className="mx-auto max-w-5xl space-y-8">

            <div>
                <h1 className="text-3xl font-bold">
                    Create New Job
                </h1>

                <p className="text-muted-foreground mt-2">
                    Fill in the details below to publish a new job opening.
                </p>
            </div>

            <form
                onSubmit={handleSubmit}
                className="space-y-8"
            >

                {/* Job Information */}

                <Card>

                    <CardHeader>

                        <CardTitle>
                            Job Information
                        </CardTitle>

                        <CardDescription>
                            Basic details about the position.
                        </CardDescription>

                    </CardHeader>

                    <CardContent className="space-y-6">

                        <div className="space-y-2">

                            <Label htmlFor="title">
                                Job Title
                            </Label>

                            <Input
                                id="title"
                                name="title"
                                placeholder="Frontend Developer"
                                value={form.title}
                                onChange={handleChange}
                            />

                        </div>

                        <div className="space-y-2">

                            <Label htmlFor="description">
                                Job Description
                            </Label>

                            <Textarea
                                id="description"
                                name="description"
                                placeholder="Describe the responsibilities, requirements, and expectations..."
                                rows={8}
                                value={form.description}
                                onChange={handleChange}
                            />

                        </div>

                        <div className="space-y-2">

                            <Label htmlFor="skills">
                                Required Skills
                            </Label>

                            <Input
                                id="skills"
                                name="skills"
                                placeholder="React, Next.js, Node.js, MongoDB"
                                value={form.skills}
                                onChange={handleChange}
                            />

                            <p className="text-sm text-muted-foreground">
                                Separate multiple skills with commas.
                            </p>

                        </div>

                    </CardContent>

                </Card>

                {/* Employment Details */}

                <Card>

                    <CardHeader>

                        <CardTitle>
                            Employment Details
                        </CardTitle>

                        <CardDescription>
                            Compensation and work details.
                        </CardDescription>

                    </CardHeader>

                    <CardContent className="space-y-6">

                        <div className="grid gap-6 md:grid-cols-2">

                            <div className="space-y-2">

                                <Label htmlFor="location">
                                    Location
                                </Label>

                                <Input
                                    id="location"
                                    name="location"
                                    placeholder="New Delhi"
                                    value={form.location}
                                    onChange={handleChange}
                                />

                            </div>

                            <div className="space-y-2">

                                <Label>
                                    Work Mode
                                </Label>

                                <Select
                                    value={form.workMode}
                                    onValueChange={(value) =>
                                        setForm({
                                            ...form,
                                            workMode: value,
                                        })
                                    }
                                >

                                    <SelectTrigger>

                                        <SelectValue placeholder="Select Work Mode" />

                                    </SelectTrigger>

                                    <SelectContent>

                                        <SelectItem value="Remote">
                                            Remote
                                        </SelectItem>

                                        <SelectItem value="Hybrid">
                                            Hybrid
                                        </SelectItem>

                                        <SelectItem value="Onsite">
                                            Onsite
                                        </SelectItem>

                                    </SelectContent>

                                </Select>

                            </div>

                            <div className="space-y-2">

                                <Label>
                                    Employment Type
                                </Label>

                                <Select
                                    value={form.employmentType}
                                    onValueChange={(value) =>
                                        setForm({
                                            ...form,
                                            employmentType: value,
                                        })
                                    }
                                >

                                    <SelectTrigger>

                                        <SelectValue placeholder="Select Employment Type" />

                                    </SelectTrigger>

                                    <SelectContent>

                                        <SelectItem value="Full-time">
                                            Full-time
                                        </SelectItem>

                                        <SelectItem value="Part-time">
                                            Part-time
                                        </SelectItem>

                                        <SelectItem value="Contract">
                                            Contract
                                        </SelectItem>

                                        <SelectItem value="Internship">
                                            Internship
                                        </SelectItem>

                                    </SelectContent>

                                </Select>

                            </div>

                            <div className="space-y-2">

                                <Label htmlFor="experience">
                                    Experience
                                </Label>

                                <Input
                                    id="experience"
                                    name="experience"
                                    placeholder="2+ Years"
                                    value={form.experience}
                                    onChange={handleChange}
                                />

                            </div>

                            <div className="space-y-2">

                                <Label htmlFor="salary">
                                    Salary (₹)
                                </Label>

                                <Input
                                    id="salary"
                                    type="number"
                                    name="salary"
                                    placeholder="1200000"
                                    value={form.salary}
                                    onChange={handleChange}
                                />

                            </div>

                            <div className="space-y-2">

                                <Label htmlFor="openings">
                                    Openings
                                </Label>

                                <Input
                                    id="openings"
                                    type="number"
                                    name="openings"
                                    placeholder="5"
                                    value={form.openings}
                                    onChange={handleChange}
                                />

                            </div>

                        </div>

                        <div className="space-y-2">

                            <Label htmlFor="deadline">
                                Application Deadline
                            </Label>

                            <Input
                                id="deadline"
                                type="date"
                                name="deadline"
                                value={form.deadline}
                                onChange={handleChange}
                            />

                        </div>

                    </CardContent>

                </Card>

                <div className="flex justify-end gap-4">

                    <Button
                        variant="outline"
                        type="button"
                        onClick={() => router.back()}
                    >
                        Cancel
                    </Button>

                    <Button
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? "Publishing..." : "Publish Job"}
                    </Button>

                </div>

            </form>

        </div>
    );
}