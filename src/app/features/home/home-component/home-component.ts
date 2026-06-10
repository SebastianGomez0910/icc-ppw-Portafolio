import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { HeroComponent } from "../../../shared/components/hero-section/hero-component/hero-component";
import { CardProgrammerComponent } from '../../../shared/components/card-programmer/card-programmer-component/card-programmer-component';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { ProgrammerService } from '../../../core/services/programmer.service';
import { map } from 'rxjs';
import { Programador } from '../../../interfaces/programmer.interface';
import { ProjectService } from '../../../core/services/project.service';
import { Proyecto } from '../../../interfaces/project.interface';
import { CardProject } from "../../../shared/components/card-project/card-project/card-project";
import { ServiciosList } from "../../servicios/servicios-list/servicios-list";
import { ContactoComponent } from "../../../shared/components/card-contacto/contacto-component/card-contacto";
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-component',
  imports: [HeroComponent, CardProgrammerComponent, CardProject, ServiciosList, ContactoComponent],
  templateUrl: './home-component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {

  private titleService = inject(Title);
  private metaService = inject(Meta);

  private programmerService = inject(ProgrammerService);
  private projectService = inject(ProjectService);
  
  programadores = toSignal(
    this.programmerService.getProgrammers().pipe(
      map(response => response.data) 
    ),
    { initialValue: [] as Programador[] } 
  );

  proyectosDestacados = toSignal(
    this.projectService.getProjects().pipe(
      map(response => response.data.filter((p: Proyecto) => p.isFeatured))
    ),
    { initialValue: [] as Proyecto[] }
  );

  ngOnInit() {
    this.titleService.setTitle('Portafolio | Alexis Sebastian Gomez Moscoso');
    
    this.metaService.updateTag({ 
      name: 'description', 
      content: 'Portafolio profesional de Alexis Sebastian Gomez Moscoso. Desarrollo frontend moderno, arquitecturas backend seguras y prototipado de interfaces web.' 
    });

    this.metaService.updateTag({ property: 'og:title', content: 'Portafolio | Alexis Sebastian Gomez Moscoso' });
    this.metaService.updateTag({ property: 'og:description', content: 'Explora mis proyectos destacados en desarrollo web y arquitectura de sistemas.' });
  }
}