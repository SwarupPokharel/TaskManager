'use client'
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import Cross from '@/../public/images/cross.svg';
import './styleIndividualTask.scss'

interface Task {
    title: string,
    description: string,
    employeeList: string,
    assignDate: string,
    dueDate: string,
    status: string,
    priority: string,
}

interface TaskData {
    task: Task,
}

const UpdateTask = () => {
    const { id } = useParams();
    const [details, setDetails] = useState<TaskData | null>(null);
    const [bgcolor, setBgColor] = useState("");
    const [statusColor, setStatusColor] = useState("");
    const [isCompleted, setIsCompleted] = useState("");
    const [isOpen, setIsOpen] = useState(false);

    const handleClick = () => {
        setIsOpen(true);
    }

    const handleClose = () => {
        setIsOpen(false);
    }

    const getTaskDetails = async () => {
        try {
            const res = await fetch(`/api/tasks/${id}`);
            const data = await res.json();
            const formattedDate = {
                ...data,
                task: {
                    ...data.task,
                    assignDate: data.task.assignDate ? new Date(data.task.assignDate).toISOString().split("T")[0] : "",
                    dueDate: data.task.dueDate ? new Date(data.task.dueDate).toISOString().split("T")[0] : "",
                }
            }
            if (data.task.status === "Completed") {
                setIsCompleted("Completed");
            }
            setDetails(formattedDate);
            if (data.task.priority === 'high') {
                setBgColor("highPriority");
            } else if (data.task.priority === 'medium') {
                setBgColor("mediumPriority");
            } else if (data.task.priority === 'low') {
                setBgColor("lowPriority");
            }

            if (data.task.status === 'Assigned') {
                setStatusColor('assignedTask');
            } else if (data.task.status === 'In Progress') {
                setStatusColor('inProgressTask');
            } else if (data.task.status === 'Completed') {
                setStatusColor('completedTask');
            }

        } catch (error) {
            console.log("Error fetching task details: ", error instanceof Error ? error.message : String(error));
        }
    };

    useEffect(() => {
        getTaskDetails();
    }, [id]);

    const statusText = ['In Progress', 'Completed'];
    const [actions, setActions] = useState({ remarks: "", status: "" });

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setActions((prev) => ({ ...prev, [name]: value }));
    };

    const handleCancelButton = () => {
        setActions({ remarks: "", status: "" });
    };

    const handleUpdate = async () => {
        try {
            const response = await fetch(`/api/tasks/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(actions),
            });
            const result = (await response.json());
            if (!response.ok) {
                throw new Error(result.message || 'An error occurred while updating the task actions.');
            }
            setIsOpen(false);
            window.location.replace('/dashboard/tasks');
        } catch (error) {
            console.log("Error updating task actions: ", error instanceof Error ? error.message : String(error));
        }
    }

    return (
        <main className='taskDetailContainer'>
            <div className='titleAndPriority'>
                <div className="titleGridItem">Task Title</div>
                <div className="titleGridItem">{details?.task?.title}</div>
                <div className="titleGridItem">Task Priority</div>
                <div className="titleGridItem">
                    <span className={`priorityButton ${bgcolor}`}>{details?.task?.priority}</span>
                </div>
            </div>
            <div className="taskDescription">
                <div className="descGridItem">Task Description</div>
                <div className="descGridItem">{details?.task?.description}</div>
            </div>
            <div className="taskDate">
                <div className="dateItem">Assigned Date</div>
                <div className="dateItem">{details?.task?.assignDate}</div>
                <div className="dateItem">Due Date</div>
                <div className="dateItem">{details?.task?.dueDate}</div>
            </div>
            <div className="taskStatus">
                <div className="status">Status</div>
                <div className="status">
                    <span className={`statusText ${statusColor}`}>{details?.task?.status}</span>
                </div>
            </div>

            {details?.task?.status !== "Completed" && (
                <div className="actionContainer">
                    <button className="action" onClick={handleClick}>Take Action</button>
                </div>
            )}

            {isOpen && (
                <div className="dialogContainer">
                    <div className="dialogContent">
                        <div className="dialogHeader">
                            <h1>Task Actions</h1>
                            <span onClick={handleClose}>
                                <Image
                                    src={Cross}
                                    alt="close"
                                    width={100}
                                    height={100}
                                    className="closeIcon"
                                />
                            </span>
                        </div>
                        <div className="mainContent">
                            <div className="textareaContainer">
                                <label htmlFor="remarks">Remarks:</label>
                                <textarea
                                    name="remarks"
                                    cols={10}
                                    rows={10}
                                    value={actions.remarks}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="statusContainer">
                                <label htmlFor="status">Status:</label>
                                <select
                                    name="status"
                                    id='status'
                                    className="statusSelect"
                                    value={actions.status}
                                    onChange={handleChange}
                                >
                                    <option>Select an option</option>
                                    {statusText.map((stat) => (
                                        <option value={stat} key={stat}>{stat}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="buttons">
                                <button className="cancelButton" type="submit" onClick={handleCancelButton}>Cancel</button>
                                <button className="submitButton" type="submit" onClick={handleUpdate}>Update</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );

}
export default UpdateTask;
