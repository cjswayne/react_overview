import {useEffect, useState} from 'react'
import axios from 'axios'
import dayjs from 'dayjs'

function Home({notes, setNotes, setEditNote, setShowNoteForm}){

    const handleEditNote = (note) => {
        setEditNote(note)
        setShowNoteForm(true)
    }

    const deleteNote = async (noteId, index) => {
        await axios.delete(`/api/notes/${noteId}`)

        notes.splice(index, 1)

        setNotes([...notes])


        setEditNote(null)
    }

    useEffect(() => {
        axios.get('/api/notes/')
            .then((res) => {
                setNotes(res.data)

                console.log(res.data)
                console.log(notes)

            })
    }, [])

    return (
        <>
            <h1>Welcome to the note app</h1>
            <div>

            {!notes.length && <h2>No Notes have been added</h2>}

                {notes.map((note, index) => {
                  return ( <div key={note._id} className="note">
                        <h3>{note.text}</h3>
                        <p>Created on: {(dayjs(note.createdAt).format('MM/DD/YYYY hh:mm a'))}</p>
                        <div className="flex flex-row">
                        <button onClick={() => handleEditNote(note)}>Edit Note</button>
                        <button onClick={() => deleteNote(note._id, index)}> Delete Note</button>
                        </div>
                    </div>)
                })}
            </div>
        </>
    )
}

export default Home