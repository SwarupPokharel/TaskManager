import TaskForm from "../components/taskForm";
import "../components/taskForm.scss";

export default function NewTaskPage() {
  return (
    <main className='container'>
      <h1>Add New Task</h1>
      <TaskForm />
    </main>
  );
}
