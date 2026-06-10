import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { StrapiServicioResponse } from '../../interfaces/servicio.interface';

@Injectable({
  providedIn: 'root',
})
export class ServicioService {

  private http = inject(HttpClient);

  private apiUrl = 'https://lovely-victory-cc86f4c6ba.strapiapp.com/api/servicios';

  //mapea la respuesta JSON y trae todo el contenido
  getServicios() {
    return this.http.get<StrapiServicioResponse>(`${this.apiUrl}?populate=*`);
  }
}