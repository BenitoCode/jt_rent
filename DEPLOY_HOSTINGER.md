# Despliegue de JT Rent en Hostinger

La aplicación Next.js vive en `jtrent/`. El `package.json` de la raíz define npm workspaces para que Hostinger detecte Next.js al importar el repositorio completo y ejecute los comandos desde su raíz.

En Hostinger, importa este repositorio desde GitHub y usa el modo de publicacion estatica (publish) compatible con Next.js static export. Configura:

- Framework: Next.js
- Node.js: 24
- Directorio raíz: raíz del repositorio (`/`), no `jtrent`
- Instalación: `npm ci`
- Build: `npm run build`
- Directorio de salida: `jtrent/out`

No configures un comando Start ni un archivo de entrada: `next.config.ts` usa `output: "export"` y genera HTML, CSS y JavaScript estaticos en `jtrent/out`. Este modo se sirve desde un host estatico, no con `next start`.

Antes de compilar, añade estas variables de entorno en Hostinger:

- `NEXT_PUBLIC_SITE_URL`: dominio definitivo, por ejemplo `https://tudominio.com`
- `NEXT_PUBLIC_WHATSAPP_NUMBER`: número internacional real, solo dígitos y sin `+`

Conecta el dominio propio en Hostinger siguiendo los valores DNS que indique el panel. Activa el despliegue automatico de la rama conectada para que cada push a GitHub vuelva a compilar y publicar `jtrent/out`.

Para desarrollo local, entra en `jtrent/` y sigue su [README](jtrent/README.md).
