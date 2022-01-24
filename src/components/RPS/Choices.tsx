import ChoiceRPS from '@/components/RPS/Choice';
import bgTriangle from '@/assets/images/bg-triangle.svg'

export enum UserChoice {
    Paper = 'paper',
    Scissors = 'scissors',
    Rock = 'rock',
};

const Choices = ({ onUserChoice }: { onUserChoice: Function }) => {
    return (
        <div className="relative w-full max-w-[305px]">
            <img
                src={bgTriangle}
                alt="trinagle"
                className="absolute inset-0 top-4 scale-[60%]"
            />
            <div className="flex flex-col z-10">
                <div className="flex justify-between">
                    <ChoiceRPS
                        variant="paper"
                        className="scale-90"
                        onClick={() => onUserChoice(UserChoice.Paper)}
                    />
                    <ChoiceRPS
                        variant="scissors"
                        className="scale-90"
                        onClick={() => onUserChoice(UserChoice.Scissors)}
                    />
                </div>
                <div className="flex justify-center mt-1">
                    <ChoiceRPS
                        variant="rock"
                        className="scale-90"
                        onClick={() => onUserChoice(UserChoice.Rock)}
                    />
                </div>
            </div>
        </div>
    );
};

export default Choices;