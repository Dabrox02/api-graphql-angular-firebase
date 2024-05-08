import { Component, inject, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../services/auth.service';
import { MatListModule } from '@angular/material/list';
import { Router } from '@angular/router';
import { AplicacionService } from '../../services/aplicaciones.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatToolbarModule, MatIconModule, MatButtonModule, MatListModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  aplicaciones!: any;

  ngOnInit(): void {
    this.getAplicacionesUsuario();
  }

  authService = inject(AuthService);
  router = inject(Router);
  aplicacionService = inject(AplicacionService);
  nombreUsuario: string = this.authService.auth.currentUser?.displayName || "Usuario";


  getAplicacionesUsuario() {
    this.aplicacionService.getAplicaciones().valueChanges.subscribe(({ data, loading }) => {
      this.aplicaciones = data;
    });
  }

  logout() {
    try {
      this.authService.logout();
      this.router.navigateByUrl('/auth/login');
    } catch (error) {
      console.log(error);
    }
  }

}
