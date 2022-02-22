import { NavLink } from "react-router-dom";
import { NavTransitionContext } from "@/components/space/transitions/NavTransitionProvider";
import { MouseEvent, useContext, useEffect, useLayoutEffect, useRef, useState } from "react";
import isEqual from "lodash/isEqual";

export type NavButtonProps = {
    to: string,
    number: number,
    title: string,
    column?: boolean,
    small?: boolean,
    showNumber?: boolean,
    circle?: boolean,
    numbered?: boolean,
};

type NavButtonMetaProps = {
    initialRectFlag: boolean,  
};

const NavButton = ({ to, number, title, column = false, small = false, showNumber = true, circle = false, numbered = false, initialRectFlag }: NavButtonProps & NavButtonMetaProps) => {
    const { dispatch, state: { navRect } } = useContext(NavTransitionContext);

    const [active, setActive] = useState(false);
    const [screenWidth, setScreenWidth] = useState(0);

    const ref = useRef<HTMLAnchorElement>(null);

    const numeration = `0${number}`;

    const setRect = (isActive: boolean) => {
        if (isActive && isEqual(navRect.toJSON(), new DOMRect().toJSON())) dispatch({ type: 'setInitialRect', payload: ref.current?.getBoundingClientRect() || new DOMRect() });
    };

    const setCurrentRect = (e: MouseEvent) => dispatch({ type: 'setRect', payload: e.currentTarget.getBoundingClientRect() });

    const isActive = ({ isActive }: { isActive: boolean }) => {
        setActive(isActive);
        if (circle) return 'h-2.5 w-2.5 lg:h-4 lg:w-4';
        else if (numbered) return 'h-10 w-10 md:h-[3.75rem] md:w-[3.75rem] lg:h-20 lg:w-20';
        const smallClass = (small ? `h-10 text-sm md:text-base ${(isActive ? 'text-white' : 'text-heading-color')}` : 'h-24');
        const defaultClass = 'w-max flex items-center border-white/0 hover:border-white/50';
        return (column ? `h-8 px-8 w-full border-r-[3px] ${defaultClass} justify-start` : `${smallClass} border-b-[3px] ${defaultClass} justify-center`);
    };

    useEffect(() => window.addEventListener('resize', () => setScreenWidth(window.innerWidth)));
    useLayoutEffect(() => {
        if (initialRectFlag) setRect(active);
    }, [active, initialRectFlag, screenWidth]);

    const defaultNumerationClass = 'font-bold mr-3 tracking-[2.7px]';
    const numerationClass = (column ? defaultNumerationClass : `hidden lg:block ${defaultNumerationClass}`);
    const circleClass = `rounded-full w-full h-full ${(active ? 'bg-white' : 'bg-white/[.17] hover:bg-white/50')}`;
    const numberedClass = `rounded-full w-full h-full flex items-center justify-center border border-white/25 hover:border-white ${(active ? 'bg-white text-black' : 'bg-transparent text-white')}`;

    const navContent = () => {
        if (circle) {
            return (
                <div className={circleClass}></div>
            );
        } else if (numbered) {
            return (
                <div className={numberedClass}>
                    <span className="font-[Bellefair] md:text-2xl lg:text-[2rem]">{number}</span>
                </div>
            );
        } else {
            return (
                <div className="flex">
                    {showNumber &&
                        <span className={numerationClass}>{numeration}</span>
                    }
                    <span className="uppercase">{title}</span>
                </div>
            );
        }
    };

    return (
        <NavLink
            to={to}
            className={isActive}
            onClick={setCurrentRect}
            ref={ref}
        >
            {navContent()}
        </NavLink>
    );
};

export default NavButton;