import { useForm } from "../hooks/useForm";
export const AddTask = ({ handleAddTask }) => {
    const { taskName, formState, onInputChange, onResetForm } = useForm({
        taskName: "",
    });

    const handleSubmit = (event) => {
        event.preventDefault();

        if (taskName.length < 2) return;

        const newTask = { id: new Date().getTime(), name: taskName, done: false };

        handleAddTask(newTask);
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
                            placeholder="Add a task"
                            style={{ fontSize: "10pt" }}
                            name="taskName"
                            value={taskName}
                            onChange={onInputChange}
                            autoComplete="off"
                        />
                    </div>
                    <button type="submit" className="btn btn-info ms-2 shadow-lg text-white text-uppercase">
                        <small>Add</small>
                    </button>
                </form>
                <p className="d-block text-muted fst-italic ps-2" style={{ fontSize: "8pt" }}>
                    Task|Categoría|Fecha límite|Priodidad
                </p>
            </div>
        </>
    );
};
