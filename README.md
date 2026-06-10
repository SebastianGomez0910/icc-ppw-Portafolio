# Proyecto Integrador - Portafolio Personal

# Universidad Politécnica Salesiana

### Carrera: Computación
### Asiganatura: Programación y Plataformas Web
### Docente: Pablo Torres
### Estudiante: Sebastián Gómez

# Descripción General del Proyecto

El presente proyecto consiste en el desarrollo de una aplicación web tipo portafolio profesional multiusuario. El sistema permite a los usuarios visualizar perfiles de programadores, explorar proyectos destacados y servicios ofrecidos. Además, la plataforma facilita la interacción mediante un sistema de solicitudes de contacto, donde usuarios externos autenticados pueden comunicarse directamente con los desarrolladores.

# Arquitectura del Sistema
El proyecto fue construido bajo una arquitectura de separación de responsabilidades, utilizando las siguientes tecnologías:
- Angular: Actúa como la interfaz principal del usuario, encargada de consumir las APIs, manejar la navegación y gestionar la interacción.
- Strapi: Implementado para administrar todo el contenido dinámico de la plataforma, como la información de los programadores, proyectos y servicios.
- Firebase: Se utilizó Firebase Authentication para la gestión de usuarios (registro e inicio de sesión) y Cloud Firestore para almacenar y actualizar el estado de las solicitudes de contacto.  

# Decisiones de Diseño y Estructura del Código

Core `(src/app/core)` contiene los servicios globales encargados de la comunicación HTTP con Strapi y la conexión con Firebase Authentication y Firestore. Aquí se aseguró el tipado estricto de las respuestas de las APIs mediante el uso de interfaces de TypeScript para prevenir errores en tiempo de ejecución.

Features `(src/app/features)` agrupa la lógica de negocio en módulos independientes:
- Auth: Maneja el inicio de sesión (login) y registro (register). Incluye guards para proteger las rutas privadas.
- Home & Programmers: Muestran el contenido dinámico (hero, listados y perfiles individuales). Para la navegación detallada se utilizó un enrutamiento dinámico, garantizando la sintaxis correcta en los parámetros de las rutas (ej. /:slug) para evitar discrepancias de navegación.
- Requests: Contiene las vistas tanto para los programadores (solicitudes-recibidas) como para los usuarios externos (mis-solicitudes), permitiendo la gestión del estado de cada petición.

Shared `(src/app/shared/components)` almacena componentes modulares de la interfaz gráfica, como card-programmer, card-project y la barra de navegación, logrando una interfaz clara y organizada.

# Desafíos Enfretados
- Sincronización de Rutas y Parámetros: Conflictos de sintaxis en los archivos de configuración del router, corrigiendo la definición de parámetros para garantizar que las vistas de detalle cargaran la información correcta desde el CMS.

- Integración de Múltiples Plataformas: Coordinar la autenticación de Firebase con la obtención de datos desde Strapi requirió un manejo cuidadoso de la asincronía y la inyección de dependencias en los servicios principales de Angular.

- Gestión de Estados en las Solicitudes: Implementar la lógica para que los programadores pudieran visualizar y actualizar el estado (de "Pendiente" a "Respondida")  actualizando Firestore en tiempo real sin romper la experiencia de usuario.

# Guia de Usuario
### Administrador de Contenido.

Debe acceder al panel de Strapi CMS para crear, editar o eliminar los perfiles de programadores, proyectos y servicios.