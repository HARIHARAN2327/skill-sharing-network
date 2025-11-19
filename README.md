# Skill Network Backend (Spring Boot)

## Overview

This is a Spring Boot 3 / Java 17 backend using Maven and MySQL. It is configured with **Spring profiles** and **environment variables** only for all database and JPA settings, and is ready to deploy to **Render**.

## Profiles & Configuration

- **`dev` profile** (local development):
  - File: `springapp/src/main/resources/application-dev.properties`
  - Uses a local MySQL instance.
  - All DB and JPA properties come from environment variables.

- **`prod` profile** (cloud / Render):
  - File: `springapp/src/main/resources/application-prod.properties`
  - Uses a cloud MySQL instance.
  - All DB and JPA properties come from environment variables.

### Common configuration (`application.properties`)

`springapp/src/main/resources/application.properties` contains profile-agnostic settings:

- Server port: `server.port=${PORT:8080}` (Render sets `PORT`; locally defaults to 8080).
- Error and logging configuration.
- Mail configuration (host/port have defaults; username/password are env-only).

> **Note:** Datasource and JPA settings are **not** defined in `application.properties`. They are defined per profile and read exclusively from environment variables.

### Dev profile: local MySQL (`application-dev.properties`)

Relevant properties:

- `spring.config.activate.on-profile=dev`
- `spring.datasource.url=${DB_URL}`
- `spring.datasource.username=${DB_USERNAME}`
- `spring.datasource.password=${DB_PASSWORD}`
- `spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver`
- `spring.jpa.hibernate.ddl-auto=${JPA_DDL_AUTO:update}`
- `spring.jpa.show-sql=true`
- `spring.jpa.properties.hibernate.format_sql=true`
- `spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQLDialect`

### Prod profile: cloud MySQL (`application-prod.properties`)

Relevant properties:

- `spring.config.activate.on-profile=prod`
- `spring.datasource.url=${DB_URL}`
- `spring.datasource.username=${DB_USERNAME}`
- `spring.datasource.password=${DB_PASSWORD}`
- `spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver`
- `spring.jpa.hibernate.ddl-auto=${JPA_DDL_AUTO:validate}`
- `spring.jpa.show-sql=false`
- `spring.jpa.properties.hibernate.format_sql=false`
- `spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQLDialect`

## Running Locally (dev profile)

1. **Create a local MySQL database**, e.g. `app_db`.
2. **Export environment variables** in your shell (PowerShell example):

   ```powershell
   $env:DB_URL = "jdbc:mysql://localhost:3306/app_db?createDatabaseIfNotExist=true"
   $env:DB_USERNAME = "your_mysql_user"
   $env:DB_PASSWORD = "your_mysql_password"
   $env:JPA_DDL_AUTO = "update"   # or create / validate / none
   $env:SPRING_PROFILES_ACTIVE = "dev"
   ```

3. **From the `springapp` directory**, run the application:

   ```bash
   ./mvnw spring-boot:run
   ```

   On Windows PowerShell:

   ```powershell
   .\mvnw.cmd spring-boot:run
   ```

4. The backend listens on `http://localhost:8080` by default.

## Prod-style Build & Run Locally

1. Set environment variables with **prod-style values** (e.g. pointing to a remote MySQL instance or a local container):

   ```powershell
   $env:DB_URL = "jdbc:mysql://your-prod-host:3306/app_db"
   $env:DB_USERNAME = "prod_user"
   $env:DB_PASSWORD = "prod_password"
   $env:JPA_DDL_AUTO = "validate"
   $env:SPRING_PROFILES_ACTIVE = "prod"
   ```

2. Build the jar:

   ```bash
   ./mvnw -B -DskipTests clean package
   ```

3. Run the jar:

   ```bash
   java -jar target/*.jar
   ```

## Deploying to Render

This repo includes a `render.yaml` at the repository root that configures a **Render Web Service** for the Spring Boot backend.

### 1. Push to GitHub

Ensure your project is pushed to a GitHub (or GitLab/Bitbucket) repository that Render can access.

### 2. Render `render.yaml` overview

`render.yaml` defines a single web service:

- `type: web`
- `name: skill-network-backend`
- `rootDirectory: springapp` (Render builds from the `springapp` subdirectory)
- `env: java`
- `buildCommand: ./mvnw -B -DskipTests clean package`
- `startCommand: java -jar target/*.jar`

Environment variables declared in `render.yaml`:

- `SPRING_PROFILES_ACTIVE=prod`
- `DB_URL` (sync: false; set in dashboard)
- `DB_USERNAME` (sync: false; set in dashboard)
- `DB_PASSWORD` (sync: false; set in dashboard)
- `JPA_DDL_AUTO=validate`
- `MAIL_HOST=smtp.gmail.com`
- `MAIL_PORT=587`
- `MAIL_USERNAME` (sync: false; set in dashboard)
- `MAIL_PASSWORD` (sync: false; set in dashboard)

### 3. Create the MySQL database in the cloud

Use any managed MySQL provider (Render PostgreSQL is common, but here we assume MySQL in another service such as AWS RDS, PlanetScale, etc.). Note the:

- JDBC URL
- Username
- Password

### 4. Create the Render Web Service

1. Go to **Render Dashboard** → **New +** → **Blueprint**.
2. Select your repository containing this project.
3. Render will detect `render.yaml` and propose creating the `skill-network-backend` service.
4. Confirm the service creation.

### 5. Configure environment variables in Render

In the Render service settings → **Environment**:

Set the following variables (matching the keys used by Spring):

- `SPRING_PROFILES_ACTIVE = prod`
- `DB_URL = jdbc:mysql://<cloud-host>:3306/app_db` (include SSL/query params as required by provider)
- `DB_USERNAME = <cloud-db-username>`
- `DB_PASSWORD = <cloud-db-password>`
- `JPA_DDL_AUTO = validate` (or migrate/none depending on your migration strategy)
- `MAIL_HOST = smtp.gmail.com` (or your provider)
- `MAIL_PORT = 587`
- `MAIL_USERNAME = <smtp-username>`
- `MAIL_PASSWORD = <smtp-password>`

> Render automatically sets `PORT`, which is picked up by `server.port=${PORT:8080}`.

### 6. Deploy

Once env vars are configured, click **Deploy** or trigger a deployment by pushing to your main branch. Render will:

1. Run `./mvnw -B -DskipTests clean package` in the `springapp` directory.
2. Start the app using `java -jar target/*.jar`.
3. Expose the service at a public URL shown in the dashboard.

## Notes

- All database credentials are sourced from environment variables; there are no hardcoded DB usernames/passwords.
- For production, ensure your cloud MySQL instance is secured (networking, SSL, strong passwords).
