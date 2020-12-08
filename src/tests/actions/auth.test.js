import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { login, logout, startLoginEmailPassword, startLogout } from '../../actions/auth';
import { types } from '../../types/types';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {};

let store = mockStore(initState);

describe('Pruebas con las acciones de auth', () => {
    
    beforeEach(() => {
        store = mockStore(initState);
    })

    test('login y logout deben crear la accion respectiva', () => {
        
        const loginAction = login('123','beto');
        const action = {
            type: types.login,
            payload:{
                uid: '123',
                displayName: 'beto'
            }
        }

        expect(loginAction).toEqual(action);

        const logoutAction = logout();
        expect(logoutAction).toEqual({
            type: types.logout
        })

    });

    test('debe realizar el logout', async() => {
        
       await store.dispatch(startLogout());

       const actions = store.getActions();

       expect(actions[0]).toEqual({
           type: types.logout
       })

       expect(actions[1]).toEqual({
        type: types.notesLogoutCleaning
    })

    })

    test('debe iniciar el startLoginEmailPassword', async() => {
        await store.dispatch(startLoginEmailPassword('test@testing.com', '123456'));

        const actions = store.getActions();
        
        expect(actions[1]).toEqual({
            type: types.login,
            payload:{
                uid: 'NZzCLcbmLne182B8NBp5kMOSJFp1',
                displayName: null
            }
        })
    })
    
    
    
    
})
