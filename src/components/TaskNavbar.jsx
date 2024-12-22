import { Link, NavLink } from "react-router-dom";

export const TaskNavbar = ({ types }) => {
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
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              {types.map((type) => (
                <NavLink to={`/${type.toLowerCase()}`} className="nav-link" data-title={type.toLowerCase()} key={type}>
                  {type}
                </NavLink>
              ))}
              <NavLink to={"/gastos"} className="nav-link">
                Gastos
              </NavLink>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};
