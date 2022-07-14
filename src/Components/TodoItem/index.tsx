import ITask from "../../interfaces/task";

interface Props {
    task: ITask,
    onCompleteTask: (taskId: number) => void;
    deleteTask: (taskId: number) => void;
}

const TodoItem: React.FC<Props> = ({ task, onCompleteTask, deleteTask }) => {
    return (
        <div className="card mt-1 item">
            <div className="card-body">
                <div style={{textDecoration: task.completed ? 'line-through' : 'none'}}>
                    <input type="checkbox" checked={task.completed} onChange={() => onCompleteTask(task.id)} />
                    <span className="p-2">{task.name}</span>
                    <button className="add-btn" onClick={() => deleteTask(task.id)} >X</button>
                </div>
            </div>
        </div>
    );
}

export default TodoItem;