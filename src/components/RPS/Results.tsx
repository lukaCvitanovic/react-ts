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

    return (
        <div className="flex flex-col items-center w-full">
            <div className="flex justify-between w-full">
                <div className="flex flex-col items-center">
                    <div className="relative">
                        <div className="absolute inset-0 w-full scale-[190%] rounded-full bg-[rgba(255,255,255,0.02)]">
                            <div className="absolute inset-0 w-full scale-[80%] rounded-full bg-[rgba(255,255,255,0.02)]">
                                <div className="absolute inset-0 w-full scale-[80%] rounded-full bg-[rgba(255,255,255,0.02)]">
                                </div>
                            </div>
                        </div>
                        <ChoiceRPS
                            variant={userChoice}
                            className="scale-[80%]"
                        />
                    </div>
                    <span className="mt-6 z-10 text-white text-sm font-semibold tracking-widest uppercase">You picked</span>
                </div>
                <div className="flex flex-col items-center">
                    <ChoiceRPS
                        variant={computerChoice}
                        className="scale-[80%]"
                    />
                    <span className="mt-6 z-10 text-white text-sm font-semibold tracking-widest uppercase">The house picked</span>
                </div>
            </div>
            <div className="flex flex-col w-max justify-center items-center mt-14">
                <span className="text-white text-[3.25rem] uppercase font-bold">{result}</span>
                <ButtonRPS
                    variant="fill"
                    className="w-full h-12 mt-2"
                    onClick={() => onPlayAgain()}
                >
                    <span className="font-semibold tracking-widest">Play again</span>
                </ButtonRPS>
            </div>
        </div>
    );
};

export default Results;