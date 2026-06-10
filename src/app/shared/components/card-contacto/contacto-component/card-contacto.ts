import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import { RequestService } from '../../../../core/services/request.service';
import { ProgrammerService } from '../../../../core/services/programmer.service';

@Component({
  selector: 'app-contacto-component',
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './card-contacto.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactoComponent implements OnInit {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private solicitudesService = inject(RequestService);
  private programmerService = inject(ProgrammerService);

  private AuthService=inject(AuthService);

  isLoggedIn=this.authService.isLoggedIn;

  programadores = signal<any[]>([]); 
  cargando = signal(true);

  contactoForm = this.fb.group({
    programadorId: ['', Validators.required],
    idea: ['', [Validators.required, Validators.minLength(10)]]
  });

  ngOnInit() {
    this.programmerService.getProgrammers().subscribe({
      next: (res) => {
        this.programadores.set(res.data);
        this.cargando.set(false);
      }
    });
  }

  async enviarMensaje() {
    if (this.contactoForm.invalid) return;

    const currentUser = this.authService.firebaseUser(); 
    if (!currentUser) {
      alert('Debes iniciar sesión para enviar una solicitud.');
      return;
    }

    const idSeleccionado = this.contactoForm.value.programadorId;
    const progData = this.programadores().find(p => p.id == idSeleccionado || p.documentId == idSeleccionado);

    const nuevaSolicitud = {
      solicitanteUid: currentUser.uid,
      solicitanteNombre: currentUser.displayName || 'Usuario',
      solicitanteCorreo: currentUser.email || '',
      ideaProyecto: this.contactoForm.value.idea!,
      programadorStrapiId: progData.id || progData.documentId, 
      programadorNombre: progData.name || progData.nombre, 
      fechaCreacion: new Date().toISOString(),
      estado: 'Pendiente' as const
    };

    try {
      await this.solicitudesService.enviarSolicitud(nuevaSolicitud);
      alert('¡Solicitud enviada con éxito!');
      this.contactoForm.reset(); 
    } catch (error) {
      alert('Hubo un error al enviar la solicitud.');
    }
  }
}