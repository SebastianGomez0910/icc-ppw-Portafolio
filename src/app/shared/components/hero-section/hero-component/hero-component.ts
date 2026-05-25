import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-hero-component',
  imports: [RouterLink],
  templateUrl: './hero-component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroComponent {}
