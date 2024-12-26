import { formatCurrency } from "../helpers/stringFunctions";

export const GastoItem = ({ gasto, handleToggleGasto, handleDeleteGasto }) => {
  const onDeleteGasto = (event) => {
    event.preventDefault();
    handleDeleteGasto(gasto._id);
  };

  return (
    <>
      <li className="list-group-item d-flex justify-content-between align-items-center border-start-0 border-top-0 border-end-0 border-bottom rounded-0 mb-2 px-2">
        <div
          role="button"
          className={`d-flex align-items-justify-content-between ${gasto.done ? "task-completed" : ""}`}
          onClick={() => handleToggleGasto(gasto._id)}
        >
          <div style={{ width: "75px" }} className="text-end me-2">
            {formatCurrency(gasto.ammount)}
          </div>
          <div>{gasto.name}</div>
        </div>
        <a href="#" title="Remove item" onClick={onDeleteGasto}>
          <i className="fas fa-times text-primary"></i>
        </a>
      </li>
    </>
  );
};
