import { BaseProps } from '@/helpers/types';
import { MouseEventHandler } from 'react';

enum ButtonVariant {
    Outline = 'w-max py-2 px-10 border border-header-white rounded-lg text-white uppercase',
    Fill = 'border border-white rounded-lg bg-white text-dark uppercase'
};

type ButtonRPSType = {
    variant?: ButtonVariant,
    onClick?: MouseEventHandler,
};

const ButtonRPS = ({ variant, children, className, onClick }: ButtonRPSType & BaseProps) => {
    const variantClass = variant || ButtonVariant.Outline;
    const buttonClass = `${variantClass} ${className}`;

    return (
        <button
            className={buttonClass}
            onClick={onClick}
        >
            { children }
        </button>
    );
};

export default ButtonRPS;