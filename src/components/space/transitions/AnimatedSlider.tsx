import AnimatedBorder from "@/components/space/transitions/AnimatedBorder";
import { Ref, useContext, useEffect, useRef, useState } from "react";
import { NavTransitionContext, initialElement } from "@/components/space/transitions/NavTransitionProvider";
import { AnimatedAreaProps, AnimatedElementPosisition, AnimatedElementProps, LeftRightSliderAnimation, AnimationMethod, AnimatedAreaPosition, ResizeHandeler, AnimationPreviousCallback, AnimationStartEndAA } from "@/helpers/types";
import { defaultdHorizontalAnimation, defaultResizeHandeler, defaultVerticalAnimation } from "@/helpers/space/defaultAnimationMethods";

import omit from "lodash/omit";

enum Direction {
    Up = 'top',
    Down = 'bottom',
    Left = 'left',
    Right = 'right',
};



type AnimatedAreaRenderProp = {
    render?: Function,
    horizontalAnimation?: AnimationMethod,
    verticalAnimation?: AnimationMethod,
    resizeHandeler?: ResizeHandeler,
};
const defaultRenderProp = (props: AnimatedElementProps, ref: Ref<HTMLHRElement>) => <AnimatedBorder {...props} ref={ref} />;

const AnimatedSlider = ({ column = false, verticalAnimation = defaultVerticalAnimation, horizontalAnimation = defaultdHorizontalAnimation, resizeHandeler = defaultResizeHandeler, render = defaultRenderProp }: AnimatedAreaProps & AnimatedAreaRenderProp) => {
    const { state: { navElement, initialNavElement, previouseElement }, dispatch } = useContext(NavTransitionContext);

    const [animationFlag, setAnimationFlag] = useState(false);
    const [interuptionFlag, setInteruptionFlag] = useState(false);
    const [currentAnimation, setCurrentAnimation] = useState<gsap.core.Timeline>({} as gsap.core.Timeline);
        
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

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    
    const durationMS = 700;

    const horizontalTransitionAnimationArea = () => {
        const offsetFromRight = (element: HTMLElement) => element.offsetWidth + element.offsetLeft;
        const navFromRight = offsetFromRight(navElement as HTMLElement);
        const oldFromRight = offsetFromRight(oldNavElement as HTMLElement);

        let widthExpansion;
        const moveToRight = () => {
            widthExpansion = navFromRight - oldFromRight;
            setAADimension((oldNavElement as HTMLElement).offsetWidth + widthExpansion);
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
        setInteruptionFlag(false);
    };

    const horizontalStartEndAnimationArea: AnimationStartEndAA = (referenceElement) => {
        setAADimension((referenceElement as HTMLElement).offsetWidth);
        setAAPosition((currentPosition) => ({ ...currentPosition, left: (referenceElement as HTMLElement).offsetLeft }));
        setOldNavElement(referenceElement);
    };
    const verticalStartEndAnimationArea: AnimationStartEndAA = (referenceElement) => {
        setAADimension((referenceElement as HTMLElement).offsetHeight);
        setAAPosition((currentPosition) => ({ ...currentPosition, top: (referenceElement as HTMLElement).offsetTop }));
        setOldNavElement(referenceElement);
    };
    const startEndAnimationArea: AnimationPreviousCallback = (previous = false) => {
        const refernceElement = (previous && previouseElement !== null ? previouseElement : navElement);
        if (column) verticalStartEndAnimationArea(refernceElement);
        else horizontalStartEndAnimationArea(refernceElement);
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
        const position = (column ? oldNavElement?.getBoundingClientRect().y : oldNavElement?.getBoundingClientRect().x);
        const referentPosition = position || oldPosition;
        const verdict = (column ? referentPosition > navElement.getBoundingClientRect().y : oldPosition > navElement.getBoundingClientRect().x)
        if (verdict) onLeft();
        else onRight();
    };

    const onAnimationEnd: AnimationPreviousCallback = (previous = false) => {
        const refernceElement = (previous && previouseElement !== null ? previouseElement : navElement);
        setAnimationFlag(false);
        startEndAnimationArea(previous);
        setOldPosition((column ? refernceElement.getBoundingClientRect().y : refernceElement.getBoundingClientRect().x));
        setOldDimenstion((column ? refernceElement.getBoundingClientRect().height : refernceElement.getBoundingClientRect().width));
    }

    const ref = useRef<HTMLHRElement>(null);

    const animateSlider = () => {
        if (ref.current !== null) {
            const dimension = (column ? oldNavElement?.getBoundingClientRect().height : oldNavElement?.getBoundingClientRect().width);
            const position = (column ? oldNavElement?.getBoundingClientRect().y : oldNavElement?.getBoundingClientRect().x);
            if (column) verticalAnimation(ref.current, (navElement as HTMLElement), onAnimationEnd, durationMS, { oldDimenstion: dimension || oldDimenstion, oldPosition: position || oldPosition, AADimension }, { leftRightSliderAnimation, setAnimation: setCurrentAnimation });
            else horizontalAnimation(ref.current, (navElement as HTMLElement), onAnimationEnd, durationMS, { oldDimenstion: dimension || oldDimenstion, oldPosition: position || oldPosition, AADimension }, { leftRightSliderAnimation, setAnimation: setCurrentAnimation });
        }
    };

    const interuptAnimation = () => {
        if (currentAnimation.isActive()) {
            setInteruptionFlag(true);
            currentAnimation.time(durationMS/1000);
            onAnimationEnd(true);
        }
    };

    // Triggers and watchers
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
    // To enable elements position and dimensions being tracked while whidow width changes
    useEffect(() => {
        if (oldNavElement !== null) {
            const dimension = (column ? oldNavElement.getBoundingClientRect().height : oldNavElement.getBoundingClientRect().width);
            const position = (column ? oldNavElement.getBoundingClientRect().y : oldNavElement.getBoundingClientRect().x);
            setOldPosition(position);
            setOldDimenstion(dimension);
        }
    }, [windowWidth]);
    // To enable AA morphing
    useEffect(() => {
        if (oldNavElement !== null) {
            if (animationFlag) interuptAnimation();
            else  transitionAnimationArea();
        }
    }, [navElement.getBoundingClientRect().x, navElement.getBoundingClientRect().y]);
    // Cals transitionAnimationArea after the interuption changes oldNavElement
    useEffect(() => {
        if (oldNavElement !== null && interuptionFlag) transitionAnimationArea();
    }, [oldNavElement, interuptionFlag]);
    // To enable the AA to addapt to navElement or initialNavElement during window resizing
    window.addEventListener('resize', () => setWindowWidth(window.innerWidth));
    useEffect(() => {
        const referenceElement = (navElement.isEqualNode(initialElement) ? initialNavElement : navElement) as HTMLElement;
        resizeHandeler(column, { setAADimension, setAAPosition, setDefaultCounterDimension }, referenceElement);
    }, [windowWidth]);
    // To Enable animation
    useEffect(() => {
        if (initialDimension && initialPosition && animationFlag && checkOpositeDirectionChange()) animateSlider();
    }, [animationFlag, AEPosition]);
    useEffect(() => {
        if (!initialNavElement.isEqualNode(initialElement)) AADimensionInitialization();
    }, [initialNavElement]);

    const dependentChildDimesion = (column ? ref.current?.offsetWidth : ref.current?.offsetHeight);
    useEffect(() => {
        if (dependentChildDimesion !== undefined) setDefaultCounterDimension(dependentChildDimesion);
    }, [dependentChildDimesion]);


    const toOmit = (column ? ['column', 'left'] : ['column']);
    const style = {
        backgroundColor: 'transparent',
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
            {render({ column, initialDimension, AEPosition }, ref)}
        </div>
    );
};

export default AnimatedSlider;