"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import editIcon from '@/../public/images/edit.svg';
import deleteIcon from '@/../public/images/trash.svg';
import "./styleEmployees.scss";

interface EmployeeDataTypes {
    _id: string,
    name: string,
    email: string,
    department: string,
    designation: string,
    address: string,

}
export default function EmployeeList() {
    const [employees, setEmployees] = useState<EmployeeDataTypes[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        async function fetchEmployees() {
            setIsLoading(true);
            try {
                const res = await fetch("/api/auth/employee");
                if (!res.ok) {
                    throw new Error("Failed to fetch employees");
                }
                const data = await res.json();
                setEmployees(data);
            } catch (error) {
                console.error("Error fetching employees:", error);
            } finally {
                setIsLoading(false);
            }
        }

        fetchEmployees();
    }, []);

    const handleDelete = async (id: string) => {
        try {
            const res = await fetch(`/api/auth/employee/${id}`, {
                method: "DELETE"
            });
            if (!res.ok) {
                throw new Error('Failed to delete employee.');
            }
            location.reload();
        } catch (error) {
            console.error("Error deleting employees:", error);
        }
    }

    return (
        <main className="employee-container">
            {employees.length > 0 ? (
                <table className="employee-table">
                    <thead>
                        <tr>
                            <th>S.No.</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Department</th>
                            <th>Designation</th>
                            <th>Address</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map((emp, index) => (
                            <tr key={emp._id}>
                                <td>{index + 1}</td>
                                <td>{emp.name}</td>
                                <td>{emp.email}</td>
                                <td>{emp.department}</td>
                                <td>{emp.designation}</td>
                                <td>{emp.address}</td>
                                <td>
                                    <div className="actionButtons">
                                        <Link href={`/dashboard/admin/employee/${emp._id}`}>
                                            <Image
                                                src={editIcon}
                                                width={26}
                                                height={26}
                                                alt='Edit button'
                                                className="editIcon"
                                            />
                                        </Link>
                                        <span className="deleteButtonContainer" onClick={() => handleDelete(emp._id)}>
                                            <Image
                                                src={deleteIcon}
                                                width={26}
                                                height={26}
                                                alt='Delete button'
                                                className="deleteIcon"
                                            />
                                        </span>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <div style={{ textAlign: 'center', color: 'red', fontWeight: 'bold' }}>No Employees Found.</div>
            )}
        </main >
    );
}
