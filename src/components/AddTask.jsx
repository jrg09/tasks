export const AddTask = ({ handleAddTask }) => {
    return (
        <>
            <form className="d-flex justify-content-center align-items-center mb-4">
                <div className="form-outline flex-fill">
                    <input type="text" className="form-control" placeholder="Add a task" />
                    <small className="text-muted fst-italic">Task|Categoría|Fecha límite|Priodidad</small>
                </div>
                <button type="submit" className="btn btn-info ms-2 shadow-lg text-white text-uppercase">
                    <small>Add</small>
                </button>
            </form>
        </>
    );
};
