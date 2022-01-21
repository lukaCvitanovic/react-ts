import logo from '@/assets/images/logo.svg';

type ScoreType = {
    score: number,
};

const Score = ({ score }: ScoreType) => {
    return (
        <div className="flex justify-between p-3 border-4 border-[#606e85] rounded-lg font-sans">
            <img
                src={logo}
                className="h-14 m-3"
            />
            <div className='flex flex-col items-center justify-center py-2 px-6 border border-[#11192F] rounded bg-[#FAFAFA]'>
                <span className='mt-0.5 text-[0.625rem] text-[#2a46c0] font-semibold tracking-widest uppercase leading-none'>score</span>
                <span className="mt-0.5 mb-1 text-[2.5rem] text-[#3b4363] font-bold leading-none">{score}</span>
            </div>
        </div>
    );
};

export default Score;