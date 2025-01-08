import { useContext, useEffect, useState } from "react";
import { Tabs, Tab } from "react-bootstrap";
import { TaskItem } from "./TaskItem";
import { useLocation } from "react-router-dom";
import { UserContext } from "../context/userContext";

export const ListTasks = ({ tasks, handleToggleTask, handleDeleteTask }) => {
  const [key, setKey] = useState("");
  const [categories, setCategories] = useState([]);
  const location = useLocation();
  const { user, updateUser } = useContext(UserContext);

  useEffect(() => {
    const categories = [...new Set(tasks.map((task) => task.category))].sort();
    setCategories(categories);
  }, [tasks, location.pathname]);

  useEffect(() => {
    if (tasks.length > 0) {
      setKey(user[tasks[0].type]);
    }
  }, [location.pathname]);

  const onSetKey = (key) => {
    setKey(key);
    updateUser(tasks[0].type, key);
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
