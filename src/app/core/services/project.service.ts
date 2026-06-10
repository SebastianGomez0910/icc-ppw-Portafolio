import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {

  private http = inject(HttpClient);

  private apiUrl = 'https://lovely-victory-cc86f4c6ba.strapiapp.com/api/proyectos';

  //obtiene la liata completa y las imagenes
  getProjects(): Observable<any> {
    return this.http.get(`${this.apiUrl}?populate=*`);
  }

  //busca coincidencias exactas usandoe el slug
  getProjectBySlug(slug: string): Observable<any> {
    return this.http.get(`${this.apiUrl}?filters[slug][$eq]=${slug}&populate=*`);
  }
}