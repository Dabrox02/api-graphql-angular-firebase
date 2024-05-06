import express, { Express, Request, Response } from "express";
import morgan from "morgan";
import cors from "cors";

import { typeDefs } from "./graphql/typeDefs.js";
import { resolvers } from "./graphql/resolvers.js";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";

const port = process.env.PORT || 5000;
const app: Express = express();

// Settings
app.set("port", port);

// Middlewares
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());


const server = new ApolloServer({
    typeDefs,
    resolvers,
});

await server.start();

app.use(
    '/graphql',
    cors(),
    express.json(),
    expressMiddleware(server),
);

app.get("/ping", (_req: Request, res: Response) => {
    console.log('Someone pinged here');
    res.send("pong");
})

export default app;

