# Tickets técnicos

## Ticket 1 - Base de datos

Objetivo:
Crear el modelo de datos para almacenar candidatos.

Tareas:

- Crear modelo `Candidate` en Prisma
- Definir campos necesarios
- Ejecutar migración
- Verificar conexión con PostgreSQL

## Ticket 2 - Backend API

Objetivo:
Crear un endpoint para añadir candidatos.

Tareas:

- Crear endpoint POST /candidates
- Validar datos obligatorios
- Validar formato de email
- Permitir subida de CV
- Guardar candidato en base de datos
- Devolver respuesta de éxito o error

## Ticket 3 - Frontend

Objetivo:
Permitir añadir candidatos desde la interfaz.

Tareas:

- Mostrar botón para añadir candidato
- Mostrar formulario de alta
- Validar datos básicos
- Enviar datos al backend
- Mostrar mensaje de éxito o error
