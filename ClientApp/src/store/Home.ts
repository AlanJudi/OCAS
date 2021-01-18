import { Action, Reducer } from 'redux';
import { AppThunkAction } from './';
import { User } from './Activities';

// -----------------
// STATE - This defines the type of data maintained in the Redux store.

export interface HomeState {
    isLoading: boolean;
    firstName: string;
    lastName: string;
    email: string;
    comments: string;
    activity: string;
}

// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.

interface SubmitUserAction {
    type: 'SUBMIT_USER';
    user: User;
}


// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
type KnownAction = SubmitUserAction;

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {
    SubmitUser: (user: User): AppThunkAction<KnownAction> => (dispatch, getState) => {
        
        const appState = getState();
        if (appState && appState.Home) {
   

            dispatch({ type: 'SUBMIT_USER', user: user });
        }
    }
};

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

const unloadedState: HomeState = { activity: '0', firstName: '', lastName: '', email: '', comments: '',  isLoading: false };

export const reducer: Reducer<HomeState> = (state: HomeState | undefined, incomingAction: Action): HomeState => {
    if (state === undefined) {
        return unloadedState;
    }

    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'SUBMIT_USER':
            return {
                activity: state.activity,
                firstName: state.firstName,
                lastName: state.lastName,
                email: state.email,
                comments: state.comments,
                isLoading: true
            };
            break;
    }

    return state;
};