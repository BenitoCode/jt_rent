# JT Rent

Landing bilingüe creada con Next.js App Router, React, TypeScript, Tailwind CSS y Lucide. Componentes separados y variables de diseño para realizar cambios localizados.

## Instalar y ejecutar

Instala Node.js 24 LTS y abre una terminal en esta carpeta:

```sh
npm ci
cp .env.example .env.local
npm run dev
```

En PowerShell, usa `Copy-Item .env.example .env.local`. Abre `http://127.0.0.1:3000/es/` o `/en/`. `/` redirige a español.

En esta sesión se utilizó Node portátil en una carpeta temporal porque no había instalación local. Para uso continuado instala Node.js; no se depende de esa ruta temporal en el proyecto.

## Configurar WhatsApp y dominio

En `.env.local`, define `NEXT_PUBLIC_WHATSAPP_NUMBER` con el número internacional real, solo dígitos, sin espacios ni `+`. Sin un número válido, todos los botones de WhatsApp permanecen desactivados con un estado explicativo. No hay número ficticio configurado.

Configura NEXT_PUBLIC_SITE_URL con el dominio principal; el valor por defecto es https://jt-rent.com. Si cambia el host canonico, reconstruye el proyecto.

WhatsApp abre un mensaje, nunca confirma automáticamente la reserva. Las fechas son opcionales: para enviarlas se requieren las dos, con devolución igual o posterior a recogida y recogida no anterior al día local de la consulta.

La portada, el footer y el acceso flotante preparan una consulta general; desde la ficha se pueden indicar fechas y enviar el modelo elegido. El acceso flotante aparece cuando el número está configurado correctamente.

## Cambiar diseño y textos

- Colores, tipo de letra, ancho máximo, espacios y bordes: variables al inicio de [globals.css](src/app/globals.css). El resto de estilos está agrupado por sección y breakpoint.
- Textos: [es.json](src/messages/es.json) y [en.json](src/messages/en.json), con las mismas claves. `Messages` comprueba la compatibilidad de ambos idiomas.
- Distribución: cada sección tiene su componente en [components/sections](src/components/sections), agrupado por funcionalidad y sin mezclar los datos del negocio.
- Decisiones y recursos pendientes: [DESIGN_DECISIONS.md](DESIGN_DECISIONS.md).

### Estructura del código

```text
src/
  app/                    Rutas, layouts y estilos globales
  components/
    layout/               Cabecera, pie y navegación
    sections/<feature>/   Una carpeta por sección de la página
    booking/              Flujo y estado de reserva
    privacy/              Consentimiento y privacidad
    ui/                   Componentes visuales reutilizables
  config/                 Datos estables del sitio
  data/                   Flota y contenido estructurado
  lib/                    Lógica compartida y utilidades
  messages/               Textos traducidos ES/EN
```

Al añadir una sección, crea `components/sections/<nombre>/` y mantén juntos su componente y los componentes que solo utilice esa sección. Importa la sección en `app/[locale]/page.tsx`; deja en `app/` solo rutas y composición de página. Comparte piezas entre secciones únicamente cuando tengan el mismo comportamiento y responsabilidad. Guarda contenido editable en `data/`, configuración del negocio en `config/`, textos visibles en ambos archivos de `messages/` y reglas globales de diseño en `globals.css`.

## Precios y motos

Edita [motorcycles.ts](src/data/motorcycles.ts). `dailyPrice` es la única fuente del precio para tarjeta, modal y mensajes. `previousPrice` es opcional. No se calcula un total de alquiler.

El hero muestra un slider con tres fotografías aprobadas de scooters y paisajes de Málaga; avanza automáticamente cada cinco segundos y respeta la preferencia de movimiento reducido. La Kymco Sky Town 125 aparece como la primera ficha de la flota (`showInFleet: true`), con sus fotos originales y los precios configurados en `motorcycles.ts` (50 €/día; precio anterior 70 €). La sección informativa explica el alquiler por días o semanas y la flota conserva dos espacios no interactivos para futuras motos, sin modelos ni fotos inventados.

