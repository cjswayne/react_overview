const express = require('express');
const cookieParser = require('cookie-parser')
require('dotenv').config()
const db = require('./config/connection')
const path = require('path')

const { ApolloServer } = require('@apollo/server')
const { expressMiddleware } = require('@apollo/server/express4')

const PORT = process.env.PORT || 3333;
const app = express();

const {typeDefs, resolvers} = require('./schema')

async function startServer() {
    const server = new ApolloServer({
        typeDefs,
        resolvers
    })

    await server.start()


    // Open middleware

    app.use(express.json())

    app.use(cookieParser());

    app.use('/graphql', expressMiddleware(server, {
        context(data) {
            return {
                req: data.req,
                res: data.res
            }
        }
    }))

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
    
}


startServer()