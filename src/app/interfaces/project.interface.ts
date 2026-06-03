export interface Proyecto{
    id: number;
    documentId: string;
    name: string;
    slug: string;
    shortDescription: string;
    fullDescription: any;
    mainImage: any;
    projectType: string;
    technologies: string;
    repositoryUrl: string;
    demoUrl: string;
    isFeatured: boolean;
}