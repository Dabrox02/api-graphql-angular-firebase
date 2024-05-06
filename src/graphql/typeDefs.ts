export const typeDefs = `#graphql
  type Credenciales {
    usuario: String
    clave: String
  }

  type Aplicacion {
    nombreAplicacion: String
    credenciales: Credenciales
  }

  type Query {
    cantidadAplicaciones: Int!
    aplicaciones: [Aplicacion]
  }
`;