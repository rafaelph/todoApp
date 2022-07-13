//interfaces
import ITask from "../../interfaces/task";

//Components
import TodoItem from "../TodoItem";
import {FilterEnum} from "../../enums/filter.enum";

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
                filter === FilterEnum.ALL ?
                    taskList.map((task: ITask, index: number) => {
                        return <TodoItem
                            key={index}
                            task={task}
                            onCompleteTask={onCompleteTask}
                            deleteTask={deleteTask}
                        />
                    }) :
                    filter === FilterEnum.PENDING ?
                        taskList.filter((task: ITask) => !task.completed).map((task: ITask, index: number) => {
                            return <TodoItem
                                key={index}
                                task={task}
                                onCompleteTask={onCompleteTask}
                                deleteTask={deleteTask}
                            />
                        }) :
                        filter === FilterEnum.COMPLETED ?
                            taskList.filter((task: ITask) => task.completed).map((task: ITask, index: number) => {
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