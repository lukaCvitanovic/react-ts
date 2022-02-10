import { createContext, Dispatch, useReducer, ReactElement } from "react";

type NavTransitionState = {
    navRect: DOMRect,
    initialNavRect: DOMRect,
    transitionFlag: boolean,
};

type NavTransitionAction = 
    | { type: 'setContext', payload: NavTransitionState }
    | { type: 'resetContext' }
    | { type: 'setRect' | 'addRect' | 'setInitialRect', payload: DOMRect };

interface NavTransitionContextInterface {
    state: NavTransitionState,
    dispatch: Dispatch<NavTransitionAction>
};

const initialState = {
    navRect: new DOMRect(),
    initialNavRect: new DOMRect(),
    transitionFlag: false,
};

export const NavTransitionContext = createContext({} as NavTransitionContextInterface);

const navTransitionReducer = (state: NavTransitionState, action: NavTransitionAction) => {
    switch (action.type) {
        case 'setContext':
            return action.payload;
        case 'resetContext':
            return initialState;
        case 'setRect':
            return { ...state, navRect: action.payload };
        case 'setInitialRect':
            return { ...state, initialNavRect: action.payload };
        default:
            throw new Error();
    }
};

const NavTransitionProvider = ({ children }: { children: ReactElement | string | JSX.Element[] | Element[]}) => {
    const [state, dispatch] = useReducer(navTransitionReducer, initialState);

    return (
        <NavTransitionContext.Provider value={{ state, dispatch }}>
            {children}
        </NavTransitionContext.Provider>
    );
};

export default NavTransitionProvider;