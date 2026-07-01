# ReservaFit Frontend

Frontend del proyecto ReservaFit, desarrollado con React y Vite.

## Descripción

ReservaFit es una aplicación web para consultar clases deportivas, gestionar reservas y administrar usuarios y actividades.

El frontend permite a los usuarios registrarse, iniciar sesión, consultar clases, filtrar actividades, reservar plazas y gestionar su perfil. Los administradores pueden acceder a funcionalidades de gestión.

## Tecnologías

* React
* Vite
* React Router
* Axios
* Context API
* Hooks personalizados
* CSS3
* Lucide React

## Instalación

```bash
cd frontend
npm install
```

## Variables de entorno

Crear un archivo `.env` en la carpeta `frontend`:

```env
VITE_API_URL=http://localhost:4000/api
```

Para producción:

```env
VITE_API_URL=AÑADIR_AQUÍ_URL_BACKEND_RENDER/api
```

## Scripts disponibles

```bash
npm run dev
```

Ejecuta la aplicación en modo desarrollo.

```bash
npm run build
```

Genera la versión de producción.

```bash
npm run preview
```

Permite previsualizar la build de producción.

## Estructura del proyecto

```txt
frontend/
└── src/
    ├── api/
    ├── components/
    ├── context/
    ├── hooks/
    ├── pages/
    ├── styles/
    ├── App.jsx
    └── main.jsx
```

## Funcionalidades

* Página de inicio.
* Registro de usuarios.
* Inicio de sesión.
* Gestión de sesión mediante contexto.
* Catálogo de clases deportivas.
* Búsqueda de clases.
* Filtros por categoría, nivel o nombre.
* Detalle de clase.
* Reserva de clases.
* Cancelación de reservas.
* Perfil de usuario.
* Panel de administración.
* Diseño responsive adaptado a distintos tamaños de pantalla.

## Ejecución local

Instalar dependencias:

```bash
npm install
```

Iniciar frontend:

```bash
npm run dev
```

Aplicación local:

```txt
http://localhost:5173
```

## Conexión con el backend

El frontend consume la API del backend mediante Axios.

En local, el backend debe estar ejecutándose en:

```txt
http://localhost:4000
```

Y la variable de entorno debe apuntar a:

```env
VITE_API_URL=http://localhost:4000/api
```

## Despliegue

Frontend desplegado en:

```txt
AÑADIR_AQUÍ_URL_FRONTEND_VERCEL
```

## Pantallas principales

* Home
* Login
* Registro
* Catálogo de clases
* Detalle de clase
* Perfil de usuario
* Reservas
* Panel de administración

## Autor

Santiago Garcés Muñoz
