# CMS with WYSIWYG Editor and Plugin Architecture

## Overview
This project is a Content Management System (CMS) built with **Next.js**. It allows users to create, edit, and delete posts and pages through a user-friendly interface. The system features a **WYSIWYG editor** for rich text formatting and a **plugin architecture** to enable extensibility.

---

## Features

### Core CMS Functionalities
- **Post and Page Management:**
  - Create, Read, Update, and Delete (CRUD) functionality for posts and pages.
  - Each post/page has:
    - A **Title**: Editable by users.
    - A **Slug**: Auto-generated from the title but editable.
    - A **Content Field**: Supports rich text formatting.
- **WYSIWYG Editor:**
  - Integrated using **TipTap**, offering intuitive formatting options.
- **Data Storage:**
  - Content stored in **PostgreSQL**, managed via **Prisma ORM**.

### Plugin Architecture
- Dynamic plugin system to extend CMS capabilities.
- Example Plugin:
  - **Image Plugin:** Adds support for rendering images with custom properties.
- Plugin API documented to enable developers to integrate custom plugins.

### User Interface and Experience
- Responsive design with **Tailwind CSS**.
- Intuitive navigation and layout for non-technical users.
- Content preview with dynamic rendering of plugins.

---

## Getting Started

Follow these instructions to set up the project locally.

### Prerequisites
- Node.js (v16 or higher)
- PostgreSQL
- Yarn package manager

### Setup Instructions

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd cms-workspace

2. **Install dependencies:**

`yarn install`