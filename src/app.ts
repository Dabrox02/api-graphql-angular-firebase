import express, { Express, Request, Response } from "express";
import morgan from "morgan";

import { db } from "./firebase/firebase.js";
import { DocumentSnapshot } from "firebase-admin/firestore";

const app: Express = express();
const port = process.env.PORT || 5000;

// Settings
app.set("port", port);

// Middlewares
app.use(morgan("dev"));
app.use(express.json());

app.get("/ping", (_req: Request, res: Response) => {
    console.log('Someone pinged here');
    res.send("pong");
})

app.get("/collections", async (_req: Request, res: Response) => {
    try {
        const snapshot = await db.collection('aplicaciones').get();
        const data = snapshot.docs.map((doc: DocumentSnapshot) => ({
            id: doc.id,
            ...doc.data(),
        }));
        res.json(data); // Send the JSON response
    } catch (error) {
        console.error(error);
        res.status(500).send("Error fetching data"); // Handle errors gracefully
    }
})

export default app;