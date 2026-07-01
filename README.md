# ReservaFit - Proyecto Final Full Stack

ReservaFit es una aplicación Full Stack desarrollada como proyecto final del Máster Full Stack Development.

La plataforma permite a los usuarios descubrir actividades deportivas, consultar información detallada sobre las clases disponibles y gestionar reservas de forma sencilla. Además, incorpora un panel de administración para la gestión de usuarios, actividades y reservas.

---

## Demo

### Frontend

https://reservafit-ciawcjgri-santibrimstones-projects.vercel.app/

### Backend

https://reservafit.onrender.com

---

## Objetivo del proyecto

Muchos centros deportivos gestionan actualmente sus reservas mediante llamadas, WhatsApp o herramientas dispersas que dificultan el control de aforo y la organización de actividades.

ReservaFit nace para centralizar este proceso mediante una plataforma web moderna que permite:

- Consultar actividades deportivas.
- Gestionar reservas online.
- Administrar usuarios y clases.
- Controlar la disponibilidad de plazas.
- Mejorar la experiencia de usuario.

---

## Público objetivo

### Usuarios

Personas interesadas en:

- Fitness
- Yoga
- Cross Training
- Pilates
- Running
- Actividades deportivas dirigidas

### Centros deportivos

- Gimnasios locales
- Estudios boutique
- Entrenadores personales
- Centros deportivos independientes

### Administradores

Usuarios con permisos de gestión para controlar:

- Usuarios
- Clases
- Reservas
- Contenido de la plataforma

---

## Tecnologías utilizadas

### Frontend

- React
- Vite
- React Router DOM
- Axios
- Context API
- Hooks personalizados
- CSS Modular
- Lucide React

### Backend

- Node.js
- Express
- JWT Authentication
- bcryptjs
- Multer
- Cloudinary
- Helmet
- Morgan
- CORS

### Gestión de datos

- CSV
- Excel
- fs
- csv-parser

---

## Arquitectura del proyecto

```txt
proyectofinal/
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── pages/
│   │   └── styles/
│   └── README.md
│
├── backend/
│   ├── src/
│   │   ├── api/
│   │   │   ├── controllers/
│   │   │   └── routes/
│   │   ├── middleware/
│   │   ├── config/
│   │   ├── utils/
│   │   └── data/
│   └── README.md
│
└── README.md
```

---

## Funcionalidades principales

### Gestión de usuarios

- Registro de usuarios.
- Inicio de sesión mediante JWT.
- Gestión de perfil.


### Gestión de actividades

- Consulta de clases deportivas.
- Visualización de detalles.
- Filtrado por categoría.
- Filtrado por nivel.
- Búsqueda por nombre.

### Gestión de reservas

- Reserva de plazas.
- Consulta de reservas activas.
- Cancelación de reservas.
- Control de aforo.

### Administración

- Gestión de usuarios.
- Gestión de actividades.
- Gestión de reservas.

---

## Base de datos y relaciones

La información inicial se genera a partir de:

```txt
backend/src/data/reservafit_database.xlsx
```

y sus correspondientes archivos CSV:

- users.csv
- classes.csv
- bookings.csv

### Colecciones principales

| Colección | Descripción |
|------------|------------|
| users | Usuarios de la aplicación |
| fitnessclasses | Clases deportivas |
| bookings | Reservas realizadas |

Relaciones implementadas:

```txt
User
 └── Booking
        └── FitnessClass
                 
```

---


## Instalación local

### Clonar repositorio

```bash
git clone https://github.com/SantiBrimstone/proyectofinal.git
cd proyectofinal
```

### Instalar dependencias

```bash
npm run install:all
```

---

## Variables de entorno

### Backend

```env
PORT=4000
JWT_SECRET=change_this_secret

CLIENT_URL=http://localhost:5173

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

### Frontend

```env
VITE_API_URL=http://localhost:4000/api
```

---

## Semilla de datos

```bash
npm run seed
```

La semilla utiliza:

```txt
fs.createReadStream()
csv-parser
```

para generar los datos iniciales desde los archivos CSV.

---

## Ejecución local

### Backend

```bash
npm run dev:backend
```

### Frontend

```bash
npm run dev:frontend
```

### URLs locales

Frontend:

```txt
http://localhost:5173
```

Backend:

```txt
http://localhost:4000
```

---

## Documentación específica

- Ver documentación Backend → `/backend/README.md`
- Ver documentación Frontend → `/frontend/README.md`

---

## Autor

**Santiago Garcés Muñoz**

Proyecto desarrollado como entrega final del Máster Full Stack Development.