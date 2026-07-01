# ReservaFit - Proyecto FullStack Final

ReservaFit es una aplicación FullStack para centralizar reservas de clases deportivas locales. Está pensada para usuarios que quieren descubrir actividades cerca de ellos y para pequeños centros/instructores que necesitan gestionar horarios, cupos y reservas sin depender de mensajes sueltos.

## Público objetivo

- Personas que buscan entrenar de forma flexible.
- Centros deportivos pequeños, estudios boutique e instructores independientes.
- Administradores que necesitan consultar usuarios, clases y reservas.

## Problema que resuelve

Muchos centros gestionan reservas por WhatsApp, llamadas o formularios poco conectados. Esto provoca duplicidades, falta de control de aforo y mala experiencia para el usuario. ReservaFit ofrece un catálogo filtrable, detalle de clase, reserva autenticada y panel de administración.

## Tecnologías

### Backend

- Node.js
- Express
- JWT
- bcryptjs
- fs + csv-parser para semillas desde CSV
- Multer + Cloudinary opcional para subida de imágenes con `form-data`
- Helmet, CORS y Morgan

### Frontend

- React + Vite
- React Router DOM
- Context API
- Hooks avanzados: `useReducer`, `useMemo`, `useCallback`
- Custom hooks: `useFetch`, `useClassFilters`
- Axios
- CSS modular centralizado con variables globales en `style.css`
- Lucide React para iconos

## Colecciones y relaciones

La base de datos se genera desde el Excel incluido en:

`backend/src/data/reservafit_database.xlsx`

También se incluyen los CSV descargados desde ese Excel:

- `users.csv`
- `instructors.csv`
- `classes.csv`
- `bookings.csv`

Colecciones principales:

1. `users`: usuarios con rol `user` o `admin`.
2. `instructors`: instructores deportivos.
3. `fitnessclasses`: clases deportivas relacionadas con un instructor.
4. `bookings`: reservas relacionadas con un usuario y una clase.

El proyecto cumple el requisito de tener mínimo dos colecciones relacionadas aparte de usuarios: `instructors`, `fitnessclasses` y `bookings`.

## Datos de acceso demo

Usuario administrador:

```txt
email: admin@reservafit.com
password: 123456
```

Usuarios normales de prueba:

```txt
email: user1@reservafit.com
password: 123456
```

## Instalación

Desde la raíz del proyecto:

```bash
npm run install:all
```

Configura variables de entorno.

Backend:

```bash
cp backend/.env.example backend/.env
```

Frontend:

```bash
cp frontend/.env.example frontend/.env
```



```env
PORT=4000
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
JWT_SECRET=change_this_secret
CLIENT_URL=http://localhost:5173
```

## Semilla de base de datos

La semilla lee los CSV con `fs.createReadStream`

```bash
npm run seed
```

## Ejecución local

Backend:

```bash
npm run dev:backend
```

Frontend:

```bash
npm run dev:frontend
```

URLs locales:

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:4000`

## Rutas principales del backend

### Auth

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`

### Clases

- `GET /api/classes`
- `GET /api/classes/:id`
- `POST /api/classes` admin
- `PUT /api/classes/:id` admin
- `DELETE /api/classes/:id` admin

### Reservas

- `POST /api/bookings` usuario logueado
- `GET /api/bookings/mine` usuario logueado
- `PATCH /api/bookings/:id/cancel` usuario logueado
- `GET /api/bookings` admin

### Usuarios

- `GET /api/users` admin
- `PATCH /api/users/:id/role` admin
- `DELETE /api/users/:id` usuario propietario o admin

## Arquitectura React

```txt
frontend/src
├── api
├── components
├── context
├── hooks
├── pages
└── styles
```

La arquitectura separa responsabilidades:

- `api`: cliente Axios centralizado.
- `context`: autenticación global.
- `hooks`: lógica reutilizable.
- `components`: piezas reutilizables de interfaz.
- `pages`: pantallas principales.
- `styles`: variables, layout, cards, formularios y responsive.

## UX/UI

La interfaz se ha planteado para ser directa:

- Home con propuesta de valor clara.
- Catálogo filtrable por búsqueda, categoría y nivel.
- Cards reutilizables con información esencial.
- Detalle de clase con CTA de reserva.
- Dashboard de reservas del usuario.
- Diseño responsive.

## Despliegue 

Backend:

- Render


Frontend:

- Vercel


