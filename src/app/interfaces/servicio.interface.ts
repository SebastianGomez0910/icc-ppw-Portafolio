export interface Servicio{
    id: number;
    documentId: string;
    titulo: string;
    descripcion: string;
    tecnologias: string;
    icono: string;
}

export interface StrapiServicioResponse{
    data: Servicio[];
    meta: any;
}