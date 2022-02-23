import { createContext, Dispatch, useReducer, ReactElement } from "react";

type NavTransitionState = {
    navElement: Element,
    initialNavElement: Element,
    transitionFlag: boolean,
};

type NavTransitionAction = 
    | { type: 'setContext', payload: NavTransitionState }
    | { type: 'resetContext' }
    | { type: 'setElement' | 'addElement' | 'setInitialElement', payload: Element };

interface NavTransitionContextInterface {
    state: NavTransitionState,
    dispatch: Dispatch<NavTransitionAction>
};

const element = document.createElement('div');
element.id = 'initialElement';
export const initialElement = element;

const initialState = {
    navElement: initialElement,
    initialNavElement: initialElement,
    transitionFlag: false,
};

export const NavTransitionContext = createContext({} as NavTransitionContextInterface);

const navTransitionReducer = (state: NavTransitionState, action: NavTransitionAction) => {
    switch (action.type) {
        case 'setContext':
            return action.payload;
        case 'resetContext':
            return initialState;
        case 'setElement':
            return { ...state, navElement: action.payload };
        case 'setInitialElement':
            return { ...state, initialNavElement: action.payload };
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