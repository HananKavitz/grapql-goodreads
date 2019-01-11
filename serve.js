// https://www.youtube.com/watch?v=lAJWHHUz8_8
const express = require('express');
const graphqlHTTP = require('express-graphql');
const app = express();
port = 4000;


const schema = require('./schema');

app.use('/graphql',graphqlHTTP({
    schema,
    graphiql: true
}))



app.listen(port,() =>{
    console.log(`Listening on ${port}`);
});
