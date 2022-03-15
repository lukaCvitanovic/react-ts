import { forwardRef, useEffect, useState, Ref, RefObject } from "react";
import { AnimatedElementProps, AnimationMethod, ResizeHandeler } from "@/helpers/types";
import { gsap } from 'gsap';

// Animation methods
export const horizontalAnimation: AnimationMethod = (ref, navElement, onAnimationComplete, durationMS, { oldDimenstion, AADimension }, { leftRightSliderAnimation, setAnimation }) => {
    const timeline = gsap.timeline({ onComplete: onAnimationComplete });
    setAnimation(timeline);

    const left = () => {
        const keyframes = {
            "0%": { right: 0, width: oldDimenstion },
            "50%": { width: AADimension, left: 0 },
            "100%": { width: navElement.offsetWidth },
            easeEach: 'none',
            ease: 'power2.inOut'
        };
        timeline.to(ref, { duration: (durationMS / 1000), keyframes, animationFillMode: 'forward' });
    };
    const right = () => {
        const right = ref.style.right;
        const keyframes = {
            "0%": { left: 0, width: oldDimenstion },
            "50%": { width: AADimension, right: 0, left: '' },
            "100%": { width: navElement.offsetWidth },
            easeEach: 'none',
            ease: 'power2.inOut'
        };
        timeline.to(ref, { duration: (durationMS / 1000), keyframes, onComplete: () => { ref.style.right = right } });
    };

    leftRightSliderAnimation(left, right);  
};
export const verticalAnimation: AnimationMethod = (ref, navElement, onAnimationComplete, durationMS, { oldDimenstion, AADimension }, { leftRightSliderAnimation, setAnimation }) => {
    const timeline = gsap.timeline({ onComplete: onAnimationComplete });
    setAnimation(timeline);
    
    const up = () => {
        const keyframes = {
            "0%": { height: oldDimenstion },
            "50%": { height: AADimension, bottom: 0 },
            "100%": { height: navElement.offsetHeight, bottom: `${AADimension - oldDimenstion}px`, top: '' },
            easeEach: 'none',
            ease: 'power2.inOut'
        };
        timeline.to(ref, { duration: (durationMS / 1000), keyframes, animationFillMode: 'forward' });
        timeline.set(ref, { bottom: 0 });
    };
    const down = () => {
        const keyframes = {
            "0%": { height: oldDimenstion },
            "50%": { height: AADimension, top: 0 },
            "100%": { height: navElement.offsetHeight, top: `${AADimension - oldDimenstion}px`, bottom: ''},
            easeEach: 'none',
            ease: 'power2.inOut'
        };
        timeline.to(ref, { duration: (durationMS / 1000), keyframes, animationFillMode: 'forward' });
        timeline.set(ref, { top: 0 });
    };

    leftRightSliderAnimation(up, down);
};

export const resizeHandeler: ResizeHandeler = (column, { setAADimension, setAAPosition, setDefaultCounterDimension }, referenceElement) => {
    if (column) {
        setAADimension(referenceElement.offsetWidth);
        setDefaultCounterDimension(referenceElement.offsetWidth);
        setAAPosition((currentPosition) => ({ ...currentPosition, top: referenceElement.offsetTop }));
    } else {
        setAADimension(referenceElement.offsetHeight);
        setDefaultCounterDimension(referenceElement.offsetHeight);
        setAAPosition((currentPosition) => ({ ...currentPosition, left: referenceElement.offsetLeft }));
    }  
};

const AnimatedPill = ({ column = false, initialDimension, AEPosition }: AnimatedElementProps, ref: Ref<HTMLDivElement>) => {
    const defaultCounterDimension = 40;
    const [counterDimension, setCounterDimension] = useState(defaultCounterDimension);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [mainDimension, setMainDimension] = useState(initialDimension);

    window.addEventListener('resize', () => setWindowWidth(window.innerWidth));
    const { current } = ref as RefObject<HTMLDivElement>;
    useEffect(() => {
        if (ref !== null) {
            const navElement = current?.parentElement?.parentElement;
            const navElementDimension = (column ? navElement?.offsetWidth : navElement?.offsetHeight);
            setCounterDimension(navElementDimension || defaultCounterDimension);
        } else setCounterDimension(defaultCounterDimension);
    }, [current]);
    // To enable addapting to AA dimension during window resize
    useEffect(() => {
        if (ref !== null) {
            const navElement = current?.parentElement;
            const dimension = (column ? navElement?.offsetWidth : navElement?.offsetHeight);
            setCounterDimension(dimension || defaultCounterDimension);
        }
    }, [windowWidth]);
    useEffect(() => {
        if (ref !== null) {
            const navElement = current?.parentElement;
            const dimension = (column ? navElement?.offsetHeight : navElement?.offsetWidth);
            setMainDimension(dimension || initialDimension);
        }
    }, [windowWidth, initialDimension]);

    return (
        <div
            ref={ref}
            style={{
                position: 'absolute',
                ...AEPosition,
                backgroundColor: 'white',
                borderRadius: `${counterDimension / 2}px`,
                width: `${(column ? counterDimension : mainDimension)}px`,
                height: `${(column ? mainDimension : counterDimension)}px`,
            }}
        >
        </div>
    );
};

export default forwardRef(AnimatedPill);