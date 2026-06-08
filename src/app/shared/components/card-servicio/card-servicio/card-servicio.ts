import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Servicio } from '../../../../interfaces/servicio.interface';

@Component({
  selector: 'app-card-servicio',
  imports: [],
  templateUrl: './card-servicio.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardServicio {

  servicio=input.required<Servicio>();
}
