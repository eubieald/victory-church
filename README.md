
````markdown
# Victory Church Project

## Overview
Victory Church is a web application built to manage church activities, members, events, and other resources efficiently.

## Tech Stack

- **Backend / API:** Node.js + Express
- **ORM / Database Layer:** Prisma — used for schema definition, type-safe queries, and migrations
- **Database:** PostgreSQL
- **Frontend:** (React / Next.js / your frontend framework)
- **Other Tools:** (any additional libraries/tools you use)

## Getting Started

1. **Clone the repo**
```bash
git clone https://github.com/eubieald/victory-church.git
````

2. **Install dependencies**

```bash
npm install
```

3. **Set up environment variables**

```env
DATABASE_URL="postgresql://user:password@localhost:5432/dbname"
```

4. **Generate Prisma client**

```bash
npx prisma generate
```

5. **Run migrations**

```bash
npx prisma migrate dev --name init
```

6. **Start the server**

```bash
npm run dev
```

## Why Prisma?

Prisma provides an elegant and type-safe way to interact with your database:

* Declarative schema to define models and relationships
* Type-safe database operations (`prisma.user.findMany()`)
* Auto-generated client tailored to your schema
* Built-in support for migrations and schema evolution

## Folder Structure

```
/prisma
  ├ schema.prisma       ← Data models + datasource
  ├ migrations/         ← Auto-generated migrations
/src
  ├ server.ts / index.ts
  ├ prismaClient.ts     ← Export Prisma Client
  └ ...                ← Other server code
```

## Contributing

* If you modify `schema.prisma`, run `npx prisma migrate dev` to apply changes.
* Update generated client with `npx prisma generate` after schema changes.
* Follow existing code style and folder structure.

## License

This project is licensed under the MIT License.

```
