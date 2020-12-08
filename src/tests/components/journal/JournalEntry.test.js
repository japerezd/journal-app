import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { activeNote } from '../../../actions/notes';
import { JournalEntry } from '../../../components/journal/JournalEntry';
import { types } from '../../../types/types';



const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {};

let store = mockStore(initState);
store.dispatch = jest.fn();

const note = {
    id: 10,
    date: 0,
    title: 'hola',
    body: 'mundo',
    url: 'https://algunlugar.com/foto.jpg'
}

const wrapper = mount(
    <Provider store={store}>
            <JournalEntry {...note} />
    </Provider>
)


describe('Pruebas en <JournalEntry />', () => {
    

    test('debe mostrarse correctamente', () => {
        expect(wrapper).toMatchSnapshot();        
    });

    test('debe de activar la nota', () => {
        
        wrapper.find('.journal__entry').simulate('click');
        
        expect(store.dispatch).toHaveBeenCalledWith(
            activeNote(note.id, {...note})
        )

    })
    
    

})
