import { useEffect } from "react";
import { AddTask, ListTasks, TaskNavbar } from "./components/";
import { useTasksApi } from "./hooks/useTasksApi";

function App() {
  const { tasks, getTasks, toggleTask, addTask, deleteTask } = useTasksApi();

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
