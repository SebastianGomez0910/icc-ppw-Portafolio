import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Programador } from '../../../../interfaces/programmer.interface';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-card-programmer-component',
  imports: [RouterLink],
  templateUrl: './card-programmer-component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardProgrammerComponent {

  programador=input.required<Programador>();
}
