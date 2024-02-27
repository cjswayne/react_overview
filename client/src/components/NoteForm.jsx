import axios from 'axios'
import { useState, useEffect } from 'react'
import {useStore} from '../store'

function NoteForm(){
    const {state, setState} = useStore();

    // const [noteText, setNoteText] = useState('')
    // const [noteText, setNoteText] = useState(editNote.text ? 'editNote' : '')
    const [noteText, setNoteText] = useState('')
    // const [noteChanged, setNoteChanged] = useState(false)
    // console.log(noteChanged, (noteText && noteChanged))

    useEffect(() => {
        if(state.editNote){
            setNoteText(state.editNote.text)
        }
    }, [])

    const closeModal = () => {
        setState({
            ...state,
            showNoteForm:false,
            editNote:null
        })
    }

    const handleCreateOrEditNote = async (e) => {
        e.preventDefault();
        if(noteText.trim()){
            let res

            if(!state.editNote){
                res = await axios.post('/api/notes', {
                    text:noteText
                })
                console.log(res.data)
                setState({
                    ...state,
                    showNoteForm:false,
                    notes:[...state.notes, res.data]
                })

            } else {
              await axios.put(`/api/notes/${state.editNote._id}`, {
                    note_id:state.editNote._id,
                    text:noteText
                })

                state.editNote.text = noteText;
            setState({
                ...state,
                notes:[...state.notes],
                showNoteForm:false,
                editNote:null
            })

            }


        } else {
            alert('Input cannot be empty')
        }

    }


    const handleInputChange = async(e) => {
        setNoteText(e.target.value)
    }

    return (
        <div onSubmit={handleCreateOrEditNote}  className="note-form pa4 br4">
            <h1 className="tc mA pa2">{state.editNote ? 'Edit' : 'Create'} Note</h1>
            <form className="flex flex-column mA items-center">
        <input 
            value={ noteText }
            onChange={handleInputChange} 
            className="ma2 pb3 pt3 pl3 br4 b--black bw2 w-100" 
            type="text" 
            placeholder="Enter Note text" />
        <button className="w-100">{state.editNote ? 'Save' : 'Create'} Note</button>
            <button onClick={closeModal} className="cancel-btn w-100 ma2 bg-red color-white">Cancel</button>
            </form>
        </div>
    )
}

export default NoteForm