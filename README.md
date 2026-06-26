# 🏋️ ReservaFit

ReservaFit es una aplicación Full Stack desarrollada como proyecto final del Máster Full Stack.

Su objetivo es ofrecer una plataforma sencilla para la gestión y reserva de clases deportivas, permitiendo a los usuarios descubrir actividades, reservar plazas y administrar sus reservas, mientras que los administradores pueden gestionar el contenido de la plataforma.

---

# 📖 Objetivos del proyecto

El proyecto ha sido desarrollado utilizando todas las tecnologías vistas durante el curso, poniendo en práctica conceptos de:

- Arquitectura Frontend con React
- Desarrollo de APIs REST con Node.js y Express
- Autenticación mediante JWT
- Gestión de usuarios y roles
- Lectura de archivos CSV y generación automática de datos
- Cloudinary para almacenamiento de imágenes
- Componentización y reutilización de código
- Diseño responsive y buena experiencia de usuario (UX/UI)

---

# 🚀 Tecnologías utilizadas

## Frontend

- React
- React Router
- Axios
- Context API
- Hooks personalizados
- CSS3

## Backend

- Node.js
- Express
- JWT
- bcrypt
- Multer
- Cloudinary

## Almacenamiento

Para este proyecto se ha utilizado una base de datos local basada en archivos JSON.

Los datos son generados automáticamente a partir de archivos CSV mediante un proceso de seed.

---

# 👥 Funcionalidades

## Usuarios

- Registro de usuarios
- Inicio de sesión
- Autenticación JWT
- Avatar mediante Cloudinary
- Perfil de usuario
- Reserva de clases
- Cancelación de reservas
- Visualización de reservas

## Administración

- Gestión de usuarios
- Cambio de roles
- Eliminación de usuarios
- Gestión completa de clases

## Clases

- Catálogo de clases
- Filtrado por categoría
- Filtrado por nivel
- Búsqueda por nombre
- Visualización del detalle
- Imágenes alojadas en Cloudinary

---

# 📂 Estructura del proyecto

```
fullstack_final_project

frontend/
│
├── src/
│   ├── components/
│   ├── context/
│   ├── hooks/
│   ├── pages/
│   ├── api/
│   └── styles/

backend/
│
├── src/
│   ├── controllers/
│   ├── middleware/
│   ├── routes/
│   ├── utils/
│   ├── db/
│   └── seeds/
```

---

# 📊 Generación de datos

Los datos iniciales del proyecto se generan automáticamente a partir de varios archivos CSV:

- users.csv
- instructors.csv
- classes.csv
- bookings.csv

El script de seed transforma dichos archivos en una base de datos JSON utilizada por la aplicación.

```
npm run seed
```

---

# ⚙️ Instalación

## Backend

```
cd backend

npm install

npm run seed

npm run dev
```

Servidor:

```
http://localhost:4000
```

---

## Frontend

```
cd frontend

npm install

npm run dev
```

Aplicación:

```
http://localhost:5173
```

---

# 🔐 Variables de entorno

Crear un archivo `.env` dentro del backend:

```
PORT=4000

JWT_SECRET=your_secret

CLIENT_URL=http://localhost:5173

CLOUDINARY_CLOUD_NAME=...

CLOUDINARY_API_KEY=...

CLOUDINARY_API_SECRET=...
```

---

# ☁️ Cloudinary

Cloudinary se utiliza para almacenar:

- Avatares de usuario
- Imágenes de clases

Las imágenes se suben mediante Multer y se almacenan automáticamente en la cuenta de Cloudinary.

---

# 🎨 Diseño

La aplicación está diseñada siguiendo una interfaz moderna y responsive.

Se utilizan:

- Variables CSS
- Componentes reutilizables
- Diseño basado en tarjetas
- Responsive Design
- Navegación intuitiva

---

# 🔒 Seguridad

- Contraseñas cifradas con bcrypt
- JWT para autenticación
- Rutas protegidas
- Control de acceso mediante roles
- Validación de formularios

---

# 📌 Mejoras futuras

- Calendario de reservas
- Pago online
- Notificaciones por correo
- Valoraciones de clases
- Chat con instructores
- Panel de estadísticas avanzado

---

# 👨‍💻 Autor

**Santiago Garcés Muñoz**
