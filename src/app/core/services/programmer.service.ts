import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProgrammerService {

  private http = inject(HttpClient);
  private apiUrl = 'https://lovely-victory-cc86f4c6ba.strapiapp.com/api/programadors';

  getProgrammers(): Observable<any> {
    return this.http.get(`${this.apiUrl}?populate=*`);
  }

  getProgrammerBySlug(slug: string): Observable<any> {
    const url = `${this.apiUrl}?filters[slug][$eq]=${slug}&populate=*`;
    return this.http.get(url);
  }
}