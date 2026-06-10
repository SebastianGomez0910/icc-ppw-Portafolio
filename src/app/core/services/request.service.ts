import { inject, Injectable } from '@angular/core';
import { addDoc, collection, collectionData, doc, Firestore, query, updateDoc, where } from '@angular/fire/firestore';
import { SolicitudContacto } from '../../interfaces/request.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RequestService {
  //inyeccion a la bd
  private firestore=inject(Firestore);

  //promesa que crea un nuevo documento en la coleccion 
  async enviarSolicitud(solicitud: SolicitudContacto){
    const solicitudesRef=collection(this.firestore, 'solicitudes');

    return await addDoc(solicitudesRef, solicitud);
  }

  //las oslicitudes filtradas por cliente se actualiza en tiempo real
  getSolicitudesPorCliente(uid: string): Observable<SolicitudContacto[]> {
    const solicitudesRef = collection(this.firestore, 'solicitudes');
    
    const q = query(solicitudesRef, where('solicitanteUid', '==', uid));
    //adjunta un ID unico al documento de firebase
    return collectionData(q, { idField: 'id' }) as Observable<SolicitudContacto[]>;
  }

  //historial para el prpgramador
  getSolicitudesParaProgramador(): Observable<SolicitudContacto[]> {
    const solicitudesRef = collection(this.firestore, 'solicitudes');
    return collectionData(solicitudesRef, { idField: 'id' }) as Observable<SolicitudContacto[]>;
  }
  //apunta el docuemnto usando la ruta 
  async responderSolicitud(idSolicitud: string, respuesta: string) {
    const solicitudRef = doc(this.firestore, `solicitudes/${idSolicitud}`);
    //actualiza parcialmente dejando el resto de la informacion como estaba antes
    return await updateDoc(solicitudRef, {
      estado: 'Respondida',
      respuestaProgramador: respuesta
    });
  }
}

