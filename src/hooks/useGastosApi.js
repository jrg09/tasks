import { useState } from "react";
import { getEnvironments } from "../helpers/getEnvironments";

export const useGastosApi = () => {
  const { VITE_API_URL } = getEnvironments();
  const [gastos, setGastos] = useState([]);

  const getGastos = async () => {
    const response = await fetch(`${VITE_API_URL}/api/v1/payments`, {
      headers: {
        "user-id": "1",
      },
    });

    const data = await response.json();

    if (data.ok) {
      setGastos(data.gastos);
    }
  };

  const toggleGasto = async (id) => {
    const gasto = gastos.find((gasto) => gasto._id === id);
    const newStatus = !gasto.done;
    gasto.updatedAt = new Date().toISOString();

    //Update the gasto in the state
    setGastos(gastos.map((gasto) => (gasto._id === id ? { ...gasto, done: newStatus } : gasto)));

    const response = await fetch(`${VITE_API_URL}/api/v1/payments/${id}`, {
      method: "PATCH",
      headers: {
        "user-id": "1",
      },
      body: JSON.stringify({ done: newStatus }),
    });

    const data = await response.json();

    if (!data.ok) {
      setGastos(gastos.map((gasto) => (gasto._id === id ? { ...gasto, done: !newStatus } : gasto)));
    }
  };

  const addGasto = async (gasto) => {
    delete gasto.id;

    const response = await fetch(`${VITE_API_URL}/api/v1/payments`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "user-id": "1",
      },
      body: JSON.stringify(gasto),
    });
    const data = await response.json();

    if (data.ok) {
      setGastos([data.gasto, ...gastos]);
    }
  };

  const deleteGasto = async (id) => {
    const response = await fetch(`${VITE_API_URL}/api/v1/payments/${id}`, {
      method: "DELETE",
      headers: {
        "user-id": "1",
      },
    });
    const data = await response.json();

    if (data.ok) {
      setGastos(gastos.filter((gasto) => gasto._id !== id));
    }
  };

  return {
    gastos,
    getGastos,
    toggleGasto,
    addGasto,
    deleteGasto,
  };
};
