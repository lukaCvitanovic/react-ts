import ChoiceRPS from '@/components/RPS/Choice';
import { Transition } from "react-transition-group";
import bgTriangle from '@/assets/images/bg-triangle.svg'
import { ResultTransitionContext } from '@/components/RPS/ResultTransitionProvider';
import { BaseProps } from '@/helpers/types';
import { MouseEvent, useContext, useEffect, useState } from 'react';
import random from 'lodash/random';
import isEqual from 'lodash/isEqual';
import isEmpty from 'lodash/isEmpty';
import cloneDeep from 'lodash/cloneDeep';

export enum UserChoice {
    Paper = 'paper',
    Scissors = 'scissors',
    Rock = 'rock',
};

type ChoicesProps = {
    onSetGameStats: Function,
};
type Offsets = {
    x: number,
    y: number,
};
type ChoicesRects = {
    [UserChoice.Paper]: DOMRect,
    [UserChoice.Scissors]: DOMRect,
    [UserChoice.Rock]: DOMRect,
};

const userWinningCondition = {
    [UserChoice.Paper]: UserChoice.Rock,
    [UserChoice.Scissors]: UserChoice.Paper,
    [UserChoice.Rock]: UserChoice.Scissors,
};

const initialTransition = {
    unmounted: {},
    entering: {},
    entered: {},
    exiting: {},
    exited: {},
};
const opacityTransition = {
    unmounted: {},
    entering: { opacity: 0 },
    entered: { opacity: 0 },
    exiting: { opacity: 1 },
    exited: { opactiy: 1 },
};
const choicesTransitions = {
    [UserChoice.Paper]: cloneDeep(initialTransition),
    [UserChoice.Scissors]: cloneDeep(initialTransition),
    [UserChoice.Rock]: cloneDeep(initialTransition),
};

