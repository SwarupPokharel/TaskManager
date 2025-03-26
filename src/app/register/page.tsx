"use client";
import React from "react";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import './style.scss';

export default function SignupForm() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSignup = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      setLoading(true);
      setError("");
      setSuccessMsg("");
      const response = await fetch('api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      })
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error);
      }
      setSuccessMsg(data.message);
      setUser({ name: '', email: '', password: '' });
      router.push('./login');
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An error occurred while registering.');
    } finally {
      setLoading(false);
    }

  }


  return (
    <div className="register-container">
      <form className="signup-form" onSubmit={onSignup}>
      <h1>Register</h1>
        <label>Fullname</label>
        <input
          type="text"
          name="name"
          value={user.name}
          onChange={(e) => setUser({ ...user, name: e.target.value })}
          placeholder="Name"
        />

        <label>Email</label>
        <input
          type="email"
          name="email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          placeholder="Email"
        />

        <label>Password</label>
        <input
          type="password"
          name="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          placeholder="Password"
        />

        <button type="submit" disabled={loading} className={loading ? 'loading' : ""}>
          {loading ? "Processing" : "Register"}
        </button>
        <Link href="/login">Login</Link>

        {error && <p className="message error">{error}</p>}
        {successMsg && <p className="message success">{successMsg}</p>}
      </form>

    </div>
  );
}


