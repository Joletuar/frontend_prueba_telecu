# Documentación de la Aplicación en React

Esta documentación describe los pasos necesarios para configurar y ejecutar la aplicación en React.

## Configuración Inicial

1. Renombrar el archivo `.env.template` a `.env` en la raíz del proyecto.

2. Llenar la variable de entorno `VITE_API_URL` en el archivo .env con la URL de la API que utilizará la aplicación.

## Instalación de Dependencias

### Usando npm

1. Si usa npm ejecute: `npm install`

### Usando yarn

2. Si usa yarn ejecute: `yarn`

### Usando pnpm

3. Si usa npm ejecute: `pnpm install`

## Lanzar el servicio en LOCAL

Para ejecutar el servicio en LOCAL debe tener activo el servicio Backend. Luego de eso, ejecute en la consola: `npm run dev`, `yarn dev` ó `pnpm run dev`.

Finalmente, en la consola tentrá la url donde se ha lanzado el servicio.

Ejemplo: `http://localhost:<<TU_PUERTO>>`

## Descripción de la Aplicación

La aplicación en React tiene como objetivo interactuar con una API REST para realizar las siguientes acciones:

### Registro y Autenticación de Usuarios

Cuando un usuario se registra o inicia sesión, se autentica en la aplicación. En respuesta a un inicio de sesión exitoso, se genera un token de sesión que se almacena en el almacenamiento local del navegador (localStorage). Este token se envía en los encabezados de las peticiones como "Authorization: Bearer **${token}**" para la autorización.

### Roles de Usuarios

La aplicación implementa roles de usuario, donde se pueden asignar dos roles principales:

- **Recepción:** Los usuarios con el rol de "Recepción" pueden realizar las siguientes acciones:

  - Consultar un listado de visitantes.
  - Crear nuevos registros de visitantes.
  - Actualizar la información de visitantes existentes.

- **Supervisor:** Los usuarios con el rol de "Supervisor" tienen permisos limitados y solo pueden realizar la siguiente acción:
  - Consultar un listado de visitantes.

### Paginación

La aplicación implementa un sistema de paginación para gestionar grandes conjuntos de datos. Esto permite una experiencia de usuario más eficiente al dividir los resultados en páginas más pequeñas.

# Detalles de la Aplicación

En esta sección, se proporcionan detalles adicionales sobre la aplicación en React, destacando sus características y funcionalidades clave.

## Patrón de Diseño de Componentes

La aplicación implementa un sólido patrón de diseño de componentes para fomentar la reutilización de código. Esto significa que los componentes se organizan de manera modular y se pueden utilizar en diferentes partes de la aplicación según sea necesario. Este enfoque mejora la mantenibilidad y la escalabilidad del proyecto.

## TypeScript para Tipado de Datos

Para garantizar la integridad de los datos y mejorar la eficiencia del desarrollo, la aplicación utiliza TypeScript para el tipado de datos. Esto significa que todas las variables, propiedades y funciones tienen tipos definidos, lo que ayuda a prevenir errores y proporciona un mejor soporte de herramientas para los desarrolladores.

## Enrutado SPA (Single Page Application)

La aplicación implementa un enrutado de página única (SPA) para proporcionar una experiencia de usuario fluida y sin interrupciones. Esto significa que la aplicación se carga una vez y las transiciones entre páginas se realizan sin necesidad de recargar la página completa. Esto se logra utilizando una biblioteca de enrutado de React, como React Router.

### Manejo Eficiente de Formularios y Validaciones

La aplicación se ha diseñado con un enfoque en el manejo eficiente de formularios y validaciones. En lugar de bibliotecas o patrones de validación como Formik o Yup, esta aplicación utiliza las siguientes tecnologías:

- **React Hook Form:** Para el manejo avanzado de formularios.

- **Zod:** Para la validación de datos.

## Dos Aplicaciones Principales

La aplicación se compone de dos aplicaciones principales:

### Auth (Autenticación)

La aplicación Auth se utiliza para el registro y el inicio de sesión de los usuarios. Los usuarios pueden crear cuentas nuevas y autenticarse para obtener un token de sesión. Este token se almacena en localStorage y se utiliza para autorizar las acciones del usuario en la aplicación Guest.

### Guest (Visitantes)

La aplicación Guest es la parte principal de la aplicación, donde los usuarios autenticados pueden acceder al listado de visitantes y realizar diversas operaciones. Esto incluye la visualización, creación y actualización de registros de visitantes. El acceso a esta aplicación está protegido y solo se permite a usuarios con una sesión activa.

## Rutas Protegidas

Las rutas de la aplicación Guest están protegidas, lo que significa que solo los usuarios con una sesión activa y válida pueden acceder a ellas. Esta medida de seguridad garantiza que solo los usuarios autenticados puedan realizar acciones en la aplicación de Visitantes, evitando el acceso no autorizado.

### Notificaciones con Sonner

Sonner permite mostrar notificaciones emergentes de manera elegante y personalizable en la aplicación.

- **Notificaciones de Éxito:** Se muestra una notificación de éxito para informar al usuario sobre el resultado positivo.

- **Notificaciones de Error:** Se muestra notificaciones de error cuando ha ocurrido un error en alguna acción.

## Estilado de Componentes con Tailwind CSS

Se ha implementado Tailwind CSS como la biblioteca principal para el estilado de componentes.

### Tailwind CSS

- **Tailwind CSS:** La aplicación utiliza Tailwind CSS como su sistema de diseño y estilado principal.

# Credenciales de Usuario

Puede registrarse y crear su propio usuario para acceder a aplicación.

Pero si quiere ingresar directamente a continuación, se proporcionan las credenciales de usuario para acceder a la aplicación:

## Usuario de Recepción

- **Correo Electrónico:** recepcion@example.com
- **Contraseña:** 123456

## Usuario Supervisor

- **Correo Electrónico:** supervision@example.com
- **Contraseña:** 123456

## Enlace a la Aplicación en Vivo

Puedes acceder a la aplicación desplegada en vivo a través del siguiente enlace:

**Link:** [Aplicación en Vivo](https://musical-dodol-cd4fe0.netlify.app)
