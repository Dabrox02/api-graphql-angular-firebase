import { DocumentSnapshot } from "firebase-admin/firestore";
import { db } from "../firebase/firebase.js";

export const resolvers = {
    Query: {
        async aplicaciones() {
            try {
                const snapshot = await db.collection('aplicaciones').get();
                const data = snapshot.docs.map((doc: DocumentSnapshot) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                return data;
            } catch (error) {
                console.error(error);
            }
        },
        async cantidadAplicaciones() {
            try {
                const snapshot = await db.collection('aplicaciones').get();
                const data = snapshot.docs.map((doc: DocumentSnapshot) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                return data.length;
            } catch (error) {
                console.error(error);
            }
        }

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
