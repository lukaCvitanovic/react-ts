import Score from "@/components/RPS/Score";
import ButtonRPS from "@/components/RPS/ButtonRPS";
import ModalPortal from "@/components/common/ModalPortal";
import Modal from '@/components/common/Modal';
import Rules from "@/components/RPS/Rules";
import { UserChoice } from "@/components/RPS/Choices";
import { NonCalcGameStats } from "@/helpers/types";
import TransitionMidleware from "@/components/RPS/TransitionMidleware";
import ResultTransitionProvider from "@/components/RPS/ResultTransitionProvider";
import { useState } from "react";

type GameStatsType = {
    score: number,
} & NonCalcGameStats;

const RockPaperScissors = () => {
    const [open, setOpen] = useState(false);
    const [gameStats, setGameStats] = useState<GameStatsType>({ win: false, userChoice: UserChoice.Rock, computerChoice: UserChoice.Scissors, score: 12 });

    const [modalBgTransition, setModalBgTransition] = useState(false);

    const openRulesModal = () => setOpen(true);
    const closeRulesModal = () => setOpen(false);

    const handleChangeInGameStats = ({ win, userChoice, computerChoice }: NonCalcGameStats) => setGameStats(({ score }) => {
        const newScore = (win ? score + 1 : score - 1);
        return { win, userChoice, computerChoice, score: newScore };
    });

    const setModalTransition = (flag: boolean) => setModalBgTransition(flag);

    return (
        <div className="flex flex-col justify-between items-center p-8 h-full bg-gradient-radial overflow-hidden">
            <Score score={gameStats.score} />
            <ResultTransitionProvider>
                <TransitionMidleware
                    gameStats={gameStats}
                    onChangeInGameStats={handleChangeInGameStats}
                />
            </ResultTransitionProvider>
            <div className="w-full flex justify-center md:justify-end">
                <ButtonRPS
                    className="mb-8"
                    onClick={openRulesModal}
                >
                    <span>Rules</span>
                </ButtonRPS>
            </div>
            {open &&
                <ModalPortal>
                    <Modal
                        transitionFlag={modalBgTransition}
                    >
                        <Rules
                            onClose={closeRulesModal}
                            omitModalTransition={setModalTransition}
                        />
                    </Modal>
                </ModalPortal>
            }
        </div>
    );
};

export default RockPaperScissors;