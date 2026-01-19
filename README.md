# Legal Suite API - Backend Node.js

API REST para la gestión de abogados y casos legales en un bufete. Desarrollada con Node.js, Express, PostgreSQL y Sequelize.

---

## Prerrequisitos

Asegúrate de tener instalado:

- Node.js v18 o superior
- Docker y Docker Compose
- Git
- npm o yarn

Verificar versiones:

```bash
node --version  # v18+
docker --version
docker-compose --version


## Instalación

1. **Clonar el repositorio**

git clone https://github.com/tu-usuario/legalsuite-test-backend.git
cd legalsuite-test-backend
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar variables de entorno**

Copia el archivo `.env.example` y renómbralo a `.env`:
```bash
cp .env.example .env
```

4. **Levantar PostgreSQL con Docker**
```bash
docker-compose up -d
```
Esto levantará una instancia de PostgreSQL en el puerto 5432 o en el puerto que hayas elegido.

5. **Ejecutar migraciones**
```bash
npm run db:migrate
```

6. **Ejecutar seeders (datos de prueba)**
```bash
npm run db:seed
```

Esto creará:
- 2 usuarios:
  - `admin` / `Admin123!` (rol: admin)
  - `operator` / `Oper123!` (rol: operator)
- 5 abogados (3 activos, 2 inactivos)
- 10 casos legales (diferentes estados y tipos)


# Configuración

## Archivo .env.example
```env
NODE_ENV=development
PORT=3000

# Database
DB_HOST=localhost
DB_PORT=5432
DB_NAME=legalsuite_db
DB_USER=postgres
DB_PASSWORD=postgres123

# JWT
JWT_SECRET=tu_secret_key_super_segura_aqui
JWT_EXPIRES_IN=24h
```

## Docker Compose

El proyecto incluye un `docker-compose.yml` para levantar PostgreSQL:
```yaml
version: "3.9"
services:
  postgres:
    image: postgres:15
    container_name: legal_suite_postgres
    restart: always
    ports:
      - "5432:5432"
    environment:
      POSTGRES_DB: ${DB_NAME}
      POSTGRES_USER: ${DB_USER}
      POSTGRES_PASSWORD: ${DB_PASSWORD}
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

# Ejecución

## Desarrollo
```bash
npm run dev
```
Servidor corriendo en: http://localhost:3000

## Producción
```bash
npm start
```

## Detener servicios

**Detener Docker:**
```bash
docker-compose down
```

**Detener y eliminar volúmenes:**
```bash
docker-compose down -v
```

# Base de Datos

## Resetear base de datos completa
```bash
npm run db:reset
```

Este comando:
- Elimina todas las tablas
- Ejecuta todas las migraciones
- Ejecuta todos los seeders

## Comandos individuales

**Ejecutar migraciones:**
```bash
npm run db:migrate
```

**Revertir última migración:**
```bash
npm run db:migrate:undo
```

**Ejecutar seeders:**
```bash
npm run db:seed
```

**Revertir seeders:**
```bash
npm run db:seed:undo
```

# Modelos de Datos

## Usuario (User)
- `id` (UUID)
- `username` (string, único)
- `password` (string, hasheado con bcrypt)
- `role` (enum: 'admin', 'operator')
- `is_active` (boolean)
- Timestamps automáticos

## Abogado (Lawyer)
- `id` (UUID)
- `name` (string)
- `email` (string, único)
- `phone` (string, opcional)
- `specialization` (string, opcional)
- `status` (enum: 'active', 'inactive')
- Timestamps automáticos

## Caso Legal (LegalCase)
- `id` (UUID)
- `case_number` (string, único)
- `plaintiff` (string)
- `defendant` (string)
- `case_type` (enum: 'civil', 'criminal', 'labor', 'commercial')
- `status` (enum: 'pending', 'assigned', 'in_progress', 'resolved')
- `description` (text, opcional)
- `lawyer_id` (UUID, foreign key, nullable)
- Timestamps automáticos

# Endpoints

La API está documentada con Swagger. Accede a la documentación interactiva en:
```
http://localhost:3000/api/docs
```

## 1. Autenticación

### POST /api/auth/login
**Body:**
```json
{
  "username": "string",
  "password": "string"
}
```

**Response:**
```json
{
  "token": "jwt",
  "user": {
    "id": "uuid",
    "username": "string",
    "role": "string"
  }
}
```

## 2. Gestión de Abogados

### POST /api/lawyers
- Crear abogado (requiere autenticación)
- Validar email único y formato válido

