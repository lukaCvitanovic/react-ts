import logo from '@/assets/images/logo.svg';

type ScoreType = {
    score: number,
};

const Score = ({ score }: ScoreType) => {
    return (
        <div className="w-full flex justify-between p-3 border-4 border-header-outline rounded-lg font-sans">
            <img
                src={logo}
                alt="logo"
                className="h-14 m-3"
            />
            <div className='flex flex-col items-center justify-center py-2 px-6 border border-[#11192F] rounded bg-white'>
                <span className='mt-0.5 text-[0.625rem] text-score font-semibold tracking-widest uppercase leading-none'>score</span>
                <span className="mt-0.5 mb-1 text-[2.5rem] text-dark font-bold leading-none">{score}</span>
            </div>
        </div>
    );
};

export default Score;