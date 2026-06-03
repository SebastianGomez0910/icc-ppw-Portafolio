import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProgrammerService {

  private http=inject(HttpClient);
  private apiUrl='http://localhost:1337/api/programadors?populate=*';

  getProgrammers():Observable<any>{
    return this.http.get(this.apiUrl);
  }

  getProgrammerBySlug(slug: string): Observable<any>{
    const url=`http://localhost:1337/api/programadors?filters[slug][$eq]=${slug}&populate=*`;
    return this.http.get(url);
  }
}
