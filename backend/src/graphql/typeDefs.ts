export const typeDefs = `#graphql
  type CredencialesAplicacion {
    usuario: String
    clave: String
  }

  type Aplicacion {
    uid: String
    nombreAplicacion: String
    credenciales: CredencialesAplicacion
  }

  type Query {
    cantidadAplicaciones: Int!
    aplicaciones: [Aplicacion]
    aplicacionUsuario: [Aplicacion]
  }
`;