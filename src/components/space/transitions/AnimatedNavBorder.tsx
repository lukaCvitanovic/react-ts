import AnimatedBorder from "@/components/space/transitions/AnimatedBorder";
import { Ref, useContext, useEffect, useLayoutEffect, useRef, useState } from "react";
import { NavTransitionContext, initialElement } from "@/components/space/transitions/NavTransitionProvider";
import { AnimatedAreaProps, AnimatedElementPosisition, AnimatedElementProps, LeftRightSliderAnimation, AnimationMethod } from "@/helpers/types";
import { defaultdHorizontalAnimation, defaultVerticalAnimation } from "@/helpers/space/defaultAnimationMethods";

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
    render?: Function,
    horizontalAnimation?: AnimationMethod,
    verticalAnimation?: AnimationMethod,
};
const defaultRenderProp = (props: AnimatedElementProps, ref: Ref<HTMLHRElement>) => <AnimatedBorder {...props} ref={ref} />;

const AnimatedNavBorder = ({ column = false, verticalAnimation = defaultVerticalAnimation, horizontalAnimation = defaultdHorizontalAnimation, render = defaultRenderProp }: AnimatedAreaProps & AnimatedAreaRenderProp) => {
    const { state: { navElement, initialNavElement }, dispatch } = useContext(NavTransitionContext);

    const [animationFlag, setAnimationFlag] = useState(false);
        
    const initialAEPosition = (column ? { top: 0, right: 0, left: '', bottom: '' } : { bottom: 0, top: '', left: '', right: '' });
    const initialAAPosition: AnimatedAreaPosition = (column ? { top: 0, right: 0, column } : { bottom: 0, left: 0, right: 0, column });
    const [AEPosition, setAEPosition] = useState<AnimatedElementPosisition>(initialAEPosition);
    const [AAPosition, setAAPosition] = useState<AnimatedAreaPosition>(initialAAPosition);
    const [AADimension, setAADimension] = useState(0);
    const [oldNavElement, setOldNavElement] = useState<Element | null>(null);

    const [defaultCounterDimension, setDefaultCounterDimension] = useState(0);
    const [initialDimension, setInitialDimension] = useState(0);
    const [initialPosition, setInitialPositino] = useState(0);
    const [oldPosition, setOldPosition] = useState(40);
    const [oldDimenstion, setOldDimenstion] = useState(0);

    const [layoutOffset, setLayoutOffset] = useState(0);
    
    const durationMS = 700;

    const horizontalTransitionAnimationArea = () => {
        const offsetFromRight = (element: HTMLElement) => element.offsetWidth + element.offsetLeft;
        const navFromRight = offsetFromRight(navElement as HTMLElement);
        const oldFromRight = offsetFromRight(oldNavElement as HTMLElement);

        let widthExpansion;
        const moveToRight = () => {
            widthExpansion = navFromRight - oldFromRight;
            setAADimension(oldDimenstion + widthExpansion);
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
            setAADimension(oldDimenstion + widthExpansion);
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

    // Animation helpers
    const getAnimationDirection = () => {
        if (column) return ( oldPosition > navElement.getBoundingClientRect().y ? Direction.Up : Direction.Down);
        return (oldPosition > navElement.getBoundingClientRect().x ? Direction.Left : Direction.Right);
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

    const leftRightSliderAnimation: LeftRightSliderAnimation = (onLeft, onRight) => {
        const verdict = (column ? oldPosition > navElement.getBoundingClientRect().y : oldPosition > navElement.getBoundingClientRect().x)
        if (verdict) onLeft();
        else onRight();
    };

    const onAnimationEnd = () => {
        setAnimationFlag(false);
        startEndAnimationArea();
        setOldPosition((column ? navElement.getBoundingClientRect().y : navElement.getBoundingClientRect().x));
        setOldDimenstion((column ? navElement.getBoundingClientRect().height : navElement.getBoundingClientRect().width));
    }

    const ref = useRef<HTMLHRElement>(null);

    const animateSlider = () => {
        if (ref.current !== null) {
            if (column) verticalAnimation(ref.current, (navElement as HTMLElement), onAnimationEnd, durationMS, { oldDimenstion, oldPosition, AADimension }, leftRightSliderAnimation);
            else horizontalAnimation(ref.current, (navElement as HTMLElement), onAnimationEnd, durationMS, { oldDimenstion, oldPosition, AADimension }, leftRightSliderAnimation);
        }
    };

    useEffect(() => {
        setInitialDimension((column ? initialNavElement.getBoundingClientRect().height : initialNavElement.getBoundingClientRect().width));
        setOldDimenstion((column ? initialNavElement.getBoundingClientRect().height : initialNavElement.getBoundingClientRect().width));
        setInitialPositino((column ? initialNavElement.getBoundingClientRect().y : initialNavElement.getBoundingClientRect().x));
        setOldPosition((column ? initialNavElement.getBoundingClientRect().y : initialNavElement.getBoundingClientRect().x));
        let offset = 0;
        if (!column) offset = ref.current?.getBoundingClientRect().x || 0;
        return () => {
            if (!column && !offset && !navElement.isEqualNode(initialElement)) dispatch({ type: 'setElement', payload: initialElement });
        };
    }, [initialNavElement.getBoundingClientRect().x, initialNavElement.getBoundingClientRect().y])
    useEffect(() => {
        if (oldNavElement !== null) transitionAnimationArea();
    }, [navElement.getBoundingClientRect().x, navElement.getBoundingClientRect().y]);
    useEffect(() => {
        // TO Enable animation
        if (initialDimension && initialPosition && animationFlag && checkOpositeDirectionChange()) animateSlider();
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
            {render({ column, initialDimension: initialDimension, AEPosition }, ref)}
        </div>
    );
};

export default AnimatedNavBorder;