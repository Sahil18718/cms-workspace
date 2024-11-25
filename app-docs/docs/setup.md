# Setup Guide

Follow these steps to set up and run the CMS locally:

## Prerequisites
- Node.js (18 or higher)
- Yarn (preferred) or npm
- PostgreSQL (running locally or via a cloud service)

## Clone the Repository
```bash
git clone <repository-url>
cd cms-workspace
```


# Install Dependencies

Use the following command to install all dependencies:
` yarn install `


# Set Up Environment Variables

Create a .env file in the root of the project with the following content:

`DATABASE_URL=postgresql://<username>:<password>@<host>:<port>/<database>`


# Apply Prisma Migrations

Initialize the database schema with Prisma:`npx prisma migrate dev --name init`

# Run the Development Server

`yarn nx serve-all cms-workspace`


# View Storybook
`npx nx storybook cms-workspace`


# View Documentation

```bash
cd app-docs
yarn start || npm run start
```

# Access Prisma Studio

`npx prisma studio`