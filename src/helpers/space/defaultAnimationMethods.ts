import { gsap } from 'gsap';
import { AnimationMethod, ResizeHandeler } from '@/helpers/types';

export const defaultdHorizontalAnimation: AnimationMethod = (ref, navElement, onAnimationComplete, durationMS, { oldDimenstion, oldPosition, AADimension }, leftRightSliderAnimation) => {
    const timeline = gsap.timeline({ onComplete: onAnimationComplete });

    const startAnimationWidthDifference = ( oldDimenstion > navElement.getBoundingClientRect().width ? (oldDimenstion * 1.2) - oldDimenstion : (navElement.getBoundingClientRect().width * 1.2) - oldDimenstion);
    const endAnimationWidthDifference = oldDimenstion + startAnimationWidthDifference - navElement.getBoundingClientRect().width;

    const left = () => {
        const stratingWidthAnimationPercentage = startAnimationWidthDifference / (oldPosition - navElement.getBoundingClientRect().x);
        const stratingWidthAnimatkionPercentageString = `${stratingWidthAnimationPercentage*100}%`;
        const endWidthAnimationPercentage = endAnimationWidthDifference / (oldPosition - navElement.getBoundingClientRect().x);
        const endWidthAnimationPercentageStrign = `${100 - endWidthAnimationPercentage*100}%`;

        const startAnimationWidth = startAnimationWidthDifference + oldDimenstion;
        const keyframes = {
            "0%": { left: AADimension - oldDimenstion },
            [stratingWidthAnimatkionPercentageString]: { width: startAnimationWidth, left: AADimension - startAnimationWidth }, 
            [endWidthAnimationPercentageStrign]: { left: 0 },
            "100%": { width: navElement.getBoundingClientRect().width },
            easeEach: 'none',
            ease: 'power2.inOut'
        }
        timeline.to(ref, { duration: (durationMS / 1000), keyframes, animationFillMode: 'forward' });
    };
    const right = () => {
        const stratingWidthAnimationPercentage = startAnimationWidthDifference / (navElement.getBoundingClientRect().x - oldPosition);
        const stratingWidthAnimationPercentageString = `${stratingWidthAnimationPercentage*100}%`;
        const endWidthAnimationPercentage = endAnimationWidthDifference / (navElement.getBoundingClientRect().x - oldPosition);
        const endWidthAnimationPercentageStrign = `${100 - endWidthAnimationPercentage*100}%`;

        const startAnimationWidth = startAnimationWidthDifference + oldDimenstion;
        const right = ref.style.right;

        const keyframes = {
            "0%": { left: '', right: AADimension - oldDimenstion },
            [stratingWidthAnimationPercentageString]: { width: startAnimationWidth, left: '', right: AADimension - startAnimationWidth },
            [endWidthAnimationPercentageStrign]: { width: startAnimationWidth },
            "100%": { width: navElement.getBoundingClientRect().width, right: 0 },
            easeEach: 'none',
            ease: 'power2.inOut'
        };
        timeline.to(ref, { duration: durationMS / 1000, keyframes, animationFillMode: 'forward', onComplete: () => { ref.style.right = right; } });
    };
    
    leftRightSliderAnimation(left, right);
};

export const defaultVerticalAnimation: AnimationMethod = (ref, navElement, onAnmationComplete, durationMS, { oldDimenstion, oldPosition, AADimension }, leftRightSliderAnimation) => {
    const timeline = gsap.timeline({ onComplete: onAnmationComplete });

        const startAnimationWidthDifference = ( oldDimenstion > navElement.getBoundingClientRect().height ? (oldDimenstion * 1.2) - oldDimenstion : (navElement.getBoundingClientRect().height * 1.2) - oldDimenstion);
        const endAnimationWidthDifference = oldDimenstion + startAnimationWidthDifference - navElement.getBoundingClientRect().height;

        const up = () => {
            const stratingWidthAnimationPercentage = startAnimationWidthDifference / (oldPosition - navElement.getBoundingClientRect().y);
            const stratingWidthAnimationPercentageString = `${stratingWidthAnimationPercentage*100}%`;
            const endWidthAnimationPercentage = endAnimationWidthDifference / (oldPosition - navElement.getBoundingClientRect().y);
            const endWidthAnimationPercentageStrign = `${100 - endWidthAnimationPercentage*100}%`;

            const startAnimationHeight = startAnimationWidthDifference + oldDimenstion;

            const keyframes = {
                "0%": { top: AADimension - oldDimenstion },
                [stratingWidthAnimationPercentageString]: { height: startAnimationWidthDifference + oldDimenstion, top: AADimension - startAnimationHeight }, 
                [endWidthAnimationPercentageStrign]: { top: 0 },
                "100%": { height: navElement.getBoundingClientRect().height },
                easeEach: 'none',
                ease: 'power2.inOut'
            }
            timeline.to(ref, { duration: (durationMS / 1000), keyframes, animationFillMode: 'forward' });
        };
        const down = () => {
            const stratingWidthAnimationPercentage = startAnimationWidthDifference / (navElement.getBoundingClientRect().y - oldPosition);
            const stratingWidthAnimationPercentageString = `${stratingWidthAnimationPercentage*100}%`;
            const endWidthAnimationPercentage = endAnimationWidthDifference / (navElement.getBoundingClientRect().y - oldPosition);
            const endWidthAnimationPercentageStrign = `${100 - endWidthAnimationPercentage*100}%`;

            const startAnimationHeight = startAnimationWidthDifference + oldDimenstion;

            const keyframes = {
                "0%": { top: '', bottom: AADimension - oldDimenstion },
                [stratingWidthAnimationPercentageString]: { height: startAnimationWidthDifference + oldDimenstion, top: '' ,bottom: AADimension - startAnimationHeight },
                [endWidthAnimationPercentageStrign]: { height: startAnimationWidthDifference + oldDimenstion },
                "100%": { height: navElement.getBoundingClientRect().height, bottom: 0 },
                easeEach: 'none',
                ease: 'power2.inOut'
            };
            timeline.to(ref, { duration: durationMS / 1000, keyframes, animationFillMode: 'forward' });
        };
        leftRightSliderAnimation(up, down);
};

export const defaultResizeHandeler: ResizeHandeler = (column, { setAADimension, setAAPosition, setDefaultCounterDimension }, referenceElement) => {
    if (column) {
        setAADimension(referenceElement.offsetHeight);
        setDefaultCounterDimension(referenceElement.offsetHeight);
        setAAPosition((currentPosition) => ({ ...currentPosition, top: referenceElement.offsetTop }));
    } else {
        setAADimension(referenceElement.offsetWidth);
        setDefaultCounterDimension(referenceElement.offsetWidth);
        setAAPosition((currentPosition) => ({ ...currentPosition, left: referenceElement.offsetLeft }));
    }
};