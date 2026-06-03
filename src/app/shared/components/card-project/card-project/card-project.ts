import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Proyecto } from '../../../../interfaces/project.interface';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-card-project',
  imports: [RouterLink],
  templateUrl: './card-project.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardProject {

  proyecto=input.required<Proyecto>();
}
