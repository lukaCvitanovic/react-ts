import { RefObject, useContext, useEffect, useLayoutEffect, useRef, useState } from "react";
import { NavTransitionContext, initialElement } from "@/components/space/transitions/NavTransitionProvider";
import { gsap } from 'gsap';
import omit from "lodash/omit";

type AnimatedNavBorderProps = {
    column?: boolean
};

type AnimatedAreaPosition = 
    | { bottom: 0, left: number, right: number, column: false }
    | { top: number, right: 0, column: true };

const AnimatedNavBorder = ({ column = false }: AnimatedNavBorderProps) => {
    const { state: { navElement, initialNavElement }, dispatch } = useContext(NavTransitionContext);

    const initialAAPosition: AnimatedAreaPosition = (column ? { top: 0, right: 0, column } : { bottom: 0, left: 0, right: 0, column });
    const [AAPosition, setAAPosition] = useState<AnimatedAreaPosition>(initialAAPosition);
    const [AADimension, setAADimension] = useState(0);
    const [oldNavElement, setOldNavElement] = useState<Element | null>(null);

    const [initialWidth, setInitialWidth] = useState(0);
    const [initialX, setInitialX] = useState(0);
    const [oldXAxis, setOldXAxis] = useState(40);
    const [oldWidth, setOldWidht] = useState(0);

    const [layoutOffset, setLayoutOffset] = useState(0);
    
    const durationMS = 700;

    const horizontalTransitionAnimationArea = () => {
        const offsetFromRight = (element: HTMLElement) => element.offsetWidth + element.offsetLeft;
        const navFromRight = offsetFromRight(navElement as HTMLElement);
        const oldFromRight = offsetFromRight(oldNavElement as HTMLElement);

        let widthExpansion;
        const moveToRight = () => {
            widthExpansion = navFromRight - oldFromRight;
            setAADimension(oldWidth + widthExpansion);
        };
        const moveToLeft = () => {
            widthExpansion = oldFromRight - navFromRight;
            setAAPosition((currentPosition) => ({ ...currentPosition, left: (navElement as HTMLElement).offsetLeft }));
            setAADimension((navElement as HTMLElement).offsetWidth + widthExpansion);
        };

        if (navFromRight > oldFromRight) moveToRight();
        else moveToLeft();
    };
    const verticalTransitionAnimationArea = () => {
        const offsetFromBottom = (element: HTMLElement) => element.offsetHeight + element.offsetTop;
        const navFromBottom = offsetFromBottom(navElement as HTMLElement);
        const oldFromBottom = offsetFromBottom(oldNavElement as HTMLElement);

        let widthExpansion;
        const moveDown = () => {
            widthExpansion = navFromBottom - oldFromBottom;
            setAADimension(oldWidth + widthExpansion);
        };
        const moveUp = () => {
            widthExpansion = oldFromBottom - navFromBottom;
            setAAPosition((currentPosition) => ({ ...currentPosition, top: (navElement as HTMLElement).offsetTop }));
            setAADimension((navElement as HTMLElement).offsetHeight + widthExpansion);
        };

        if (navFromBottom > oldFromBottom) moveDown();
        else moveUp();
    };
    const transitionAnimationArea = () => {
        if (column) verticalTransitionAnimationArea();
        else horizontalTransitionAnimationArea();
    };

    const horizontalStartEndAnimationArea = () => {
        setAADimension((navElement as HTMLElement).offsetWidth);
        setAAPosition((currentPosition) => ({ ...currentPosition, left: (navElement as HTMLElement).offsetLeft }));
        setOldNavElement(navElement);
    };
    const verticalStartEndAnimationArea = () => {
        setAADimension((navElement as HTMLElement).offsetHeight);
        setAAPosition((currentPosition) => ({ ...currentPosition, top: (navElement as HTMLElement).offsetTop }));
        setOldNavElement(navElement);
    };
    const startEndAnimationArea = () => {
        if (column) verticalStartEndAnimationArea();
        else horizontalStartEndAnimationArea();
    };

    const gsapSlidingAnimation = (ref: RefObject<HTMLHRElement>) => {
        const timeline = gsap.timeline({ onComplete: onAnimationEnd });

        const startAnimationWidthDifference = ( oldWidth > navElement.getBoundingClientRect().width ? (oldWidth * 1.2) - oldWidth : (navElement.getBoundingClientRect().width * 1.2) - oldWidth);
        const endAnimationWidthDifference = oldWidth + startAnimationWidthDifference - navElement.getBoundingClientRect().width;

        const left = () => {
            const stratingWidthAnimationPercentage = startAnimationWidthDifference / (oldXAxis - navElement.getBoundingClientRect().x);
            const stratingWidthAnimationPercentageString = `${stratingWidthAnimationPercentage*100}%`;
            const endWidthAnimationPercentage = endAnimationWidthDifference / (oldXAxis - navElement.getBoundingClientRect().x);
            const endWidthAnimationPercentageStrign = `${100 - endWidthAnimationPercentage*100}%`;

            const keyframes = {
                [stratingWidthAnimationPercentageString]: { width: startAnimationWidthDifference + oldWidth }, 
                [endWidthAnimationPercentageStrign]: { x: navElement.getBoundingClientRect().x - layoutOffset },
                "100%": { width: navElement.getBoundingClientRect().width },
                easeEach: 'none',
                ease: 'power2.inOut'
            }
            timeline.to(ref.current, { duration: (durationMS / 1000), keyframes, animationFillMode: 'forward' });
        };
        const right = () => {
            const stratingWidthAnimationPercentage = startAnimationWidthDifference / (navElement.getBoundingClientRect().x - oldXAxis);
            const stratingWidthAnimationPercentageString = `${stratingWidthAnimationPercentage*100}%`;
            const endWidthAnimationPercentage = endAnimationWidthDifference / (navElement.getBoundingClientRect().x - oldXAxis);
            const endWidthAnimationPercentageStrign = `${100 - endWidthAnimationPercentage*100}%`;

            const keyframes = {
                [stratingWidthAnimationPercentageString]: { width: startAnimationWidthDifference + oldWidth, x: oldXAxis - layoutOffset },
                [endWidthAnimationPercentageStrign]: { width: startAnimationWidthDifference + oldWidth },
                "100%": { width: navElement.getBoundingClientRect().width, x: navElement.getBoundingClientRect().x - layoutOffset },
                easeEach: 'none',
                ease: 'power2.inOut'
            };
            timeline.to(ref.current, { duration: durationMS / 1000, keyframes, animationFillMode: 'forward' });
        };
        leftRightSliderAnimation(left, right);
    };

    const gsapColumnSlidingAnimation = (ref: RefObject<HTMLHRElement>) => {
        const timeline = gsap.timeline({ onComplete: onAnimationEnd });

        const startAnimationWidthDifference = ( oldWidth > navElement.getBoundingClientRect().height ? (oldWidth * 1.2) - oldWidth : (navElement.getBoundingClientRect().height * 1.2) - oldWidth);
        const endAnimationWidthDifference = oldWidth + startAnimationWidthDifference - navElement.getBoundingClientRect().height;

        const left = () => {
            const stratingWidthAnimationPercentage = startAnimationWidthDifference / (oldXAxis - navElement.getBoundingClientRect().y);
            const stratingWidthAnimationPercentageString = `${stratingWidthAnimationPercentage*100}%`;
            const endWidthAnimationPercentage = endAnimationWidthDifference / (oldXAxis - navElement.getBoundingClientRect().y);
            const endWidthAnimationPercentageStrign = `${100 - endWidthAnimationPercentage*100}%`;

            const keyframes = {
                [stratingWidthAnimationPercentageString]: { height: startAnimationWidthDifference + oldWidth }, 
                [endWidthAnimationPercentageStrign]: { y: navElement.getBoundingClientRect().y - layoutOffset },
                "100%": { height: navElement.getBoundingClientRect().height },
                easeEach: 'none',
                ease: 'power2.inOut'
            }
            timeline.to(ref.current, { duration: (durationMS / 1000), keyframes, animationFillMode: 'forward' });
        };
        const right = () => {
            const stratingWidthAnimationPercentage = startAnimationWidthDifference / (navElement.getBoundingClientRect().y - oldXAxis);
            const stratingWidthAnimationPercentageString = `${stratingWidthAnimationPercentage*100}%`;
            const endWidthAnimationPercentage = endAnimationWidthDifference / (navElement.getBoundingClientRect().y - oldXAxis);
            const endWidthAnimationPercentageStrign = `${100 - endWidthAnimationPercentage*100}%`;

            const keyframes = {
                [stratingWidthAnimationPercentageString]: { height: startAnimationWidthDifference + oldWidth, y: oldXAxis - layoutOffset },
                [endWidthAnimationPercentageStrign]: { height: startAnimationWidthDifference + oldWidth },
                "100%": { height: navElement.getBoundingClientRect().height, y: navElement.getBoundingClientRect().y - layoutOffset },
                easeEach: 'none',
                ease: 'power2.inOut'
            };
            timeline.to(ref.current, { duration: durationMS / 1000, keyframes, animationFillMode: 'forward' });
        };
        leftRightSliderAnimation(left, right);
    };

    const leftRightSliderAnimation = (onLeft: Function, onRight: Function) => {
        const verdict = (column ? oldXAxis > navElement.getBoundingClientRect().y : oldXAxis > navElement.getBoundingClientRect().x)
        if (verdict) onLeft();
        else onRight();
    };

    const onAnimationEnd = () => {
        startEndAnimationArea();
        setOldXAxis((column ? navElement.getBoundingClientRect().y : navElement.getBoundingClientRect().x));
        setOldWidht((column ? navElement.getBoundingClientRect().height : navElement.getBoundingClientRect().width));
    }

    const ref = useRef<HTMLHRElement>(null);

    const animateSlider = () => {
        if (column) gsapColumnSlidingAnimation(ref);
        else gsapSlidingAnimation(ref);
    };

    useEffect(() => {
        setInitialWidth((column ? initialNavElement.getBoundingClientRect().height : initialNavElement.getBoundingClientRect().width));
        setOldWidht((column ? initialNavElement.getBoundingClientRect().height : initialNavElement.getBoundingClientRect().width));
        setInitialX((column ? initialNavElement.getBoundingClientRect().y : initialNavElement.getBoundingClientRect().x));
        setOldXAxis((column ? initialNavElement.getBoundingClientRect().y : initialNavElement.getBoundingClientRect().x));
        let offset = 0;
        if (!column) offset = ref.current?.getBoundingClientRect().x || 0;
        return () => {
            if (!column && !offset) dispatch({ type: 'setElement', payload: initialElement });
        };
    }, [initialNavElement.getBoundingClientRect().x, initialNavElement.getBoundingClientRect().y])
    useEffect(() => {
        if (oldNavElement !== null) transitionAnimationArea();
        // TO Enable animation
        if (initialWidth && initialX) animateSlider();
    }, [navElement.getBoundingClientRect().x, navElement.getBoundingClientRect().y]);
    useEffect(() => {
        if (!initialNavElement.isEqualNode(initialElement)) {
            setAAPosition((currentPosition) => ({ ...currentPosition, left: (initialNavElement as HTMLElement).offsetLeft }));
            setAADimension((initialNavElement as HTMLElement).offsetWidth);
        }
    }, [initialNavElement]);
    
    useLayoutEffect(() => {
        let offset = 0;
        setLayoutOffset(offset);
    }, []);

    const topBottom = (column ? { top: 0, right: 0, marginTop: '' } : { bottom: 0 });

    const toOmit = (column ? ['column', 'left'] : ['column']);
    const style = {
        backgroundColor: 'red',
        width: `${(column ? 3 : AADimension)}px`,
        height: `${(column ? AADimension : 3)}px`,
        ...omit(AAPosition, toOmit),
    };

    return (
        <div
            style={{
                position: 'absolute',
                ...style,
            }}
        >
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
        </div>
    );
};

export default AnimatedNavBorder;