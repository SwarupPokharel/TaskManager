"use client";
import { useEffect, useState } from "react";
import "./taskForm.scss";

export default function TaskForm() {
    const [employee, setEmployee] = useState([]);
    const getEmployees = async () => {
        try {
            const res = await fetch("/api/auth/employee");
            if (!res.ok) throw new Error("Failed to fetch employees");
            const list = await res.json();
            setEmployee(list.map((emp: { name: string }) => emp.name));
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getEmployees();
    }, []);

    const [task, setTask] = useState({
        title: "",
        description: "",
        assignDate: "",
        dueDate: "",
        priority: "",
        employeeList: "",
    });
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setTask({ ...task, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch("/api/tasks", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(task),
            });
            const result = await res.json();
            if (!res.ok) {
                throw new Error(result.message || 'An error occurred while adding the employee.');
            }
            alert('Task assigned successfully.');
            setTask({
                title: "",
                description: "",
                assignDate: '',
                dueDate: '',
                priority: "",
                employeeList: "",
            });
        } catch (error) {
            console.error(error);
            alert(error instanceof Error ? error.message : "Something went wrong");
        }
    };

    return (
        <form onSubmit={handleSubmit} className='taskForm'>
            <label>Task Title</label>
            <input type="text" name="title" value={task.title} onChange={handleChange} required />

            <label>Description</label>
            <textarea name="description" value={task.description} onChange={handleChange} />

            <label>Employee Name</label>
            <select name="employeeList" value={task.employeeList} onChange={handleChange}>
                <option value="">Select an Employee</option>
                {employee?.map((emp, index) => (
                    <option value={emp} key={index}>{emp}</option>
                ))}
            </select>

            <label>Assign Date</label>
            <input type="date" name="assignDate" value={task.assignDate} onChange={handleChange} required />

            <label>Due Date</label>
            <input type="date" name="dueDate" value={task.dueDate} onChange={handleChange} required />

            <label>Priority</label>
            <select name="priority" value={task.priority} onChange={handleChange}>
                <option value="">Select an option</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
            </select>

            <button type="submit">Add Task</button>
        </form>
    );
}
