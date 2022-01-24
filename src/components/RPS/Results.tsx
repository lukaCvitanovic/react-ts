import ChoiceRPS from "@/components/RPS/Choice";
import ButtonRPS from "@/components/RPS/ButtonRPS";
import { UserChoice } from "@/components/RPS/Choices";

type ResultsProps = {
    win: boolean,
    userChoice: UserChoice
    computerChoice: UserChoice,
    onPlayAgain: Function,
};

const Results = ({ win, userChoice, computerChoice, onPlayAgain }: ResultsProps) => {
    const result = (win ? 'You win' : 'You Lose');

    const playAgain = () => {
        return (
            <div className="flex flex-col w-max justify-center items-center mt-14 md:mt-28">
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
    };
    const highlightWinningChoice = () => {
        return (
            <div className="absolute inset-0 w-full scale-[190%] rounded-full bg-[rgba(255,255,255,0.02)]">
                <div className="absolute inset-0 w-full scale-[80%] rounded-full bg-[rgba(255,255,255,0.02)]">
                    <div className="absolute inset-0 w-full scale-[80%] rounded-full bg-[rgba(255,255,255,0.02)]">
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
                <div className="flex flex-col md:flex-col-reverse items-center justify-center">
                    <div className="relative md:mt-4">
                        {highlightUser}
                        <ChoiceRPS
                            variant={userChoice}
                            className="scale-[80%]"
                            scale
                        />
                    </div>
                    <span className="mt-6 z-10 text-white text-sm md:text-lg font-semibold tracking-widest uppercase">You picked</span>
                </div>
                <div className="hidden sm:flex">
                    {playAgain()}
                </div>
                <div className="flex flex-col md:flex-col-reverse items-center justify-center">
                    <div className="relative md:mt-4">
                        {highlightComputer}
                        <ChoiceRPS
                            variant={computerChoice}
                            className="scale-[80%]"
                            scale
                        />
                    </div>
                    <span className="mt-6 z-10 text-white text-sm md:text-lg font-semibold tracking-widest uppercase">The house picked</span>
                </div>
            </div>
            <div className="sm:hidden">
                {playAgain()}
            </div>
        </div>
    );
};

export default Results;