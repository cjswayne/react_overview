const express = require('express');
const db = require('./config/connection')
const path = require('path')

const PORT = process.env.PORT || 3333;
const app = express();

//import routes
const api_routes = require('./routes/api_routes')

// Open middlewar
app.use(express.json())

//load routes
app.use('/api', api_routes)


if (process.env.NODE_ENV === 'production') {
    app.use(express.static('../client/dist'))

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../client/dist/index.html'))
    })
}

//Confirm db connection 
db.on('open', () => {
    app.listen(PORT, () => console.log('Server running on Port', PORT))
})
