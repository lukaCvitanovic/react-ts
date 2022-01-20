import { useState } from 'react';
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
    const [hover, setHover] = useState(false);

    const checkedStyle = (done ? '' : 'opacity-50');
    const baseClass = 'flex items-center justify-between p-4 rounded border border-gray-400 bg-stone-200';
    const taskClass = `${baseClass} ${checkedStyle}`;

    return (
        <div className='relative'>
            <button
                onClick={toggleTask}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
                className="w-full"
            >
                <div className={taskClass}>
                    <div>
                        <input
                            type="checkbox"
                            checked={done}
                            className="mr-3"
                        />
                        <span className="text-gray-600">{text}</span>
                    </div>
                </div>
            </button>
            {hover &&
                <button
                    onClick={deleteTask}
                    onMouseEnter={() => setHover(true)}
                    onMouseLeave={() => setHover(false)}
                    className="absolute -right-2 -top-2 opacity-50 hover:opacity-100"
                >
                    <FontAwesomeIcon
                        icon={faTimesCircle}
                        className="text-orange-500 fa-lg"
                    />
                </button>
            }
        </div>
    );
};

export default Task;