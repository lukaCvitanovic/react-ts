import { forwardRef, LegacyRef, useEffect, useState, Ref, RefObject } from "react";
import { AnimatedElementProps } from "@/helpers/types";

const AnimatedPill = ({ column = false, initialDimension, AEPosition }: AnimatedElementProps, ref: Ref<HTMLDivElement>) => {
    const defaultCounterDimension = 40;
    const [counterDimension, setCounterDimension] = useState(defaultCounterDimension);

    useEffect(() => {
        if (ref !== null) {
            const { current } = ref as RefObject<HTMLDivElement>;
            const navElement = current?.parentElement?.parentElement;
            const navElementDimension = (column ? navElement?.offsetWidth : navElement?.offsetHeight);
            setCounterDimension(navElementDimension || defaultCounterDimension);
        } else setCounterDimension(defaultCounterDimension);
    }, [ref]);

    return (
        <div
            ref={ref}
            style={{
                position: 'absolute',
                ...AEPosition,
                backgroundColor: 'white',
                borderRadius: '100%',
                width: `${(column ? counterDimension : initialDimension)}px`,
                height: `${(column ? initialDimension : counterDimension)}px`,
            }}
        >
        </div>
    );
};

export default forwardRef(AnimatedPill);