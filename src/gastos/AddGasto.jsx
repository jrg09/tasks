import { useState } from "react";
import { useForm } from "../hooks/useForm";
import { capitalizeFirstLetter } from "../helpers/stringFunctions";

export const AddGasto = ({ handleAddGasto }) => {
  const [msg, setMsg] = useState("");
  const { gastoName, onInputChange, onResetForm } = useForm({
    gastoName: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    if (gastoName.length < 2) return;

    let category = localStorage.getItem("key") || "Todos";

    const datosGasto = gastoName.split(/[|\/,]/);
    const name = datosGasto[0].trim();
    const importe = datosGasto[1].trim();

    if (isNaN(importe)) {
      setMsg("El importe no es un número");
      setTimeout(() => setMsg(""), 3000);
      return;
    }

    if (datosGasto.length > 2) {
      category = datosGasto[2].trim();
    }

    const newGasto = {
      id: new Date().getTime(),
      name: capitalizeFirstLetter(name),
      ammount: Number(importe),
      category: capitalizeFirstLetter(category),
    };
    console.log(newGasto);

    handleAddGasto(newGasto);
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
              placeholder="Añadir gasto"
              style={{ fontSize: "10pt" }}
              name="gastoName"
              value={gastoName}
              onChange={onInputChange}
              autoComplete="off"
            />
          </div>
          <button type="submit" className="btn btn-info ms-2 shadow-lg text-white text-uppercase">
            <small>Add</small>
          </button>
        </form>
        <p className="d-block text-muted fst-italic ps-2" style={{ fontSize: "8pt" }}>
          Gasto|Importe|Categoría&nbsp;<span className="text-danger">{msg}</span>
        </p>
      </div>
    </>
  );
};
