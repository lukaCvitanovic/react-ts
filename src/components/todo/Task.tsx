import { MouseEventHandler } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';

export type TaskType = {
    id: number,
    text: string,
    done: boolean,
};

type Props = {
    toggleTask: MouseEventHandler,
    deleteTask: MouseEventHandler,
};

const Task = ({ text, done, toggleTask, deleteTask }: Props & TaskType) => {
    const checkedStyle = (done ? '' : 'opacity-50');
    const baseClass = 'flex items-center justify-between p-4 rounded border border-gray-400 bg-stone-200';
    const taskClass = `${baseClass} ${checkedStyle}`;

    return (
        <button
            onClick={toggleTask}
        >
            <div className={taskClass}>
                <div>
                    <input
                        type="checkbox"
                        checked={done}
                        readOnly
                        className="mr-3"
                    />
                    <span className="text-gray-600">{text}</span>
                </div>
                <button
                    onClick={deleteTask}
                >
                    <FontAwesomeIcon
                        icon={faTimesCircle}
                        className="text-orange-500 fa-lg"
                    />
                </button>
            </div>
        </button>
    );
};

export default Task;