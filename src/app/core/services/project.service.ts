import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {

  private http=inject(HttpClient);

  private apiUrl='http://localhost:1337/api/proyectos';
  getProjects(): Observable<any>{
    return this.http.get(`${this.apiUrl}?populate=*`);
  }

  getProjectBySlug(slug: string): Observable<any>{
    return this.http.get(`${this.apiUrl}?filters[slug][$eq]=${slug}&populate=*`);
  }
}
