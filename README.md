
# Sistema de Gestión Académica

Aplicación web desarrollada como proyecto académico de la asignatura **Desarrollo de Software**, de Ingeniería en Sistemas de Información en la Universidad Tecnológica Nacional (UTN FRC).

Permite gestionar alumnos, cursos e inscripciones mediante una interfaz web conectada a una API REST.

## Funcionalidades

- Registrar nuevos alumnos.
- Consultar el listado de alumnos.
- Visualizar los cursos asociados a cada alumno.
- Consultar cursos y cupos disponibles.
- Inscribir alumnos en cursos.
- Evitar inscripciones duplicadas.
- Validar la disponibilidad de cupos.
- Controlar errores mediante respuestas HTTP.
- Utilizar transacciones para mantener la consistencia de los datos.

## Tecnologías utilizadas

### Frontend
- HTML5
- JavaScript
- Fetch API

### Backend
- Node.js
- Express
- Sequelize (ORM)
- SQLite
- API REST

## Arquitectura

La aplicación está dividida en dos partes:

- **Frontend:** interfaz web que permite interactuar con el sistema y consumir los servicios del backend.
- **Backend:** API REST encargada de gestionar alumnos, cursos e inscripciones, aplicar validaciones y acceder a la base de datos.

Se utiliza Sequelize para gestionar las relaciones entre entidades.

### Modelo de datos

- Alumno
- Curso
- Inscripción

Los alumnos pueden inscribirse en varios cursos y cada curso puede tener varios alumnos, mediante una relación muchos a muchos (N:M).

## Estructura del proyecto

```text
sistema-gestion-academica/
├── back/
│   ├── data/
│   ├── models/
│   ├── routes/
│   ├── services/
│   └── package.json
├── front/
│   ├── index.html
│   └── index.js
└── README.md
```

## Instalación y ejecución

### Requisitos

- Node.js
- npm
- Visual Studio Code
- Extensión Live Server (recomendada)

### Backend

Desde la carpeta `back`:

```bash
npm install
npm run dev
```

El backend utiliza el puerto 3001 en la configuración local utilizada durante las pruebas.

### Frontend

Abrir `front/index.html` mediante Live Server en Visual Studio Code.

El backend debe permanecer ejecutándose para que el frontend pueda consultar y modificar los datos.

## API REST

La aplicación implementa endpoints para:

| Método | Endpoint | Descripción |
| --- | --- | --- |
| GET | /api/alumnos | Obtener alumnos y sus cursos |
| GET | /api/alumnos/:id | Consultar un alumno |
| POST | /api/alumnos | Registrar un alumno |
| GET | /api/cursos | Obtener cursos |
| GET | /api/cursos/:id | Consultar un curso |
| POST | /api/cursos | Crear un curso |
| POST | /api/inscripciones | Inscribir un alumno |

## Validaciones

El sistema controla:

- Existencia de alumnos y cursos.
- Inscripciones duplicadas.
- Disponibilidad de cupos.
- Identificadores inválidos.
- Errores de operaciones de inscripción.

Las inscripciones utilizan transacciones de Sequelize para evitar que una operación fallida deje cambios parciales en la base de datos.

## Pruebas realizadas

Se verificaron manualmente las siguientes operaciones:

- Creación de alumnos.
- Inscripción en cursos.
- Visualización de cursos asociados.
- Rechazo de inscripciones duplicadas.
- Validación de cupos.
- Respuestas de error ante operaciones inválidas.

## Contexto académico

Proyecto realizado en la asignatura Desarrollo de Software de la carrera Ingeniería en Sistemas de Información.

Universidad Tecnológica Nacional — Facultad Regional Córdoba.

## Autora

**Jazmín Rearte**

[GitHub](https://github.com/JazzRearte)
