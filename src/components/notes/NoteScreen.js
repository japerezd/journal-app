import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { activeNote, startDeleting } from '../../actions/notes';
import { useForm } from '../../hooks/useForm';
import { NotesAppBar } from './NotesAppBar'

export const NoteScreen = () => {

    const dispatch = useDispatch();

    const {active: note} = useSelector(state => state.notes);
    const [formValues, handleInputChange, reset] = useForm(note);
    const {body, title, id} = formValues;

    // Permite almacenar una variable mutable que no va a redibujar todo el componente si cambia
    const activeId = useRef(note.id);

    useEffect(() => {

        if(note.id !== activeId.current){
            reset(note);
            activeId.current = note.id;
        }

    },[note, reset, activeId.current])

    useEffect(() => {
        
        dispatch( activeNote(formValues.id, {...formValues}) );
        
    }, [formValues ,dispatch]);

    const handleDelete = () => {
        dispatch(startDeleting(id));
    }

    return (
        <div className="notes__main-content">
            <NotesAppBar />

            <div className="notes__content">
                <input 
                    type="text"                    
                    placeholder="Some awesome title"
                    className="notes__title-input"
                    autoComplete="off"
                    value = {title}
                    onChange={handleInputChange}
                    name="title"
                />

                <textarea
                    placeholder="What happened today?"
                    className="notes__text-area"
                    value = {body}
                    onChange={handleInputChange}
                    name="body"
                ></textarea>
                {
                    (note.url) &&
                    (
                        <div className="notes__image">
                            <img 
                                src={note.url}
                                alt="imagen"
                            />
                        </div>
                    )
                }

            </div>

            <button 
                className="btn btn-danger"
                onClick={handleDelete}
            >
                Delete
            </button>
        </div>
    )
}
