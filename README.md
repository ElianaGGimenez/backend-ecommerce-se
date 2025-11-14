# 📦 Ecommerce Backend – Entrega Nº1  
### CRUD de Usuarios + Autenticación y Autorización

Este proyecto implementa el sistema completo de gestión de usuarios solicitado en la Entrega Nº1 del curso


## Modelo User
```
{
  first_name: String,
  last_name: String,
  email: { type: String, unique: true },
  age: Number,
  password: String,
  cart: ObjectId (ref: "Cart"),
  role: "user"
}
```

## Encriptación de Contraseña
```
bcrypt.hash(password, 10)
```

## Estrategias de Passport
### ✔ Local Strategy
Autenticación mediante email + contraseña encriptada.

### ✔ JWT Strategy
Valida tokens enviados en el header:
```
Authorization: Bearer TOKEN
```

## 🔑 Generación de Token JWT
```
jwt.sign(
  { id: user._id, email: user.email },
  process.env.JWT_SECRET,
  { expiresIn: "1h" }
)
```

#  Rutas implementadas

## /api/sessions

### POST `/api/sessions/register`
Registra un nuevo usuario.

### POST `/api/sessions/login`
Devuelve un token JWT si el login es correcto.

### GET `/api/sessions/current`
Ruta protegida con Passport JWT.  
Devuelve el usuario asociado al token.

---

## /api/users – CRUD

### GET `/api/users`
Lista todos los usuarios.

### GET `/api/users/:id`
Devuelve un usuario por ID.

### PUT `/api/users/:id`
Actualiza un usuario.

### DELETE `/api/users/:id`
Elimina un usuario.

---

# Ejemplos para pruebas (Thunder Client)

### Registro
```
POST http://localhost:8080/api/sessions/register
{
  "first_name": "Eliana",
  "last_name": "Gimenez",
  "email": "eli@test.com",
  "age": 26,
  "password": "1234"
}
```

### Login
```
POST http://localhost:8080/api/sessions/login
```
Respuesta:
```
{
  "message": "Login exitoso",
  "token": "TOKEN_AQUI"
}
```

### Current (ruta protegida)
Headers:
```
Authorization: Bearer TOKEN_AQUI
```

---

# ⚙ Archivo .env
```
PORT=8080
MONGO_URI=tu_mongo
JWT_SECRET=tu_secreto
```

---

# ▶ Ejecutar el proyecto
Instalar dependencias:
```
npm install
```

Ejecutar:
```
npm run dev
```

Servidor en:
```
http://localhost:8080
```

---

