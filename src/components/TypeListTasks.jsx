import { AddTask } from "./AddTask";
import { ListTasks } from "./ListTasks";

export const TypeListTasks = ({ tasks, toggleTask, addTask, deleteTask, type }) => {
  return (
    <>
      {tasks.length > 0 ? (
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
      ) : (
        <span></span>
      )}
    </>
  );
};
