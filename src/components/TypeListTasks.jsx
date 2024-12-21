import { AddTask } from "./AddTask";
import { ListTasks } from "./ListTasks";
import { useTasksApi } from "../hooks/useTasksApi";

export default function TypeListTasks({ page }) {
   const { tasks, toggleTask, addTask, deleteTask } = useTasksApi();

   return (
      <section className="vh-100 gradient-custom">
         <div className="container py-3">
            <div className="row d-flex justify-content-center align-items-center h-100">
               <div className="col col-xl-8">
                  <div className="card">
                     <div className="card-body p-4">
                        <AddTask handleAddTask={addTask} />
                        <ListTasks page={page} tasks={tasks} handleToggleTask={toggleTask} handleDeleteTask={deleteTask} />
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>
   );
}
