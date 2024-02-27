const Note = require('../models/Note')


module.exports = {
    async createNote(req, res) {
        const note = await Note.create(req.body)

        res.json(note)
    },
    async getNotes(req, res){
        const notes = await Note.find()

        res.json(notes)
    },
    async getNoteById({params:{id}}, res){

        try{
            const note = await Note.findById(id)
            res.json(note)
        } catch(err){

        }

        
    },
    async updateNoteById({body, params:{id}}, res){
        console.log(body)
        const updatedNote = await Note.findByIdAndUpdate(id, body, {new:true})
        res.json(updatedNote)
    },
    async deleteNoteById({params:{id}}, res){
        await Note.findByIdAndDelete(id)

        res.send('Note Deleted.')
    }
}