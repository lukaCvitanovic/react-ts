import paperIcon from '@/assets/images/icon-paper.svg';
import scissorsIcon from '@/assets/images/icon-scissors.svg';
import rockIcon from '@/assets/images/icon-rock.svg';
import { MouseEventHandler } from 'react';
import { BaseProps } from '@/helpers/types';

const CHOICE = {
    paper: { src: paperIcon, gradientColorDark: 'from-[#4865f4]', gradientColorBright: 'to-[#5671f5]', darkerBackground: 'bg-[#4865f4]' },
    scissors: { src: scissorsIcon, gradientColorDark: 'from-[#ec9e0e]', gradientColorBright: 'to-[#eca922]', darkerBackground: 'bg-[#ec9e0e]' },
    rock: { src: rockIcon, gradientColorDark: 'from-[#dc2e4e]', gradientColorBright: 'to-[#dd405d]', darkerBackground: 'bg-[#dc2e4e]' },
};

type ChoiceProps = {
    variant: 'paper' | 'scissors' | 'rock',
    onClick?: MouseEventHandler,
};

const ChoiceRPS = ({ variant, onClick, className }: ChoiceProps & BaseProps) => {
    const { src, gradientColorBright, gradientColorDark, darkerBackground } = CHOICE[variant];

    const colorOutlineClass = `flex items-center justify-center z-10 h-36 w-36 bg-gradient-to-t ${gradientColorDark} ${gradientColorBright} rounded-full`;
    const shadowOutlineClass = `absolute top-1.5 flex h-36 w-36 rounded-full ${darkerBackground} brightness-75`;

    return (
        <button
            onClick={onClick}
            className={className}
        >
            <div className="relative flex items-center justify-center">
                <div className={colorOutlineClass}>
                    <div className="relative flex items-center justify-center h-28 w-28 rounded-full bg-gray-300 overflow-hidden">
                        <div className="absolute top-1.5 h-28 w-28 rounded-full bg-white">
                        </div>
                        <img
                            src={src}
                            alt="paper"
                            className="z-10"
                        />
                    </div>
                </div>
                <div className={shadowOutlineClass}>
                </div>
            </div>
        </button>
    );
};

export default ChoiceRPS;