export interface Programador {
  id: number; //ID de la bd
  documentId: string; //ID unico de strapi
  name: string;
  specialty: string;
  shortDescription: string;
  //uso de nay por que estrapi devuelve objetos JSOn complejos
  fullDescription: any;
  profilePicture: any;
  
  email: string;
  githubUrl: string;
  linkedinUrl: string;
  isActive: boolean;
  slug: string;
}