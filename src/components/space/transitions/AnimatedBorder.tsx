import { AnimatedElementProps } from "@/helpers/types";
import { forwardRef, LegacyRef } from "react";

const AnimatedBorder = ({ column = false, initialDimension, AEPosition }: AnimatedElementProps, ref: LegacyRef<HTMLHRElement>) => {
    const margin = (column ? { marginTop: '' } : {});
    const defaultCounterDimension = 3;

    return (
        <hr
            ref={ref}
            style={{
                position: 'absolute',
                ...margin,
                ...AEPosition,
                borderTopWidth: `${(column ? 0 : `${defaultCounterDimension}px`)}`,
                borderTopColor: 'white',
                borderLeftWidth: `${(column ? `${defaultCounterDimension}px` : 0)}`,
                borderLeftColor: 'white',
                width: `${(column ? defaultCounterDimension : initialDimension)}px`,
                height: `${(column ? initialDimension : defaultCounterDimension)}px`,
                // transform: `translate${column ? 'Y' : 'X'}(${initialX - layoutOffset}px)`
            }}
        />  
    );
};

export default forwardRef(AnimatedBorder);