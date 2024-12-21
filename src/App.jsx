import { useEffect, useContext, useState } from "react";
import { AddTask, ListTasks, TaskNavbar } from "./components/";
import { useTasksApi } from "./hooks/useTasksApi";
import { Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import TypeListTasks from "./components/TypeListTasks";
import { UserProvider } from "./context/UserProvider";
import { UserContext } from "./context/userContext";

function App() {
  const { tasks, getTasks } = useTasksApi();
  const [typesCategories, setTypes] = useState([]);

  useEffect(() => {
    getTasks();

    if (tasks.length > 0) {
      const typesCategories = [...new Set(tasks.map((task) => task.type))];
      console.log(typesCategories);
      setTypes(typesCategories);
    }
  }, []);

  useEffect(() => {
    if (tasks.length > 0) {
      const typesCategories = [...new Set(tasks.map((task) => task.type))];
      console.log(typesCategories);
      setTypes(typesCategories);
    }
  }, [tasks]);

  return (
    <>
      <TaskNavbar types={typesCategories} />;
      <TypeListTasks typeCategory="Trabajo" tasks={tasks} />
    </>
  );
}

export default App;
