import { MouseEventHandler, useState } from "react";

type LandingPageButtonProps = {
    onClick: MouseEventHandler
};

const LandingPageButton = ({ onClick }: LandingPageButtonProps) => {
    const [hover, setHover] = useState(false);

    const hoverOutlineClass = `absolute ${(hover ? 'block' : 'hidden')} inset-0 h-[9.375rem] w-[9.375rem] md:h-[15rem] md:w-[15rem] lg:h-[17rem] lg:w-[17rem] scale-[167%] rounded-full bg-blend-normal bg-white/10`;

    return (
        <button
            onClick={onClick}
        >
            <div 
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
                className="relative flex items-center justify-center h-[9.375rem] w-[9.375rem] md:h-[15rem] md:w-[15rem] lg:h-[17rem] lg:w-[17rem] bg-white rounded-full"
            >
                <h4 className="text-xl uppercase tracking-[1.25px] font-[Bellefair] md:space-heading4 text-black">Explore</h4>
                <div className={hoverOutlineClass}></div>
            </div>
        </button>
    );
};

export default LandingPageButton;