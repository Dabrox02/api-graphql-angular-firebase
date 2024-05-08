import { Component, inject, Input } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-button-provider',
  standalone: true,
  imports: [
    MatButtonModule,
  ],
  templateUrl: './button-provider.component.html',
  styleUrl: './button-provider.component.css'
})
export class ButtonProviderComponent {

  @Input() isLogin = false;

  private authService = inject(AuthService);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);

  providerAction(provider: string) {
    if (provider === 'google') {
      this.signUpWithGoogle();
    }
  }

  async signUpWithGoogle() {
    try {
      const result = await this.authService.signInWithGoogleProvider();
      if (result.user) {
        const snackBarRef = this.openSnackBar("Registro exitoso 💫");
        snackBarRef.afterDismissed().subscribe(() => {
          this.router.navigateByUrl('/home');
        });
      }
    } catch (error) {
      console.log(error);
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
