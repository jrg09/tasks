import { useForm } from "../hooks/useForm";
export const AddTask = ({ handleAddTask }) => {
   const { taskName, formState, onInputChange, onResetForm } = useForm({
      taskName: "",
   });

   const handleSubmit = (event) => {
      event.preventDefault();

      if (taskName.length < 2) return;

      let category = localStorage.getItem("key") || "Todos";
      let type = localStorage.getItem("lastLocation") || "Personal";

      const datosTask = taskName.split(/[|\/]/);
      const name = datosTask[0];

      if (datosTask.length > 1) {
         category = datosTask[1].trim();

         if (category.length == 1) {
            switch (datosTask[1]) {
               case "T":
                  category = "Todos";
                  break;
               case "D":
                  category = "Diaria";
                  break;
               case "M":
                  category = "Mensual";
                  break;
               default:
                  category = "Todos";
                  break;
            }
         }
      }

      //find a tag with data-title attribute and get its value
      type = document.querySelector(`a[data-title='${type}']`).textContent;

      const newTask = { id: new Date().getTime(), name, category, type };

      console.log(newTask);

      handleAddTask(newTask);
      onResetForm();
   };

   return (
      <>
         <div className="mb-4">
            <form className="d-flex justify-content-center align-items-center " onSubmit={handleSubmit}>
               <div className="form-outline flex-fill">
                  <input
                     type="text"
                     className="form-control"
                     placeholder="Add a task"
                     style={{ fontSize: "10pt" }}
                     name="taskName"
                     value={taskName}
                     onChange={onInputChange}
                     autoComplete="off"
                  />
               </div>
               <button type="submit" className="btn btn-info ms-2 shadow-lg text-white text-uppercase">
                  <small>Add</small>
               </button>
            </form>
            <p className="d-block text-muted fst-italic ps-2" style={{ fontSize: "8pt" }}>
               Task|Categoría|Fecha límite|Priodidad
            </p>
         </div>
      </>
   );
};
