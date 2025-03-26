'use client'
import React, { useEffect, useState } from "react"
import { useParams } from "next/navigation";
import '../add/employeeForm.scss';

interface EmployeeData {
    name: string,
    address: string,
    designation: string,
    department: string,
    email: string,
}

const UpdateEmployees = () => {
    const { id } = useParams();
    const [employee, setEmployee] = useState<EmployeeData>({name: "", email: "", address: "", designation: "", department: ""});
    const departments = ['Technical', 'Finance', 'Human Resources', 'Marketing', 'Research & Development'];


    useEffect(() => {
        const fetchOneEmployee = async () => {
            const response = await fetch(`/api/auth/employee/${id}`);
            if (!response.ok) {
                return (
                    <div className='container'>
                        <div className='card'>
                            <h1 className='errorTitle'>Employee Not Found</h1>
                        </div>
                    </div>
                );
            }
            const result = await response.json();
            console.log(result);
            setEmployee(result.employee);
        }
        fetchOneEmployee();
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setEmployee((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <div className='formContainer'>
            <form className='form'>
                <div className='formGroup'>
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={employee?.name}
                        onChange={handleChange}
                    />
                </div>

                <div className='formGroup'>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={employee?.email}
                        onChange={handleChange}
                    />
                </div>

                <div className='formGroup'>
                    <label htmlFor="designation">Designation:</label>
                    <input
                        type="text"
                        id="designation"
                        name="designation"
                        value={employee?.designation}
                        onChange={handleChange}
                    />
                </div>

                <div className='formGroup'>
                    <label htmlFor="department">Department:</label>
                    <select
                        id="department"
                        name="department"
                        value={employee?.department}
                        onChange={handleChange}
                    >
                        <option>Select a Department</option>
                        {departments.map((dept) => (
                            <option key={dept} value={dept}>{dept}</option>
                        ))}
                    </select>
                </div>

                <div className='formGroup'>
                    <label htmlFor="address">Address:</label>
                    <input
                        type="text"
                        id="address"
                        name="address"
                        value={employee?.address}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit" className='submitButton'>
                    Update
                </button>
            </form>
        </div>
    )
}

export default UpdateEmployees;
