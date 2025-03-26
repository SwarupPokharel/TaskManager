"use client";
import { useState, useEffect } from "react";
import DashboardCard from "../components/DashboardCard";
import { BiTask } from "react-icons/bi";
import { BiBuildings } from "react-icons/bi";
import { FaUsers, FaCheckCircle, FaTasks } from "react-icons/fa";

interface Task {
  _id: number;
  title: string;
  description: string;
  status: string;
  employeeList: string;
  dueDate: string;
  priority: string,
}

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalDepartments: 0,
    totalEmployees: 0,
    totalTask: 0,
    completedTasks: 0,
    pendingTasks: 0,
    highPriorityTasks: 0,
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const getTasks = async () => {
      try {
        const res = await fetch('/api/tasks');
        if (!res.ok) {
          throw new Error(`API connection error: ${res.status}`);
        }
        const taskData = await res.json();
        const completed: number = taskData?.filter((task: Task) => task.status === 'Completed').length || 0;
        const pending: number = taskData?.filter((task: Task) => task.status !== 'Completed').length || 0;
        const highPrority: number = taskData?.filter((task: Task) => task.priority === 'high').length || 0;
        setStats((prevStats) => ({
          ...prevStats,
          totalTask: taskData.length,
          pendingTasks: pending,
          completedTasks: completed,
          highPriorityTasks: highPrority,
        }));
      } catch (error) {
        console.log("Tasks fetching failed: ", error instanceof Error ? error.message : String(error));
      } finally {
        setIsLoading(false);
      }
    }
    getTasks();
  }, []);

  useEffect(() => {
    const getEmplyees = async () => {
      setIsLoading(true);
      try {
        const res = await fetch('/api/auth/employee');
        if (!res.ok) {
          throw new Error(`API connection error: ${res.status}`);
        }
        const employeeData = await res.json();
        setStats((prevStats) => ({
          ...prevStats,
          totalEmployees: employeeData.length,
        }))
      } catch (error) {
        console.log("Error fetching employee data: ", error);
      } finally {
        setIsLoading(false);
      }
    };
    getEmplyees();
  }, []);

  useEffect(() => {
    const getDepartments = async () => {
      setIsLoading(true);
      try {
        const res = await fetch('/api/auth/department');
        if (!res.ok) {
          throw new Error(`API connection error: ${res.status}`);
        }
        const departmentData = await res.json();
        setStats((prevStats) => ({
          ...prevStats,
          totalDepartments: departmentData.length,
        }))
      } catch (error) {
        console.log("Error fetching departments: ", error);
      } finally {
        setIsLoading(false);
      }
    };
    getDepartments();
  }, []);

return (
  <main className='dashboard'>
    <div className="cards">
      <DashboardCard title="Total Departments" count={stats.totalDepartments} color="purple" icon={<BiBuildings />} />
      <DashboardCard title="Total Employees" count={stats.totalEmployees} color="teal" icon={<FaUsers />} />
      <DashboardCard title="Total Tasks" count={stats.totalTask} color="blue" icon={<FaTasks />} />
      <DashboardCard title="Completed Tasks" count={stats.completedTasks} color="green" icon={<FaCheckCircle />} />
      <DashboardCard title="Pending Tasks" count={stats.pendingTasks} color="orange" icon={<BiTask />} />
      <DashboardCard title="High Priority Tasks" count={stats.highPriorityTasks} color="red" icon={<BiTask />} />
    </div>
  </main>
);
}
