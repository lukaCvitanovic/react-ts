import { NavLink } from "react-router-dom";
import { NavTransitionContext } from "@/components/space/transitions/NavTransitionProvider";
import { MouseEvent, useContext, useEffect, useLayoutEffect, useRef, useState } from "react";
import isEqual from "lodash/isEqual";

export type NavButtonProps = {
    to: string,
    number: number,
    title: string,
    column?: boolean,
};

type NavButtonMetaProps = {
    initialRectFlag: boolean,  
};

const NavButton = ({ to, number, title, column = false, initialRectFlag }: NavButtonProps & NavButtonMetaProps) => {
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
        const defaultClass = 'w-max flex items-center border-white/0 hover:border-white/50';
        return (column ? `h-8 px-8 w-full border-r-[3px] ${defaultClass} justify-start` : `h-24 border-b-[3px] ${defaultClass} justify-center`);
    };

    useEffect(() => window.addEventListener('resize', () => setScreenWidth(window.innerWidth)));
    useLayoutEffect(() => {
        if (initialRectFlag) setRect(active);
    }, [active, initialRectFlag, screenWidth]);

    const defaultNumerationClass = 'font-bold mr-3 tracking-[2.7px]';
    const numerationClass = (column ? defaultNumerationClass : `hidden lg:block ${defaultNumerationClass}`);

    return (
        <NavLink
            to={to}
            className={isActive}
            onClick={setCurrentRect}
            ref={ref}
        >
            <span className={numerationClass}>{numeration}</span>
            <span className="uppercase">{title}</span>
        </NavLink>
    );
};

export default NavButton;