import { useEffect, useContext } from "react";
import { AddTask, ListTasks, TaskNavbar } from "./components/";
import { useTasksApi } from "./hooks/useTasksApi";
import { Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import TypeListTasks from "./components/TypeListTasks";
import { UserProvider } from "./context/UserProvider";
import { UserContext } from "./context/userContext";

function App() {
   const { tasks, getTasks } = useTasksApi();
   const location = useLocation();
   const navigate = useNavigate();

   const uniqueTypes = [...new Set(tasks.map(({ type }) => type))];

   useEffect(() => {
      getTasks();

      // console.log(`localStorage.getItem("lastLocation"): ${localStorage.getItem("lastLocation")}`);
      if (localStorage.getItem("lastLocation") !== undefined) {
         navigate(localStorage.getItem("lastLocation"));
      }
   }, []);

   useEffect(() => {
      const lastLocation = location.pathname.split("/")[1];
      if (lastLocation != "") localStorage.setItem("lastLocation", lastLocation);

      if (localStorage.getItem("key") == undefined) {
         const categories = [
            ...new Set(tasks.filter((task) => task.type.toLowerCase() === lastLocation).map((task) => task.category)),
         ].sort();
         localStorage.setItem("key", categories[0]);
      }
   }, [location]);

   return (
      <UserProvider>
         <TaskNavbar types={uniqueTypes} />
         <Routes>
            {uniqueTypes.length > 0 && <Route path="/" element={<TypeListTasks page={uniqueTypes[0]} />} />}
            {uniqueTypes.length > 0 &&
               uniqueTypes.map((type) => {
                  return <Route key={type} path={`/${type.toLowerCase()}`} element={<TypeListTasks page={type} />} />;
               })}
         </Routes>
      </UserProvider>
   );
}

export default App;
