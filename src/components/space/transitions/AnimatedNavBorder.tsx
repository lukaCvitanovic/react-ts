import AnimatedBorder from "@/components/space/transitions/AnimatedBorder";
import { Ref, RefObject, useContext, useEffect, useLayoutEffect, useRef, useState } from "react";
import { NavTransitionContext, initialElement } from "@/components/space/transitions/NavTransitionProvider";
import { AnimatedAreaProps, AnimatedElementPosisition, AnimatedElementProps } from "@/helpers/types";
import { gsap } from 'gsap';
import omit from "lodash/omit";

enum Direction {
    Up = 'top',
    Down = 'bottom',
    Left = 'left',
    Right = 'right',
};

type AnimatedAreaPosition = 
    | { bottom: 0, left: number | string, right: number | string, column: false }
    | { top: number, right: 0, column: true };

type AnimatedAreaRenderProp = {
    render?: Function
};
const defaultRenderProp = (props: AnimatedElementProps, ref: Ref<HTMLHRElement>) => <AnimatedBorder {...props} ref={ref} />;

const AnimatedNavBorder = ({ column = false, render = defaultRenderProp }: AnimatedAreaProps & AnimatedAreaRenderProp) => {
    const { state: { navElement, initialNavElement }, dispatch } = useContext(NavTransitionContext);

    const [animationFlag, setAnimationFlag] = useState(false);
        
    const initialAEPosition = (column ? { top: 0, right: 0, left: '', bottom: '' } : { bottom: 0, top: '', left: '', right: '' });
    const initialAAPosition: AnimatedAreaPosition = (column ? { top: 0, right: 0, column } : { bottom: 0, left: 0, right: 0, column });
    const [AEPosition, setAEPosition] = useState<AnimatedElementPosisition>(initialAEPosition);
    const [AAPosition, setAAPosition] = useState<AnimatedAreaPosition>(initialAAPosition);
    const [AADimension, setAADimension] = useState(0);
    const [oldNavElement, setOldNavElement] = useState<Element | null>(null);

    const [defaultCounterDimension, setDefaultCounterDimension] = useState(0);
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
        disableOpositeDirection();
        if (column) verticalTransitionAnimationArea();
        else horizontalTransitionAnimationArea();
        setAnimationFlag(true);
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

    const AADimensionHorizontalInitialization = () => {
        setAAPosition((currentPosition) => ({ ...currentPosition, left: (initialNavElement as HTMLElement).offsetLeft }));
        setAADimension((initialNavElement as HTMLElement).offsetWidth);
    };
    const AADimensionVerticalInitialization = () => {
        setAAPosition((currentPosition) => ({ ...currentPosition, top: (initialNavElement as HTMLElement).offsetTop }));
        setAADimension((initialNavElement as HTMLElement).offsetHeight);
    };
    const AADimensionInitialization = () => {
        setOldNavElement(initialNavElement);
        if (column) AADimensionVerticalInitialization();
        else AADimensionHorizontalInitialization();
    };

    // Position based animation
    const horizontalAnimation = (ref: RefObject<HTMLHRElement>) => {
        const timeline = gsap.timeline({ onComplete: onAnimationEnd });

        const startAnimationWidthDifference = ( oldWidth > navElement.getBoundingClientRect().width ? (oldWidth * 1.2) - oldWidth : (navElement.getBoundingClientRect().width * 1.2) - oldWidth);
        const endAnimationWidthDifference = oldWidth + startAnimationWidthDifference - navElement.getBoundingClientRect().width;

        const left = () => {
            const stratingWidthAnimationPercentage = startAnimationWidthDifference / (oldXAxis - navElement.getBoundingClientRect().x);
            const stratingWidthAnimationPercentageString = `${stratingWidthAnimationPercentage*100}%`;
            const endWidthAnimationPercentage = endAnimationWidthDifference / (oldXAxis - navElement.getBoundingClientRect().x);
            const endWidthAnimationPercentageStrign = `${100 - endWidthAnimationPercentage*100}%`;

            const startAnimationWidth = startAnimationWidthDifference + oldWidth;

            const keyframes = {
                "0%": { left: AADimension - oldWidth },
                [stratingWidthAnimationPercentageString]: { width: startAnimationWidth, left: AADimension - startAnimationWidth }, 
                [endWidthAnimationPercentageStrign]: { left: 0 },
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

            const startAnimationWidth = startAnimationWidthDifference + oldWidth;

            const keyframes = {
                "0%": { left: '', right: AADimension - oldWidth },
                [stratingWidthAnimationPercentageString]: { width: startAnimationWidth, left: '', right: AADimension - startAnimationWidth },
                [endWidthAnimationPercentageStrign]: { width: startAnimationWidth },
                "100%": { width: navElement.getBoundingClientRect().width, right: 0 },
                easeEach: 'none',
                ease: 'power2.inOut'
            };
            timeline.to(ref.current, { duration: durationMS / 1000, keyframes, animationFillMode: 'forward' });
        };
        
        leftRightSliderAnimation(left, right);
    };
    const verticalAnimation = (ref: RefObject<HTMLHRElement>) => {
        const timeline = gsap.timeline({ onComplete: onAnimationEnd });

        const startAnimationWidthDifference = ( oldWidth > navElement.getBoundingClientRect().height ? (oldWidth * 1.2) - oldWidth : (navElement.getBoundingClientRect().height * 1.2) - oldWidth);
        const endAnimationWidthDifference = oldWidth + startAnimationWidthDifference - navElement.getBoundingClientRect().height;

        const up = () => {
            const stratingWidthAnimationPercentage = startAnimationWidthDifference / (oldXAxis - navElement.getBoundingClientRect().y);
            const stratingWidthAnimationPercentageString = `${stratingWidthAnimationPercentage*100}%`;
            const endWidthAnimationPercentage = endAnimationWidthDifference / (oldXAxis - navElement.getBoundingClientRect().y);
            const endWidthAnimationPercentageStrign = `${100 - endWidthAnimationPercentage*100}%`;

            const startAnimationHeight = startAnimationWidthDifference + oldWidth;

            const keyframes = {
                "0%": { top: AADimension - oldWidth },
                [stratingWidthAnimationPercentageString]: { height: startAnimationWidthDifference + oldWidth, top: AADimension - startAnimationHeight }, 
                [endWidthAnimationPercentageStrign]: { top: 0 },
                "100%": { height: navElement.getBoundingClientRect().height },
                easeEach: 'none',
                ease: 'power2.inOut'
            }
            timeline.to(ref.current, { duration: (durationMS / 1000), keyframes, animationFillMode: 'forward' });
        };
        const down = () => {
            const stratingWidthAnimationPercentage = startAnimationWidthDifference / (navElement.getBoundingClientRect().y - oldXAxis);
            const stratingWidthAnimationPercentageString = `${stratingWidthAnimationPercentage*100}%`;
            const endWidthAnimationPercentage = endAnimationWidthDifference / (navElement.getBoundingClientRect().y - oldXAxis);
            const endWidthAnimationPercentageStrign = `${100 - endWidthAnimationPercentage*100}%`;

            const startAnimationHeight = startAnimationWidthDifference + oldWidth;

            const keyframes = {
                "0%": { top: '', bottom: AADimension - oldWidth },
                [stratingWidthAnimationPercentageString]: { height: startAnimationWidthDifference + oldWidth, top: '' ,bottom: AADimension - startAnimationHeight },
                [endWidthAnimationPercentageStrign]: { height: startAnimationWidthDifference + oldWidth },
                "100%": { height: navElement.getBoundingClientRect().height, bottom: 0 },
                easeEach: 'none',
                ease: 'power2.inOut'
            };
            timeline.to(ref.current, { duration: durationMS / 1000, keyframes, animationFillMode: 'forward' });
        };
        leftRightSliderAnimation(up, down);
    };

    // Animation helpers
    const getAnimationDirection = () => {
        if (column) return ( oldXAxis > navElement.getBoundingClientRect().y ? Direction.Up : Direction.Down);
        return (oldXAxis > navElement.getBoundingClientRect().x ? Direction.Left : Direction.Right);
    };

    const opositeDirections = {
        [Direction.Up]: Direction.Down,
        [Direction.Down]: Direction.Up,
        [Direction.Right]: Direction.Left,
        [Direction.Left]: Direction.Right,
    };

    const checkOpositeDirectionChange = () => AEPosition[getAnimationDirection()] === '';

    const disableOpositeDirection = () => {
        const direction = getAnimationDirection();
        const opositeDirection = opositeDirections[direction];
        setAEPosition((currentPosition) => ({ ...currentPosition, [direction]: '', [opositeDirection]: 0 }));
    };

    const leftRightSliderAnimation = (onLeft: Function, onRight: Function) => {
        const verdict = (column ? oldXAxis > navElement.getBoundingClientRect().y : oldXAxis > navElement.getBoundingClientRect().x)
        if (verdict) onLeft();
        else onRight();
    };

    const onAnimationEnd = () => {
        setAnimationFlag(false);
        startEndAnimationArea();
        setOldXAxis((column ? navElement.getBoundingClientRect().y : navElement.getBoundingClientRect().x));
        setOldWidht((column ? navElement.getBoundingClientRect().height : navElement.getBoundingClientRect().width));
    }

    const ref = useRef<HTMLHRElement>(null);

    const animateSlider = () => {
        if (column) verticalAnimation(ref);
        else horizontalAnimation(ref);
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
    }, [navElement.getBoundingClientRect().x, navElement.getBoundingClientRect().y]);
    useEffect(() => {
        // TO Enable animation
        if (initialWidth && initialX && animationFlag && checkOpositeDirectionChange()) animateSlider();
    }, [animationFlag, AEPosition]);
    useEffect(() => {
        if (!initialNavElement.isEqualNode(initialElement)) AADimensionInitialization();
    }, [initialNavElement]);

    const dependentChildDimesion = (column ? ref.current?.offsetWidth : ref.current?.offsetHeight);
    useEffect(() => {
        if (!defaultCounterDimension && dependentChildDimesion !== undefined) setDefaultCounterDimension(dependentChildDimesion);
    }, [dependentChildDimesion]);
    
    useLayoutEffect(() => {
        let offset = 0;
        setLayoutOffset(offset);
    }, []);

    const toOmit = (column ? ['column', 'left'] : ['column']);
    const style = {
        backgroundColor: 'red',
        width: `${(column ? defaultCounterDimension : AADimension)}px`,
        height: `${(column ? AADimension : defaultCounterDimension)}px`,
        ...omit(AAPosition, toOmit),
    };

    return (
        <div
            style={{
                position: 'absolute',
                ...style,
            }}
        >
            {/* <AnimatedBorder
                column={column}
                initialDimension={initialWidth}
                AEPosition={AEPosition}
                ref={ref}
            /> */}
            {render({ column, initialDimension: initialWidth, AEPosition }, ref)}
        </div>
    );
};

export default AnimatedNavBorder;