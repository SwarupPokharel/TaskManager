"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import "./styleTasks.scss";

interface Task {
    _id: number;
    title: string;
    description: string;
    status: string;
    employeeList: string;
    dueDate: string;
}

export default function TasksList() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(false);
    const [employee, setEmployee] = useState<string | null>(null);
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
                setEmployee(data.name);
                setUserRole(data.role);
            } catch (error) {
                console.log(error instanceof Error ? error.message : error);
            }
        };
        handleToken();
    }, []);


    useEffect(() => {
        async function fetchTasks() {
            if (userRole === 'user') {
                setLoading(true);
                try {
                    const res = await fetch("/api/tasks/getTask", {
                        method: "POST",
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ employee }),
                    });
                    const data = await res.json();
                    setTasks(data);
                } catch (error) {
                    console.error("Error fetching tasks:", error instanceof Error ? error.message : error);
                } finally {
                    setLoading(false);
                }
            } else if (userRole === 'admin') {
                setLoading(true);
                try {
                    const res = await fetch("/api/tasks/", {
                        method: "GET",
                    });
                    const data = await res.json();
                    setTasks(data);
                } catch (error) {
                    console.error("Error fetching tasks:", error);
                } finally {
                    setLoading(false);
                }
            }
        };
        if (userRole) {
            fetchTasks();
        }
    }, [userRole, employee]);

    return (
        <main className="taskContainer">
            {tasks.length > 0 ? (
                <div className="taskGrid">
                    {tasks.map((task) => (
                        <Link href={`/dashboard/tasks/${task._id}`} key={task._id} className="taskCard">
                            <h3>{task.title}</h3>
                            <p className="taskDesc">{task.description}</p>
                            {userRole === 'admin' && (
                                <p className="assignedTo">Assigned to: {task.employeeList}</p>
                            )}
                            <span className={`status ${task.status}`}>{task.status}</span>
                        </Link>
                    ))}
                </div>
            ) : (
                <div style={{ textAlign: 'center', color: 'red', fontWeight: 'bold' }}>No Tasks Found.</div>
            )}
        </main>
    );
}
