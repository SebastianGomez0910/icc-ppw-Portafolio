import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HeroComponent } from "../../../shared/components/hero-section/hero-component/hero-component";
import { CardProgrammerComponent } from '../../../shared/components/card-programmer/card-programmer-component/card-programmer-component';
import { Programador } from '../../../interfaces/programmer.interface';

@Component({
  selector: 'app-home-component',
  imports: [HeroComponent, CardProgrammerComponent],
  templateUrl: './home-component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {

  //cambiar despues con lo de strapi
  listaProgramadores: Programador[] = [
    {
      id: 1,
      nombreCompleto: 'Alexis Sebastian Gomez Moscoso',
      especialidad: 'Full-Stack Developer',
      descripcionBreve: 'Entusiasta del mundo dev con enfoque en arquitecturas escalables.',
      descripcionCompleta: 'Estudiante de Computación...',
      fotoPerfil: 'https://ui-avatars.com/api/?name=Sebastian+Gomez&background=7296A4&color=fff',
      correoContacto: 'sebastian@ejemplo.com',
      enlaceGithub: 'https://github.com',
      enlaceLinkedin: 'https://linkedin.com',
      estadoActivo: true,
      slug: 'sebastian-gomez'
    }
  ];
}
