import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../services/auth.service';
import { MatListModule } from '@angular/material/list';
import { AplicacionService } from '../../services/aplicaciones.service';
import { Aplicacion, DialogData } from '../../types/user.type';
import { AddAplicationComponent } from './add-aplication/add-aplication.component';
import { MatDialog } from '@angular/material/dialog';
import { ListaAplicacionesComponent } from "./lista-aplicaciones/lista-aplicaciones.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  imports: [MatToolbarModule, MatIconModule, MatButtonModule, MatListModule, AddAplicationComponent, ListaAplicacionesComponent]
})
export class HomeComponent implements OnInit, OnDestroy {
  router = inject(Router);
  aplicaciones: Aplicacion[] = [];
  nombreUsuario: string = this.authService.auth.currentUser?.displayName || "Usuario";
  cargando: boolean = true;
  nuevaAplicacion: DialogData = {
    nombreAplicacion: "",
    usuarioAplicacion: "",
    claveAplicacion: ""
  };

  constructor(
    public dialog: MatDialog,
    private authService: AuthService,
    private aplicacionService: AplicacionService,
  ) {
  }

  async ngOnInit() {
    this.authService.auth.currentUser?.getIdToken().then(e => console.log(e));
    await this.obtenerAplicaciones();
  }

  ngOnDestroy(): void {
    this.aplicaciones = [];
    this.nombreUsuario = '';
    this.cargando = true;
  }

  async obtenerAplicaciones() {

    (await this.aplicacionService.getAplicaciones()).subscribe({
      next: (data) => {
        this.cargando = false;
        this.aplicaciones = data.aplicacionUsuario;
      },
      error: (error) => {
        console.error('Error al obtener las aplicaciones:', error);
      }
    });
  }

  logout() {
    try {
      this.authService.logout().then(() => {
        this.router.navigateByUrl('/auth/login');
      });
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  }

  openAddAplication(): void {
    const dialogRef = this.dialog.open(AddAplicationComponent, {
      data: {
        nombreAplicacion: this.nuevaAplicacion.nombreAplicacion,
        usuarioAplicacion: this.nuevaAplicacion.usuarioAplicacion,
        claveAplicacion: this.nuevaAplicacion.claveAplicacion
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.nuevaAplicacion = result;
        const response = this.aplicacionService.saveAplicacion(this.nuevaAplicacion);
        response.then(obs => {
          obs.subscribe({
            next: ({ data }) => {
              this.obtenerAplicaciones();
            }
          })
        })
      }
    });
  }
}
