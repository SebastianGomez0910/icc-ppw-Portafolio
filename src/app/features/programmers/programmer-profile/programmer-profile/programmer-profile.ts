import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Programador } from '../../../../interfaces/programmer.interface';
import { ProgrammerService } from '../../../../core/services/programmer.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { map, switchMap } from 'rxjs';
import { ProjectService } from '../../../../core/services/project.service';
import { Proyecto } from '../../../../interfaces/project.interface';
import { CardProject } from '../../../../shared/components/card-project/card-project/card-project';

@Component({
  selector: 'app-programmer-profile',
  imports: [RouterLink, CardProject],
  templateUrl: './programmer-profile.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProgrammerProfile {

  private route=inject(ActivatedRoute);
  private programmerService=inject(ProgrammerService);
  private projectService=inject(ProjectService);

  programador=toSignal(
    this.route.paramMap.pipe(
      map(params => params.get('slug') || ''),
      switchMap(slug => this.programmerService.getProgrammerBySlug(slug)),

      map(response => response.data[0] as Programador)
    )
  );

  proyectos=toSignal(
    this.projectService.getProjects().pipe(
      map(response => response.data)
    ),
    {
      initialValue:[] as Proyecto[]
    }
  );
}
