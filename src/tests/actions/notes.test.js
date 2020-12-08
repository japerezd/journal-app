import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk'; 
import { startLoadingNotes, startNewNote, startSaveNote, startUploading } from '../../actions/notes';
import { db } from '../../firebase/firebase-config';
import { fileUpload } from '../../helpers/fileUpload';
import { types } from '../../types/types';

jest.mock('../../helpers/fileUpload', ()=>({
    fileUpload: jest.fn(() => {
        return 'https://hola-mundo.com/cosa.jpg';
        // return Promise.resolve('https://sl.com/s.jpg')
    })
}));

const middlewares = [thunk]
const mockStore = configureStore(middlewares);

const initState = {
    auth:{
        uid: 'TESTING'
    },
    notes:{
        active:{
            id: 'YOxdVjKNYiw0Cr8xytoA',
            title: 'hola',
            body: 'mundo'
        }
    }
}

let store = mockStore(initState)


describe('Pruebas con las acciones de notes', () => {

    beforeEach(() => {
        store = mockStore(initState)
    })
    
    test('debe crear una nueva nota startNewNote', async() => {
        
        await store.dispatch(startNewNote());

        const actions = store.getActions();
        
        expect(actions[0]).toEqual({
            type: types.notesActive,
            payload: {
                id: expect.any(String),
                title: '',
                body: '',
                date: expect.any(Number)
            }    
        })
        
        expect(actions[1]).toEqual({
            type: types.notesAddNew,
            payload: {
                id: expect.any(String),
                title: '',
                body: '',
                date: expect.any(Number)
            }    
        });

        const docId = actions[0].payload.id;
        await db.doc(`/TESTING/journal/notes/${docId}`).delete();

    });

    test('startLoadingNotes debe cargar las notas', async() => {
        await store.dispatch(startLoadingNotes('TESTING'));
      
        const actions = store.getActions();

        expect(actions[0]).toEqual({
            type: types.notesLoad,
            payload: expect.any(Array)
        });

        const expected = {
            id: expect.any(String),
            body: expect.any(String),
            title: expect.any(String),
            date: expect.any(Number)
        }

        expect(actions[0].payload[0]).toMatchObject(expected);
    });

    test('startSaveNote debe actualizar la nota', async() => {
        const note = {
            id: 'YOxdVjKNYiw0Cr8xytoA',
            title: 'Algo',
            body: 'mas'
        }

        await store.dispatch(startSaveNote(note));

        const actions = store.getActions();
        expect(actions[0].type).toBe(types.notesUpdated);
        
        const docRec = await db.doc(`/TESTING/journal/notes/${note.id}`).get();
        expect(docRec.data().title).toBe(note.title)

    })
    
    test('startUploading debe actualizar el url del entry', async() => {

        const file = new File([],'foto.jpg');
        await store.dispatch(startUploading(file));

        const docRef = await db.collection('/TESTING/journal/notes/YOxdVjKNYiw0Cr8xytoA').get();
        expect(docRef.data().url).toBe('https://hola-mundo.com/cosa.jpg');
    })
        
    

})
