import { Request, Response } from "express";
import { auth } from "../firebase/firebase.js";

export const crearUsuario = async (req: Request, res: Response) => {
    try {
        const { nombre, correo, clave } = req.body;
        if (nombre && correo && clave) {
            auth
                .createUser({
                    email: correo,
                    password: clave,
                    displayName: nombre,
                    disabled: false,
                })
                .then((userRecord) => {
                    res.status(200).json({ message: `Successfully created new user:, ${userRecord.uid}`, user: userRecord })
                })
                .catch((error) => {
                    res.status(400).json({ message: `Error creating new user:, ${error}` })
                });
        } else {
            res.status(400).json({ message: `Error creating new user:, It's necessary all fields` })
        }
    } catch (error) {
        console.error(error);
    }
}

export const loginUsuario = async (req: Request, res: Response) => {
    try {
        const { uid } = req.body;
        if (uid) {
            auth
                .createCustomToken(uid)
                .then((customToken) => {
                    res.status(200).json({ message: `Succesfully token generated`, token: customToken })
                })
                .catch((error) => {
                    console.log('Error listing users:', error);
                });
        } else {
            res.status(400).json({ message: `Error login user:, Invalid UID:` })
        }
    } catch (error) {
        console.error(error);
    }
}

export const obtenerUsuarios = async (req: Request, res: Response) => {
    try {
        auth
            .listUsers(1000)
            .then((listUsersResult) => {
                res.json(listUsersResult.users);
            })
            .catch((error) => {
                console.log('Error listing users:', error);
            });
    } catch (error) {
        console.error(error);
    }
}