# Evidencias de Pruebas - Módulo de Autenticación (Passport + JWT)

## 1. Registro de Usuario
- **Endpoint:** `POST /api/v1/auth/register`
- **Descripción:** Registro de un nuevo usuario con clave hasheada mediante bcrypt.
- **Resultado:** Status 201 Created.
[Insertar captura de pantalla de Thunder Client]

---

## 2. Login y Emisión de Token
- **Endpoint:** `POST /api/v1/auth/login`
- **Descripción:** Verificación de credenciales y generación del JWT.
- **Resultado:** Status 200 OK.
[Insertar captura de pantalla de Thunder Client]

---

## 3. Verificación de Ruta Protegida (/current)
- **Endpoint:** `GET /api/v1/auth/current`
- **Prueba con Token:** Status 200 OK - Retorna el DTO/perfil del usuario logueado.
- **Prueba sin Token:** Status 401 Unauthorized - Acceso denegado.
[Insertar capturas de pantalla de ambos casos]