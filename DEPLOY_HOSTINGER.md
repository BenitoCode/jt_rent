# Despliegue de JT Rent en Hostinger

La aplicación Next.js vive en `jtrent/`. El `package.json` de la raíz define npm workspaces para que Hostinger detecte Next.js al importar el repositorio completo y ejecute los comandos desde su raíz.

En Hostinger, crea una **Node.js Web App** e importa este repositorio desde GitHub. Configura:

- Framework: Next.js
- Node.js: 24
- Directorio raíz: raíz del repositorio (`/`), no `jtrent`
- Instalación: `npm ci`
- Build: `npm run build`
- Start: `npm start`
- Directorio de salida: `jtrent/out`

Antes de compilar, añade estas variables de entorno en Hostinger:

- `NEXT_PUBLIC_SITE_URL`: dominio definitivo, por ejemplo `https://tudominio.com`
- `NEXT_PUBLIC_WHATSAPP_NUMBER`: número internacional real, solo dígitos y sin `+`

Conecta el dominio propio desde el panel de Hostinger y sigue los valores DNS que proporcione. Después de conectar GitHub, los pushes a la rama configurada redesplegarán la aplicación automáticamente en un plan compatible con Node.js.

Para desarrollo local, entra en `jtrent/` y sigue su [README](jtrent/README.md).
