import { useEffect, useContext, useState } from "react";
import { AddTask, ListTasks, TaskNavbar } from "./components/";
import { useTasksApi } from "./hooks/useTasksApi";
import { Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import TypeListTasks from "./components/TypeListTasks";
import { UserProvider } from "./context/UserProvider";
import { UserContext } from "./context/userContext";

function App() {
  const { tasks, getTasks, toggleTask, addTask, deleteTask } = useTasksApi();
  const [typesCategories, setTypes] = useState([]);

  useEffect(() => {
    getTasks();
  }, []);

  useEffect(() => {
    const typesCategories = [...new Set(tasks.map((task) => task.type))];
    setTypes(typesCategories);
  }, [tasks]);

  return (
    <>
      <TaskNavbar types={typesCategories} />
      <Routes>
        {typesCategories.map((type) => {
          return (
            <Route
              key={type}
              path={`/${type.toLowerCase()}`}
              element={
                <TypeListTasks
                  typeCategory={type}
                  tasks={tasks.filter((task) => task.type === type)}
                  toggleTask={toggleTask}
                  addTask={addTask}
                  deleteTask={deleteTask}
                />
              }
            />
          );
        })}

        <Route path="/*" element={<TypeListTasks typeCategory="Trabajo" tasks={tasks.filter((task) => task.type === "Trabajo")} />} />
      </Routes>
    </>
  );
}

export default App;
