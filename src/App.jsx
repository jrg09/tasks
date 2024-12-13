import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { AddTask } from "./components/AddTask";
import { ListTasks } from "./components/ListTasks";
import { useEffect, useState } from "react";
import { getEnvironments } from "./helpers/getEnvironments";

function App() {
    const [tasks, setTasks] = useState([]);
    const { VITE_API_URL } = getEnvironments();

    const getTasks = async () => {
        const response = await fetch(`${VITE_API_URL}/api/v1/tasks`);
        const data = await response.json();

        if (data.ok) {
            setTasks(data.tasks);
        }
    };

    useEffect(() => {
        getTasks();
    }, []);

    const handleToggleTask = async (id) => {
        const task = tasks.find((task) => task._id === id);
        const newStatus = !task.done;
        task.updatedAt = new Date().toISOString();

        //Update the task in the state
        setTasks(tasks.map((task) => (task._id === id ? { ...task, done: newStatus } : task)));

        const response = await fetch(`${VITE_API_URL}/api/v1/tasks/${id}`, {
            method: "PATCH",
            body: JSON.stringify({ done: newStatus }),
        });

        const data = await response.json();

        if (!data.ok) {
            setTasks(tasks.map((task) => (task._id === id ? { ...task, done: !newStatus } : task)));
        }
    };

    const handleAddTask = async (task) => {
        delete task.id;

        const response = await fetch(`${VITE_API_URL}/api/v1/tasks`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(task),
        });
        const data = await response.json();

        if (data.ok) {
            setTasks([data.task, ...tasks]);
        }
    };

    const handleDeleteTask = async (id) => {
        const response = await fetch(`${VITE_API_URL}/api/v1/tasks/${id}`, {
            method: "DELETE",
        });
        const data = await response.json();

        if (data.ok) {
            setTasks(tasks.filter((task) => task._id !== id));
        }
    };

    return (
        <>
            <section className="vh-100 gradient-custom">
                <div className="container py-5">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col col-xl-12">
                            <div className="card">
                                <div className="card-body p-4">
                                    <AddTask handleAddTask={handleAddTask} />
                                    <ListTasks tasks={tasks} handleToggleTask={handleToggleTask} handleDeleteTask={handleDeleteTask} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default App;
