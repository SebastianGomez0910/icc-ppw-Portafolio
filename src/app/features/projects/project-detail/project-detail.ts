import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { routes } from '../../../app.routes';
import { ProjectService } from '../../../core/services/project.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { map, switchMap } from 'rxjs';
import { Proyecto } from '../../../interfaces/project.interface';

@Component({
  selector: 'app-project-detail',
  imports: [RouterLink],
  templateUrl: './project-detail.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectDetail {

  private route=inject(ActivatedRoute);
  private projectService=inject(ProjectService);

  proyecto=toSignal(
    this.route.paramMap.pipe(
      map(params=>params.get('slug') || ''),
      switchMap(slug=>this.projectService.getProjectBySlug(slug)),
      map(response => response.data[0] as Proyecto)
    )
  );
}
