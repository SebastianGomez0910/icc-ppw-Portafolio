export interface SolicitudContacto {
  id?: string; 
  solicitanteUid: string;
  solicitanteNombre: string;
  solicitanteCorreo: string;
  ideaProyecto: string;
  programadorStrapiId: number;
  programadorNombre: string;
  fechaCreacion: string;
  estado: 'Pendiente' | 'Respondida';
  respuestaProgramador?: string; 
}