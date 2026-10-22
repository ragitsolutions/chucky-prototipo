# chuckyfitness — prototipo visual

Prototipo navegable de la plataforma para enseñar al cliente: web pública, área
del alumno y panel del entrenador, con estética de **dojo de templo japonés** en negro y rojo, y
guiños de manga. Un selector de paleta, de tipografía y de tema claro/oscuro
repinta la web entera al momento, ilustraciones incluidas.

**Es solo visual.** No hay base de datos ni formularios que envíen nada. Los
precios, los datos del entrenador y los testimonios son de ejemplo.

La plataforma real se construye aparte, en el repositorio `chuckyfitness`
(Next.js + Supabase). Este repositorio no comparte código con aquel: existe solo
para poder publicarse tal cual en un hosting estático.

## Contenido

| Fichero               | Para qué                                                          |
| --------------------- | ----------------------------------------------------------------- |
| `index.html`          | Las tres vistas y el sprite con todas las ilustraciones.          |
| `css/tokens.css`      | Las cuatro paletas (claro y oscuro) y las tres tipografías.       |
| `css/base.css`        | Piezas comunes: botones, sellos hanko, ondas, bocadillos…         |
| `css/publica.css`     | Web pública.                                                      |
| `css/alumno.css`      | Área del alumno.                                                  |
| `css/panel.css`       | Panel del entrenador.                                             |
| `js/app.js`           | Navegación, series, «¡ドン!», temporizador y selectores.           |
| `js/brasas.js`        | Brasas que suben en la portada y en el acceso.                    |
| `css/guinos.css`      | Guiños de anime (ver abajo). Solo para el prototipo.              |
| `js/guinos.js`        | Las siete esferas y el estallido «黒閃». Solo para el prototipo.   |
| `tools/contraste.mjs` | Mide el contraste WCAG de las paletas: `node tools/contraste.mjs` |
| `.htaccess`           | Fuerza UTF-8 y pide a los buscadores que no lo indexen.           |
| `robots.txt`          | Lo mismo, para los buscadores que no leen cabeceras.              |

Lo único externo son las tipografías, que se cargan de Google Fonts. Las
ilustraciones van dentro de `index.html` como gráficos vectoriales: no hay
imágenes que descargar.

Todas las animaciones se apagan si el dispositivo tiene activado «reducir
movimiento».

## Guiños de anime (solo prototipo)

Referencias que un fan reconoce, sin personajes, logos, nombres de series ni
ilustraciones oficiales. **Antes de la web real se revisan uno a uno**: lo que
vea el cliente aquí es lo que esperará después, y la web real será comercial.

| Guiño                                                       | Dónde                         | Referencia       |
| ----------------------------------------------------------- | ----------------------------- | ---------------- |
| «¡Más de 8000!» en el nivel de poder                         | Alumno · Hoy                  | Dragon Ball      |
| Siete esferas naranjas con estrellas como racha semanal      | Alumno · Hoy                  | Dragon Ball      |
| «¡Transformación dorada!» con aura en el récord personal     | Alumno · Progreso             | Dragon Ball      |
| Logro «Gravedad ×10» y pregunta de las cien gravedades       | Progreso · Preguntas          | Dragon Ball      |
| Bandana con placa de metal grabada como insignia de rango    | Alumno · Hoy, ficha del panel | Naruto           |
| Logro «Clones de sombra» (分身) y «No me rindo: ese es mi camino» | Progreso · Sin rutina      | Naruto           |
| Cartel WANTED / DEAD OR ALIVE, «LUCÍA·D·RAMÍREZ», ฿ y «DOJO» | Alumno · Perfil               | One Piece        |
| Formas 壱ノ型/弐ノ型/参ノ型 y «Respiración del hierro»          | Rutina · Entrenamiento        | Kimetsu no Yaiba |
| Franja de cuadros rojos y negros; rango máximo «Pilar» (柱)   | Web pública · Progreso        | Kimetsu no Yaiba |
| «黒閃! Destello negro» al completar todas las series          | Modo entrenamiento            | Jujutsu Kaisen   |
| 領域展開, «expansión de dominio», en la cabecera del panel     | Panel                         | Jujutsu Kaisen   |
| Onomatopeya ゴゴゴ en «Cómo funciona»                          | Web pública                   | JoJo's           |

Para quitarlos casi todos basta con borrar `css/guinos.css`, `js/guinos.js` y
sus dos líneas en `index.html`; los textos (formas, logros, preguntas) están en
el propio `index.html`.

## Verlo en local

Abre `index.html` con doble clic. No necesita servidor.

## La versión anterior

La primera versión, de estética «clara tipo clínica», está guardada con la
etiqueta `v1-clinica`:

```bash
git checkout v1-clinica
```

Para volver a la actual: `git checkout main`.

## Publicarlo en Hostinger desde GitHub

1. En **hPanel → Sitios web → (tu dominio o subdominio) → Avanzado → Git**.
2. En **Repositorio**, pega la dirección del repositorio de GitHub.
3. En **Rama**, pon `main`.
4. En **Directorio**, déjalo vacío para que se instale en `public_html`, o
   escribe una subcarpeta si el dominio ya tiene otra web.
5. Pulsa **Crear** y después **Desplegar**.

Los nombres exactos de los menús de hPanel cambian de vez en cuando; si no
encuentras uno, busca «Git» en el buscador del propio panel.

### Repositorio público o privado

- **Público:** pega la dirección HTTPS (`https://github.com/usuario/repo.git`) y
  listo.
- **Privado:** pega la dirección **SSH** (`git@github.com:usuario/repo.git`).
  Hostinger te enseñará una clave SSH en esa misma pantalla; cópiala en GitHub,
  en el repositorio: **Settings → Deploy keys → Add deploy key**, sin marcar el
  permiso de escritura. Sin ese paso el despliegue falla.

### Actualizar

Cada vez que subas un cambio a GitHub, vuelve a pulsar **Desplegar** en hPanel.

Para que se actualice solo: en la pantalla de Git de hPanel hay una opción de
despliegue automático que te da una **URL de webhook**. Pégala en GitHub, en el
repositorio: **Settings → Webhooks → Add webhook**, en «Payload URL».

**Recomendación:** publícalo en un subdominio propio, por ejemplo
`prototipo.tudominio.es`, y no en el dominio principal. Así, cuando llegue la
web real, no hay que retirar nada.

## Si quieres que solo lo vea tu cliente

`noindex` evita que salga en Google, pero cualquiera con el enlace puede
abrirlo. Para ponerle contraseña: **hPanel → Sitios web → Avanzado → Directorios
protegidos con contraseña**, elige la carpeta y crea un usuario.
