# Prompts iniciales - AI4Devs LTI

## Contexto del proyecto

Proyecto full stack compuesto por:

- Frontend: React + TypeScript
- Backend: Express + TypeScript
- ORM: Prisma
- Base de datos: PostgreSQL
- Contenedores: Docker Compose

El objetivo es implementar la historia de usuario:

"Añadir Candidato al Sistema"

## Historia de usuario

Como reclutador  
Quiero poder añadir candidatos al sistema ATS  
Para poder gestionar sus datos y procesos de selección.

## Criterios de aceptación

- Debe existir un botón visible para añadir candidato desde el dashboard.
- Se debe mostrar un formulario con los campos del candidato.
- Los campos obligatorios no pueden estar vacíos.
- El email debe tener formato válido.
- Debe permitirse subir un CV en formato PDF o DOCX.
- Debe mostrarse un mensaje de confirmación al guardar correctamente.
- Debe mostrarse un mensaje de error si ocurre un problema.

## Alcance técnico acordado

Para este ejercicio se implementará:

- Modelo `Candidate` en Prisma
- Endpoint `POST /candidates` en backend
- Formulario en frontend
- Subida opcional de CV
- Archivos permitidos: PDF y DOCX
- Los CV se almacenarán en `backend/uploads`
