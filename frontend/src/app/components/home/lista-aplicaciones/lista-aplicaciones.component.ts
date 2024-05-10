import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Aplicacion } from '../../../types/user.type';
import { MatListModule } from '@angular/material/list';
import { UtilFunction } from '../../../util/util.functions';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../../services/auth.service';
import { AplicacionService } from '../../../services/aplicaciones.service';

@Component({
  selector: 'app-lista-aplicaciones',
  standalone: true,
  imports: [
    MatListModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './lista-aplicaciones.component.html',
  styleUrl: './lista-aplicaciones.component.css'
})
export class ListaAplicacionesComponent implements OnChanges {
  @Input() listaAplicaciones!: Aplicacion[];
  @Output() deleteAplicacionEmit: EventEmitter<boolean> = new EventEmitter<boolean>;

  constructor(public utils: UtilFunction, private aplicacionService: AplicacionService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['aplicaciones'] && !changes['aplicaciones'].firstChange) {
      console.log('El valor de aplicaciones ha cambiado:', this.listaAplicaciones);
    }
  }

  deleteAplicacionParent() {
    this.deleteAplicacionEmit.emit(true); // emitimos el valor
  }

  eliminarAplicacion(app: Aplicacion) {
    this.aplicacionService.deleteAplicacion(app.id)
      .then(obs => {
        obs.subscribe({
          next: ({ data }) => {
            this.deleteAplicacionParent();
          }
        })
      })
  }


}
