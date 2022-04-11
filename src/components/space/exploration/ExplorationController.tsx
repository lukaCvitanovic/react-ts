import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faCirclePause, faCirclePlay, faCircleStop } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState, useContext, useRef } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import { ExplorationContext } from '@/components/space/exploration/ExplorationProvider';

type Redirection = {
    value: () => void,
    done: boolean,
};

const ExplorationController = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const { state: { playTrigger }, dispatch } = useContext(ExplorationContext);

    const initialRunningValue = false;
    const prefix = 'space';
    const routes = [
        'destinations/moon',
        'destinations/mars',
        'destinations/europa',
        'destinations/titan',
        'crews/douglas-hurley',
        'crews/mark-shuttleworth',
        'crews/victor-glover',
        'crews/anousheh-ansari',
        'technologies/launch-vehicle',
        'technologies/spaceport',
        'technologies/space-capsule',
        'home',
    ];
    const index = (location.pathname === `/${prefix}/home` ? 0 : routes.findIndex((route) => `/${prefix}/${route}` === location.pathname) + 1);

    const [play, setPlay] = useState(initialRunningValue);
    const [stoped, setStoped] = useState(true);

    const [running, setRunning] = useState(initialRunningValue);
    const [explorationRedirect, setExplorationRedirect] = useState<Redirection>({} as Redirection);

    const runningRef = useRef(running);
    runningRef.current = running;

    // Exploration Controlles
    const onPlayPause = () => {
        if (play) pause();
        else unpause();
    }
    const onStop = () => stop();

    const start = () => {
        if (location.pathname === `/${prefix}/home` && !running) {
            const redirection = _iterateExploreRedirect();
            setRunning(true);
            setStoped(false);
            _runRedirection(redirection, true);
        }
    };

    const pause = () => setRunning(false);

    const unpause = () => {
        setRunning(true);
        _runRedirection(undefined, true);
    };

    const stop = () => {
        setRunning(false);
        setStoped(true);
        setExplorationRedirect({} as Redirection);
        dispatch({ type: 'setTrigger', payload: false });
    };

    const _iterateExploreRedirect = () => {
        const redirection = _explorationIterator();
        setExplorationRedirect(redirection);
        return redirection;
    };

    const _explorationIterator = () => {
        if (routes.length > index) return _iterate();
        _onDone();
        return _iterationEnd();
    };

    const _iterate = (): Redirection => ({
        value: () => {
            // const route = routes[index];
            const route = _getNextRoute();
            setTimeout(() => _performRedirection(route), 3000);
        },
        done: false
    });

    const _iterationEnd = (): Redirection => ({
        value: () => {},
        done: true
    });

    const _onDone = () => {
        setRunning(false);
    };

    const _performRedirection = (route: string) => {
        if (runningRef.current) navigate(route);
    };

    const _runRedirection = (redirection: Redirection | undefined = undefined, run: boolean | undefined = undefined) => {
        const localRedirection = redirection || explorationRedirect;
        const localRunning = run || runningRef.current;
        if (localRunning) localRedirection.value();
    };

    const _getNextRoute = () => {
        return routes[index];
    };
    // Exploration Controlles

    const currentIcon = (play ? faCirclePause : faCirclePlay) as IconProp;

    useEffect(() => {
        if (playTrigger) start();
    }, [playTrigger]);

    useEffect(() => setPlay(running), [running]);

    useEffect(() => {
        const redirect = _iterateExploreRedirect();
        _runRedirection(redirect);
    }, [location.pathname]);

    const animationClass = (!stoped ? '' : '-translate-x-28');

    return (
        <div 
            className={`flex w-full h-full p-2 items-center rounded-full bg-white/[.15] transition duration-500 ease-in-out ${animationClass}`}
        >
            <button
                className='mr-2'
                onClick={onPlayPause}
                disabled={stoped}
            >
                <FontAwesomeIcon
                    icon={currentIcon}
                    className="text-white/[.85] fa-2x"
                />
            </button>
            <button
                onClick={onStop}
                disabled={stoped}
            >
                <FontAwesomeIcon
                    icon={faCircleStop as IconProp}
                    className="text-white/[.85] fa-2x"
                />
            </button>
        </div>
    );
};

export default ExplorationController;