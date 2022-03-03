import { useEffect } from "react";

const useColumnNav = (widthTrigger: number, columnFlagSetter: Function) => {
    useEffect(() => window.addEventListener('resize', () => columnFlagSetter(window.innerWidth < widthTrigger)));
    useEffect(() => columnFlagSetter(window.innerWidth < widthTrigger), []);
};

export default useColumnNav;