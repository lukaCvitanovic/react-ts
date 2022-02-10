import { RefObject, useContext, useEffect, useLayoutEffect, useRef, useState } from "react";
import { NavTransitionContext } from "@/components/space/transitions/NavTransitionProvider";
import { gsap } from 'gsap';
import { initial } from "lodash";

type AnimatedNavBorderProps = {
    column?: boolean
};

const AnimatedNavBorder = ({ column = false }: AnimatedNavBorderProps) => {
    const { state: { navRect, initialNavRect }, dispatch } = useContext(NavTransitionContext);
    const [initialWidth, setInitialWidth] = useState(0);
    const [initialX, setInitialX] = useState(0);
    const [oldXAxis, setOldXAxis] = useState(40);
    const [oldWidth, setOldWidht] = useState(0);
    const [layoutOffset, setLayoutOffset] = useState(0);
    
    const durationMS = 700;

    const gsapSlidingAnimation = (ref: RefObject<HTMLHRElement>) => {
        const timeline = gsap.timeline({ onComplete: onAnimationEnd });

        const startAnimationWidthDifference = ( oldWidth > navRect.width ? (oldWidth * 1.2) - oldWidth : (navRect.width * 1.2) - oldWidth);
        const endAnimationWidthDifference = oldWidth + startAnimationWidthDifference - navRect.width;

        const left = () => {
            const stratingWidthAnimationPercentage = startAnimationWidthDifference / (oldXAxis - navRect.x);
            const stratingWidthAnimationPercentageString = `${stratingWidthAnimationPercentage*100}%`;
            const endWidthAnimationPercentage = endAnimationWidthDifference / (oldXAxis - navRect.x);
            const endWidthAnimationPercentageStrign = `${100 - endWidthAnimationPercentage*100}%`;

            const keyframes = {
                [stratingWidthAnimationPercentageString]: { width: startAnimationWidthDifference + oldWidth }, 
                [endWidthAnimationPercentageStrign]: { x: navRect.x - layoutOffset },
                "100%": { width: navRect.width },
                easeEach: 'none',
                ease: 'power2.inOut'
            }
            timeline.to(ref.current, { duration: (durationMS / 1000), keyframes, animationFillMode: 'forward' });
        };
        const right = () => {
            const stratingWidthAnimationPercentage = startAnimationWidthDifference / (navRect.x - oldXAxis);
            const stratingWidthAnimationPercentageString = `${stratingWidthAnimationPercentage*100}%`;
            const endWidthAnimationPercentage = endAnimationWidthDifference / (navRect.x - oldXAxis);
            const endWidthAnimationPercentageStrign = `${100 - endWidthAnimationPercentage*100}%`;

            const keyframes = {
                [stratingWidthAnimationPercentageString]: { width: startAnimationWidthDifference + oldWidth, x: oldXAxis - layoutOffset },
                [endWidthAnimationPercentageStrign]: { width: startAnimationWidthDifference + oldWidth },
                "100%": { width: navRect.width, x: navRect.x - layoutOffset },
                easeEach: 'none',
                ease: 'power2.inOut'
            };
            timeline.to(ref.current, { duration: durationMS / 1000, keyframes, animationFillMode: 'forward' });
        };
        leftRightSliderAnimation(left, right);
    };

    const gsapColumnSlidingAnimation = (ref: RefObject<HTMLHRElement>) => {
        const timeline = gsap.timeline({ onComplete: onAnimationEnd });

        const startAnimationWidthDifference = ( oldWidth > navRect.height ? (oldWidth * 1.2) - oldWidth : (navRect.height * 1.2) - oldWidth);
        const endAnimationWidthDifference = oldWidth + startAnimationWidthDifference - navRect.height;

        const left = () => {
            const stratingWidthAnimationPercentage = startAnimationWidthDifference / (oldXAxis - navRect.y);
            const stratingWidthAnimationPercentageString = `${stratingWidthAnimationPercentage*100}%`;
            const endWidthAnimationPercentage = endAnimationWidthDifference / (oldXAxis - navRect.y);
            const endWidthAnimationPercentageStrign = `${100 - endWidthAnimationPercentage*100}%`;

            const keyframes = {
                [stratingWidthAnimationPercentageString]: { height: startAnimationWidthDifference + oldWidth }, 
                [endWidthAnimationPercentageStrign]: { y: navRect.y - layoutOffset },
                "100%": { height: navRect.height },
                easeEach: 'none',
                ease: 'power2.inOut'
            }
            timeline.to(ref.current, { duration: (durationMS / 1000), keyframes, animationFillMode: 'forward' });
        };
        const right = () => {
            const stratingWidthAnimationPercentage = startAnimationWidthDifference / (navRect.y - oldXAxis);
            const stratingWidthAnimationPercentageString = `${stratingWidthAnimationPercentage*100}%`;
            const endWidthAnimationPercentage = endAnimationWidthDifference / (navRect.y - oldXAxis);
            const endWidthAnimationPercentageStrign = `${100 - endWidthAnimationPercentage*100}%`;

            const keyframes = {
                [stratingWidthAnimationPercentageString]: { height: startAnimationWidthDifference + oldWidth, y: oldXAxis - layoutOffset },
                [endWidthAnimationPercentageStrign]: { height: startAnimationWidthDifference + oldWidth },
                "100%": { height: navRect.height, y: navRect.y - layoutOffset },
                easeEach: 'none',
                ease: 'power2.inOut'
            };
            timeline.to(ref.current, { duration: durationMS / 1000, keyframes, animationFillMode: 'forward' });
        };
        leftRightSliderAnimation(left, right);
    };

    const leftRightSliderAnimation = (onLeft: Function, onRight: Function) => {
        const verdict = (column ? oldXAxis > navRect.y : oldXAxis > navRect.x)
        if (verdict) onLeft();
        else onRight();
    };

    const onAnimationEnd = () => {
        setOldXAxis((column ? navRect.y : navRect.x));
        setOldWidht((column ? navRect.height : navRect.width));
    }

    const ref = useRef<HTMLHRElement>(null);

    const animateSlider = () => {
        if (column) gsapColumnSlidingAnimation(ref);
        else gsapSlidingAnimation(ref);
    };

    useEffect(() => {
        setInitialWidth((column ? initialNavRect.height : initialNavRect.width));
        setOldWidht((column ? initialNavRect.height : initialNavRect.width));
        setInitialX((column ? initialNavRect.y : initialNavRect.x));
        setOldXAxis((column ? initialNavRect.y : initialNavRect.x));
        let offset = 0;
        if (!column) offset = ref.current?.getBoundingClientRect().x || 0;
        return () => {
            // setOldWidht(0);
            // setOldXAxis(0);
            // setInitialWidth(0);
            // setInitialX(0);
            if (!column && !offset) {
                console.log('destroy1');
                dispatch({ type: 'setRect', payload: new DOMRect() });
            }
        };
    }, [initialNavRect.x, initialNavRect.y])
    useEffect(() => {
        if (initialWidth && initialX) animateSlider();
    }, [navRect.x, navRect.y]);

    
    useLayoutEffect(() => {
        let offset = 0;
        let a;
        if (!column) a = ref.current?.getBoundingClientRect().x;
        console.log(a);
        offset = a || 0;
        console.log(ref.current?.getBoundingClientRect());
        console.log(offset);
        console.log(initialNavRect);
        setLayoutOffset(offset);
    }, []);

    const topBottom = (column ? { top: 0, right: 0, marginTop: '' } : { bottom: 0 });

    return (
        <hr
            ref={ref} 
            style={{
                position: 'absolute',
                ...topBottom,
                borderTopWidth: `${(column ? 0 : '3px')}`,
                borderTopColor: 'white',
                borderLeftWidth: `${(column ? '3px' : 0)}`,
                borderLeftColor: 'white',
                width: `${(column ? 3 : initialWidth)}px`,
                height: `${(column ? initialWidth : 3)}px`,
                transform: `translate${column ? 'Y' : 'X'}(${initialX - layoutOffset}px)`
            }}
        />
    );
};

export default AnimatedNavBorder;