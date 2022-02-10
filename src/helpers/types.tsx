import { ReactElement } from "react";
import { UserChoice } from "@/components/RPS/Choices";

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