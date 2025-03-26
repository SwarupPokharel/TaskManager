"use client";
import React, { useState, useEffect, useRef } from "react";
import { NextResponse } from "next/server";
import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { RxCaretDown } from "react-icons/rx";
import "./navStyle.scss";


const Navbar = () => {
    const [isCookie, setIsCookie] = useState(false);
    const router = useRouter();
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const [username, setUsername] = useState('');
    const [shouldRun, setShouldRun] = useState(false);
    const menuRef = useRef<HTMLDivElement | null>(null);

    const getCookies = async () => {
        try {
            const res = await fetch('/api/cookies', { cache: "no-store" });
            const data = await res.json();
            setIsCookie(!!data.token);
        } catch (error) {
            console.log("Error fetching cookies:", error);
        }
    }
    useEffect(() => {
        getCookies();
    }, [pathname]);

    const handleLogout = async () => {
        try {
            const res = await fetch('/api/auth/logout');
            if (!res.ok) {
                console.log("API not connected");
                return;
            }
            setIsCookie(false);
            router.push('/');
        } catch (error) {
            console.log(error instanceof Error ? error.message : "An unknown error occurred", error)
        }
    }

    const handleLogin = async () => {
        router.push('/login');
    }

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    }

    const handleClickOutside = (event: MouseEvent) => {
        if (menuRef.current && event.target instanceof Node && !menuRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };
    useEffect(() => {
        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    useEffect(() => {
        if (isCookie) {
            getUser();
        }
    }, [isCookie]);

    const getUser = async () => {
        setUsername('');
        try {
            const res = await fetch('/api/auth/decode', {
                method: "GET",
                credentials: 'include',
            })
            const result = await res.json();
            if (!res.ok) {
                throw new Error(result.message || 'An error occurred while fetching the employee.');
            }
            setUsername(result.name);
        } catch (error) {
            return NextResponse.json(error instanceof Error ? error.message : error);
        }
    }


    useEffect(() => {
        setShouldRun(true);
    }, []);

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link href='/' className="logo" onClick={() => window.location.replace("/")}>
                    <Image
                        src='/images/logo2.0.png'
                        alt='Task Manager Logo'
                        width={100}
                        height={100}
                        className="logoIcon"
                    />

                    TaskManager
                </Link>
                <ul className='nav-links'>
                    <li className="navList">
                        <Link href="#home" className="nav-item">
                            <span>Home</span>
                        </Link>
                    </li>
                    <li className="navList">

                        <Link href="#features" className="nav-item">
                            <span>Features</span>
                        </Link>
                    </li>
                    <li className="navList">

                        <Link href="#techStack" className="nav-item">
                            <span>Tech Stack</span>
                        </Link>
                    </li>
                    <li className="navList">

                        <Link href="#about" className="nav-item">
                            <span>About Us</span>
                        </Link>
                    </li>
                </ul>
                <div className="loggingButton">
                    {
                        !isCookie ? (
                            <button className="loginButton" onClick={handleLogin}>Login</button>
                        ) : (


                            <div className="userInfo" onClick={toggleDropdown} ref={menuRef}>
                                <div className="userImage">
                                    <Image
                                        src='/images/user-image.png'
                                        alt='Task Manager Logo'
                                        width={100}
                                        height={100}
                                        className="logoIcon"
                                    />
                                </div>
                                {isOpen && (
                                    <div className="userOption">
                                        <Link href='/dashboard'>Dashboard</Link>
                                        <Link href='/' onClick={handleLogout}>Log Out </Link>
                                    </div>

                                )}
                                <span className="username">{username}</span>
                                <RxCaretDown />
                            </div>
                        )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
