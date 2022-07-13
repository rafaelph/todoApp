//interfaces
import ITask from "../../interfaces/task";

//Components
import TodoItem from "../TodoItem";

interface Props {
    taskList: ITask[];
    onCompleteTask: (taskId: number) => void;
    deleteTask: ((taskId: number) => void);
    filter: string
}

const TodoList: React.FC<Props> = ({ taskList, filter, onCompleteTask, deleteTask }) => {
    return (
        <div className="mt-3">
            {
                filter === 'All' ?
                    taskList.map((task: ITask, index: number) => {
                        return <TodoItem
                            key={index}
                            task={task}
                            onCompleteTask={onCompleteTask}
                            deleteTask={deleteTask}
                        />
                    }) :
                    filter === 'Pending' ?
                        taskList.filter((task: ITask) => task.completed === false).map((task: ITask, index: number) => {
                            return <TodoItem
                                key={index}
                                task={task}
                                onCompleteTask={onCompleteTask}
                                deleteTask={deleteTask}
                            />
                        }) :
                        filter === 'Completed' ?
                            taskList.filter((task: ITask) => task.completed === true).map((task: ITask, index: number) => {
                                return <TodoItem
                                    key={index}
                                    task={task}
                                    onCompleteTask={onCompleteTask}
                                    deleteTask={deleteTask}
                                />
                            }) : null
            }
        </div>
    );
}

export default TodoList;