'use client'
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Logo from "@/../public/images/logo2.0.png";
import './loginStyle.scss';

interface userData {
    email: string,
    password: string,
}

export default function SignupPage() {
    const router = useRouter();
    const [error, setError] = useState("");
    const [loading, setLoading] = React.useState(false);
    const [user, setUser] = React.useState<userData>({
        email: "",
        password: "",
    })

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setLoading(true);
            setError("");
            const response = await fetch("/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user),
            });
            const data = await response.json();
            if (!response.ok) {
                setUser({ email: user.email, password: "" });
                throw new Error(data.error);
            }
            router.push("/dashboard");
        } catch (error) {
            setError(error instanceof Error ? error.message : "An error occurred while logging in.");
        } finally {
            setLoading(false);
        }
    }


    return (
        <div className="loginContainer">
            <form onSubmit={handleLogin}>
                <div className="loginLogoContainer">
                    <Image
                        src={Logo}
                        alt="Task Manager Logo"
                        width={76}
                        height={76}
                        className="loginLogo"
                    />
                    Task Management
                </div>
                <label htmlFor="email">Email</label>
                <input
                    id="email"
                    type="text"
                    value={user.email}
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                    placeholder="Email"
                />

                <label htmlFor="password">Password</label>
                <input
                    id="password"
                    type="password"
                    value={user.password}
                    onChange={(e) => setUser({ ...user, password: e.target.value })}
                    placeholder="Password"
                />

                <button type="submit" disabled={loading} className={loading ? 'loading' : ""}>
                    {loading ? "Processing" : "Login"}
                </button>
                <Link href="/register">Register</Link>
                {error && <p className="message error">{error}</p>}
            </form>
        </div>
    );
}
