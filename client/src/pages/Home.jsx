import { useEffect, useState } from 'react'
import axios from 'axios'
import dayjs from 'dayjs'

import { useStore } from '../store'

function Home() {

    const { state, setState } = useStore();
    const [deletingNoteId, setDeletingNoteId] = useState(null)
    const [loading, setLoading] = useState(true)

    const handleEditNote = (note) => {
        setState({
            ...state,
            editNote: note,
            showNoteForm: true
        })

    }

    const deleteNote = async (noteId, index) => {

        setDeletingNoteId(noteId);

        setTimeout(async () => {
            await axios.delete(`/api/notes/${noteId}`)

            state.notes.splice(index, 1)

            // setNotes([...notes])
            setState({
                ...state,
                notes: [...state.notes],
                editNote: null
            })

            setDeletingNoteId(null);

        }, 1000)


    }

    useEffect(() => {
       axios.get('/api/notes/')
            .then((res) => {
                setState({
                    ...state,
                    notes: res.data
                })
                setLoading(false)
            })
    }, [])

    return (
        <>
            <div>
                {loading ? (
                    <h1>Loading...</h1>
                ) : (
                    <>
                        <h1>Welcome to the note app</h1>
                        <div className="flex flex-column-reverse">
                            {!state.notes.length && <h2>No Notes have been added</h2>}
                            {state.notes.map((note, index) => (
                                <div key={note._id} className={`note ${deletingNoteId === note._id ? 'fade-out' : ''}`}>
                                    <h3>{deletingNoteId === note._id ? 'Deleting...' : note.text}</h3>
                                    <p>Created on: {dayjs(note.createdAt).format('MM/DD/YYYY hh:mm a')}</p>
                                    <div className="flex flex-row">
                                        <button onClick={() => handleEditNote(note)}>Edit Note</button>
                                        <button onClick={() => deleteNote(note._id, index)}> Delete Note</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </>
    )
}

export default Home