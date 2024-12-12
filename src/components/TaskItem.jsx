export const TaskItem = ({ task, handleToggleTask, handleDeleteTask }) => {
    const onDeleteTask = (event) => {
        event.preventDefault();
        handleDeleteTask(task._id);
    };

    return (
        <>
            <li className="list-group-item d-flex justify-content-between align-items-center border-start-0 border-top-0 border-end-0 border-bottom rounded-0 mb-2 px-2">
                <div
                    role="button"
                    className={`d-flex align-items-center ${task.done ? "task-completed" : ""}`}
                    onClick={() => handleToggleTask(task._id)}>
                    {task.name}
                </div>
                <a href="#" title="Remove item" onClick={onDeleteTask}>
                    <i className="fas fa-times text-primary"></i>
                </a>
            </li>
        </>
    );
};
