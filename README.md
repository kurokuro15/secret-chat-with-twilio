Este es un proyecto [Next.js](https://nextjs.org/) iniciado con [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

# SECRET CHAT with [TWILIO](https://www.twilio.com/referral/xdppiQ)
Realizado por Reynaldo 'kurokuro15' González y Yhan 'lichOp' Montaño para participar en la hackathon de Julio 2022 de @midudev y Twilio.

### #HackathonTwilioJulio2022

Presentamos una aplicación web de conversaciones privadas.

Realizada con Typescript, NextJS, Twilio, Supabase, Tailwind y desplegada en Vercel.

Entre sus características destacamos:
- [x] Crear y eliminar salas de conversaciones (chats) entre grupos de 2 o más personas.
- [x] Enviar mensajes de texto o emojis.
- [x] Personalizar su avatar así como el avatar de las salas.
- [x] Registarse e iniciar sesión con GitHub (Auth0) o correo electrónico.
- [x] Saber sí la sala está activa o no.

Este es nuestro primer proyecto con estas tecnologías, hace poco que empezamos en el mundo de la programación de lleno,
nos hace ilusión esta hackathon así como el hecho de poder 'poner a prueba' nuestro conocimientos y habilidades. 

Gracias por esta oportunidad.

## Desplegarla en un entorno local

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

Tabla profiles

- id: uuid -> auth.users.uuid // llave foránea al id de los usuarios de la tabla auth
- username: varchar unique
- avatar_url: varchar

*Se recomienda activar RLS y añadir políticas de SELECT, INSERT y UPDATE en función del usuario autenticado. Tanto para la tabla profiles como para el bucket*

Se debe crear el siguiente trigger para crear un registro en la tabla profiles cada vez que un usuario se registre. Este script se puede ejecutar en la consola SQL de supabase:

```sql
-- inserts a row into public.users
create function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id)
  values (new.id);
  return new;
end;
$$;

-- trigger the function every time a user is created
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
```

Se necesita además un bucket de storage público llamado 'avatars', el cual almacenará los avatares de los usuarios: [Crear un `bucket`](https://supabase.com/docs/guides/storage#create-a-bucket)

Se debe activar la autenticación por email y por github siguiendo las instrucciones de la documentación:

- [Email](https://supabase.com/docs/guides/auth/auth-email)
- [GitHub](https://supabase.com/docs/guides/auth/auth-github)

Así mismo, hemos de crear un servicio en [TWILIO](https://www.twilio.com/referral/xdppiQ) dentro de "conversations" y recuperar de este el `ACCOUNT_SID`, `API_KEY`, `API_SECRET` y `SERVICE_SID`.

- La API_KEY y su respectivo API_SECRET se pueden crear desde [Crear `API Keys`](https://console.twilio.com/us1/account/keys-credentials/api-keys?frameUrl=%2Fconsole%2Fproject%2Fapi-keys%3Fx-target-region%3Dus1). Debe estar asociada al SERVICE_SID creado anteriormente.

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

NEXT_PUBLIC_APP_URL= <URL completa de donde está desplegada la aplicación (ejemplo: http://localhost:3000/)>
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

## Desplegado en Vercel

El proyecto está desplegado en el siguiente enlace:
#### [Secrect Chat](https://secret-chat-with-twilio.vercel.app/).

### [Vercel](https://vercel.com/)
