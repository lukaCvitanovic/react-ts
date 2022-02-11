import NavButton, { NavButtonProps } from "@/components/space/common/navigation/NavButton";
import { Fragment, useLayoutEffect, useState } from "react";

type NavigationsProps = {
    column?: boolean,
    navigationData: NavButtonProps[],
};

const Navigations = ({ column= false, navigationData }: NavigationsProps) => {
    const [initialRectFlag, setInitialRectFlag] = useState(false);

    useLayoutEffect(() => setInitialRectFlag(true), []);

    const navigations = navigationData.map((navButtonProps) => {
        return (
            <NavButton
                {...navButtonProps}
                key={navButtonProps.number}
                column={column}
                initialRectFlag={initialRectFlag}
            />
        );
    });
    return (
        <Fragment>
            {navigations}
        </Fragment>
    );
};

export default Navigations;