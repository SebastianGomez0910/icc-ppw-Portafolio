export interface SolicitudContacto {
  //uso del ? por que es opcional
  id?: string; 
  solicitanteUid: string;
  solicitanteNombre: string;
  solicitanteCorreo: string;
  ideaProyecto: string;
  programadorStrapiId: number;
  programadorNombre: string;
  fechaCreacion: string;
  //tipado estricti solo acepta esta dos opcines 
  estado: 'Pendiente' | 'Respondida';
  //opcional porque si la solicitud es nueva el programado aun no responde 
  respuestaProgramador?: string; 
}