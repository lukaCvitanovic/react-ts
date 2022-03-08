import { AnimatedElementProps } from "@/helpers/types";
import { forwardRef, LegacyRef, RefObject, useEffect, useState } from "react";

const AnimatedBorder = ({ column = false, initialDimension, AEPosition }: AnimatedElementProps, ref: LegacyRef<HTMLHRElement>) => {
    const margin = (column ? { marginTop: '' } : {});
    
    const defaultCounterDimension = 3;
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [mainDimension, setMainDimension] = useState(initialDimension);

    window.addEventListener('resize', () => setWindowWidth(window.innerWidth));
    const { current } = ref as RefObject<HTMLHRElement>;
    useEffect(() => {
        if (ref !== null) {
            const navElement = current?.parentElement;
            const dimension = (column ? navElement?.offsetHeight : navElement?.offsetWidth);
            setMainDimension(dimension || initialDimension);
        }
    }, [windowWidth, initialDimension]);

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
                width: `${(column ? defaultCounterDimension : mainDimension)}px`,
                height: `${(column ? mainDimension : defaultCounterDimension)}px`,
            }}
        />  
    );
};

export default forwardRef(AnimatedBorder);