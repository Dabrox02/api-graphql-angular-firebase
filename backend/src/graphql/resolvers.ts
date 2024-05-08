import { DocumentSnapshot } from "firebase-admin/firestore";
import { db } from "../firebase/firebase.js";

export const resolvers = {
    Query: {
        async aplicaciones(parent, args, context) {
            if (!context.uid) return null;
            const snapshot = await db.collection('aplicaciones').get();
            const data = snapshot.docs.map((doc: DocumentSnapshot) => ({
                id: doc.id,
                ...doc.data(),
            }));
            return data;
        },
        async cantidadAplicaciones(paren, args, context) {
            if (!context.uid) return null;
            const snapshot = await db.collection('aplicaciones').get();
            const data = snapshot.docs.map((doc: DocumentSnapshot) => ({
                id: doc.id,
                ...doc.data(),
            }));
            return data.length;
        },
        async aplicacionUsuario(parent, args, context) {
            if (!context.uid) return null;
            const snapshot = await db.collection('aplicaciones').where('uid', '==', context.uid).get();
            const data = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            return data;
        },
    },
};

// app.get("/collections", async (_req: Request, res: Response) => {
//     try {
//         const snapshot = await db.collection('aplicaciones').get();
//         const data = snapshot.docs.map((doc: DocumentSnapshot) => ({
//             id: doc.id,
//             ...doc.data(),
//         }));
//         res.json(data); // Send the JSON response
//     } catch (error) {
//         console.error(error);
//         res.status(500).send("Error fetching data"); // Handle errors gracefully
//     }
// })
