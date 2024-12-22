import { useEffect, useState } from "react";
import { TaskNavbar } from "./components/";
import { useTasksApi } from "./hooks/useTasksApi";
import { useGastosApi } from "./hooks/useGastosApi";
import { Route, Routes } from "react-router-dom";
import { TypeListTasks } from "./components/TypeListTasks";
import { TypeGastosList } from "./gastos/TypeGastosList";

function App() {
  const { tasks, getTasks, toggleTask, addTask, deleteTask } = useTasksApi();
  const { gastos, getGastos, toggleGasto, addGasto, deleteGasto } = useGastosApi();
  const [typesCategories, setTypes] = useState([]);

  useEffect(() => {
    getTasks();
    getGastos();
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
                  tasks={tasks.filter((task) => task.type === type)}
                  toggleTask={toggleTask}
                  addTask={addTask}
                  deleteTask={deleteTask}
                />
              }
            />
          );
        })}

        {gastos.length > 0 && (
          <Route
            path="/gastos"
            element={<TypeGastosList gastos={gastos} toggleGasto={toggleGasto} addGasto={addGasto} deleteGasto={deleteGasto} />}
          />
        )}

        <Route
          path="/*"
          element={
            <TypeListTasks
              typeCategory="Trabajo"
              tasks={tasks.filter((task) => task.type === "Trabajo")}
              toggleTask={toggleTask}
              addTask={addTask}
              deleteTask={deleteTask}
            />
          }
        />
      </Routes>
    </>
  );
}

export default App;
