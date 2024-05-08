import { Component, inject } from '@angular/core';
import { NgIf } from '@angular/common';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDividerModule } from '@angular/material/divider';
import { Credencial, User } from '../../../types/user.type';
import { AuthService } from '../../../services/auth.service';
import { ButtonProviderComponent } from "../button-provider/button-provider.component";

interface LoginForm {
  correo: FormControl<string>;
  clave: FormControl<string>;
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatSnackBarModule,
    MatDividerModule,
    ReactiveFormsModule,
    RouterModule,
    NgIf,
    ButtonProviderComponent
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  hide = true;

  private formBuilder = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);


  form: FormGroup<LoginForm> = this.formBuilder.group({
    correo: this.formBuilder.control('', {
      validators: [Validators.required, Validators.email],
      nonNullable: true,
    }),
    clave: this.formBuilder.control('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
  });

  get isEmailValid(): string | boolean {
    const control = this.form.get('correo');
    const isInvalid = control?.invalid && control.touched;
    if (isInvalid) {
      return control.hasError('required')
        ? 'Este campo es requerido'
        : 'Ingrese un correo valido';
    }
    return false;
  }

  login() {
    if (this.form.invalid) return;

    const credencial: Credencial = {
      correo: this.form.value.correo || '',
      clave: this.form.value.clave || '',
    };

    try {
      const res = this.authService.signInWithEmailAndPassword(credencial);
      res.subscribe({
        next: (token) => {
          const snackBarRef = this.openSnackBar('Inicio Sesion Exitoso 💫',);
          snackBarRef.afterDismissed().subscribe(() => {
            this.router.navigateByUrl('/');
          });
        },
        error: (error) => {
          const snackBarRef = this.openSnackBar('Usuario o Clave Incorrectos ❌',);
        }
      })


    } catch (error) {
      console.error(error);
    }
  }

  openSnackBar(message: string) {
    return this.snackBar.open(message, 'Close', {
      duration: 2500,
      verticalPosition: 'top',
      horizontalPosition: 'end',
    });
  }

}
