//molde individual presenta 1 solo registro 
export interface Servicio{
    id: number;
    documentId: string;
    titulo: string;
    descripcion: string;
    tecnologias: string;
    icono: string;
}

export interface StrapiServicioResponse{
    //decimos que es un array
    data: Servicio[];
    meta: any;
}