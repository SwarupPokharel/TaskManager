"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { LuLayoutDashboard } from "react-icons/lu";
import { FaPeopleRoof } from "react-icons/fa6";
import { BiTask } from "react-icons/bi";
import { MdHome, MdLogout } from "react-icons/md";
import { NextResponse } from "next/server";
import { AiOutlineHome } from "react-icons/ai";
import './styleSidenav.scss';


const Sidenav: React.FC = () => {
    const [username, setUsername] = useState('');
    const [role, setRole] = useState('');

    const getUserDetails = async () => {
        setUsername('');
        setRole('');
        try {
            const res = await fetch('/api/auth/decode', {
                method: "GET",
                credentials: 'include',
            })
            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.message || 'An error occurred while fetching the employee.');
            }
            setUsername(data.name);
            setRole(data.role);
        } catch (error) {
            return NextResponse.json(error instanceof Error ? error.message : error);
        }

    }
    useEffect(() => {
        getUserDetails();
    }, []);

    const handleLogout = async () => {
        try {
            const res = await fetch('/api/auth/logout');
            if (!res.ok) {
                console.log("API not connected");
                return;
            }
            window.location.replace('/');
        } catch (error) {
            console.log(error instanceof Error ? error.message : "An unknown error occurred", error)
        }
    }

    return (
        <div className="sidenavContainer">
            <div className="user">
                <div className="image">
                    <Image
                        src="/images/user-image.png"
                        alt="image"
                        width={100}
                        height={100}
                        className="userImg"
                    />
                </div>
                <div className="userDetail">
                    <span className="user-name">{username}</span>
                </div>
            </div>

            <nav className="sidenav">
                <Link href='/' className="sidenavItem">
                    <AiOutlineHome className="icons" />
                    <span>Home</span>
                </Link>
                <Link href='/dashboard' className="sidenavItem">
                    <LuLayoutDashboard className="icons" />
                    <span>Dashboard</span>
                </Link>

                {role === "admin" ? (
                    <>
                        <Link href='/dashboard/admin/employee/' className="sidenavItem">
                            <FaPeopleRoof className="icons" />
                            <span>Emloyees</span>
                        </Link>
                        <Link href="/dashboard/tasks" className="sidenavItem">
                            <BiTask className="icons" />
                            <span>Task</span>
                        </Link>
                    </>
                ) : (
                    <Link href="/dashboard/tasks" className="sidenavItem">
                        <BiTask className="icons" />
                        <span>Task</span>
                    </Link>
                )}

                <div className="sidenavItem" onClick={handleLogout}>
                    <MdLogout className="icons" />
                    <span className="navLink">Logout</span>
                </div>
            </nav>

        </div >
    );
};

export default Sidenav;