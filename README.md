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
<img width="1919" height="881" alt="image" src="https://github.com/user-attachments/assets/33ff4e19-22af-4c82-930d-b4151d0cabde" />
<img width="1919" height="882" alt="image" src="https://github.com/user-attachments/assets/bcacdd19-e254-4674-8f02-cd14306b6073" />
### Usuario Externo.
Puede navegar libremente por el inicio y ver los proyectos.
<img width="1919" height="983" alt="image" src="https://github.com/user-attachments/assets/c8c68573-7b98-461e-8bd4-dad0f7ac62a3" />
Para enviar una solicitud de contacto a un desarrollador, es obligatorio registrarse e iniciar sesión con su correo electrónico.
<img width="1919" height="916" alt="image" src="https://github.com/user-attachments/assets/ff36870f-26f7-4c24-8c81-c5e54444b34d" />
<img width="1919" height="975" alt="image" src="https://github.com/user-attachments/assets/61d36a4c-074a-45ee-876f-70d931471a62" />
Podrá revisar sus solicitudes enviadas en la pestaña correspondiente.
<img width="1918" height="951" alt="image" src="https://github.com/user-attachments/assets/f09738d6-7376-4f33-a00e-b24fe5df1806" />
Se registra la solicitud en Firestore
<img width="1919" height="872" alt="image" src="https://github.com/user-attachments/assets/2ab6a34f-ac88-4a7c-a474-807911ecae30" />


### Programador
Debe iniciar sesión en la plataforma utilizando las credenciales provistas. Tendrá acceso a una vista exclusiva para revisar las solicitudes recibidas, cambiar su estado y registrar observaciones que se guardarán en Firestore.
<img width="1919" height="967" alt="image" src="https://github.com/user-attachments/assets/59594475-19c3-4124-b7e8-23fb4bfea04e" />
<img width="1919" height="775" alt="image" src="https://github.com/user-attachments/assets/9d759307-dcff-40d1-860b-24c2fc2f7982" />
Se actualiza el estado en el Firestore
<img width="1919" height="855" alt="image" src="https://github.com/user-attachments/assets/db7a6677-6e47-4b49-ba33-63c2f0d7ab3a" />
Se observa el cambio en la interfaz del usuario
<img width="1919" height="794" alt="image" src="https://github.com/user-attachments/assets/1a0b97ed-3c4f-4a56-877b-491fd736e75c" />



