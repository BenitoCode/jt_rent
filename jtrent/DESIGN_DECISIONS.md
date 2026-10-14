# JT Rent — decisiones de diseño

## Revisión guiada · Cabecera · 14 de octubre de 2026

La instrucción actual del usuario sustituye la autorización anterior de avanzar sin pausas: trabajar sección por sección y esperar su aprobación antes de cambiar o continuar.

El usuario mantiene el nombre JT Rent y el logotipo y aprueba la opción A: Flota, Cómo alquilar, Contacto, ES/EN y Consultar por WhatsApp. La cabecera conserva su comportamiento sticky. Cómo alquilar enlaza al proceso existente; no se cambia su contenido. El botón abre una consulta general por WhatsApp. En pantallas pequeñas se presenta como icono con nombre accesible, y el menú desplegable incluye el botón con el texto completo. Se conserva el enlace condicional de reseñas para cuando existan entradas verificadas. No se añaden apartados nuevos ni se avanza al hero sin autorización.

### Ajuste aprobado · Botón de WhatsApp

El usuario sustituye el botón rojo por la opción A de contorno discreto: fondo blanco, borde gris fino, icono y texto negros, y etiqueta corta «WhatsApp». Se aplica a la cabecera y su menú móvil; el acceso compacto en pantallas pequeñas conserva su nombre accesible.

### Revisión aprobada · Retirada del botón

El usuario pide retirar el botón de WhatsApp de la cabecera. Se elimina también su duplicado en el menú desplegable. El espacio queda sin sustituto mientras el usuario elige una nueva propuesta; se mantienen los otros accesos de contacto de la página.

El usuario elige finalmente la opción C para la cabecera: dejar solo ES/EN a la derecha, sin elemento sustituto, y autoriza continuar con el hero.

## Revisión guiada · Textos del hero · 14 de octubre de 2026

El usuario aprueba la opción C: «Tu próxima ruta empieza en Málaga», con el subtítulo «Elige tu scooter, cuéntanos tus fechas y te confirmaremos disponibilidad, precio y condiciones.» Se incluye su traducción al inglés. Las imágenes y los botones del hero quedan pendientes de revisión dentro de esta sección.

## Autorización · 13 de octubre de 2026

El usuario autorizó crear toda la web desde cero con criterio propio, sin pausas entre fases, y pidió poder modificar cualquier parte con eficacia. Esta autorización sustituye las pausas del documento inicial. La aprobación visual final está pendiente.

## Implementado, pendiente de revisión visual

- Dirección editorial, blanca y deportiva. Cabecera fija, hero dividido, diagonal roja, tipografía grande, sección informativa sobre JT Rent y el alquiler, dos espacios neutrales para futuras motos, proceso de consulta, contacto rojo y footer.
- Colores del brief: rojo `#E30613`, negro `#111111`, blanco y gris `#F5F5F5`. Variables globales en [globals.css](src/app/globals.css).
- Fuente provisional de sistema Arial/Helvetica: sin descargas ni incorporación de archivos de Helvetica Neue cuya licencia se desconoce. La elección definitiva queda pendiente.
- Logotipo original transparente facilitado por el usuario, sin recolorear ni deformar. Solo se ocultan márgenes transparentes mediante CSS.
- Cuatro fotos originales de la Kymco incorporadas; su ubicación actual queda recogida en la revisión aprobada más reciente.
- Idiomas español e inglés con rutas independientes y selector que conserva la sección cuando es posible.
- La ficha, modal y mensajes de WhatsApp comparten una única tarifa cuando una moto confirmada se muestra en la flota. Fechas opcionales, validación local, sin cálculo de total ni confirmación automática.
- Modal nativo accesible: foco contenido, cierre con Escape/X, restauración de foco y scroll. Cierre exterior solo si no hay fechas introducidas.
- Reseñas ocultas hasta existir entradas verificadas. Contacto y enlaces legales ocultos si no están configurados.
- Movimiento limitado a hover y apertura del modal, respetando reducción de movimiento.
- Organización por componentes y traducciones. Cambios localizados y reversibles, sin base de datos, pagos ni autenticación.

