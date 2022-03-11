import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

type UseExplore = (start: boolean, prefix: string, routes: string[], onComplete: Function) => void;

const useExplore: UseExplore = (start, prefix, routes, onComplete) => {
    const [trigger, setTrigger] = useState(false);
    const [index, setIndex] = useState(0);

    const navigate = useNavigate();
    const location = useLocation();

    const reset = () => {
        setTrigger(false);
        setIndex(0);
    };
    const onDone = () => {
        reset();
        onComplete();
    };

    const exploreIterator = (routes: string[], prefix: string, timeout: number) => {
        return {
            next: () => {
                if (routes.length > index) {
                    console.log(routes[index]);
                    return {
                        value: () => {
                            const route = routes[index];
                            setIndex((currentIndex) => currentIndex + 1);
                            setTimeout(() => navigate(`${prefix}/${route}`), timeout);
                        },
                        done: false,
                    }
                }
                onDone();
                return {
                    value: () => {},
                    done: true,
                };
            },
        };
    };

    const spaceExplore = exploreIterator(routes, '/space', 3000);

    useEffect(() => {
        if (start && location.pathname === `/${prefix}/home`) setTrigger(true);
    }, [start]);
    useEffect(() => {
        if (trigger) {
            const { value: redirect, done } = spaceExplore.next();
            if (!done) redirect();
        }
    }, [location.pathname, trigger]);
};

export default useExplore;