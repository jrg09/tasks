import { useContext, useEffect, useState } from "react";
import { Tabs, Tab } from "react-bootstrap";
import { TaskItem } from "./TaskItem";
import { UserContext } from "../context/userContext";
import { useLocation } from "react-router-dom";
import { use } from "react";

export const ListTasks = ({ tasks, handleToggleTask, handleDeleteTask }) => {
  const [key, setKey] = useState(localStorage.getItem("key") || "Todos");
  const [categories, setCategories] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const categories = [...new Set(tasks.map((task) => task.category))].sort();
    setCategories(categories);
  }, [tasks, location.pathname]);

  // useEffect(() => {
  //   const savedKey = localStorage.getItem("key");
  //   const inc = categories.includes(savedKey);
  //   setKey(!!savedKey ? savedKey : categories[0]);
  // }, []);

  const onSetKey = (key) => {
    localStorage.setItem("key", key);
    setKey(key);
  };

  return (
    <>
      <Tabs activeKey={key} onSelect={(k) => onSetKey(k)} className="mb-3 task-panel" variant="underline">
        {categories.map((category, index) => {
          return (
            <Tab
              eventKey={category}
              title={`${category} (${tasks.filter((task) => task.category === category && !task.done).length})`}
              variant="underline"
              key={index}
            >
              <ul className="list-group mb-0">
                {tasks
                  .filter((task) => task.category === category)
                  .sort((a, b) => a.done - b.done || new Date(b.updatedAt) - new Date(a.updatedAt))
                  .map((task, index) => {
                    return <TaskItem key={task._id} task={task} handleToggleTask={handleToggleTask} handleDeleteTask={handleDeleteTask} />;
                  })}
              </ul>
            </Tab>
          );
        })}
      </Tabs>
    </>
  );
};
