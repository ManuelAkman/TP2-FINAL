# TP2-FINAL
Final Materia Taller de Programación 2

## 📋 Descripción
API REST para gestión de productos con endpoints CRUD y exportación a CSV.

## 🚀 Levantar el Servidor

### Instalación de Dependencias
```bash
npm install
```

### Configuración del Entorno
Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:
```env
PORT=3000
NODE_ENV=development
API_KEY=FINALTP2
```

### Iniciar el Servidor
```bash
npm start
```

El servidor estará disponible en `http://localhost:3000`

## 📡 Endpoints

### Health Check
**GET** `/health`

Verifica el estado del servidor.

**Respuesta:**
```json
{
  "status": "ok",
  "env": "development"
}
```

---

### Productos

#### Listar Todos los Productos
**GET** `/api/v1/productos`

Obtiene todos los productos de la base de datos.

**Respuesta:**
```json
[
  {
    "id": "uuid",
    "producto": "Nombre del producto",
    "stockAmount": 100,
    "fechaIngreso": "2025-01-15"
  }
]
```

---

#### Obtener Producto por ID
**GET** `/api/v1/productos/:id`

Obtiene un producto específico por su ID.

**Parámetros:**
- `id` (UUID): ID del producto

**Respuesta:**
```json
{
  "id": "uuid",
  "producto": "Nombre del producto",
  "stockAmount": 100,
  "fechaIngreso": "2025-01-15"
}
```

**Errores:**
- `404`: Producto no encontrado

---

#### Crear Producto
**POST** `/api/v1/productos`

Crea un nuevo producto. El ID se genera automáticamente.

**Body (JSON):**
```json
{
  "producto": "Nombre del producto",
  "stockAmount": 10,
  "fechaIngreso": "2025-01-15"  // opcional, por defecto fecha actual
}
```

**Validaciones:**
- `producto`: requerido, no puede estar vacío
- `stockAmount`: requerido, entero mayor o igual a 0
- `fechaIngreso`: opcional, formato YYYY-MM-DD

**Respuesta:**
```json
{
  "id": "uuid-generado",
  "producto": "Nombre del producto",
  "stockAmount": 10,
  "fechaIngreso": "2025-01-15"
}
```

**Errores:**
- `400`: Error de validación

---

#### Actualizar Producto
**PUT** `/api/v1/productos/:id`

Actualiza un producto existente. **Requiere autenticación con API Key.**

**Headers:**
```
x-api-key: FINALTP2
```

**Parámetros:**
- `id` (UUID): ID del producto

**Body (JSON):**
```json
{
  "producto": "Nombre actualizado",
  "stockAmount": 50,
  "fechaIngreso": "2025-02-01"
}
```

**Nota:** El campo `id` no puede ser modificado.

**Respuesta:**
```json
{
  "id": "uuid",
  "producto": "Nombre actualizado",
  "stockAmount": 50,
  "fechaIngreso": "2025-02-01"
}
```

**Errores:**
- `401`: No autorizado (API key inválida o faltante)
- `404`: Producto no encontrado
- `400`: Error de validación

---

#### Eliminar Producto
**DELETE** `/api/v1/productos/:id`

Elimina un producto. **Requiere autenticación con API Key.**

**Headers:**
```
x-api-key: FINALTP2
```

**Parámetros:**
- `id` (UUID): ID del producto

**Respuesta:**
- `204 No Content`

**Errores:**
- `401`: No autorizado (API key inválida o faltante)
- `404`: Producto no encontrado

---

### Exportación CSV

#### Exportar Primeros 15 Productos a CSV
**GET** `/api/v1/albums/csv`

Obtiene los primeros 15 productos de la base de datos y los devuelve en formato CSV.

**Respuesta:**
- Content-Type: `text/csv`
- El archivo CSV contiene las columnas: `id,producto,stockAmount,fechaIngreso`
- Se descarga automáticamente como `albums_15.csv`

**Ejemplo de contenido CSV:**
```csv
id,producto,stockAmount,fechaIngreso
uuid1,"Mouse Logitech",150,2025-02-20
uuid2,"Teclado Mecánico",80,2025-03-10
...
```

---

## 🔐 Autenticación

Los endpoints de actualización (PUT) y eliminación (DELETE) requieren autenticación mediante API Key.

**Header requerido:**
```
x-api-key: FINALTP2
```

Si el header no está presente o el valor es incorrecto, se recibirá un error `401 Unauthorized`.

---

## 🧪 Testing

Utiliza el archivo `tests/test.endpoints.http` con la extensión **REST Client** de VS Code para probar todos los endpoints.

1. Instala la extensión: `humao.rest-client`
2. Abre `tests/test.endpoints.http`
3. Haz clic en "Send Request" sobre cada endpoint

---

## 📁 Estructura del Proyecto

```
TP2-FINAL/
├── config/              # Configuración y variables de entorno
├── controllers/         # Controladores de endpoints
├── database/            # Base de datos JSON
├── middlewares/         # Middlewares (autenticación)
├── models/              # Modelos de datos
├── repository/          # Capa de acceso a datos
├── routes/              # Definición de rutas
├── services/            # Lógica de negocio
├── tests/               # Pruebas de endpoints
├── app.js               # Configuración de Express
├── index.js             # Punto de entrada del servidor
└── package.json         # Dependencias del proyecto
```

---

## 🛠️ Tecnologías

- **Node.js** - Runtime de JavaScript
- **Express** - Framework web
- **dotenv** - Variables de entorno
- **morgan** - Logger de peticiones HTTP
- **cors** - Cross-Origin Resource Sharing

---

## 👥 Autor

Manuel Akman
