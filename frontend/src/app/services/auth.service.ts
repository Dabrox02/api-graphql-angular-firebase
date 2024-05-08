import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Auth, authState, createUserWithEmailAndPassword, GoogleAuthProvider, idToken, signInWithCredential, signInWithEmailAndPassword, signInWithPopup } from '@angular/fire/auth';
import { Observable, Subscription } from 'rxjs';
import { apiEnviroment } from '../../enviroments/apiEnviroment';
import { Credencial, User } from '../types/user.type';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private API_SIGNUP: string = `${apiEnviroment.url()}/auth/signup`;
  private API_LOGIN: string = `${apiEnviroment.url()}/auth/login`;

  auth: Auth = inject(Auth);
  readonly authState$ = authState(this.auth);

  constructor(private http: HttpClient) { }

  signupWithEmailAndPassword(usuario: User): Observable<any> {
    return this.http.post<any>(`${this.API_SIGNUP}`, usuario).pipe(res => res);
  }

  signInWithGoogleProvider() {
    const provider = new GoogleAuthProvider();
    return this.callPopUp(provider);
  }

  async callPopUp(provider: GoogleAuthProvider) {
    try {
      const result = await signInWithPopup(this.auth, provider);
      return result;
    } catch (error: any) {
      return error;
    }
  }

  signInWithEmailAndPassword(credencial: Credencial): Observable<any> {
    return new Observable(observer => {
      signInWithEmailAndPassword(this.auth, credencial.correo, credencial.clave)
        .then(res => {
          this.http.post<any>(this.API_LOGIN, { uid: res.user.uid })
            .subscribe({
              next: response => {
                observer.next(response);
                observer.complete();
              },
              error: error => observer.error(error)
            });
        })
        .catch(error => observer.error(error));
    });
  }

  logout() {
    return this.auth.signOut();
  }

}
