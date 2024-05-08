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
import { User } from '../../../types/user.type';
import { AuthService } from '../../../services/auth.service';
import { ButtonProviderComponent } from "../button-provider/button-provider.component";

interface SignupForm {
  nombre: FormControl<string>;
  correo: FormControl<string>;
  clave: FormControl<string>;
}

@Component({
  selector: 'app-signup',
  standalone: true,
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
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
  ]
})
export class SignupComponent {
  hide = true;

  private formBuilder = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);

  form: FormGroup<SignupForm> = this.formBuilder.group({
    nombre: this.formBuilder.control('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
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

  signUp() {
    if (this.form.invalid) return;
    try {
      const usuario: User = {
        nombre: this.form.value.nombre || "",
        correo: this.form.value.correo || "",
        clave: this.form.value.clave || "",
      }
      this.authService.signupWithEmailAndPassword(usuario).subscribe({
        next: (res) => {
          const snackBarRef = this.openSnackBar();
          snackBarRef.afterDismissed().subscribe(() => {
            this.router.navigateByUrl('/auth/login');
          });
        },
        error: (error) => {
          console.log(error);
        }
      });
    } catch (error) {
      console.log(error);
    }
  }
  openSnackBar() {
    return this.snackBar.open('Registro exitoso 💫', 'Close', {
      duration: 2500,
      verticalPosition: 'top',
      horizontalPosition: 'end',
    });
  }

}
