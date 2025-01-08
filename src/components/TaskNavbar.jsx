import { useContext, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { UserContext } from "../context/userContext";

export const TaskNavbar = ({ types }) => {
  const { user, updateUser } = useContext(UserContext);
  const location = useLocation();

  useEffect(() => {
    let type = location.pathname.split("/")[1];
    if (type === "") type = "trabajo";
    updateUser({ ...user, type });
  }, [location.pathname]);

  return (
    <>
      <nav className="navbar navbar-expand-md navbar-light bg-light">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand">
            jrgTasks
          </Link>

          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse nav-panel" id="navbarNav">
            <ul className="navbar-nav">
              {types.map((type) => (
                <NavLink to={`/${type.toLowerCase()}`} className="nav-link" data-title={type.toLowerCase()} key={type}>
                  {type}
                </NavLink>
              ))}
              <NavLink to={"/gastos"} className="nav-link">
                Gastos
              </NavLink>
              <span className="nav-link">{JSON.stringify(user)}</span>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};
