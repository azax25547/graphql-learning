const graphql = require('graphql')
const _ = require('lodash')

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLInt,
  GraphQLID
 } = graphql

//dummydata
var books = [
  {name:'name of the wind', genre:'Fantasy', id:'1', authorId: '1'},
  {name:'The Final Empire', genre:'Fantasy', id:'2', authorId: '2'},
  {name:'The long Earth', genre:'Sci-Fi', id:'3', authorId: '3'},
]

var authors = [
  {name:'Manoj Das', age:44, id: '1'},
  {name:'Aditya Narayan Mishra', age:34, id: '2'},
  {name:'Code Ninja', age:24, id: '3'},
]

//define object types for grpahQl object schema
const BookType = new GraphQLObjectType({
  name : 'Book',
  fields: () => ({
    id :{type : GraphQLID},
    name :{type : GraphQLString},
    genre :{type : GraphQLString},
    author :{
      type: AuthorType,
      resolve(parent,args) {
        return _.find(authors, {id:parent.authorId})
      }
    }
  })
})

const AuthorType = new GraphQLObjectType({
  name : 'Author',
  fields: () => ({
    id :{type : GraphQLID},
    name :{type : GraphQLString},
    age :{type : GraphQLInt}
  })
})

//code to get data from db/ other source
const RootQuery = new GraphQLObjectType({
  name : 'RootQueryType',
  fields:{
      book:{
        type: BookType,
        args : { id : { type: GraphQLID }},
        resolve(parent,args){
          return _.find(books, {id : args.id})
        }
      },
      author:{
        type:AuthorType,
        args:{id:{type:GraphQLID}},
        resolve(parent,args){
        return _.find(authors, { id : args.id })
        }
      }
  }
})
module.exports = new GraphQLSchema({
  query : RootQuery
})
