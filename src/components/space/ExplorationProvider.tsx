import { createContext, Dispatch, useReducer } from "react";
import { ProviderChildren } from "@/helpers/types";
import useExplore from "@/helpers/space/useExplore";

type ExploreState = {
    exploreTrigger: boolean,
    routes: string[],
    prefix: string,
};

type ExploreActions =
    | { type: 'setExplore', payload: boolean }
    | { type: 'setRoutes', payload: string[] }
    | { type: 'setPrefix', payload: string };

interface ExploreContextInterface {
    state: ExploreState,
    dispatch: Dispatch<ExploreActions>,
};

const initialState: ExploreState = {
    exploreTrigger: false,
    routes: [],
    prefix: 'space',
};
export const ExplorationContext = createContext({} as ExploreContextInterface);

const explorationReducer = (state: ExploreState, action: ExploreActions) => {
    switch (action.type) {
        case 'setExplore':
            return { ...state, exploreTrigger: action.payload };
        case 'setRoutes':
            return { ...state, routes: action.payload };
        case 'setPrefix':
            return { ...state, prefix: action.payload };
        default:
            throw new Error();
    };
};

const ExplorationProvider = ({ children }: { children: ProviderChildren }) => {
    const [state, dispatch] = useReducer(explorationReducer, initialState);
    
    const onComplete = () => dispatch({ type: 'setExplore', payload: false });

    useExplore(state.exploreTrigger, state.prefix, state.routes, onComplete);

    return (
        <ExplorationContext.Provider value={{ state, dispatch }}>
            { children }
        </ExplorationContext.Provider>
    );
};

export default ExplorationProvider;