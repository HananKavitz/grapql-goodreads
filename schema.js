const fetch = require('node-fetch');
const util = require('util');

const parseXML = util.promisify(require('xml2js').parseString);
const {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLSchema,
    GraphQLString
} = require('graphql');




const AuthorType = new GraphQLObjectType({
    name: 'Author',
    description: '...',
    fields: () => ({
        name: {
            type: GraphQLString,
            resolve: xml => {
                xml.GoodreadsResponse.author[0].name[0]
            }
        }
    })
});

module.exports = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'Query',
        description: '...',
        fields: () => ({
            author: {
                type: AuthorType,
                args: {
                    id: { type: GraphQLInt }
                },
            
                resolve: (root, args) => {
                    fetch(`https://www.goodreads.com/author/show.xml?id=${args.id}&key=risKm8wwXsIcyEiTktvA`)
                        .then(response => response.text())
                            .then(parseXML)

                }
            }
        })
    })
});