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
    scale?: boolean,
};

const ChoiceRPS = ({ variant, onClick, className, scale }: ChoiceProps & BaseProps) => {
    const { src, gradientColorBright, gradientColorDark, darkerBackground } = CHOICE[variant];

    const performScaling = scale || false;

    const colorOutlineScaling = performScaling ? 'md:w-[13.5rem] md:h-[13.5rem] lg:h-[22.5rem] lg:w-[22.5rem]' : '';
    const colorOutlineClass = `flex items-center justify-center z-10 h-36 w-36 ${colorOutlineScaling} bg-gradient-to-t ${gradientColorDark} ${gradientColorBright} rounded-full`;

    const shadowOutlineScaling = performScaling ? 'md:top-[9px] lg:top-[1.125rem] md:w-[13.5rem] md:h-[13.5rem] lg:h-[22.5rem] lg:w-[22.5rem]' : '';
    const shadowOutlineClass = `absolute top-1.5 flex h-36 w-36 ${shadowOutlineScaling} rounded-full ${darkerBackground} brightness-75`;

    const backgroundShadowScaling = performScaling ? 'md:h-[10.5rem] md:w-[10.5rem] lg:h-[17.5rem] lg:w-[17.5rem]' : '';
    const backgroundShadowClass = `relative flex items-center justify-center h-28 w-28 ${backgroundShadowScaling} rounded-full bg-gray-300 overflow-hidden`;

    const backgroundScaling = performScaling ? 'md:top-[9px] lg:top-[1.125rem] md:h-[10.5rem] md:w-[10.5rem] lg:h-[17.5rem] lg:w-[17.5rem]' : '';
    const backgroundClass = `absolute top-1.5 h-28 w-28 ${backgroundScaling} rounded-full bg-white`;

    const imageScaling = performScaling ? 'md:w-[4rem] lg:w-[6.25rem]' : '';
    const imageClass = `z-10 ${imageScaling}`;

    return (
        <button
            onClick={onClick}
            className={className}
        >
            <div className="relative flex items-center justify-center">
                <div className={colorOutlineClass}>
                    <div className={backgroundShadowClass}>
                        <div className={backgroundClass}>
                        </div>
                        <img
                            src={src}
                            alt="paper"
                            className={imageClass}
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