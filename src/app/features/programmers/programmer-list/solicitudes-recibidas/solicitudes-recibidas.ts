import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../../core/services/auth.service';
import { RequestService } from '../../../../core/services/request.service';
import { SolicitudContacto } from '../../../../interfaces/request.interface';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-solicitudes-recibidas',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './solicitudes-recibidas.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SolicitudesRecibidas implements OnInit{
  private authService = inject(AuthService);
  private solicitudesService = inject(RequestService);

  solicitudes = signal<SolicitudContacto[]>([]);
  cargando = signal(true);
  
  respuestasTemporales: { [key: string]: string } = {};

  ngOnInit() {
    this.cargarSolicitudes();
  }

cargarSolicitudes() {
    this.cargando.set(true);
    
    this.solicitudesService.getSolicitudesParaProgramador().subscribe({
      next: (data) => {

        const ordenadas = data.sort((a, b) => b.fechaCreacion.localeCompare(a.fechaCreacion));
        
        this.solicitudes.set(ordenadas);
        this.cargando.set(false);
      },
      error: (err) => {
        console.error('Error cargando solicitudes recibidas:', err);
        this.cargando.set(false);
      }
    });
  }

  async guardarActualizacion(idSolicitud: string) {
    const textoObservacion = this.respuestasTemporales[idSolicitud];
    
    if (!textoObservacion || textoObservacion.trim().length < 5) {
      alert('Por favor, ingresa una observación o respuesta válida (mínimo 5 caracteres).');
      return;
    }

    try {
      await this.solicitudesService.responderSolicitud(idSolicitud, textoObservacion);
      alert('¡Solicitud actualizada con éxito en Firestore!');
      
      delete this.respuestasTemporales[idSolicitud];
    } catch (error) {
      console.error('Error al guardar la actualización en Firestore:', error);
      alert('Hubo un problema al guardar la respuesta.');
    }
  }
}
