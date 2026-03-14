# Arquitectura del proyecto

## Stack tecnológico

Frontend:

- React
- TypeScript
- Create React App

Backend:

- Node.js
- Express
- TypeScript

Base de datos:

- PostgreSQL

ORM:

- Prisma

Contenedores:

- Docker Compose

## Estructura del proyecto

frontend/
Aplicación React con interfaz del sistema ATS.

backend/
API Express que gestiona la lógica del sistema y se conecta con la base de datos.

backend/prisma/
Esquema de base de datos usando Prisma.

docker-compose.yml
Configuración de PostgreSQL en Docker.

## Flujo de la aplicación

1. El usuario interactúa con el frontend.
2. El frontend envía peticiones HTTP al backend.
3. El backend valida los datos.
4. Prisma guarda la información en PostgreSQL.
5. Si hay CV, el backend guarda el archivo en el servidor.

## Arquitectura actual

El proyecto utiliza una arquitectura simple cliente-servidor:

Frontend (React) → Backend (Express) → Base de datos (PostgreSQL)

No se han definido aún capas de arquitectura complejas.  
La funcionalidad se añadirá progresivamente según los tickets del proyecto.
