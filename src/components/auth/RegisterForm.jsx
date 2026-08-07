"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterForm() {

    const router = useRouter();

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        role: "candidate",
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await fetch("/api/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(form),
        });

        const data = await res.json();



        if (data.success) {
            router.push("/login");
        }
    };

    return (

        <div className="w-full max-w-md rounded-2xl border bg-white p-8 shadow-lg">

            <h1 className="text-3xl font-bold">
                Create Account
            </h1>

            <p className="mt-2 text-muted-foreground">
                Join JobPortal today.
            </p>

            <form
                onSubmit={handleSubmit}
                className="mt-8 space-y-5"
            >

                <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={form.name}
                    onChange={handleChange}
                    className="w-full rounded-lg border p-3"
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full rounded-lg border p-3"
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={handleChange}
                    className="w-full rounded-lg border p-3"
                />

                <select
                    name="role"
                    value={form.role}
                    onChange={handleChange}
                    className="w-full rounded-lg border p-3"
                >
                    <option value="candidate">Candidate</option>
                    <option value="recruiter">Recruiter</option>
                </select>

                <button
                    type="submit"
                    className="w-full rounded-lg bg-black py-3 text-white"
                >
                    Register
                </button>

            </form>

        </div>

    );

}