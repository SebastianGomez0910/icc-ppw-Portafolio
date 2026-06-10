import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProgrammerService {

  private http = inject(HttpClient);
  private apiUrl = 'https://lovely-victory-cc86f4c6ba.strapiapp.com/api/programadors';

  //devuelve lista completa ademas forzamos a enviar imagenes
  getProgrammers(): Observable<any> {
    return this.http.get(`${this.apiUrl}?populate=*`);
  }

  //busca un registro en especifico 
  getProgrammerBySlug(slug: string): Observable<any> {
    //filtra el campo slug y busca uno que sea igual 
    const url = `${this.apiUrl}?filters[slug][$eq]=${slug}&populate=*`;
    return this.http.get(url);
  }
}