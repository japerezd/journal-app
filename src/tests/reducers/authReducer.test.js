const { authReducer } = require("../../reducers/authReducer")
const { types } = require("../../types/types")

describe('Pruebas sobre authReducer', () => {
    

    test('debe regresar el uid y el name para el type.login', () => {
        const action = {
            type: types.login,
            payload:{
                uid: '12345',
                displayName: 'Beto'
            }
        }

        const state = authReducer({},action);
        expect(state).toEqual({uid: '12345', name:'Beto'});
    });

    test('debe regresar objeto vacio cuando el type.logout', () => {
        const action = {
            type: types.logout
        }

        const initialState = {uid:'1234', displayName:'beto'}

        const state = authReducer(initialState, action);
        expect(state).toEqual({});
    });

    test('debe regresar el state por defecto', () => {
        const action = {
            type: types.notesActive
        }

        const initialState = {uid: '1234', displayName: 'Beto'}

        const state = authReducer(initialState, action);
        expect(state).toEqual(initialState);
    });
    
})
