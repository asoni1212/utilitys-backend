import express from "express";
import cors from "cors";
import morgan from "morgan";
import userRoutes from "./app/routes/userRoutes.js";
import authRoutes from "./app/routes/authRoutes.js";
import http from "http";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('dev'));

// app.get("/", getTestData);
app.use("/user", userRoutes);
app.use("/auth", authRoutes);
// const server = new ApolloServer({
//     typeDefs: userSchema,
//     resolvers: userResolvers
//   });
//   app.use('/graphql', graphqlHTTP({
//     schema: userSchema,
//     rootValue: userResolvers,
//     graphiql: true
// }));
const current_port = process.env.PORT;
http
  .createServer(app).listen(current_port, () => {
 console.log("congratulations we are connected ", current_port);
});
//   async function startApolloServer() {
//     await server.start();
  
//     server.applyMiddleware({ app });
  
//     app.listen(8080, () => {
//         console.log("congratulations we are connected");
    
//     })
//   }
  
//   startApolloServer();

