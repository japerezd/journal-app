import React from 'react';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { mount } from 'enzyme';
import { LoginScreen } from '../../../components/auth/LoginScreen';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { startGoogleLogin, startLoginEmailPassword } from '../../../actions/auth';

jest.mock('../../../actions/auth', () => ({
    startGoogleLogin: jest.fn(),
    startLoginEmailPassword: jest.fn()
}))

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
    auth:{},
    ui:{
        loading: false,
        msgError:null
    }
};

let store = mockStore(initState);
// Actions must be plain objects. Use custom middleware for async actions. 
//por eso se realiza lo sig:
store.dispatch = jest.fn();

const wrapper = mount(
    <Provider store={store}>
        <MemoryRouter>
            <LoginScreen />
        </MemoryRouter>
    </Provider>
)

describe('Pruebas en <LoginScreen />', () => {

    beforeEach(() => {
        store = mockStore(initState);
        jest.clearAllMocks();
    })


    test('debe mostrarse correctamente', () => {
        expect(wrapper).toMatchSnapshot();
    });

    test('debe disparar la accion de startGoogleLogin', () => {

        wrapper.find('.google-btn').prop('onClick')();
        expect(startGoogleLogin).toHaveBeenCalled();
    });

    test('debe disparar el startLogin con los respectivos argumentos', () => {
        wrapper.find('form').simulate('submit', {preventDefault(){}});
        expect(startLoginEmailPassword).toHaveBeenCalledWith('beto@gmail.com', '123456')
    })
    
    
    
    
})
