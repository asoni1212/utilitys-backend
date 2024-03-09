import { buildSchema } from "graphql";


const userSchema = buildSchema(`
type User {
    id: ID!
    email: String!
    firstName: String!
    lastName: String!
    city: String
    state: String
    zip: String
    emailVarified: Boolean
    registrationDate: String
    varificationCode: String
    ip: String
    phone: String
    fax: String
    country: String
    address: String
    address2: String
  }
  
  type Query {
    getUser(id: ID!): User
  }
  
  type Mutation {
    registerUser(input: CreateUserInput!): CreateUserResult
    loginUser(email: String!, password: String!): User
  }

  input CreateUserInput {
    email: String!
    password: String!
    firstName: String!
    lastName: String!
    city: String!
    state: String!
    zip: String!
    country: String!
    address: String!
    address2: String!
  }
  
  type CreateUserResult {
    message: String!
    verificationCode: String
  }
  
  
  
  schema {
    query: Query
    mutation: Mutation
  }
 
`);

export default userSchema;