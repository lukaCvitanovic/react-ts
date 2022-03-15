import { ProviderChildren } from "@/helpers/types";
import { createContext, Dispatch, useReducer } from "react";

type NavTransitionState = {
    navElement: Element,
    previouseElement: Element | null,
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
    previouseElement: null,
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
            return { ...state, navElement: action.payload, previouseElement: state.navElement };
        case 'setInitialElement':
            return { ...state, initialNavElement: action.payload };
        default:
            throw new Error();
    }
};

const NavTransitionProvider = ({ children }: { children: ProviderChildren}) => {
    const [state, dispatch] = useReducer(navTransitionReducer, initialState);

    return (
        <NavTransitionContext.Provider value={{ state, dispatch }}>
            {children}
        </NavTransitionContext.Provider>
    );
};

export default NavTransitionProvider;