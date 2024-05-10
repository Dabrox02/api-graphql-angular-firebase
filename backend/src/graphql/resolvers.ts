import { DocumentSnapshot } from "firebase-admin/firestore";
import { db } from "../firebase/firebase.js";
import { GraphQLError } from "graphql";
import { logger } from "../logger/logger.js";

export const resolvers = {
    Query: {
        async aplicaciones(parent, args, context) {
            if (!context.uid) {
                throw new GraphQLError('No estas autenticado', {
                    extensions: {
                        code: 401
                    }
                })
            };
            const snapshot = await db.collection('aplicaciones').get();
            const data = snapshot.docs.map((doc: DocumentSnapshot) => ({
                id: doc.id,
                ...doc.data(),
            }));
            return data;
        },
        async cantidadAplicaciones(paren, args, context) {
            if (!context.uid) {
                throw new GraphQLError('No estas autenticado', {
                    extensions: {
                        code: 401
                    }
                })
            };
            const snapshot = await db.collection('aplicaciones').get();
            const data = snapshot.docs.map((doc: DocumentSnapshot) => ({
                id: doc.id,
                ...doc.data(),
            }));
            return data.length;
        },
        async aplicacionUsuario(parent, args, context) {
            if (!context.uid) {
                throw new GraphQLError('No estas autenticado', {
                    extensions: {
                        code: 401
                    }
                })
            };
            const snapshot = await db.collection('aplicaciones').where('uid', '==', context.uid).get();
            const data = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            return data;
        },
    },
    Mutation: {
        async crearAplicacion(parent, args, context) {
            if (!context.uid) {
                throw new GraphQLError('No estas autenticado', {
                    extensions: {
                        code: 401
                    }
                })
            };
            const { app } = args;
            const nuevaAplicacion = { ...app, uid: context.uid };
            const res = await db.collection('aplicaciones').add(nuevaAplicacion);
            const doc = await res.get(); // Obtener documento completo
            return doc.data();
        },
        async editarAplicacion(parent, { docId, app }, context) {
            if (!context.uid) {
                throw new GraphQLError('No estas autenticado', {
                    extensions: {
                        code: 401
                    }
                })
            };
            const ref = db.doc(`aplicaciones/${docId}`);
            const doc = await ref.get();
            if (!doc.exists) {
                throw new GraphQLError('Aplicacion no encontrada', {
                    extensions: {
                        code: 404
                    }
                })
            }
            if (doc.data()!.uid !== context.uid) {
                throw new GraphQLError('No tienes permiso para editar esta aplicacion', {
                    extensions: {
                        code: 403
                    }
                })
            }
            await ref.update(app);
            const updatedDoc = await ref.get();
            return updatedDoc.data();
        },
        async eliminarAplicacion(parent, { docId }, context) {
            if (!context.uid) {
                throw new GraphQLError('No estas autenticado', {
                    extensions: {
                        code: 401
                    }
                })
            }
            const ref = db.doc(`aplicaciones/${docId}`);
            const doc = await ref.get();
            if (!doc.exists) {
                throw new GraphQLError('Aplicacion no encontrada', {
                    extensions: {
                        code: 404
                    }
                })
            }
            if (doc.data()!.uid !== context.uid) {
                throw new GraphQLError('No tienes permiso para editar esta aplicacion', {
                    extensions: {
                        code: 403
                    }
                })
            }
            await ref.delete();
            return true;
        },
    }
}