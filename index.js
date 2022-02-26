const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const TypeDefs = require('./schema')
const Resolvers = require('./resolvers.js')

const { ApolloServer } = require('apollo-server-express')

const dotenv = require('dotenv');
dotenv.config();


mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(success => {
  console.log('Successful MongoDB connection.')
}).catch(err => {
  console.log('Failed to connect to MongoDB...')
});

const server = new ApolloServer({
  typeDefs: TypeDefs.typeDefs,
  resolvers: Resolvers.resolvers
  
})

const app = express();
app.use(express.json());
app.use('*', cors());

server.start().then(res => {
  server.applyMiddleware({
    app,
    cors: false
  })
  app.listen({ port: process.env.PORT }, () =>
    console.log(`Server running on http://localhost:${process.env.PORT}${server.graphqlPath}`))
});