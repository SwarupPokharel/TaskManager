"use client";
import { useState, useEffect } from "react";
import DashboardCard from "../components/DashboardCard";
import { BiTask } from "react-icons/bi";
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
    totalTask: 0,
    completedTasks: 0,
    pendingTasks: 0,
    highPriorityTask: 0,
  });
  const [employee, setEmployee] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [highPriorityTask, setHighPriorityTask] = useState<number>(0);

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
      } catch (error) {
        console.log(error instanceof Error ? error.message : error);
      }
    };
    handleToken();
  }, []);

  useEffect(() => {
    setIsLoading(true);
    if (employee !== "") {
      const getTasks = async () => {
        try {
          const res = await fetch("/api/tasks/getTask", {
            method: "POST",
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ employee }),
          });
          const taskData = await res.json();
          const completed: number = taskData?.filter((task: Task) => task.status === 'Completed').length || 0;
          const pending: number = taskData?.filter((task: Task) => task.status !== 'Completed').length || 0;
          const highPriority: number = taskData?.filter((task: Task) => task.priority === 'high').length || 0;
          setHighPriorityTask(taskData.length === completed ? 0 : highPriority)
          setStats((prevStats) => ({
            ...prevStats,
            totalTask: taskData.length,
            pendingTasks: pending,
            completedTasks: completed,
            highPriorityTask: taskData.length === completed ? 0 : highPriority,
          }));
        } catch (error) {
          console.log("Tasks fetching failed: ", error instanceof Error ? error.message : String(error));
        } finally {
          setIsLoading(false);
        }
      }
      getTasks();
    }
  }, [employee]);

  return (
    <main className='dashboard'>
      <div className="cards">
        <DashboardCard title="Total Tasks" count={stats.totalTask} color="blue" icon={<FaTasks />} />
        <DashboardCard title="Completed Tasks" count={stats.completedTasks} color="green" icon={<FaCheckCircle />} />
        <DashboardCard title="Pending Tasks" count={stats.pendingTasks} color="orange" icon={<BiTask />} />
        <DashboardCard title="High Priority Tasks" count={stats.highPriorityTask} color="red" icon={<BiTask />} />
      </div>
    </main>
  );
}
