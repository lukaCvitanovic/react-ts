import { createContext, ReactNode, useReducer } from "react";

interface ResultTransitionContextInterface {
    state: ResultTransitionState,
    dispatch: React.Dispatch<ResultTransitionAction>
};

export const ResultTransitionContext = createContext({} as ResultTransitionContextInterface);

type ResultTransitionState = {
    resultRect: DOMRect,
    choiceRect: DOMRect,
    computerResultRect: DOMRect,
    choiceTransitionFlag: boolean,
    showResults: boolean,
    showChoices: boolean,
};
type ResultTransitionAction = 
    | { type: 'updateContext', payload: ResultTransitionState }
    | { type: 'resetContext' }
    | { type: 'setResultRect' | 'setChoiceRect' | 'setComputerResultRect', payload: DOMRect }
    | { type: 'setChoiceTransitionFlag' | 'setShowResults' | 'setShowChoices', payload: boolean }

const initialState: ResultTransitionState = {
    resultRect: new DOMRect(),
    choiceRect: new DOMRect(),
    computerResultRect: new DOMRect(),
    choiceTransitionFlag: false,
    showResults: false,
    showChoices: true,
};

const transitionReducer = (state: ResultTransitionState, action: ResultTransitionAction) => {
    switch (action.type) {
        case 'updateContext':
            return action.payload;
        case 'resetContext':
            return initialState;
        case 'setResultRect':
            return { ...state, resultRect: action.payload };
        case 'setChoiceRect':
            return { ...state, choiceRect: action.payload };
        case 'setComputerResultRect':
            return { ...state, computerResultRect: action.payload };
        case 'setChoiceTransitionFlag':
            return { ...state, choiceTransitionFlag: action.payload };
        case 'setShowResults':
            return { ...state, showResults: action.payload };
        case 'setShowChoices':
            return { ...state, showChoices: action.payload };
        default:
            throw new Error();
    }
};

const ResultTransitionProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(transitionReducer, initialState);
    return (
        <ResultTransitionContext.Provider value={{ state, dispatch }}>
            { children }
        </ResultTransitionContext.Provider>
    );
};

export default ResultTransitionProvider;