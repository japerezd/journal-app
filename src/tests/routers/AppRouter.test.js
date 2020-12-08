import React from 'react';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { login } from '../../actions/auth';
import { AppRouter } from '../../routers/AppRouter';
import { act } from '@testing-library/react';
import {firebase} from '../../firebase/firebase-config';


jest.mock('../../actions/auth', () => ({
    login: jest.fn(),
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
    auth:{},
    ui:{
        loading: false,
        msgError:null
    },
    notes:{
        active:{
            id: 'ABC'
        },
        notes: []
    }
};

let store = mockStore(initState);
// Actions must be plain objects. Use custom middleware for async actions. 
//por eso se realiza lo sig:
store.dispatch = jest.fn();


describe('Pruebas en <AppRouter />', () => {

    test('debe llamar al login si estoy autenticado', async() => {
        // son asincronas por que se quiere disparar la autenticacion de firebase

        let user;

        await act( async() => {

            const userCred = await firebase.auth().signInWithEmailAndPassword('test@testing.com','123456');
            user = userCred.user;

            const wrapper = mount(
                <Provider store={store}>
                    <MemoryRouter>
                        <AppRouter />
                    </MemoryRouter>
                </Provider>
            )
        });

        expect(login).toHaveBeenCalledWith('NZzCLcbmLne182B8NBp5kMOSJFp1',null);
        

    })
    
    
})
