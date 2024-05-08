export interface Aplicacion {
    uid: string,
    nombreAplicacion: string
    credenciales: {
        usuario: string
        clave: string
    }
}