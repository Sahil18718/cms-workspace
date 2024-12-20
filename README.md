# CMS with WYSIWYG Editor and Plugin Architecture

A CMS built using **Next.js**, **Prisma**, and **Tailwind CSS**, with a **WYSIWYG editor** and a plugin architecture for extensibility.

---

## Features

- Create, edit, and delete posts and pages.
- Rich text editor (powered by **TipTap**).
- Plugin architecture for custom content blocks.
- API integration using Prisma with a PostgreSQL database.
- Responsive UI designed with Tailwind CSS.
- Documentation using Docusaurus.
- Storybook for component documentation.

---

## Prerequisites

- **Node.js** (v18+)
- **Yarn**
- **PostgreSQL** (v12+)
- **Nx CLI**: Install globally with `npm install -g nx`

---

## Getting Started

### 1. Clone the Repository
```bash
git clone <repository-url>
```

### 2. Install Dependencies in root
```bash
yarn install
```

### 3. Configure the Environment Variables
Create a .env file in the root of your project with the following contents:
```bash
DATABASE_URL=postgresql://<username>:<password>@<host>:<port>/<database>
```



### 4. Set Up the Database
Run the following commands to initialize and migrate the database schema:
```bash
npx prisma migrate dev <database-name> init
npx prisma generate
```

###  5. Start the Development Server
```bash
yarn nx serve-all cms-workspace
```
Urls
```bash
http://localhost:4200/
http://localhost:4200/posts/create
http://localhost:4200/pages/create
http://localhost:5555/
```