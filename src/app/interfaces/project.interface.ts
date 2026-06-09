export interface Proyecto{
    id: number;
    documentId: string;
    name: string;
    slug: string;
    shortDescription: string;
    fullDescription: any;
    mainImage: any;
    projectType: string;
    teechnologies: string;
    repositorioUrl: string;
    demoUrl: string;
    isFeatured: boolean;
}