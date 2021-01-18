import { Action, Reducer } from 'redux';
import { AppThunkAction } from './';

// -----------------
// STATE - This defines the type of data maintained in the Redux store.

export interface ActivityUsersState {
    isLoading: boolean;
    activityName?: string;
    users: User[];
}

export interface User {
    firstName: string;
    lastName: string;
    Email: string;
}

// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.

interface RequestActivityUsersAction {
    type: 'REQUEST_ACTIVITY_USERS';
    activityName: string;
}

interface ReceiveActivityUsersAction {
    type: 'RECEIVE_ACTIVITY_USERS';
    activityName: string;
    users: User[];
}

// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
type KnownAction = RequestActivityUsersAction | ReceiveActivityUsersAction;

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {
    requestActivityUsers: (activityName: string): AppThunkAction<KnownAction> => (dispatch, getState) => {
        // Only load data if it's something we don't already have (and are not already loading)
        const appState = getState();
        if (appState && appState.activityUsers && activityName !== appState.activityUsers.activityName) {
            fetch(`activityusers`)
                .then(response => response.json() as Promise<User[]>)
                .then(data => {
                    dispatch({ type: 'RECEIVE_ACTIVITY_USERS', activityName: activityName, users: data });
                });

            dispatch({ type: 'REQUEST_ACTIVITY_USERS', activityName: activityName });
        }
    }
};

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

const unloadedState: ActivityUsersState = { users: [], isLoading: false };

export const reducer: Reducer<ActivityUsersState> = (state: ActivityUsersState | undefined, incomingAction: Action): ActivityUsersState => {
    if (state === undefined) {
        return unloadedState;
    }

    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'REQUEST_ACTIVITY_USERS':
            return {
                activityName: action.activityName,
                users: state.users,
                isLoading: true
            };
        case 'RECEIVE_ACTIVITY_USERS':
            // Only accept the incoming data if it matches the most recent request. This ensures we correctly
            // handle out-of-order responses.
            if (action.activityName === state.activityName) {
                return {
                    activityName: action.activityName,
                    users: action.users,
                    isLoading: false
                };
            }
            break;
    }

    return state;
};