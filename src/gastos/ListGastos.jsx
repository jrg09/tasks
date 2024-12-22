import { useEffect, useState } from "react";
import { Tabs, Tab } from "react-bootstrap";
import { GastoItem } from "./GastoItem";
import { useLocation } from "react-router-dom";

export const ListGastos = ({ gastos, handleToggleGasto, handleDeleteGasto }) => {
  const [key, setKey] = useState(localStorage.getItem("key") || "Todos");
  const [categories, setCategories] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const categories = [...new Set(gastos.map((task) => task.category))].sort();
    setCategories(categories);
  }, [gastos, location.pathname]);

  const onSetKey = (key) => {
    localStorage.setItem("key", key);
    setKey(key);
  };

  return (
    <>
      <Tabs activeKey={key} onSelect={(k) => onSetKey(k)} className="mb-3 task-panel" variant="underline">
        {categories.map((category, index) => {
          return (
            <Tab
              eventKey={category}
              title={`${category} (${gastos.filter((gasto) => gasto.category === category && !gasto.done).length})`}
              variant="underline"
              key={index}
            >
              <ul className="list-group mb-0">
                {gastos
                  .filter((gasto) => gasto.category === category)
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
