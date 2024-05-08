import express, { Express, NextFunction, Request, Response } from "express";
import morgan from "morgan";
import cors from "cors";

import { typeDefs } from "./graphql/typeDefs.js";
import { resolvers } from "./graphql/resolvers.js";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import authRouter from "./routes/auth.routes.js";
import { requireAuth } from "./middlewares/auth.middleware.js";
import { auth } from "./firebase/firebase.js";
import { GraphQLError } from "graphql/error/GraphQLError.js";
import { logger } from "./logger/logger.js";

const port = process.env.PORT || 5000;
const app: Express = express();

// Settings
app.set("port", port);

// Middlewares
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

// Aplicar middleware de autorización a todas las rutas excepto las de autenticación
app.use((req, res, next) => {
    if (req.path === '/auth/login' || req.path === '/auth/signup' || req.path === '/graphql') {
        next();
    }
    else {
        requireAuth(req, res, next); 401
    }
});

const server = new ApolloServer({
    typeDefs,
    resolvers,

});

await server.start();

app.use(
    '/graphql',
    cors(),
    express.json(),
    expressMiddleware(server, {
        context: async ({ req }) => {
            const token = req.headers.authorization;
            try {
                if (token) {
                    const decodedToken = await auth.verifyIdToken(token);
                    const uid = decodedToken.uid;
                    return { uid };
                }
            } catch (error) {
                logger.warn({
                    message: "Ocurrio un error al obtener el usuario"
                })
            }
            return {};
        }
    })
);

app.get("/ping", (_req: Request, res: Response) => {
    console.log('Someone pinged here');
    res.send("pong");
})

app.use("/auth", authRouter);

app.use((_req: Request, res: Response, next: NextFunction) => {
    console.log("Ruta no encontrada");
    res.status(404).json({ message: "Ruta no encontrada" });
})

export default app;

