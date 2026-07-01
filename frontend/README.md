# ReservaFit Frontend

Aplicación web desarrollada con React y Vite para la gestión de reservas deportivas.

## Tecnologías

- React
- Vite
- React Router DOM
- Axios
- Context API
- Lucide React

## Instalación

```bash
npm install
```

## Variables de entorno

Crear un archivo `.env`:

```env
VITE_API_URL=http://localhost:4000/api
```

Para producción:

```env
VITE_API_URL=https://reservafit.onrender.com/api
```

## Scripts

### Desarrollo

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Preview

```bash
npm run preview
```

## Estructura

```txt
src/
├── components/
├── context/
├── hooks/
├── pages/
├── services/
├── assets/
├── App.jsx
└── main.jsx
```

## Funcionalidades

### Usuario

- Registro
- Inicio de sesión
- Gestión de perfil
- Consulta de clases
- Reserva de actividades
- Cancelación de reservas

### Administrador

- Gestión de usuarios
- Gestión de clases
- Gestión de reservas

## Pantallas

- Home
- Login
- Registro
- Perfil
- Clases
- Reservas
- Administración

## Despliegue

Vercel:

https://reservafit-ciawcjgri-santibrimstones-projects.vercel.app/

si no funciona probar con: https://reservafit-orpin.vercel.app/

## Autor

Santiago Garcés Muñoz