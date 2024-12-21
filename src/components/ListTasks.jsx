import { useContext, useEffect, useState } from "react";
import { Tabs, Tab } from "react-bootstrap";
import { TaskItem } from "./TaskItem";
import { UserContext } from "../context/userContext";

export const ListTasks = ({ page, tasks, handleToggleTask, handleDeleteTask }) => {
  const [key, setKey] = useState("Todos");
  const [categories, setCategories] = useState([]);

  // console.log({ page, tasks });

  useEffect(() => {
    const categories = [...new Set(tasks.filter((task) => task.type === page).map((task) => task.category))].sort();
    // console.log(categories);
    setCategories(categories);
  }, [tasks]);

  useEffect(() => {
    const savedKey = localStorage.getItem("key");
    setKey(!!savedKey ? savedKey : categories[0]);
  }, []);

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
                    return (
                      <TaskItem
                        key={task._id}
                        task={task}
                        handleToggleTask={handleToggleTask}
                        handleDeleteTask={handleDeleteTask}
                      />
                    );
                  })}
              </ul>
            </Tab>
          );
        })}
      </Tabs>
    </>
  );
};
