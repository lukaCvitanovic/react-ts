import { ReactElement } from "react";

export type BaseProps = Readonly<{
    className?: string,
    children?: ReactElement,
    name?: string
}>;