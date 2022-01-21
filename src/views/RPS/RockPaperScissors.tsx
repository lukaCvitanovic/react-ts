import Score from "@/components/RPS/Score";

const RockPaperScissors = () => {
    return (
        <div className="flex flex-col p-8 h-full bg-gradient-radial">
            <Score score={12} />
        </div>
    );
};

export default RockPaperScissors;