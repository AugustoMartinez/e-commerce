# API E-commerce

## Dependencias utilizadas

| Dependencia  | Breve descripcion                                            |
| ------------ | ------------------------------------------------------------ |
| nodemon      | Permite realizar cambios sin necesidad de parar la ejecucion |
| express      | Framework de NodeJS,                                         |
| express-jwt  | Manejo de jsonwebtoken con express                           |
| morgan       | Crea logs de cada peticion HTTP al servidor                  |
| dotenv       | Facilita el manejo de variables de entorno                   |
| bcryptjs     | Realiza la encriptacion y da mayor seguridad                 |
| cors         | Permite la conexion entre 2 servidores                       |
| jsonwebtoken | Encriptacion y privilegios de usuarios                       |
| mongoose     | Sirve para manejar la base de datos MongoDB                  |
| multer       | Middleware que permite la carga de datos                     |

## Iniciar API

```json
npm run start
```

## Ejemplo de uso

Conceptos usados

IIFE: permite que una funcion pueda ejecutarse inmediatamente

Middleware: Es el codigo que se ejecuta entre una peticion al servidor y la respuesta del mismo

Async/await: permite ejecutar codigo de forma asincrona, haciendo que no haya errores en caso de latencia

variables de entorno: son aquellas variables externas y ajenas a nuestra aplicacion y que se pueden configurar con un archivo .env
