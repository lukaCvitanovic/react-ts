import ChoiceRPS from "@/components/RPS/Choice";
import ButtonRPS from "@/components/RPS/ButtonRPS";
import { UserChoice } from "@/components/RPS/Choices";
import { useContext, useState } from 'react';
import { BaseProps } from '@/helpers/types';
import { ResultTransitionContext } from '@/components/RPS/ResultTransitionProvider';
import '@/styles/animations.css';
import { Transition } from "react-transition-group";

type ResultsProps = {
    win: boolean,
    userChoice: UserChoice
    computerChoice: UserChoice,
};

type AnimationClasses = {
    outer: string,
    middle: string,
    inner: string,
};

const Results = ({ win, userChoice, computerChoice }: ResultsProps & BaseProps) => {
    const [{ outer, middle, inner }, setAnimationClasses] = useState<AnimationClasses>({
        outer: 'animate-[growOver190_500ms_ease-in-out_1] scale-[190%]',
        middle: 'animate-[growOver80_500ms_ease-in-out_1] scale-[80%] animate-delay-100',
        inner: 'animate-[growOver80_500ms_ease-in-out_1] scale-[80%] animate-delay-200',
    });
    const [leaveTransition, setLeaveTransition] = useState(true);

    const { dispatch } = useContext(ResultTransitionContext);

    const result = (win ? 'You win' : 'You Lose');

    const onPlayAgain = () => {
        setAnimationClasses({
            outer: 'animate-[growOver190ReverseDelay200_700ms_ease-in-out_1] scale-0',
            middle: 'animate-[growOver80ReverseDelay100_600ms_ease-in-out_1] scale-0',
            inner: 'animate-[growOver80Reverse_500ms_ease-in-out_1] scale-0',
        });
        setTimeout(() => setLeaveTransition(false), 700);
    };
    const onTransitionEnd = () => dispatch({ type: 'resetContext' });

    const getUserChoiceCoordinates = (currentRect: DOMRect) => dispatch({ type: 'setResultRect', payload: currentRect });
    const getComputerChoiceCorrdinates = (computerRect: DOMRect) => dispatch({ type: 'setComputerResultRect', payload: computerRect });

    const transitionClasses = {
        playAgain: {
            defaultClass: 'transition transform duration-500',
            transitionDuration: 500,
            transitionClass: {
                unmounted: '',
                entering: 'translate-y-0',
                entered: 'translate-y-0',
                exiting: 'translate-y-80',
                exited: 'translate-y-80',
            },
        },
        userChoice: {
            defaultClass: 'transition transform duration-500',
            transitionDuration: 500,
            transitionClass: {
                unmounted: '',
                entering: 'translate-x-0',
                entered: 'translate-x-0',
                exiting: 'translate-x-[-25rem]',
                exited: 'translate-x-[-25rem]',
            },
        },
        computerChoice: {
            defaultClass: 'transition transform duration-500',
            transitionDuration: 500,
            transitionClass: {
                unmounted: '',
                entering: 'translate-x-0',
                entered: 'translate-x-0',
                exiting: 'translate-x-[25rem]',
                exited: 'translate-x-[25rem]',
            },
        },
    };


    const playAgain = () => {
        return (
            <Transition
                in={leaveTransition}
                timeout={transitionClasses.playAgain.transitionDuration}
            >
                {(state) => {
                    const playAgainClass = `flex flex-col w-max justify-center items-center mt-14 md:mt-28 ${transitionClasses.playAgain.defaultClass} ${transitionClasses.playAgain.transitionClass[state]}`;

                    return (
                        <div className={playAgainClass}>
                            <span className="text-white text-[3.25rem] uppercase font-bold">{result}</span>
                            <ButtonRPS
                                variant="fill"
                                className="w-full h-12 mt-2"
                                onClick={() => onPlayAgain()}
                            >
                                <span className="font-semibold tracking-widest">Play again</span>
                            </ButtonRPS>
                        </div>
                    );
                }}
            </Transition>
        );
    };
    const highlightWinningChoice = () => {
        const winnginClassOutter = `absolute inset-0 w-full rounded-full bg-[rgba(255,255,255,0.02)] ${outer}`;
        const winningClassMedium = `absolute inset-0 w-full rounded-full bg-[rgba(255,255,255,0.02)] ${middle}`;
        const winningClassInner = `absolute inset-0 w-full rounded-full bg-[rgba(255,255,255,0.02)] ${inner}`;

        return (
            <div className={winnginClassOutter}>
                <div className={winningClassMedium}>
                    <div className={winningClassInner}>
                    </div>
                </div>
            </div>
        );
    };
    const highlightUser = win && highlightWinningChoice();
    const highlightComputer = !win && highlightWinningChoice();

    return (
        <div className="flex flex-col items-center w-full max-w-[50rem] lg:max-w-5xl">
            <div className="flex justify-between w-full">
                <Transition
                    in={leaveTransition}
                    timeout={transitionClasses.userChoice.transitionDuration}
                    onExited={onTransitionEnd}
                >
                    {(state) => {
                        const userChoiceClass = `flex flex-col md:flex-col-reverse items-center justify-center ${transitionClasses.userChoice.defaultClass} ${transitionClasses.userChoice.transitionClass[state]}`;

                        return (
                            <div className={userChoiceClass}>
                                <div className="relative md:mt-4">
                                    {highlightUser}
                                    <ChoiceRPS
                                        getChoiceCoordinates={getUserChoiceCoordinates}
                                        variant={userChoice}
                                        className="scale-[80%]"
                                        scale
                                        disabled
                                    />
                                </div>
                                <span className="mt-6 z-10 text-white text-sm md:text-lg font-semibold tracking-widest uppercase">You picked</span>
                            </div>
                        );
                    }}
                </Transition>
                <div className="hidden sm:flex z-10">
                    {playAgain()}
                </div>
                <Transition
                    in={leaveTransition}
                    timeout={transitionClasses.computerChoice.transitionDuration}
                >
                    {(state) => {
                        const computerChoiceClass = `flex flex-col md:flex-col-reverse items-center justify-center ${transitionClasses.computerChoice.defaultClass} ${transitionClasses.computerChoice.transitionClass[state]}`;

                        return (
                            <div className={computerChoiceClass}>
                                <div className="relative md:mt-4">
                                    {highlightComputer}
                                    <ChoiceRPS
                                        getChoiceCoordinates={getComputerChoiceCorrdinates}
                                        variant={computerChoice}
                                        className="scale-[80%]"
                                        scale
                                        disabled
                                    />
                                </div>
                                <span className="mt-6 z-10 text-white text-sm md:text-lg font-semibold tracking-widest uppercase">The house picked</span>
                            </div>
                        );
                    }}
                </Transition>
            </div>
            <div className="sm:hidden">
                {playAgain()}
            </div>
        </div>
    );
};

export default Results;