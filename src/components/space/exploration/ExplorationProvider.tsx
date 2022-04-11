import { createContext, Dispatch, useReducer } from "react";
import { ProviderChildren } from "@/helpers/types";

type ExploreState = {
    playTrigger: boolean,
};

type ExploreActions = { type: 'setTrigger', payload: boolean };

interface ExploreContextInterface {
    state: ExploreState,
    dispatch: Dispatch<ExploreActions>,
};

const initialState: ExploreState = {
    playTrigger: false
};

export const ExplorationContext = createContext({} as ExploreContextInterface);

const explorationReducer = (state: ExploreState, action: ExploreActions) => {
    switch (action.type) {
        case 'setTrigger':
            return { ...state, playTrigger: action.payload };
        default:
            throw new Error();
    };
};

const ExplorationProvider = ({ children }: { children: ProviderChildren }) => {
    const [state, dispatch] = useReducer(explorationReducer, initialState);

    return (
        <ExplorationContext.Provider value={{ state, dispatch }}>
            { children }
        </ExplorationContext.Provider>
    );
};

export default ExplorationProvider;