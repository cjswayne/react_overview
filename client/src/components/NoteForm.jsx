import axios from 'axios'
import { useState, useEffect } from 'react'

function NoteForm({
    setShowNoteForm, 
    setNotes, 
    editNote, 
    setEditNote }){

    // const [noteText, setNoteText] = useState('')
    // const [noteText, setNoteText] = useState(editNote.text ? 'editNote' : '')
    const [noteText, setNoteText] = useState('')
    // const [noteChanged, setNoteChanged] = useState(false)
    // console.log(noteChanged, (noteText && noteChanged))

    useEffect(() => {
        if(editNote){
            setNoteText(editNote.text)
        }
    }, [])

    const closeModal = () => {
        setEditNote(null)
        setShowNoteForm(false)
    }

    const handleCreateOrEditNote = async (e) => {


        e.preventDefault();
        if(noteText.trim()){
            let res

            if(!editNote){
                res = await axios.post('/api/notes', {
                    text:noteText
                })
    
                setNotes((oldState) => {
                    return [...oldState, res.data]
                })
            } else {
              await axios.put(`/api/notes/${editNote._id}`, {
                    note_id:editNote._id,
                    text:noteText
                })
    
                setNotes((oldState) => {
                    // const note = oldState.find((n) => n._id === editNote._id)
                    // note.text = noteText
                    editNote.text = noteText;
                    return [...oldState]
                })
            }
    
            setShowNoteForm(false)
            setEditNote(null)
        } else {
            alert('Input cannot be empty')
        }

    }


    const handleInputChange = async(e) => {
        setNoteText(e.target.value)
    }

    return (
        <div onSubmit={handleCreateOrEditNote}  className="note-form pa4 br4">
            <h1 className="tc mA pa2">{editNote ? 'Edit' : 'Create'} Note</h1>
            <form className="flex flex-column mA items-center">
        <input 
            value={ noteText }
            onChange={handleInputChange} 
            className="ma2 pb3 pt3 pl3 br4 b--black bw2 w-100" 
            type="text" 
            placeholder="Enter Note text" />
        <button className="w-100">{editNote ? 'Save' : 'Create'} Note</button>
            <button onClick={closeModal} className="cancel-btn w-100 ma2 bg-red color-white">Cancel</button>
            </form>
        </div>
    )
}

export default NoteForm