import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { Programador } from '../../../../interfaces/programmer.interface';
import { RouterLink, RouterModule } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RequestService } from '../../../../core/services/request.service';

@Component({
  selector: 'app-card-programmer-component',
  imports: [RouterLink, ReactiveFormsModule, RouterModule],
  templateUrl: './card-programmer-component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardProgrammerComponent {

  programador=input.required<Programador>();

  authService = inject(AuthService);
  private solicitudesService = inject(RequestService);
  private fb = inject(FormBuilder);

  contactoForm = this.fb.group({
    idea: ['', [Validators.required, Validators.minLength(10)]]
  });

  get modalId() {
    return `modal_contacto_${this.programador().id}`;
  }

  abrirModal() {
    const modal = document.getElementById(this.modalId) as HTMLDialogElement;
    modal?.showModal();
  }

  cerrarModal() {
    const modal = document.getElementById(this.modalId) as HTMLDialogElement;
    modal?.close();
    this.contactoForm.reset();
  }

  async enviarMensaje() {
    if (this.contactoForm.invalid) return;

    const currentUser = this.authService.firebaseUser(); 
    if (!currentUser) {
      alert('Debes iniciar sesión para enviar una solicitud.');
      return;
    }

    const nuevaSolicitud = {
      solicitanteUid: currentUser.uid,
      solicitanteNombre: currentUser.displayName || 'Usuario',
      solicitanteCorreo: currentUser.email || '',
      ideaProyecto: this.contactoForm.value.idea!,
      programadorStrapiId: this.programador().id,
      programadorNombre: this.programador().name, 
      fechaCreacion: new Date().toISOString(),
      estado: 'Pendiente' as const
    };

    try {
      await this.solicitudesService.enviarSolicitud(nuevaSolicitud);
      alert('¡Solicitud enviada con éxito!');
      this.cerrarModal();
    } catch (error) {
      alert('Hubo un error al enviar la solicitud.');
    }
  }
}
