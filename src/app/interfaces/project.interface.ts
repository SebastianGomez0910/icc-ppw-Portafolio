export interface Proyecto{
    id: number; //ID de la bd
    documentId: string; //ID de strapi
    name: string;
    slug: string;
    shortDescription: string;
    //uso de any por que estrapi devuelve objetos JSOn complejos

    fullDescription: any;
    mainImage: any;
    projectType: string;
    teechnologies: string;
    repositorioUrl: string;
    demoUrl: string;
    isFeatured: boolean;
}