# ReservaFit Backend

API REST desarrollada con Node.js y Express.

## Tecnologías

- Node.js
- Express
- JWT
- bcryptjs
- Multer
- Cloudinary
- CORS
- Helmet
- Morgan

## Instalación

```bash
npm install
```

## Variables de entorno

Crear un archivo `.env`:

```env
PORT=4000

JWT_SECRET=your_secret

CLIENT_URL=http://localhost:5173

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

## Scripts

### Desarrollo

```bash
npm run dev
```

### Producción

```bash
npm start
```

### Generar datos iniciales

```bash
npm run seed
```

## Estructura

```txt
src/
├── api/
│   ├── controllers/
│   ├── models/
│   └── routes/
├── config/
├── data/
├── db/
├── middleware/
├── seeds/
├── utils/
├── app.js
└── server.js
```

## Endpoints

### Autenticación

| Método | Endpoint |
|----------|----------|
| POST | /api/auth/register |
| POST | /api/auth/login |

### Usuarios

| Método | Endpoint |
|----------|----------|
| GET | /api/users |
| GET | /api/users/:id |
| PUT | /api/users/:id |
| DELETE | /api/users/:id |

### Clases

| Método | Endpoint |
|----------|----------|
| GET | /api/classes |
| GET | /api/classes/:id |
| POST | /api/classes |
| PUT | /api/classes/:id |
| DELETE | /api/classes/:id |

### Reservas

| Método | Endpoint |
|----------|----------|
| GET | /api/bookings |
| POST | /api/bookings |
| DELETE | /api/bookings/:id |

## Despliegue

Render:

https://reservafit.onrender.com

## Autor

Santiago Garcés Muñoz