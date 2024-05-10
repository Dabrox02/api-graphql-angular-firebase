export const typeDefs = `#graphql
  input NuevaAplicacionInput {
    nombreAplicacion: String!
    credenciales: CredencialesAplicacionInput!
  }

  input CredencialesAplicacionInput {
    usuario: String!
    clave: String!
  }

  type CredencialesAplicacion {
    usuario: String
    clave: String
  }

  type Aplicacion {
    id: String!
    uid: String
    nombreAplicacion: String
    credenciales: CredencialesAplicacion
  }

  type Query {
    cantidadAplicaciones: Int!
    aplicaciones: [Aplicacion]
    aplicacionUsuario: [Aplicacion]
  }

  type Mutation {
    crearAplicacion(app: NuevaAplicacionInput!): Aplicacion
    editarAplicacion(docId: String!, app: NuevaAplicacionInput!): Aplicacion
    eliminarAplicacion(docId: String!): Boolean
  }
`;