### GET /api/lawyers?page=1&limit=10&status=active
- Listar abogados con paginación y filtro opcional de status
- Response incluye metadata de paginación

### GET /api/lawyers/:id
- Obtener abogado por ID con sus casos asignados

## 3. Gestión de Demandas

### POST /api/legal-cases
- Crear caso legal
- Validar `case_number` único

### GET /api/legal-cases?page=1&limit=10&status=pending&lawyer_id=uuid
- Listar casos con paginación y filtros opcionales

### GET /api/legal-cases/:id
- Obtener caso por ID con información del abogado asignado

### PUT /api/legal-cases/:id/assign
Asignar abogado a un caso

**Body:**
```json
{
  "lawyer_id": "uuid"
}
```

**Validaciones:**
- Validar que el abogado exista y esté activo
- Cambiar status del caso a "assigned"

### PUT /api/legal-cases/:id/transfer
Transferir caso de un abogado a otro (usar transacción)

**Body:**
```json
{
  "new_lawyer_id": "uuid"
}
```

**Validaciones:**
- Validar que ambos abogados existan y estén activos
- Validar que el caso esté asignado actualmente
- Debe ser atómico: si algo falla, hacer rollback completo

## 4. Reportes

### GET /api/reports/lawyers/:id/cases
- Listado de casos asignados a un abogado
- Incluir estadísticas básicas: total casos, casos por estado

# Testing

## Ejecutar tests
```bash
npm test
```

# Estructura del Proyecto
```
legalsuite-test-backend/
├── src/
│   ├── config/
│   │   ├── env.js                 # Variables de entorno
│   │   ├── database.js            # Configuración de base de datos
│   │   ├── logger.js              # Configuración de Winston
│   │   ├── sequelize.js           # Instancia de Sequelize
│   │   └── swagger.js             # Configuración de Swagger
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   ├── lawyer.controller.js
│   │   ├── legalCase.controller.js
│   │   └── report.controller.js
│   ├── middlewares/
│   │   ├── auth.middleware.js     # Autenticación JWT
│   │   ├── error.middleware.js    # Manejo de errores
│   │   ├── requestLogger.middleware.js
│   │   └── validate.middleware.js # Validación con Joi
│   ├── models/
│   │   ├── index.js
│   │   ├── User.js
│   │   ├── Lawyer.js
│   │   └── LegalCase.js
│   ├── routes/
│   │   ├── auth.routes.js
│   │   ├── lawyer.routes.js
│   │   ├── legalCase.routes.js
│   │   └── report.routes.js
│   ├── services/
│   │   ├── auth.service.js
│   │   ├── lawyer.service.js
│   │   ├── legalCase.service.js
│   │   └── report.service.js
│   ├── validators/
│   │   ├── auth.schemas.js        # Esquemas de validación
│   │   ├── lawyer.schemas.js
│   │   ├── legalCase.schemas.js
│   │   └── report.schemas.js
│   ├── migrations/
│   │   ├── 20250118000001-create-users.js
│   │   ├── 20250118000002-create-lawyers.js
│   │   └── 20250118000003-create-legal-cases.js
│   ├── seeders/
│   │   ├── 20250118000001-demo-users.js
│   │   ├── 20250118000002-demo-lawyers.js
│   │   └── 20250118000003-demo-legal-cases.js
│   ├── app.js                     # Configuración de Express
│   └── server.js                  # Punto de entrada
├── tests/                         # Tests unitarios
├── .env.example
├── .gitignore
├── docker-compose.yml
├── package.json
└── README.md
```

# Tecnologías Utilizadas

## Backend
- **Node.js v18+** - Runtime de JavaScript
- **Express.js** - Framework web
- **Sequelize** - ORM para PostgreSQL
- **PostgreSQL 15** - Base de datos relacional

## Autenticación y Seguridad
- **JWT (jsonwebtoken)** - Autenticación basada en tokens
- **bcrypt** - Hash de contraseñas
- **Joi** - Validación de datos

## Logging y Documentación
- **Winston** - Logs estructurados
- **Swagger (swagger-ui-express)** - Documentación de API

## DevOps
- **Docker** - Contenedorización
- **Docker Compose** - Orquestación de contenedores

## Testing
- **Jest** - Framework de testing
- **Supertest** - Testing de endpoints HTTP

# Licencia

Este proyecto es parte de una prueba técnica para Legal Suite Latam.

**Desarrollado para:** Legal Suite Latam  
**Desarrollado por:** Laura Esperanza Vela Arias
