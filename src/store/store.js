import {createStore, combineReducers, applyMiddleware,compose} from 'redux';
import thunk from 'redux-thunk';

import { authReducer } from '../reducers/authReducer';
import { notesReducer } from '../reducers/notesReducer';
import { uiReducer } from '../reducers/uiReducer';

const reducers = combineReducers({
    auth: authReducer,
    ui: uiReducer,
    notes: notesReducer
});

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;


// Solo se puede enviar 1 reducer, por eso se utiliza la funcion de arriba (combineReducers)
export const store = createStore(
    reducers,
    composeEnhancers(
        applyMiddleware(thunk)
    )
);