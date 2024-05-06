import express, { Express, Request, Response } from "express";
import morgan from "morgan";

const app: Express = express();

// Settings
app.set("port", 5000);

// Middlewares
app.use(morgan("dev"));
app.use(express.json());

app.get("/ping", (_req: Request, res: Response) => {
    console.log('Someone pinged here');
    res.send("pong");
})

export default app;