const Choices = ({ onSetGameStats, className }: ChoicesProps & BaseProps) => {
    const [userAnimationOffsets, setUserAnimationOffsets] = useState<Offsets>({ x: 0, y: 0 });
    const [computerAnimationOffsets, setComputerAnimationOffsets] = useState<Offsets>({ x: 0, y: 0 });
    const [userScaling, setUserScaling] = useState<number>(1);
    const [computerScaling, setComputerScaling] = useState<number>(1);
    const [storedUserChoice, setUserChoice] = useState<UserChoice>(UserChoice.Scissors);
    const [storedComputerChoice, setComputerChoice] = useState<UserChoice>(UserChoice.Rock);
    const [localChoiceTransitionFlag, setLocalChoiceTransitionFlag] = useState(false);
    const [choicesRects, setChoicesRects] = useState<ChoicesRects>({} as ChoicesRects);

    const choicesClass = (className?.search(/(relative|absolute|fixed|sticky)/) !== -1 ? `relative w-full max-w-[305px] ${className}` : 'relative w-full max-w-[305px]');

    const { state: { choiceRect, resultRect, computerResultRect , choiceTransitionFlag }, dispatch } = useContext(ResultTransitionContext);

    const handleUserChoice = (e: MouseEvent, userChoice: UserChoice) => {
        setUserChoice(userChoice);
        if (e.currentTarget && e.currentTarget instanceof Element) dispatch({ type: 'setChoiceRect', payload: e.currentTarget.getBoundingClientRect() });
        else throw new Error('Mouse event is not insance of Element');
        const computerChoice = getComputersChoice(userChoice);
        setComputerChoice(computerChoice);
        const win = userWinningCondition[userChoice] === computerChoice;
        onSetGameStats({ win, userChoice, computerChoice });
    };

    useEffect(() => {
        const nonEmptyRects = !isEqual(choiceRect, new DOMRect()) && !isEqual(resultRect, new DOMRect()) && !isEmpty(choicesRects);
        if (nonEmptyRects) {
            setUserAnimationOffsets(calculateTransitionAnimation(choiceRect, resultRect));
            setComputerAnimationOffsets(calculateTransitionAnimation(choicesRects[storedComputerChoice], computerResultRect));
            setUserScaling(calculateScalingDiff(choiceRect, resultRect));
            setComputerScaling(calculateScalingDiff(choicesRects[storedComputerChoice], computerResultRect));
        }
    }, [choiceRect, resultRect]);

    useEffect(() => {
        const nonEmptyOffsets = !isEqual(userAnimationOffsets, { x: 0, y: 0 }) &&  !isEqual(computerAnimationOffsets, { x: 0, y: 0 });
        if (nonEmptyOffsets) {
            resetTransitionChoices();
            const unchosen = calculateUnchosen(storedUserChoice, storedComputerChoice);
            setTransitionToUnchosen(unchosen);
            setTransitionToChoice(storedUserChoice, userAnimationOffsets, userScaling);
            setTransitionToChoice(storedComputerChoice, computerAnimationOffsets, computerScaling);
            dispatch({ type: 'setChoiceTransitionFlag', payload: true });        
        }
    }, [userAnimationOffsets, computerAnimationOffsets]);

    useEffect(() => setLocalChoiceTransitionFlag(choiceTransitionFlag), [choiceTransitionFlag]);

    const getComputersChoice = (userChoice: UserChoice) => {
        const arrayOfChoices = Object.values(UserChoice).filter((choice) => choice !== userChoice);
        return arrayOfChoices[random(0, arrayOfChoices.length - 1)];
    }

    const calculateTransitionAnimation = (selectedRect: DOMRect, resultRect: DOMRect) => ({ y: resultRect.y - selectedRect.y, x: resultRect.x - selectedRect.x });
    const calculateScalingDiff = ({ height: choiceRectHeight }: DOMRect, { height: resultRectHeight }: DOMRect) => (resultRectHeight / choiceRectHeight) * 0.9;
    const setTransitionToChoice = (choice: UserChoice, offsets: Offsets, scaling: number) => {
        const offsetCorrection = () => {
            const windowWidth = document.body.clientWidth;
            if (windowWidth < 768) return -7;
            else if (windowWidth < 1024) return 22;
            return 79;
        };
        choicesTransitions[choice] = {
            unmounted: {},
            entering: { transform: `translate(${offsets.x + offsetCorrection()}px, ${offsets.y + offsetCorrection()}px) scale(${scaling})`, opacity: 1 },
            entered: { transform: `translate(${offsets.x + offsetCorrection()}px, ${offsets.y + offsetCorrection()}px) scale(${scaling})`, opacity: 1 },
            exiting: { transform: `translate(0,0) scale(0.9)`, opacity: 1 },
            exited: { transform: `translate(0,0) scale(0.9)`, opacity: 1 },
        };
    };
    const calculateUnchosen = (userChoice: UserChoice, computerChoice: UserChoice) => Object.values(UserChoice).filter((choice) => userChoice !== choice && computerChoice !== choice )[0];
    const setTransitionToUnchosen = (choice: UserChoice) => {
        choicesTransitions[choice] = opacityTransition;
    };
    const resetTransitionChoices = () => {
        Object.values(UserChoice).forEach((choice: UserChoice) => {
            choicesTransitions[choice] = cloneDeep(initialTransition);  
        });
    };
    const onAnimationEnd = () => {
        dispatch({ type: 'setChoiceTransitionFlag', payload: false });
        dispatch({ type: 'setShowChoices', payload: false });
    }

    const durationMS = 500;
    const defaultStyle = { transition: `transform ${durationMS}ms ease-in-out` };
    const defaultOpacityStyle = { transition: `opacity ${durationMS}ms ease-in-out` };
    const calculateDefaultStyle = (choice: UserChoice) => (choice === calculateUnchosen(storedUserChoice, storedComputerChoice) ? defaultOpacityStyle : defaultStyle);

    return (
        <div className={choicesClass}>
            <Transition
                in={localChoiceTransitionFlag}
                timeout={durationMS}
            >
                {(state) => {
                    return (
                        <img
                            src={bgTriangle}
                            alt="trinagle"
                            style={{
                                position: 'absolute',
                                top: 4,
                                bottom: 0,
                                left: 0,
                                right: 0,
                                transform: 'scale(60%)',
                                ...defaultOpacityStyle,
                                ...opacityTransition[state],
                            }}
                        />
                    );
                }}
            </Transition>
            <div className="flex flex-col z-10">
                <div className="flex justify-between">
                    <Transition
                        in={localChoiceTransitionFlag}
                        timeout={durationMS}
                        onEntered={onAnimationEnd}
                    >
                        {(state) => {
                            return (
                                <ChoiceRPS
                                    getChoiceCoordinates={(rect: DOMRect) => setChoicesRects((currentlyStoredRects) => ({ ...currentlyStoredRects, [UserChoice.Paper]: rect }))}
                                    variant="paper"
                                    className="scale-90"
                                    onClick={(e) => handleUserChoice(e, UserChoice.Paper)}
                                    style={{
                                    ...calculateDefaultStyle(UserChoice.Paper),
                                    ...choicesTransitions[UserChoice.Paper][state],
                                    }}
                                />
                            );
                        }}
                    </Transition>
                    <Transition
                        in={localChoiceTransitionFlag}
                        timeout={durationMS}
                    >
                        {(state) => {
                            return (
                                <ChoiceRPS
                                getChoiceCoordinates={(rect: DOMRect) => setChoicesRects((currentlyStoredRects) => ({ ...currentlyStoredRects, [UserChoice.Scissors]: rect }))}
                                    variant="scissors"
                                    className="scale-90"
                                    onClick={(e) => handleUserChoice(e, UserChoice.Scissors)}
                                    style={{
                                        ...calculateDefaultStyle(UserChoice.Scissors),
                                        ...choicesTransitions[UserChoice.Scissors][state],
                                    }}
                                />
                            );
                        }}
                    </Transition>
                </div>
                <div className="flex justify-center mt-1">
                    <Transition
                        in={localChoiceTransitionFlag}
                        timeout={durationMS}
                    >
                        {(state) => {
                            return (
                                <ChoiceRPS
                                    getChoiceCoordinates={(rect: DOMRect) => setChoicesRects((currentlyStoredRects) => ({ ...currentlyStoredRects, [UserChoice.Rock]: rect }))}
                                    variant="rock"
                                    className="scale-90"
                                    onClick={(e) => handleUserChoice(e, UserChoice.Rock)}
                                    style={{
                                        ...calculateDefaultStyle(UserChoice.Rock),
                                        ...choicesTransitions[UserChoice.Rock][state],
                                    }}
                                />
                            );
                        }}
                    </Transition>
                </div>
            </div>
        </div>
    );
};

export default Choices;