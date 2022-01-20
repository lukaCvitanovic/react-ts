import { useReducer, useState } from "react";
import TodoInput from "@/components/todo/TodoInput";
import Task, { TaskType } from "@/components/todo/Task";

const ToDo = () => {
    const [id, setId] = useState(0);

    type TaskReducerActionType = 
     | { type: 'addTask', task: TaskType }
     | { type: 'toggleTask' | 'deleteTask', id: number }
     | { type: 'setAll', done: boolean };

    const tasksReducer = (state: readonly TaskType[], action: TaskReducerActionType): TaskType[] => {
        switch (action.type) {
            case 'addTask':
                return [...state, action.task];
            case 'deleteTask':
                return state.filter(({ id: taskId }) => taskId !== action.id);
            case 'toggleTask':
                return state.map((task) => (task.id === action.id ? { ...task, done: !task.done } : task));
            case 'setAll':
                return state.map((task) => ({ ...task, done: action.done }));
            default:
                throw new Error();
        }
    };
    const [tasks, dispatch] = useReducer(tasksReducer, []);
    const [allChecked, setAllChecked] = useState(false);

    const getId = (): number => {
        setId((oldId) => oldId + 1);
        return id - 1;
    }

    const createNewTask = (text: string) => dispatch({ type: 'addTask', task: { id: getId(), text, done: false } });
    const addNewTask = (text: string) => createNewTask(text);
    const toggleTask = (id: number) => dispatch({ type: 'toggleTask', id });
    const removeTask = (id: number) => dispatch({ type: 'deleteTask', id });

    const toggleAllChecked = () => setAllChecked((currentAllChecked: boolean) => {
        const newAllChecked = !currentAllChecked;
        setDoneOnAllTasks(newAllChecked);
        return newAllChecked;
    });

    const setDoneOnAllTasks = (done: boolean) => dispatch({ type: 'setAll', done });
    const allCheckText = (allChecked ? 'Uncheck all tasks' : 'Check all tasks');

    const tasksCommponents = (!tasks.length ? <span className="text-sm text-gray-400">No tasks</span> : tasks.map((task) => {
        return (
            <Task
                {...task}
                key={task.id}
                toggleTask={() => toggleTask(task.id)}
                deleteTask={() => removeTask(task.id)}
            />
        );
    }));

    return (
        <div className="bg-gray-300 h-screen flex justify-center">
            <div className="flex flex-col p-4 items-center h-max w-full max-w-md border border-t-0 border-gray-400 rounded-lg rounded-t-none bg-white drop-shadow-md">
                <h2 className="text-lg font-medium">Todo</h2>
                <TodoInput
                    onChange={addNewTask}
                    className="mt-4"
                />
                <h2 className="text-lg mt-4 text-gray-600">Todo tasks</h2>
                <div className="flex w-full items-center">
                    <input
                        id="allCheck"
                        type="checkbox"
                        checked={allChecked}
                        className="mr-3"
                        onChange={toggleAllChecked}
                    />
                    <label
                        htmlFor="allCheck"
                        className="text-xs text-gray-600"
                    >
                        {allCheckText}
                    </label>
                </div>
                <div className="grid grid-cols-1 gap-y-2 p-4 w-full mt-4 rounded border border-gray-300">
                    {tasksCommponents}
                </div>
            </div>
        </div>
    );
};

export default ToDo;