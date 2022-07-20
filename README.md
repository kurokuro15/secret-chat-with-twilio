Este es un proyecto [Next.js](https://nextjs.org/) iniciado con [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

# SECRET CHAT with [TWILIO](https://www.twilio.com/referral/xdppiQ)

### #HackathonTwilioJulio2022

Este repositorio contiene el proyecto realizado por Reynaldo 'kurokuro15' González y Yhan 'lichOp' Montaño para participar en la hackathon de Julio 2022 de @midudev y Twilio.

Presentando una aplicación de mensajes "punto a punto" no encriptada. Permite:

- [x] Registarse e iniciar sesión con GitHub (Auth0) o correo electrónico.
- [ ] Mensajes encriptados punto a punto seguros.
- [ ] Recibir notificaciones informando sobre la llegada de un nuevo mensaje.
- [x] Crear y eliminar salas de conversaciones (chats) entre grupos de 2 o más personas.
- [ ] Invitar a quien desee estar a través de su nombre de usuario o su correo electrónico.
- [ ] Personalizar su avatar así como el avatar de las salas.
- [x] Saber sí la sala está activa no.
- [x] Enviar mensajes de texto o emojis.

## Desplegar en entorno local

### Descargando el repositorio

```bash
#Clonar http
git clone https://github.com/kurokuro15/secret-chat-with-twilio.git

#Clonar con GitHub CLI
gh repo clone kurokuro15/secret-chat-with-twilio
```

O bien bajar el archivo `zip` y descomprimirlo.

### Configurando Supabase y Twilio

Primero, se ha de crear un proyecto nuevo en supabase, con la siguiente estructura de base de datos:

```

```

Así mismo, hemos de crear un servicio en [TWILIO](https://www.twilio.com/referral/xdppiQ) y recuperar de este el `ACCOUNT_SID`, `API_KEY`, `API_SECRET` y `SERVICE_SID`.

### Inicializando Variables de entorno

Segundo, se han de configurar las variables de entorno, a partir del archivo .env.example donde tendremos:

```bash
# ./.env.example
NEXT_PUBLIC_SUPABASE_URL= <Enlace de la base de datos de supabase>
NEXT_PUBLIC_SUPABASE_ANON_KEY= <Llave anónima de supabase>

TWILIO_ACCOUNT_SID= <SID de la cuenta de TWILIO>
TWILIO_API_KEY= <llave de la API de TWILIO>
TWILIO_API_SECRET= <Secreto|Contraseña de la API de TWILIO>
TWILIO_SERVICE_SID= <SID del servicio de TWILIO>
```

### Instalando Dependencias y ejecutando la aplicación

Tercero, abrimos una terminal en el proyecto y ejecutamos:

```bash
# secret-chat-with-twilio/$
npm install
npm run dev
# or
yarn install
yarn dev
```

Abrimos [http://localhost:3000](http://localhost:3000) en el navegador para visitar la aplicación.

## Deploy on Vercel

El proyecto está desplegado en el siguiente enlace:
[Secrect Chat]().

### [Vercel](https://vercel.com/)
