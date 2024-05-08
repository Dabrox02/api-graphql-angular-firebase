import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Auth, authState } from '@angular/fire/auth';
import { apiEnviroment } from '../../enviroments/apiEnviroment';
import { Observable } from 'rxjs';
import { Apollo, ApolloBase, gql } from 'apollo-angular';

@Injectable({
    providedIn: 'root'
})
export class AplicacionService {
    private apollo: ApolloBase;

    constructor(private apolloProvider: Apollo) {
        this.apollo = this.apolloProvider.use("aplicaciones");
    }

    getAplicaciones() {
        return this.apollo.watchQuery({
            query: gql`
          {
            aplicacionUsuario {
                credenciales {
                  clave
                  usuario
                }
              }
          }
        `,
        });
    }

}
