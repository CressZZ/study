const { ApolloServer } = require('apollo-server');

const typeDefs = `
    type Query {
        hello: String!
        ping: String!
        user: User!
    }

    type User {
        name: String!
    }
`

const resolvers = {
    Query: {
        hello(){
            return 'world;'
        },
        ping(){
            return 'pong'
        },
        user() {
            return 'dkflkasjd'
        }
    },
    User: {
        name(parent){
            console.log(parent)
            return 'Tony'
        }
    }
}

const server = new ApolloServer({
    typeDefs, 
    resolvers,
})

console.log('starting...');
server.listen(3000);

