import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { StrapiServicioResponse } from '../../interfaces/servicio.interface';

@Injectable({
  providedIn: 'root',
})
export class ServicioService {

  private http=inject(HttpClient);

  private apiUrl='http://localhost:1337/api/servicios';

  getServicios(){
    return this.http.get<StrapiServicioResponse>(this.apiUrl);
  }
}
