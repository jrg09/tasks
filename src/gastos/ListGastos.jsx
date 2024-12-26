import { useEffect, useState } from "react";
import { Tabs, Tab } from "react-bootstrap";
import { GastoItem } from "./GastoItem";
import { useLocation } from "react-router-dom";
import { formatCurrency } from "../helpers/stringFunctions";

export const ListGastos = ({ gastos, handleToggleGasto, handleDeleteGasto }) => {
  const [key, setKey] = useState(localStorage.getItem("key") || "Todos");
  const [categories, setCategories] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const categories = [...new Set(gastos.map((task) => task.category))].sort();
    let list = [];

    categories.forEach((category) => {
      const presupuesto = gastos.filter((gasto) => gasto.category === category).reduce((total, gasto) => total + gasto.ammount, 0);
      const gastado = gastos
        .filter((gasto) => gasto.category === category && gasto.done)
        .reduce((total, gasto) => total + gasto.ammount, 0);
      const pendiente = presupuesto - gastado;
      list.push({ category, presupuesto, gastado, pendiente });
    });

    console.log(list);

    setCategories(list);
  }, [gastos, location.pathname]);

  const onSetKey = (key) => {
    localStorage.setItem("key", key);
    setKey(key);
  };

  const getCategoryPresupuesto = (category) => {
    const presupuesto = gastos.filter((gasto) => gasto.category === category).reduce((total, gasto) => total + gasto.ammount, 0);
    return presupuesto;
  };

  const getCategoryGastado = (category) => {
    const presupuesto = gastos
      .filter((gasto) => gasto.category === category && gasto.done)
      .reduce((total, gasto) => total + gasto.ammount, 0);
    return presupuesto;
  };

  return (
    <>
      <Tabs activeKey={key} onSelect={(k) => onSetKey(k)} className="mb-3 task-panel" variant="underline">
        {categories.map((item, index) => {
          return (
            <Tab
              eventKey={item.category}
              title={`${item.category} (${gastos.filter((gasto) => gasto.category === item.category && !gasto.done).length})`}
              variant="underline"
              key={item.category}
            >
              <div className="row my-3 small">
                <div className="col-4 text-center">
                  <span className="fw-bold small d-block">Presupuesto</span>
                  <p>{formatCurrency(item.presupuesto)}</p>
                </div>
                <div className="col-4 text-center">
                  <span className="fw-bold small d-block">Gastado</span>
                  <p>{formatCurrency(item.gastado)}</p>
                </div>
                <div className="col-4 text-center">
                  <span className="fw-bold small d-block">Pendiente</span>
                  <p>{formatCurrency(item.pendiente)}</p>
                </div>
              </div>

              <ul className="list-group mb-0">
                {gastos
                  .filter((gasto) => gasto.category === item.category)
                  .sort((a, b) => a.done - b.done || new Date(b.updatedAt) - new Date(a.updatedAt))
                  .map((gasto, index) => {
                    return (
                      <GastoItem
                        key={gasto._id}
                        gasto={gasto}
                        handleToggleGasto={handleToggleGasto}
                        handleDeleteGasto={handleDeleteGasto}
                      />
                    );
                  })}
              </ul>
            </Tab>
          );
        })}
      </Tabs>
    </>
  );
};
