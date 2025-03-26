'use client'
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import AddButton from '@/../public/images/add.svg';
import Image from "next/image";
import Link from "next/link";
import './stylesNavbar.scss';

export default function DashboardNavbar() {
    const pathname = usePathname();
    const [userRole, setUserRole] = useState<string | null>(null);

    useEffect(() => {
        async function handleToken() {
            try {
                const res = await fetch('/api/auth/decode', {
                    method: "GET",
                    credentials: 'include',
                })
                const data = await res.json();
                if (!res.ok) {
                    throw new Error(data.message || 'An error occurred while fetching the employee.');
                }
                setUserRole(data.role);
            } catch (error) {
                console.log(error instanceof Error ? error.message : error);
            }
        };
        handleToken();
    }, []);

    const pageMetadata: Record<string, { title: string }> = {
        "/dashboard/admin/employee": { title: "Employee List" },
        "/dashboard/admin/employee/add": { title: "Add Employee" },
        "/dashboard/adminDashboard": { title: "Admin Dashboard" },
        "/dashboard/userDashboard": { title: "User Dashboard" },
        "/dashboard/tasks/add": { title: "Add Task" },
        "/dashboard/tasks": { title: "Tasks Card" },
    };

    let pageTitle = "Dashboard";
    if (pageMetadata[pathname]) {
        pageTitle = pageMetadata[pathname].title;
    } else if (pathname.startsWith("/dashboard/tasks/")) {
        pageTitle = "Task Details";
    }

    const getComponent = () => {
        if (pathname.startsWith("/dashboard/admin/employee")) {
            if (pathname === "/dashboard/admin/employee") {
                return (
                    <Link className="addButton" href='/dashboard/admin/employee/add'>
                        Add
                        <Image src={AddButton} alt="Add Icon" width={18} height={18} className="plusIcon" />
                    </Link>
                );
            }
        }
        if (pathname.startsWith("/dashboard/tasks")) {
            if (pathname === "/dashboard/tasks") {
                if (userRole === 'admin') {
                    return (
                        <Link className="addButton" href='/dashboard/tasks/add'>
                            Add
                            <Image src={AddButton} alt="Add Icon" width={18} height={18} className="plusIcon" />
                        </Link>
                    );
                }
            }
        }
        if (pathname.startsWith("/dashboard/tasks/") && pathname.split("/").length === 3) {
            return null;
        }
        return null;
    }

    return (
        <div className="adminNavbar">
            <h1>{pageTitle}</h1>
            {getComponent()}
        </div>
    );
}