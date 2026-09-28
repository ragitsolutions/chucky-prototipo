# chuckyfitness — prototipo visual

Prototipo navegable de la plataforma para enseñar al cliente: web pública, área
del alumno y panel del entrenador, con un selector de paleta, de tipografía y de
tema claro/oscuro que repinta la web entera al momento.

**Es solo visual.** No hay base de datos ni formularios que envíen nada. Los
precios, los datos del entrenador y los testimonios son de ejemplo.

La plataforma real se construye aparte, en el repositorio `chuckyfitness`
(Next.js + Supabase). Este repositorio no comparte código con aquel: existe solo
para poder publicarse tal cual en un hosting estático.

## Contenido

| Fichero       | Para qué                                                       |
| ------------- | -------------------------------------------------------------- |
| `index.html`  | El prototipo entero. Un único fichero, sin dependencias.       |
| `.htaccess`   | Fuerza UTF-8 y pide a los buscadores que no lo indexen.        |
| `robots.txt`  | Lo mismo, para los buscadores que no leen cabeceras.           |

Lo único externo son las tipografías, que se cargan de Google Fonts.

## Verlo en local

Abre `index.html` con doble clic. No necesita servidor.

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