Para añadir una moto confirmada, incorpora una entrada con ID único, marca, modelo, cilindrada, descripción ES/EN, fotos, características, precio, estado, `visible: true` y `showInFleet: true`. Solo se muestran en la flota las motos visibles con `available_for_inquiry` y `showInFleet: true`. Sustituye los espacios «Próximamente» cuando haya contenido confirmado. Las fichas publicadas abren la galería y la consulta de fechas por WhatsApp; la solicitud no confirma automáticamente una reserva.

## Fotografías y logo

Crea `public/images/` y coloca ahí los originales aprobados, preferentemente optimizados a WebP/AVIF conservando proporciones. Añade las fotos al array `photos` del vehículo:

```ts
{
  src: "/images/kymco-three-quarter.webp",
  alt: { es: "Kymco Sky Town 125 vista de tres cuartos", en: "Kymco Sky Town 125 three-quarter view" },
  width: 1600,
  height: 1200,
}
```

Usa las dimensiones reales. La foto con `role: "side"` se usa en la tarjeta de flota (o la primera si no existe lateral); todas aparecen en el modal con indicadores, botones y gestos táctiles. Next Image optimiza y reserva dimensiones; las fotos de la flota se cargan bajo demanda. Las imágenes usan `object-fit: contain` para conservar el contenido original.

El logo original, las cuatro fotos de la Kymco y las tres fotos del slider del hero están en `public/images/`. `site.logo` en [site.ts](src/config/site.ts) configura el logotipo. La foto `role: "dashboard"` se conserva en la galería de la Kymco. El ZIP de Helvetica Neue contiene 16 fuentes sin documentación de licencia: no se han incorporado sus archivos al sitio hasta confirmar permiso de uso web.

## Contacto, reseñas y legales

Completa únicamente datos confirmados en [site.ts](src/config/site.ts). Rellena los enlaces legales cuando existan sus páginas reales. [testimonials.ts](src/data/testimonials.ts) admite texto, fuente, imagen y vídeo con subtítulos. Solo entradas `verified: true` muestran la sección y su enlace en navegación. No hay reseñas inventadas.

## Comprobaciones

```sh
npm run typecheck
npm run lint
npm test
npm run build
npm run test:e2e
```

Los tests cubren fechas, codificación de WhatsApp, rechazo de números inválidos y reutilización de tarifa. Las pruebas de interfaz revisan ambos idiomas, contenido de la flota, espacios futuros no interactivos, menú móvil, ausencia de scroll horizontal y anchos de 320, 375, 390, 430, 768, 1024, 1440 y 1920 px. Cuando se añadan motos confirmadas, volver a probar su galería, selector de fechas y modal de consulta.

`test:e2e` usa Google Chrome instalado y abre un servidor de pruebas en el puerto 3001. Sus datos ficticios de teléfono y dominio solo se inyectan en ese proceso; Playwright intercepta las consultas para no contactar con WhatsApp. Para usar otro navegador, modifica `channel` en [playwright.config.ts](playwright.config.ts). Capturas y trazas se guardan en `test-results/`, fuera de Git.

Para mantener el código legible después de editar, ejecuta `npm run format`.

## Producción y despliegue

```sh
npm run build
npm start
```

Se puede desplegar en un proveedor compatible con Next.js/Node. Si el repositorio completo es la raíz del proveedor, configura `jtrent` como directorio raíz. Usa `npm ci` para instalar y `npm run build` para compilar. Configura las variables públicas antes de compilar. La web todavía no está publicada.

Antes de publicar: sustituir recursos provisionales, confirmar contactos y características, añadir documentos legales aplicables, configurar dominio/WhatsApp y revisar fotos, enlaces, accesibilidad y composición final. No hay analítica ni cookies añadidas por la aplicación.
