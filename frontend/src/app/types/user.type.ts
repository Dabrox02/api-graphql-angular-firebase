export interface User {
    nombre: string,
    correo: string;
    clave: string;
}

export interface Credencial {
    correo: string;
    clave: string;
}

export interface Aplicacion {
    id: string,
    uid: string,
    nombreAplicacion: string
    credenciales: {
        usuario: string
        clave: string
    }
}

export interface DialogData {
    nombreAplicacion: string;
    usuarioAplicacion: string;
    claveAplicacion: string;
}