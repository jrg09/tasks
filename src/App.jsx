import { useEffect } from "react";
import { AddTask, ListTasks, TaskNavbar } from "./components/";
import { useTasksApi } from "./hooks/useTasksApi";
import { AddGasto } from "./gastos/AddGasto";
import { ListGastos } from "./gastos/ListGastos";
import { useGastosApi } from "./hooks/useGastosApi";

function App() {
  const { tasks, getTasks, toggleTask, addTask, deleteTask } = useTasksApi();
  const { gastos, getGastos, toggleGasto, addGasto, deleteGasto } = useGastosApi();

  const uniqueTypes = [...new Set(tasks.map(({ type }) => type))];

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <>
      <TaskNavbar types={uniqueTypes} />

      <section className="vh-100 gradient-custom">
        <div className="container py-3">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-xl-8">
              <div className="card">
                <div className="card-body p-4">
                  <AddGasto handleAddGasto={addGasto} />
                  <ListGastos />
                </div>
              </div>
              <div className="card d-none">
                <div className="card-body p-4">
                  <AddTask handleAddTask={addTask} />
                  <ListTasks tasks={tasks} handleToggleTask={toggleTask} handleDeleteTask={deleteTask} />
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
