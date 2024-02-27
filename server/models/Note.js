const {Schema, model} = require('mongoose')

const noteSchema = new Schema({
    text:{
        type: String,
        required: true,
        min:[4, 'Your note must be at least 4 char in length'] 
    }
}, {
    timestamps:true
})

const Note = model('Note', noteSchema);

module.exports = Note