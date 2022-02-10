import { ReactElement, useLayoutEffect, useRef } from "react";

type BoundingRectProps = {
    children: ReactElement | string | JSX.Element | JSX.Element[],
    onGetBoundingRect: Function,
};

const BoundingRect = ({ children, onGetBoundingRect }: BoundingRectProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const dep = ref.current?.getBoundingClientRect() ? [ref.current.getBoundingClientRect().x, ref.current.getBoundingClientRect().y] : [0, 0];

    useLayoutEffect(() => {
        if(onGetBoundingRect) onGetBoundingRect(ref.current?.getBoundingClientRect());
    }, dep);

    return (
        <div ref={ref}>
            {children}
        </div>
    );
};

export default BoundingRect;