import NavButton, { NavButtonProps } from "@/components/space/common/navigation/NavButton";
import { Fragment, useLayoutEffect, useState } from "react";

type NavigationsProps = {
    column?: boolean,
};

const navigatonData: NavButtonProps[] = [
    {
        to: '/space/home',
        number: 0,
        title: 'home'
    },
    {
        to: '/space/destinations',
        number: 1,
        title: 'destination'
    },
    {
        to: '/space/crews',
        number: 2,
        title: 'crew'
    },
    {
        to: '/space/technologies',
        number: 3,
        title: 'technology'
    },
];

const Navigations = ({ column= false }: NavigationsProps) => {
    const [initialRectFlag, setInitialRectFlag] = useState(false);

    useLayoutEffect(() => setInitialRectFlag(true), []);

    const navigations = navigatonData.map(({ to, number, title }) => {
        return (
            <NavButton
                to={to}
                number={number}
                title={title}
                key={number}
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