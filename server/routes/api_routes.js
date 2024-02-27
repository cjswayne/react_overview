const router = require('express').Router()
const api_controller = require('../controllers/api_controller')
// Create note
    router.post('/notes', api_controller.createNote)
// Get all notes
router.get('/notes', api_controller.getNotes)

// get one note by id
router.get('/notes/:id', api_controller.getNoteById)

// update a note
router.put('/notes/:id', api_controller.updateNoteById)
// del a note
router.delete('/notes/:id', api_controller.deleteNoteById)

module.exports = router