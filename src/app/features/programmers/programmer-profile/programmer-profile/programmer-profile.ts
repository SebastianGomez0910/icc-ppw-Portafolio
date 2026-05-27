import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Programador } from '../../../../interfaces/programmer.interface';

@Component({
  selector: 'app-programmer-profile',
  imports: [RouterLink],
  templateUrl: './programmer-profile.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProgrammerProfile {

  private route=inject(ActivatedRoute);
  perfilEncontrado:Programador | undefined;

  listaProgramadores: Programador[]=[
    {
      id: 1,
      nombreCompleto: 'Alexis Sebastian Gomez Moscoso',
      especialidad: 'Full-Stack Developer',
      descripcionBreve: 'Entusiasta del mundo dev con enfoque en arquitecturas escalables.',
      descripcionCompleta: 'Soy un estudiante de Computación en la Universidad Politécnica Salesiana. Me apasiona el desarrollo Full-Stack, trabajando con tecnologías como Angular, Spring Boot y Node.js. Mi objetivo es crear soluciones tecnológicas eficientes y centradas en la experiencia del usuario, resolviendo problemas complejos de forma creativa.',
      fotoPerfil: 'https://ui-avatars.com/api/?name=Sebastian+Gomez&background=7296A4&color=fff',
      correoContacto: 'sebastian@ejemplo.com',
      enlaceGithub: 'https://github.com/tu-usuario',
      enlaceLinkedin: 'https://linkedin.com/in/tu-usuario',
      estadoActivo: true,
      slug: 'sebastian-gomez'
    }
  ];
  ngOnInit(){
    const slugDeLaUrl=this.route.snapshot.paramMap.get('slug')

    this.perfilEncontrado=this.listaProgramadores.find(prog => prog.slug ===slugDeLaUrl);
  }
}
