import { NextFunction, Request, Response } from "express";
import { auth } from "../firebase/firebase.js";


// Middleware de autorización
export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    if (token) {
        auth.verifyIdToken(token)
            .then((decodedToken) => {
                next();
            })
            .catch((err) => {
                res.status(401).json({ error: 'Token inválido' });
            });
    } else {
        res.status(401).json({ error: 'Se requiere un token de Acceso' });
    }
};

