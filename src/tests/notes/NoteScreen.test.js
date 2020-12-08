import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { activeNote } from '../../actions/notes';
import { NoteScreen } from '../../components/notes/NoteScreen';

jest.mock('../../actions/notes', () => ({
    activeNote: jest.fn()
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
    auth:{
        uid: '12',
        name:'beto'
    },
    ui:{
        loading: false,
        msgError:null
    },
    notes:{
        notes: [],
        active: {
            id: 1234,
            title: 'Hola',
            body: 'mundo',
            date: 0
        }
    }
};
let store = mockStore(initState);
store.dispatch = jest.fn()

const wrapper = mount(
    <Provider store={store}>
        <NoteScreen />
    </Provider>
)

describe('Pruebas en <NoteScreen />', () => {

    test('debe mostrarse correctamente', () => {
        expect(wrapper).toMatchSnapshot();
    });
    
    test('debe disparar activeNote', () => {

        wrapper.find('input[name="title"]').simulate('change', {
            target:{
                name:'title',
                value: 'que tal'
            }
        });

        expect(activeNote).toHaveBeenLastCalledWith(1234,{
            body: 'mundo',
            title: 'que tal',
            id: 1234,
            date: 0
        });
    })
    
    
})
