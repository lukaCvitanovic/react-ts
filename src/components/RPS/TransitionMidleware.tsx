import Choices from "@/components/RPS/Choices";
import Results from "@/components/RPS/Results";
import { ResultTransitionContext } from '@/components/RPS/ResultTransitionProvider';
import { NonCalcGameStats } from "@/helpers/types";
import { useContext, useEffect, useState } from "react";
import isEqual from 'lodash/isEqual';
import '@/styles/animations.css';

type TransitionMidlewareProps = {
    gameStats: NonCalcGameStats,
    onChangeInGameStats: Function,
};

const TransitionMidleware = ({ gameStats, onChangeInGameStats }: TransitionMidlewareProps) => {
    const [localShowResults, setLocalShowResults] = useState(false);
    const [localShowChoices, setLocalShowChoices] = useState(true);
    const { state: { showChoices, showResults, choiceRect, choiceTransitionFlag }, dispatch } = useContext(ResultTransitionContext);

    useEffect(() => {
        if (!isEqual(choiceRect.toJSON(), new DOMRect().toJSON())) dispatch({ type: 'setShowResults', payload: true });
    }, [gameStats.userChoice, gameStats.computerChoice, choiceRect]);

    useEffect(() => setLocalShowResults(showResults), [showResults]);
    useEffect(() => setLocalShowChoices(showChoices), [showChoices]);

    const resultOpacity = (choiceTransitionFlag ? 'opacity-0' : 'opacity-100');
    const resultClass = `absolute inset-0 flex items-center justify-center ${resultOpacity}`;

    return (
        <div className="relative w-full h-full">
            {localShowResults &&
                <div className={resultClass}>
                    <Results
                        win={gameStats.win}
                        userChoice={gameStats.userChoice}
                        computerChoice={gameStats.computerChoice}
                    />
                </div>
            }
            {localShowChoices &&
                <div className="absolute inset-0 w-full flex items-center justify-center animate-[growFadeIn_500ms_ease-in-out_1]">
                    <Choices
                        className="md:scale-125 md:mt-10"
                        onSetGameStats={onChangeInGameStats}
                    />
                </div>
            }
        </div>
    );
};

export default TransitionMidleware;