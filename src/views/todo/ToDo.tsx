import { useState } from "react";
import TodoInput from "@/components/todo/TodoInput";
import Task, { TaskType } from "@/components/todo/Task";
import omit from 'lodash/omit';

const ToDo = () => {
    const [id, setId] = useState(0);
    // napravi da koristis useReducer umisto useState
    const [tasks, setTasks] = useState<TaskType[]>([]);
    const [allChecked, setAllChecked] = useState(false);

    const getId = (): number => {
        setId((oldId) => oldId + 1);
        return id - 1;
    }

    const createNewTask = (text: string) => setTasks((currentTasks: TaskType[]) => [...currentTasks, { id: getId(), text, done: true }]);

    const addNewTask = (text: string) => createNewTask(text);
    const toggleTask = (id: number) => setTasks((currentTasks: TaskType[]) => currentTasks.map((task: TaskType) => (task.id === id ? { done: !task.done, ...omit(task, ['done']) } : task)));
    const removeTask = (id: number) => setTasks((currentTasks: TaskType[]) => currentTasks.filter(({ id: taskId }) => taskId !== id));

    const toggleAllChecked = () => setAllChecked((currentAllChecked: boolean) => {
        const newAllChecked = !currentAllChecked;
        setDoneOnAllTasks(newAllChecked);
        return newAllChecked;
    });
    const setDoneOnAllTasks = (done: boolean) => setTasks((currentTasks) => currentTasks.map(({ done: taskDone, ...task }) => ({ done, ...task })));
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