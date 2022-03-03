import { ReactElement } from "react";
import { UserChoice } from "@/components/RPS/Choices";
import { boolean } from "mathjs";

export type BaseProps = Readonly<{
    className?: string,
    children?: ReactElement | string,
    name?: string,
}>;

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

export type LeftRightSliderAnimation = (onLeft: () => void, onRight: () => void) => void;

export type AnimationMethod = (ref: HTMLElement, navElement: HTMLElement, onAnimationComplete: Callback, durationMS: number, positionsAndDimensions: PositionDimension, leftRightSliderAnimation: LeftRightSliderAnimation) => void;