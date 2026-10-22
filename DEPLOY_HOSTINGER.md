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

El archivo `jtrent/public/.htaccess` se copia al directorio de salida y configura la caché de los recursos estáticos en Hostinger: los recursos versionados de Next.js durante un año, las imágenes durante 30 días y los documentos HTML/XML con revalidación. Después de desplegar, comprueba las cabeceras `Cache-Control` de un recurso `/_next/static/` y de `/images/logo-jt.png`; el CDN puede tardar en reflejar las nuevas cabeceras hasta que se purgue su caché.

El mismo `.htaccess` redirige permanentemente las solicitudes HTTP y `www.jt-rent.com` a `https://jt-rent.com`, que es el dominio canonico configurado en `NEXT_PUBLIC_SITE_URL`. Tras cambiar estas reglas, vuelve a ejecutar el build y publica de nuevo `jtrent/out`. Si Hostinger sirve el dominio mediante un proxy que no admite `.htaccess`, configura las mismas redirecciones en el panel del proveedor.

Para desarrollo local, entra en `jtrent/` y sigue su [README](jtrent/README.md).
