import { useEffect, useState } from 'react'
import Header from './components/Header'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import NoteForm from './components/NoteForm'
import 'tachyons'

import { Routes, Route } from 'react-router-dom'

import { useStore } from './store'



function App() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(false)
  })

  const { state } = useStore();
  return (
    <>
      <Header />
      
      {state.showNoteForm && <NoteForm />}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </>
  )
}

export default App
