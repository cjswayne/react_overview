const { sign, verify } = require('jsonwebtoken')
const { Note, User } = require('../models')
const {GraphQLError} = require('graphql')

function createToken(user_id){
    const token = sign({ user_id }, process.env.JWT_SECRET)

    return token
}
// typeDefs describe our resolvers
const resolvers = {
    Query: {
        async getAllNotes() {
            const notes = await Note.find()


            return notes
        },
        async getAllUsers() {
            const users = await User.find()

            return users
        }
    },
    Mutation: {
        // _ :called 'underscoring' a param, because its not used but needs to be passed in to work
        async registerUser(_, args, context) {

            try {
                const user = await User.create(args)

                const token = createToken(user._id)

                console.log(context.req.params)

                context.res.cookie('token', { token }, { httpOnly: true });
                console.log(user)
                return user
            } catch (err) {
                console.log(err.errors)
                if(err.code === 11000){
                    throw new GraphQLError('Username or email address exist')
                }

                if(err.errors){
                    let errors = []
                    // let errors = Object.values(err.errors).map((val) => val.message)
                    
                    for (let prop in err.errors) {
                      errors.push(err.errors[prop].message)
                    }


          
                    throw new GraphQLError(errors)
                }
            }
        },
        async loginUser(_, args, {req, res}){
            const user = await User.findOne({
                email: args.email
            })
            

            if(!user){
                throw new GraphQLError('Yo da usah doesn\'t exist')
            }
            const pass_valid = await user.validatePass(args.password)

            if(!pass_valid){
                throw new GraphQLError('Yo passwerd is wrong')
            }

            const token = createToken(user._id)

            res.cookie('token', {token},  { httpOnly: true })

            return user
        }
    }
}

module.exports = resolvers
