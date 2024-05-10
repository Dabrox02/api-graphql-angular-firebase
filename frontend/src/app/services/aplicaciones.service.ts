import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Apollo, ApolloBase, gql } from 'apollo-angular';
import { AuthService } from './auth.service';
import { DialogData } from '../types/user.type';

const GET_APLICACIONES = gql`
query {
  aplicacionUsuario {
    id
    nombreAplicacion
    credenciales {
      clave
      usuario
    }
  }
}
`;

const POST_GUARDAR_APLICACION = gql`
mutation Mutation($app: NuevaAplicacionInput!) {
  crearAplicacion(app: $app) {
    credenciales {
      clave
      usuario
    }
    uid
    nombreAplicacion
  }
}
`;


const DELETE_ELIMINAR_APLICACION = gql`
mutation EliminarAplicacion($docId: String!) {
  eliminarAplicacion(docId: $docId)
}
`;

@Injectable({
  providedIn: 'root'
})
export class AplicacionService {

  constructor(private readonly apollo: Apollo, private auth: AuthService) { }

  async getAplicaciones() {
    const token = await this.auth.auth.currentUser?.getIdToken();
    const context = {
      headers: {
        Authorization: `${token}`
      }
    };

    return this.apollo.watchQuery<any>({
      query: GET_APLICACIONES,
      fetchPolicy: 'network-only',
      nextFetchPolicy: 'cache-first',
      context: context
    }).valueChanges.pipe(
      map(result => {
        return result.data
      })
    );
  }

  async saveAplicacion(newAplication: DialogData): Promise<Observable<any>> {
    const token = await this.auth.auth.currentUser?.getIdToken();
    const context = {
      headers: {
        Authorization: `${token}`
      }
    };
    return this.apollo.mutate({
      mutation: POST_GUARDAR_APLICACION,
      context: context,
      variables: {
        "app": {
          "nombreAplicacion": newAplication.nombreAplicacion,
          "credenciales": {
            "usuario": newAplication.usuarioAplicacion,
            "clave": newAplication.claveAplicacion
          }
        }
      }
    });
  }

  async deleteAplicacion(docId: string): Promise<Observable<any>> {
    const token = await this.auth.auth.currentUser?.getIdToken();
    const context = {
      headers: {
        Authorization: `${token}`
      }
    };
    return this.apollo.mutate({
      mutation: DELETE_ELIMINAR_APLICACION,
      context: context,
      variables: {
        "docId": docId
      }
    });
  }
}
