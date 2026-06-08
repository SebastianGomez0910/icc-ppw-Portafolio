import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { AuthService } from '../../../../core/services/auth.service';
import { RequestService } from '../../../../core/services/request.service';
import { SolicitudContacto } from '../../../../interfaces/request.interface';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-mis-solicitudes',
  imports: [CommonModule, RouterLink],
  templateUrl: './mis-solicitudes.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MisSolicitudes implements OnInit{
  private authService = inject(AuthService);
  private solicitudesService = inject(RequestService);

  solicitudes = signal<SolicitudContacto[]>([]);
  cargando = signal(true);
  errorMsg = signal(''); 

  ngOnInit() {
    this.cargarDatos();
  }

  cargarDatos() {
    this.cargando.set(true);
    
    setTimeout(() => {
      const currentUser = this.authService.firebaseUser();
      
      if (currentUser) {
        this.solicitudesService.getSolicitudesPorCliente(currentUser.uid).subscribe({
          next: (data) => {
            if (data && data.length > 0) {
              const ordenadas = data.sort((a, b) => b.fechaCreacion.localeCompare(a.fechaCreacion));
              this.solicitudes.set(ordenadas);
            } else {
              this.solicitudes.set([]); 
            }
            this.cargando.set(false);
          },
          error: (err) => {
            console.error('Error de Firebase:', err);
            this.errorMsg.set('Hubo un problema al cargar tus solicitudes.');
            this.cargando.set(false);
          }
        });
      } else {
        this.solicitudes.set([]);
        this.cargando.set(false);
      }
    }, 500);
  }
}