import { useState } from "react";
import { getEnvironments } from "../helpers/getEnvironments";

export const useTasksApi = () => {
  const { VITE_API_URL } = getEnvironments();
  const [tasks, setTasks] = useState([]);

  const getTasks = async () => {
    const response = await fetch(`${VITE_API_URL}/api/v1/tasks`, {
      headers: {
        "user-id": "1",
      },
    });

    const data = await response.json();

    if (data.ok) {
      console.log(data.tasks.length);
      setTasks(data.tasks);
    }
  };

  const toggleTask = async (id) => {
    const task = tasks.find((task) => task._id === id);
    const newStatus = !task.done;
    task.updatedAt = new Date().toISOString();

    //Update the task in the state
    setTasks(tasks.map((task) => (task._id === id ? { ...task, done: newStatus } : task)));

    const response = await fetch(`${VITE_API_URL}/api/v1/tasks/${id}`, {
      method: "PATCH",
      headers: {
        "user-id": "1",
      },
      body: JSON.stringify({ done: newStatus }),
    });

    const data = await response.json();

    if (!data.ok) {
      setTasks(tasks.map((task) => (task._id === id ? { ...task, done: !newStatus } : task)));
    }
  };

  const addTask = async (task) => {
    delete task.id;

    console.log({task});

    const response = await fetch(`${VITE_API_URL}/api/v1/tasks`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "user-id": "1",
      },
      body: JSON.stringify(task),
    });
    const data = await response.json();

    if (data.ok) {
      setTasks([data.task, ...tasks]);
    }
  };

  const deleteTask = async (id) => {
    const response = await fetch(`${VITE_API_URL}/api/v1/tasks/${id}`, {
      method: "DELETE",
      headers: {
        "user-id": "1",
      },
    });
    const data = await response.json();

    if (data.ok) {
      setTasks(tasks.filter((task) => task._id !== id));
    }
  };

  return {
    tasks,
    getTasks,
    toggleTask,
    addTask,
    deleteTask,
  };
};
