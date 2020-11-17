import * as interfaces from '../interfaces';
import React, { createContext, useContext, useReducer, Dispatch } from 'react';
import { initialState, TableUsersState } from './reducer';

const dispatch: Dispatch<any> = function(action: any): void {};

export const StateContext = createContext([initialState, dispatch]);

interface StateProviderInput {
    reducer: (state: TableUsersState, action: any) => TableUsersState,
    initialState: TableUsersState,
    children: JSX.Element,
};


export function StateProvider(stateProviderInput: StateProviderInput): JSX.Element {
    return (
        <StateContext.Provider value={useReducer(stateProviderInput.reducer, stateProviderInput.initialState)}>
            {stateProviderInput.children}
        </StateContext.Provider>
    );
}


// To use inside a component
export function useStateValue() : [TableUsersState, Dispatch<any>] {
    return useContext(StateContext) as [TableUsersState, Dispatch<any>];
}