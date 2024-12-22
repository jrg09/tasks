import { AddGasto } from "./AddGasto";
import { ListGastos } from "./ListGastos";

export const TypeGastosList = ({ gastos, toggleGasto, addGasto, deleteGasto }) => {
  return (
    <section className="vh-100 gradient-custom">
      <div className="container py-3">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col col-xl-8">
            <div className="card">
              <div className="card-body p-4">
                <AddGasto handleAddGasto={addGasto} />
                <ListGastos gastos={gastos} handleToggleGasto={toggleGasto} handleDeleteGasto={deleteGasto} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
