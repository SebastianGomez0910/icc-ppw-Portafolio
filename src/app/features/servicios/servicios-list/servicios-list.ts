import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ServicioService } from '../../../core/services/servicio.service';
import { CardServicio } from '../../../shared/components/card-servicio/card-servicio/card-servicio';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

@Component({
  selector: 'app-servicios-list',
  imports: [CardServicio],
  templateUrl: './servicios-list.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServiciosList {
  
  private servicioService = inject(ServicioService);
  
  servicios = toSignal(
    this.servicioService.getServicios().pipe(map(res => res.data)),
    { initialValue: [] }
  );
}