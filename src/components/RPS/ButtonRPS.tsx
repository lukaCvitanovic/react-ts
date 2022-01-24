import { BaseProps } from '@/helpers/types';
import { MouseEventHandler } from 'react';

enum ButtonVariant {
    outline = 'w-max py-2 px-10 border border-header-white rounded-lg text-white uppercase',
    fill = 'border border-white rounded-lg bg-white text-dark hover:text-red-500 uppercase',
    gray = 'text-gray-300',
};

type ButtonRPSType = {
    variant?: string,
    onClick?: MouseEventHandler,
};

const ButtonRPS = ({ variant, children, className, onClick }: ButtonRPSType & BaseProps) => {
    const variantClass = (variant ? ButtonVariant[variant as keyof typeof ButtonVariant] : ButtonVariant.outline)
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