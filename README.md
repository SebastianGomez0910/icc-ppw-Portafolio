# Proyecto Integrador - Portafolio Personal

Aplicación web tipo portafolio profesional multiusuario desarrollada con Angular, Firebase y Strapi.

## Objetivo

Desarrollar una aplicación web que permita:

- Mostrar perfiles de programadores.
- Mostrar proyectos destacados.
- Administrar contenido dinámico mediante Strapi CMS.
- Permitir autenticación de usuarios con Firebase.
- Gestionar solicitudes de contacto hacia programadores.

# Tecnologías utilizadas

- Angular
- TailwindCSS
- TypeScript

- Firebase Authentication
- Cloud Firestore
- Strapi CMS

# Estructura del proyecto
```txt
src/app
│   app.config.ts
│   app.css
│   app.html
│   app.routes.ts
│   app.spec.ts
│   app.ts
│   
├───core
│   ├───guards
│   │       auth.guard.ts
│   │       programmer.guard.ts
│   │       
│   ├───interceptors
│   └───services
│           auth.service.ts
│           programmer.service.ts
│           project.service.ts
│           request.service.ts
│           
├───environments
├───features
│   ├───auth
│   │   ├───login
│   │   └───register
│   ├───dashboard
│   ├───home
│   ├───programmers
│   │   ├───programmer-list
│   │   └───programmer-profile
│   ├───projects
│   └───requests
│       ├───create-request
│       └───my-requests
├───interfaces
│       programmer.interface.ts
│       project.interface.ts
│       request.interface.ts
│       service.interface.ts
│       
├───layouts
│   ├───auth-layout
│   ├───dashboard-layout
│   └───main-layout
├───mocks
│       mock-programmers.ts
│       mock-projects.ts
│       mock-services.ts
│       
└───shared
    ├───components
    │   ├───card-programmer
    │   ├───card-project
    │   ├───footer
    │   ├───hero-section
    │   └───navbar
    ├───pipes
    └───ui
```

--- 
 
# Funcionalidades principales

## Públicas
- Home del portafolio
- Visualización de programadores
- Visualización de proyectos
- Visualización de servicios

## Usuarios autenticados
- Registro
- Inicio de sesión
- Crear solicitudes
- Ver solicitudes realizadas

## Programadores
- Ver solicitudes recibidas
- Responder solicitudes
- Cambiar estado de solicitudes

---

# Autor(es)

- Sebastian Gomez

---

# Materia

Programación y Plataformas Web

Universidad Politécnica Salesiana