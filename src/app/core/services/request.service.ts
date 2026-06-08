import { inject, Injectable } from '@angular/core';
import { addDoc, collection, collectionData, doc, Firestore, query, updateDoc, where } from '@angular/fire/firestore';
import { SolicitudContacto } from '../../interfaces/request.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RequestService {
  private firestore=inject(Firestore);

  async enviarSolicitud(solicitud: SolicitudContacto){
    const solicitudesRef=collection(this.firestore, 'solicitudes');

    return await addDoc(solicitudesRef, solicitud);
  }

  getSolicitudesPorCliente(uid: string): Observable<SolicitudContacto[]> {
    const solicitudesRef = collection(this.firestore, 'solicitudes');
    
    const q = query(solicitudesRef, where('solicitanteUid', '==', uid));
    
    return collectionData(q, { idField: 'id' }) as Observable<SolicitudContacto[]>;
  }

  getSolicitudesParaProgramador(): Observable<SolicitudContacto[]> {
    const solicitudesRef = collection(this.firestore, 'solicitudes');
    return collectionData(solicitudesRef, { idField: 'id' }) as Observable<SolicitudContacto[]>;
  }

  async responderSolicitud(idSolicitud: string, respuesta: string) {
    const solicitudRef = doc(this.firestore, `solicitudes/${idSolicitud}`);
    
    return await updateDoc(solicitudRef, {
      estado: 'Respondida',
      respuestaProgramador: respuesta
    });
  }
}

