import { ChangeEvent, KeyboardEvent, useState } from 'react';
import { BaseProps } from '@/helpers/types';

type Props = {
    onChange: Function,
};

const TodoInput = ({ onChange, className }: Props & BaseProps) => {
    const [newTaskText, setTaskText] = useState('');
    const handleNewTaskTextChange = (e: ChangeEvent<HTMLInputElement>) => setTaskText(e.target.value);

    const handleEnterPress = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key !== 'Enter') return;
        onChange(newTaskText);
        setTaskText('');
    };

    const calculatedClass = `flex flex-col ${className}`;

    return (
        <div className={calculatedClass}>
            <label
                htmlFor="todoInput"
                className="text-sm text-gray-600"
            >
                Enter todo task:
            </label>
            <input
                id="todoInput"
                value={newTaskText}
                onChange={handleNewTaskTextChange}
                onKeyDown={handleEnterPress}
                className="h-8 mt-2 border border-gray-300 rounded-sm"
            />
            <span className="text-xs text-gray-600 mt-2">Add task with Enter</span>
        </div>
    );
};

export default TodoInput;