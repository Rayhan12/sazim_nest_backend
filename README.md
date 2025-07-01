# NestJS Backend Project

This is a backend API built with [NestJS](https://nestjs.com/), using MikroORM and SQLite. It provides user management, product management, posts, and transaction (purchase/rent) features, with full Swagger API documentation.

## Features

- **User Management**: Register and login users.
- **Product Management**: CRUD for products, with categories and rent/purchase options.
- **Posts**: Users can create and manage posts.
- **Transactions**: Purchase and rent products.
- **Swagger API Docs**: Auto-generated, with sample values for all DTOs.
- **Validation**: Uses `class-validator` for DTO validation.
- **SQLite**: Default database for development.

## Project Structure

```
src/
  user/           # User module (controllers, services, DTOs, entities)
  product/        # Product module (controllers, services, DTOs, entities)
  post/           # Post module (controllers, services, DTOs, entities)
  transactions/   # Transactions module (controllers, services, DTOs, entities)
  util/           # Utility helpers
  migrations/     # MikroORM migrations
  app.module.ts   # Main NestJS module
  main.ts         # Entry point, Swagger setup
  mikro-orm.config.ts # MikroORM config
```

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Run the application

#### Development

```bash
npm run start:dev
```

#### Production

```bash
npm run build
npm run start:prod
```

#### Run Tests

```bash
npm run test
```

### 3. Access the API

- The API is served at: `http://localhost:3000/api`
- **Swagger API Docs:**  
  Visit [http://localhost:3000/api-docs](http://localhost:3000/api-docs) for interactive documentation and sample requests.

### 4. Database

- Uses SQLite by default (`api_database.sqlite` in project root).
- MikroORM is used for data modeling and migrations.

### 5. File Uploads

- Uploaded files are stored in the `uploads/` directory.

## Environment Variables

You can set the `PORT` environment variable to change the default port (3000).

## Notes

- All DTOs are documented with sample values in Swagger.
- Authentication uses JWT (if enabled in your codebase).
- For more details, see the source code in each module.

---

**Happy coding!**
