# ReservaFit Backend

API REST del proyecto ReservaFit, desarrollada con Node.js y Express.

## Descripción

Este backend gestiona la lógica de la aplicación ReservaFit: usuarios, autenticación, roles, clases deportivas, reservas, imágenes y datos iniciales generados desde archivos CSV.

## Tecnologías

* Node.js
* Express
* JWT
* bcryptjs
* Multer
* Cloudinary
* CSV Parser
* CORS
* Dotenv
* Helmet
* Morgan

## Instalación

```bash
cd backend
npm install
```

## Variables de entorno

Crear un archivo `.env` en la carpeta `backend` con la siguiente estructura:

```env
PORT=4000
JWT_SECRET=your_secret_key
CLIENT_URL=http://localhost:5173

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

## Scripts disponibles

```bash
npm run dev
```

Ejecuta el servidor en modo desarrollo con nodemon.

```bash
npm start
```

Ejecuta el servidor en modo producción.

```bash
npm run seed
```

Genera los datos iniciales desde archivos CSV.

## Importante

El script de desarrollo utiliza `nodemon`, por lo que debe estar instalado como dependencia de desarrollo:

```bash
npm install -D nodemon
```

## Estructura recomendada

```txt
backend/
└── src/
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

## Endpoints principales

### Autenticación

```txt
POST /api/auth/register
POST /api/auth/login
```

### Usuarios

```txt
GET    /api/users
GET    /api/users/:id
PUT    /api/users/:id
DELETE /api/users/:id
```

### Clases

```txt
GET    /api/classes
GET    /api/classes/:id
POST   /api/classes
PUT    /api/classes/:id
DELETE /api/classes/:id
```

### Reservas

```txt
GET    /api/bookings
POST   /api/bookings
DELETE /api/bookings/:id
```

## Funcionalidades

* Registro e inicio de sesión de usuarios.
* Autenticación mediante JWT.
* Contraseñas cifradas con bcryptjs.
* Gestión de roles: usuario y administrador.
* Gestión de clases deportivas.
* Gestión de reservas.
* Subida de imágenes con Multer y Cloudinary.
* Generación de datos iniciales desde CSV.
* Rutas protegidas mediante middleware.

## Ejecución local

Primero instala las dependencias:

```bash
npm install
```

Después genera los datos iniciales:

```bash
npm run seed
```

Finalmente inicia el servidor:

```bash
npm run dev
```

Servidor local:

```txt
http://localhost:4000
```

## Despliegue

Backend desplegado en:

```txt
AÑADIR_AQUÍ_URL_BACKEND_RENDER
```

## Autor

Santiago Garcés Muñoz
