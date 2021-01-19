import { Action, Reducer } from 'redux';
import { AppThunkAction } from './';
import App from '../App';

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

export interface SubmitUserAction {
    type: 'SUBMIT_USER';
}

export interface UpdateFieldAction {
    type: "UPDATE_FIELD";
    name: string;
    value: string;
}


// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
type KnownAction = SubmitUserAction | UpdateFieldAction;

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {
    SubmitUser: (): AppThunkAction<KnownAction> => (dispatch, getState) => {
        
        const appState = getState();
        if (appState && appState.Home) {

            /** Make Axios request */
            console.log(appState.Home);
            
        }
    },
    UpdateField: (name: string, val: string): AppThunkAction<KnownAction> => (dispatch, getState) => {
        const appState = getState();
        if (appState && appState.Home) {

            dispatch({ type: 'UPDATE_FIELD', name: name, value: val });
        }

        
    }
};

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

const unloadedState: HomeState = { activity: '', firstName: '', lastName: '', email: '', comments: '',  isLoading: false };

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
        case 'UPDATE_FIELD':
            let newState = state;
            let val = action.value;

            if (action.name === 'firstName') {
                newState.firstName = val;
            }

            if (action.name === 'lastName') {
                newState.lastName = val;
            }

            if (action.name === 'email') {
                newState.email = val;
            }


            if (action.name === 'comments') {
                newState.comments = val;
            }

            if (action.name === 'activity') {
                newState.activity = val;
            }

            return newState;
 
        default:
            return state;

    }

   
};