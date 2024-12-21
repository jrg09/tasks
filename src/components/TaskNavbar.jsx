import React from "react";
import { Link, NavLink } from "react-router-dom";

export const TaskNavbar = ({ types }) => {
   return (
      <>
         <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
               <Link to="/" className="navbar-brand">
                  jrgTasks
               </Link>

               <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                  <span className="navbar-toggler-icon"></span>
               </button>
               <div className="collapse navbar-collapse" id="navbarNav">
                  <ul className="navbar-nav">
                     {types.map((type) => (
                        <NavLink
                           to={`/${type.toLowerCase()}`}
                           className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
                           data-title={type.toLowerCase()}
                           key={type}>
                           {type}
                        </NavLink>
                     ))}
                  </ul>
               </div>
            </div>
         </nav>
      </>
   );
};