## Pendiente de recursos o información

1. PDF del brief, referencias de hero/cabecera/modal.
2. Recursos gráficos recibidos e integrados.
3. ZIP de Helvetica Neue recibido: 16 archivos OTF/TTF, sin documentación de licencia. Pendiente confirmación de licencia web antes de incorporar sus binarios al sitio.
4. Número WhatsApp real, contacto, dirección, horarios y dominio final.
5. Textos legales y reseñas verificadas.
6. Aprobación visual del usuario y publicación. Esta entrega es una versión local de revisión.

## Guía de cambios rápidos

Verificación inicial: TypeScript, lint, compilación, siete pruebas de lógica y seis pruebas de navegador superadas. Los tests de navegador cubren ES/EN, ocho anchos de 320 a 1920 px, modal, foco, fechas, navegación y mensajes WhatsApp interceptados. No se ha podido verificar fotografía real ni fidelidad a las referencias todavía no recibidas.

| Cambio                                             | Lugar                                                            |
| -------------------------------------------------- | ---------------------------------------------------------------- |
| Colores, tipografía, tamaños, espacios, responsive | [globals.css](src/app/globals.css)                               |
| Textos                                             | [es.json](src/messages/es.json), [en.json](src/messages/en.json) |
| Precio, modelos, fotos y características           | [motorcycles.ts](src/data/motorcycles.ts)                        |
| Contacto, logo y enlaces                           | [site.ts](src/config/site.ts)                                    |
| Composición de una sección                         | Su componente en [components](src/components)                    |

## Revisión solicitada · 13 de octubre de 2026

El usuario pidió mostrar únicamente la moto de sus cuatro fotografías, incorporar el logo original y la fuente adjunta. Se retiraron los espacios Próximamente y se adaptó la tarjeta a una composición horizontal en escritorio y vertical en móvil. Fotografías y logo integrados; fuente pendiente de acreditar licencia. Pruebas de navegador ampliadas para comprobar carga del logo, cuatro fotos y navegación de galería en ambos idiomas.

## Revisión inicial · 13 de octubre de 2026 (supersedida por la revisión siguiente)

- La Kymco Sky Town 125 no se muestra en la sección de flota; permanece en el hero y en los recursos existentes.
- Se añadieron una introducción bilingüe de JT Rent, alquiler por días o semanas y consultas por WhatsApp, además de dos espacios visuales vacíos para futuras incorporaciones.
- No se publica la foto de referencia enviada: inspira únicamente el tratamiento visual. Los espacios no inventan modelos, precios ni fotografías.
- La visibilidad de cada moto en la flota se controla por separado con `showInFleet`. Las futuras motos solo se publicarán con datos confirmados.

No cambiar precios ni condiciones comerciales sin indicación del usuario.

## Revisión autorizada · Hero y flota

- El hero no muestra fotos de la moto; su área visual presenta una composición tipográfica de Málaga con la diagonal roja.
- La Kymco Sky Town 125 es la primera moto de la flota, con las cuatro fotos originales, 50 €/día y 70 € como precio anterior.
- Se mantienen dos tarjetas neutrales «Próximamente» para futuras incorporaciones, sin inventar modelos o recursos.
- La sección informativa mantiene el contenido sobre JT Rent y el alquiler por días o semanas, sin mostrar la moto.

## Revisión autorizada · Slider manual del hero (supersedida)

- Las cuatro imágenes autorizadas enviadas por el usuario reemplazan la composición tipográfica por un slider manual en el hero, junto a la diagonal roja.
- El slider ofrece flechas y puntos de navegación, sin reproducción automática.
- Las fotos originales de la Kymco siguen reservadas para la sección Flota.

## Revisión autorizada · Rotación automática del hero

- Se retira del slider la primera imagen anterior; quedan las tres fotos restantes.
- El carrusel avanza automáticamente cada dos segundos, además de permitir navegación mediante flechas y puntos.
- Si el sistema tiene activada la preferencia de movimiento reducido, se desactiva el avance automático.
