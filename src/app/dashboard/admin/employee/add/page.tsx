"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import './employeeForm.scss';

interface employeeData {
    name: string,
    email: string,
    designation: string,
    address: string,
    departments: string
}

interface DepartmentType {
    _id: string,
    name: string,
}

const UserForm: React.FC = () => {
    const [formData, setFormData] = useState<employeeData>({
        name: "",
        email: "",
        designation: "",
        address: "",
        departments: ""
    });

    const [department, setDepartment] = useState<DepartmentType[]>([]);
    useEffect(() => {
        const getDepartments = async () => {
            try {
                const res = await fetch('/api/auth/department');
                const data = await res.json();
                setDepartment(data);
            } catch (error) {
                console.log(error instanceof Error ? error.message : "Error while fetching departments: ", error);
            }
        };
        getDepartments();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch('/api/auth/employee', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })
            const result = await res.json();
            if (!res.ok) {
                throw new Error(result.message || 'An error occurred while adding the employee.');
            }
            setFormData({
                name: "",
                email: "",
                designation: "",
                address: "",
                departments: "",
            });
            router.push('/dashboard/admin/employee');
        } catch (error) {
            console.log(error instanceof Error ? error.message : "Error while fetching employees: ", error);
        }
    };
    
    return (
        <div className='formContainer'>
            <form onSubmit={handleSubmit} className='form'>
                <div className='formGroup'>
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                </div>

                <div className='formGroup'>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>

                <div className='formGroup'>
                    <label htmlFor="designation">Designation:</label>
                    <input
                        type="text"
                        id="designation"
                        name="designation"
                        value={formData.designation}
                        onChange={handleChange}
                    />
                </div>

                <div className='formGroup'>
                    <label htmlFor="department">Department:</label>
                    <select
                        id="department"
                        name="department"
                        value={formData.departments[0] || ""}
                        onChange={handleChange}
                    >
                        <option>Select a Department</option>
                        {department.map((dept) => (
                            <option key={dept._id} value={dept.name}>{dept.name}</option>
                        ))}
                    </select>
                </div>

                <div className='formGroup'>
                    <label htmlFor="address">Address:</label>
                    <input
                        type="text"
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit" className='submitButton'>
                    Submit
                </button>
            </form>
        </div>
    );
};

export default UserForm;
