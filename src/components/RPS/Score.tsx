import logo from '@/assets/images/logo.svg';

type ScoreType = {
    score: number,
};

const Score = ({ score }: ScoreType) => {
    return (
        <div className="w-full max-w-2xl flex justify-between p-3 sm:px-4 border-4 border-header-outline rounded-lg sm:rounded-2xl font-sans">
            <img
                src={logo}
                alt="logo"
                className="h-14 sm:h-20 m-3 sm:mx-1 sm:my-3"
            />
            <div className='flex flex-col items-center justify-center py-2 px-6 sm:px-10 border border-[#11192F] rounded sm:rounded-lg bg-white'>
                <span className='mt-0.5 sm:mt-0 text-[0.625rem] sm:text-sm text-score font-semibold tracking-widest uppercase leading-none'>score</span>
                <span className="mt-0.5 mb-1 sm:my-0 text-[2.5rem] sm:text-[3.5rem] text-dark font-bold leading-none">{score}</span>
            </div>
        </div>
    );
};

export default Score;