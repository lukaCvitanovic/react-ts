import { ReactElement, SetStateAction } from "react";
import { UserChoice } from "@/components/RPS/Choices";

export type BaseProps = Readonly<{
    className?: string,
    children?: ReactElement | string,
    name?: string,
}>;

export type ProviderChildren = ReactElement | string | JSX.Element[] | Element[];

export type NonCalcGameStats = {
    win: boolean,
    userChoice: UserChoice,
    computerChoice: UserChoice,
};

export type AnimatedElementPosisition = {
    top: number | string,
    bottom: number | string,
    left: number | string,
    right: number | string,
};

export type AnimatedAreaProps = {
    column?: boolean,
};

export type AnimatedAreaPosition = 
    | { bottom: 0, left: number | string, right: number | string, column: false }
    | { top: number, right: 0, column: true };

export type AnimatedElementProps = AnimatedAreaProps & {
    initialDimension: number,
    AEPosition: AnimatedElementPosisition,
};

export type Callback = (...args: any[]) => void | null;

export type PositionDimension = {
    oldDimenstion: number,
    oldPosition: number,
    AADimension: number,
};

export type AnimationPreviousCallback = (prevous?: boolean) => void;

export type AnimationStartEndAA = (referenceElement: Element) => void;

export type LeftRightSliderAnimation = (onLeft: () => void, onRight: () => void) => void;

export type AnimationMethodCallbacks = {
    leftRightSliderAnimation: LeftRightSliderAnimation,
    setAnimation: (value: SetStateAction<gsap.core.Timeline>) => void,
};

export type AnimationMethod = (ref: HTMLElement, navElement: HTMLElement, onAnimationComplete: Callback, durationMS: number, positionsAndDimensions: PositionDimension, callbacks: AnimationMethodCallbacks) => void;

export type ResizeHandelerSetters = {
    setAADimension: (value: SetStateAction<number>) => void,
    setDefaultCounterDimension: (value: SetStateAction<number>) => void,
    setAAPosition: (value: SetStateAction<AnimatedAreaPosition>) => void,
};

export type ResizeHandeler = (column: boolean, setters: ResizeHandelerSetters, referenceElement: HTMLElement) => void;