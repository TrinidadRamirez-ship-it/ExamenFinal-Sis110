# Backend

Backend base construido con Java 17, Spring Boot, Gradle, PostgreSQL y Spring Data JPA.

## Requisitos

- Java 17
- PostgreSQL

No es necesario instalar Gradle: el proyecto incluye Gradle Wrapper.

## Variables de entorno

Antes de iniciar el perfil de desarrollo o producción, define:

| Variable | Descripción | Ejemplo |
| --- | --- | --- |
| `DB_URL` | URL JDBC de PostgreSQL | `jdbc:postgresql://localhost:5432/backend` |
| `DB_USER` | Usuario de PostgreSQL | `postgres` |
| `DB_PASSWORD` | Contraseña de PostgreSQL | `secret` |
| `SERVER_PORT` | Puerto HTTP opcional | `8080` |
| `APP_VERSION` | Versión mostrada por Actuator | `0.0.1` |

Ejemplo para PowerShell:

```powershell
$env:DB_URL = "jdbc:postgresql://localhost:5432/backend"
$env:DB_USER = "postgres"
$env:DB_PASSWORD = "secret"
.\gradlew.bat bootRun
```

## Perfiles

- `dev` es el perfil predeterminado y permite a Hibernate actualizar el esquema.
- `test` usa una base H2 temporal y nunca se conecta a PostgreSQL.
- `prod` valida el esquema existente y evita mostrar información interna.

Para iniciar producción:

```powershell
$env:SPRING_PROFILES_ACTIVE = "prod"
.\gradlew.bat bootRun
```

## Verificación

```powershell
.\gradlew.bat test
```

Una vez iniciada la aplicación, su estado está disponible en `GET /actuator/health`.

## Importar en IntelliJ IDEA

1. Abre la carpeta del proyecto o el archivo `build.gradle`.
2. Cuando IntelliJ pregunte cómo importar el proyecto, selecciona **Gradle**.
3. En la ventana de Gradle, pulsa **Reload All Gradle Projects** si la sincronización no comienza automáticamente.
4. Verifica que el SDK del proyecto y el Gradle JVM sean Java 17.

No es necesario crear una configuración de ejecución manual. Después de sincronizar Gradle, IntelliJ detecta `BackendApplication` como clase principal y muestra la acción **Run 'BackendApplication'**.

El repositorio también incluye una configuración compartida en `.run/BackendApplication.run.xml`. Con el soporte Spring de IntelliJ IDEA Ultimate habilitado, aparece automáticamente como **BackendApplication** en el selector de ejecución.
