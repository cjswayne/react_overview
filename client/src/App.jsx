import { useState } from 'react'
import Header from './components/Header'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import NoteForm from './components/NoteForm'
import 'tachyons'

import {Routes, Route} from 'react-router-dom'

function App() {
  const [showNoteForm, setShowNoteForm] = useState(false)
  const [notes, setNotes] = useState([])
  const [editNote, setEditNote] = useState(null)

  return (
    <>
     <Header setShowNoteForm={setShowNoteForm} showNoteForm={showNoteForm}/>
      {showNoteForm && <NoteForm 
        setShowNoteForm={setShowNoteForm} 
        setNotes={setNotes}
        setEditNote={setEditNote}
        editNote={editNote}
          
      />}
     <main>
      <Routes>
        <Route path="/" element={
          <Home
            setEditNote={setEditNote} 
            setShowNoteForm={setShowNoteForm}
            notes={notes} 
            setNotes={setNotes}

            />}

          />
        <Route path="*" element={<NotFound />}/>
      </Routes>
     </main>
    </>
  )
}

export default App
