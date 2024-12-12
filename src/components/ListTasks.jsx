import { useEffect, useState } from "react";
import { Tabs, Tab } from "react-bootstrap";
import { TaskItem } from "./TaskItem";

export const ListTasks = () => {
    const [key, setKey] = useState("Home");
    const [categories, setCategories] = useState([]);
    const [tasks, setTasks] = useState([]);

    const getTasks = async () => {
        const response = await fetch("http://192.168.100.22:8090/api/v1/tasks");
        const data = await response.json();

        if (data.ok) {
            const { tasks } = data;
            setTasks(tasks);

            const categories = [...new Set(tasks.map((task) => task.category))];
            setCategories(categories);

            setKey(categories[0]);
        }
    };

    useEffect(() => {
        getTasks();
    }, []);

    const test = () => {
        const tasks_filtered = tasks
            .filter((task) => task.category === "Todos")
            .sort((a, b) => a.done - b.done)
            .sort((a, b) => new Date(a.completed) - new Date(b.completed));
        console.log(tasks_filtered);
    };

    const handleToggleTask = async (id) => {
        console.log(id);

        const task = tasks.find((task) => task._id === id);

        const response = await fetch(`http://192.168.100.22:8090/api/v1/tasks/${id}`, {
            method: "PATCH",
            body: JSON.stringify({ done: !task.done }),
        });
        const data = await response.json();
        console.log(data);

        //Update the task in the state
        setTasks(tasks.map((task) => (task._id === id ? { ...task, done: !task.done } : task)));
    };

    return (
        <>
            <Tabs id="controlled-tab-example" activeKey={key} onSelect={(k) => setKey(k)} className="mb-3 task-panel" variant="underline">
                {categories.map((category, index) => {
                    return (
                        <Tab eventKey={category} title={category} variant="underline" key={index}>
                            <ul className="list-group mb-0">
                                {tasks
                                    .filter((task) => task.category === category)
                                    .sort((a, b) => a.done - b.done)
                                    .sort((a, b) => new Date(a.completed) - new Date(b.completed))
                                    .map((task, index) => {
                                        return <TaskItem key={task._id} task={task} handleToggleTask={handleToggleTask} />;
                                    })}
                            </ul>
                        </Tab>
                    );
                })}
            </Tabs>
            <p>
                <button type="button" className="btn btn-primary" onClick={() => test()}>
                    test
                </button>
            </p>
        </>
    );
};
