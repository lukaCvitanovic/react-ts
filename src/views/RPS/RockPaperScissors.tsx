import Score from "@/components/RPS/Score";
import ButtonRPS from "@/components/RPS/ButtonRPS";
import ModalPortal from "@/components/common/ModalPortal";
import Modal from '@/components/common/Modal';
import Rules from "@/components/RPS/Rules";
import Choices, { UserChoice } from "@/components/RPS/Choices";
import Results from "@/components/RPS/Results";
import { useState } from "react";
import random from 'lodash/random';

type GameStatsType = {
    win: boolean,
    userChoice: UserChoice,
    computerChoice: UserChoice,
    score: number,
};

const RockPaperScissors = () => {
    const [open, setOpen] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const [gameStats, setGameStats] = useState<GameStatsType>({ win: false, userChoice: UserChoice.Rock, computerChoice: UserChoice.Scissors, score: 0 });

    const openRulesModal = () => setOpen(true);
    const closeRulesModal = () => setOpen(false);

    const didUserWin = (choice: UserChoice) => {
        const computerChoice = getComputersChoice(choice);
        const win = userWinningCondition[choice] === computerChoice;
        setGameStats(({ score: currentScore }) => {
            const score = (win ? currentScore + 1 : currentScore - 1);
            return { win, userChoice: choice, computerChoice, score };
        });
        setShowResults(true);
    };
    const getComputersChoice = (userChoice: UserChoice) => {
        const arrayOfChoices = Object.values(UserChoice).filter((choice) => choice !== userChoice);
        return arrayOfChoices[random(0, arrayOfChoices.length - 1)];
    }

    const handlePlayAgain = () => setShowResults(false);

    const userWinningCondition = {
        [UserChoice.Paper]: UserChoice.Rock,
        [UserChoice.Scissors]: UserChoice.Paper,
        [UserChoice.Rock]: UserChoice.Scissors,
    };

    return (
        <div className="flex flex-col justify-between items-center p-8 h-full bg-gradient-radial">
            <Score score={gameStats.score} />
            {showResults
                ?   <Results
                        win={gameStats.win}
                        userChoice={gameStats.userChoice}
                        computerChoice={gameStats.computerChoice}
                        onPlayAgain={handlePlayAgain}
                    />
                :   <Choices
                        onUserChoice={didUserWin}
                    />
            }
            <ButtonRPS
                className="mb-8"
                onClick={openRulesModal}
            >
                <span>Rules</span>
            </ButtonRPS>
            {open &&
                <ModalPortal>
                    <Modal>
                        <Rules
                            onClose={closeRulesModal}
                        />
                    </Modal>
                </ModalPortal>
            }
        </div>
    );
};

export default RockPaperScissors;