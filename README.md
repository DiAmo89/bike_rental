# 🚲 BlablaBike - Bike Rental Platform

```
  ____  _       _     _       ____  _ _
 | __ )| | __ _| |__ | | __ _| __ )(_) | _____
 |  _ \| |/ _` | '_ \| |/ _` |  _ \| | |/ / _ \
 | |_) | | (_| | |_) | | (_| | |_) | |   <  __/
 |____/|_|\__,_|_.__/|_|\__,_|____/|_|_|\_\___|
```

**BlablaBike** is a modern bike rental platform designed to make urban mobility simple, affordable, and eco-friendly. Browse, book, and rent bikes seamlessly through an intuitive web application.

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Database Schema](#-database-schema)
- [Installation](#-installation)
- [Environment Variables](#-environment-variables)
- [Available Scripts](#-available-scripts)
- [API Endpoints](#-api-endpoints)
- [Team](#-team)

---

## ✨ Features

### 🛒 For Customers

| Feature                | Description                                                             |
| ---------------------- | ----------------------------------------------------------------------- |
| **Browse Catalog**     | View all available bikes with detailed information, images, and pricing |
| **Category Filter**    | Filter bikes by categories (Mountain, Road, City, etc.)                 |
| **Availability Check** | Real-time bike availability based on selected dates                     |
| **Booking System**     | Complete booking flow with date selection and price calculation         |
| **Accessories**        | Add accessories to your booking (helmets, locks, bags, etc.)            |
| **User Profile**       | Manage personal information and view booking history                    |
| **Authentication**     | Secure sign-up, login, and password recovery                            |
| **Order Summary**      | Transparent pricing with breakdown of all costs                         |

### 🔧 For Admins

| Feature                  | Description                                                        |
| ------------------------ | ------------------------------------------------------------------ |
| **Bike Management**      | CRUD operations for bikes (add, edit, delete, activate/deactivate) |
| **Category Management**  | Manage bike categories with images                                 |
| **Accessory Management** | CRUD operations for accessories                                    |
| **Booking Management**   | View and manage all customer bookings                              |
| **User Management**      | View and manage user accounts                                      |
| **Dashboard**            | Overview of bookings, revenue, and fleet status                    |

### 🌐 General Features

| Feature                   | Description                                   |
| ------------------------- | --------------------------------------------- |
| **Responsive Design**     | Mobile-first design that works on all devices |
| **Dark/Light Theme**      | Toggle between light and dark themes          |
| **About Us Page**         | Company information and mission               |
| **FAQ Page**              | Frequently asked questions                    |
| **Privacy Policy**        | GDPR-compliant privacy information            |
| **Terms of Service**      | Terms and conditions                          |
| **Swagger Documentation** | Interactive API documentation                 |

---

## 🛠 Tech Stack

### Frontend

| Technology         | Version | Purpose                         |
| ------------------ | ------- | ------------------------------- |
| **Next.js**        | 16.1.6  | React framework with App Router |
| **TypeScript**     | 5.x     | Type-safe JavaScript            |
| **React**          | 19.2.4  | UI library                      |
| **Tailwind CSS**   | 4.x     | Utility-first CSS framework     |
| **Radix UI**       | 1.4.3   | Unstyled, accessible components |
| **Lucide React**   | 0.577.0 | Beautiful icons                 |
| **Embla Carousel** | 8.6.0   | Touch-friendly carousel         |
| **GSAP**           | 3.14.2  | Animations                      |
| **Next Themes**    | 0.4.6   | Theme management                |

### Backend & Database

| Technology      | Version | Purpose                               |
| --------------- | ------- | ------------------------------------- |
| **Supabase**    | 2.99.1  | Backend-as-a-Service (Auth, Database) |
| **Drizzle ORM** | 0.45.1  | TypeScript ORM                        |
| **PostgreSQL**  | -       | Relational database                   |
| **NextAuth.js** | 4.24.13 | Authentication                        |

### Tools & Utilities

| Technology     | Version | Purpose           |
| -------------- | ------- | ----------------- |
| **Zod**        | 4.3.6   | Schema validation |
| **bcryptjs**   | 3.0.3   | Password hashing  |
| **Cloudinary** | 2.9.0   | Image hosting     |
| **date-fns**   | 4.1.0   | Date manipulation |
| **Swagger UI** | 5.32.1  | API documentation |

---

## 📁 Project Structure

```
blablabike/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── admin/              # Admin dashboard & management
│   │   │   ├── accessories/    # Accessory management
│   │   │   ├── categories/     # Category management
│   │   │   └── page.tsx        # Admin dashboard
│   │   ├── api/                # API routes
│   │   │   ├── actions-bike/   # Bike CRUD operations
│   │   │   ├── actions-booking/# Booking operations
│   │   │   ├── auth/           # Authentication endpoints
│   │   │   └── upload/         # Image upload
│   │   ├── catalog/            # Bike catalog pages
│   │   │   └── [id]/           # Bike detail page
│   │   ├── user-profile/       # User profile pages
│   │   │   └── bookings/       # User booking history
│   │   ├── about-us/           # About page
│   │   ├── faq/                # FAQ page
│   │   ├── login/              # Login page
│   │   ├── sign-up/            # Registration page
│   │   ├── swagger/            # API documentation
│   │   └── page.tsx            # Homepage
│   ├── components/             # React components
│   │   ├── admin/              # Admin-specific components
│   │   ├── auth/               # Authentication components
│   │   ├── booking/            # Booking flow components
│   │   ├── catalog/            # Catalog components
│   │   ├── common/             # Shared components
│   │   ├── footer/             # Footer component
│   │   ├── hero-section/       # Homepage hero
│   │   ├── nav-bar/            # Navigation bar
│   │   ├── profile/            # User profile components
│   │   └── ui/                 # Base UI components (shadcn)
│   ├── db/                     # Database layer
│   │   ├── tables/             # Table definitions
│   │   ├── relations/          # Table relationships
│   │   ├── enums.ts            # Database enums
│   │   └── index.ts            # DB exports
│   ├── services/               # Business logic
│   │   └── bikes.service.ts    # Bike-related operations
│   ├── lib/                    # Utilities
│   ├── hooks/                  # Custom React hooks
│   ├── providers/              # Context providers
│   └── types/                  # TypeScript types
├── drizzle/                    # Database migrations
├── public/                     # Static assets
├── drizzle.config.ts           # Drizzle configuration
├── next.config.ts              # Next.js configuration
├── tailwind.config.js          # Tailwind configuration
├── tsconfig.json               # TypeScript configuration
└── package.json                # Dependencies
```

---

## 🗄 Database Schema

### Tables Overview

| Table                   | Description                | Key Columns                                                                      |
| ----------------------- | -------------------------- | -------------------------------------------------------------------------------- |
| **users**               | User accounts              | id, email, full_name, password, phone, role, avatar                              |
| **categories**          | Bike categories            | id, name, image                                                                  |
| **bikes**               | Bike inventory             | id, brand, model, description, price_per_day, image, is_active, bike_category_id |
| **accessories**         | Rentable accessories       | id, name, price_per_day                                                          |
| **bookings**            | Customer reservations      | id, user_id, bike_id, start_date, end_date, total_price, customer info           |
| **booking_accessories** | Booking-accessory junction | booking_id, accessory_id                                                         |

### Entity Relationship

```
users (1) ──────< (N) bookings (N) ──────> (1) bikes
                                              │
                                              │ (N:1)
                                              ▼
                                          categories

bookings (1) ──────< (N) booking_accessories (N) ──────> (1) accessories
```

### User Roles

| Role         | Permissions                                                                         |
| ------------ | ----------------------------------------------------------------------------------- |
| **CUSTOMER** | Browse catalog, create bookings, view own bookings, manage profile                  |
| **ADMIN**    | Full access to all tables (CRUD on bikes, categories, accessories, bookings, users) |

---

## 🚀 Installation

### Prerequisites

- Node.js 20+
- npm or yarn
- PostgreSQL database (via Supabase)
- Git

### Clone the Repository

```bash
git clone git@github.com:DiAmo89/bike_rental.git
cd bike_rental
```

### Install Dependencies

```bash
npm install
```

### Database Setup

1. Create a Supabase project at [supabase.com](https://supabase.com)
2. Copy your database URL from Supabase settings
3. Create a `.env` file (see Environment Variables below)
4. Run migrations:

```bash
npm run db:generate
npm run db:migrate
```

### Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

---

## 🔐 Environment Variables

Create a `.env` file in the root directory:

```env
# Database
DATABASE_URL="postgresql://user:password@host:port/database"

# Supabase
NEXT_PUBLIC_SUPABASE_URL="https://your-project.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key"

# Cloudinary (for image uploads)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"
```

---

## 📜 Available Scripts

| Command               | Description                     |
| --------------------- | ------------------------------- |
| `npm run dev`         | Start development server        |
| `npm run build`       | Build for production            |
| `npm run start`       | Start production server         |
| `npm run lint`        | Run ESLint                      |
| `npm run db:generate` | Generate Drizzle migrations     |
| `npm run db:migrate`  | Run database migrations         |
| `npm run db:studio`   | Open Drizzle Studio (DB viewer) |

---

## 🌐 API Endpoints

### Bikes

| Method | Endpoint            | Description             |
| ------ | ------------------- | ----------------------- |
| GET    | `/api/bikes`        | Get all available bikes |
| GET    | `/api/bikes/:id`    | Get bike by ID          |
| POST   | `/api/actions-bike` | Create new bike (Admin) |
| PUT    | `/api/actions-bike` | Update bike (Admin)     |
| DELETE | `/api/actions-bike` | Delete bike (Admin)     |

### Bookings

| Method | Endpoint               | Description       |
| ------ | ---------------------- | ----------------- |
| GET    | `/api/booking`         | Get user bookings |
| POST   | `/api/actions-booking` | Create booking    |
| DELETE | `/api/actions-booking` | Cancel booking    |

### Categories

| Method | Endpoint                | Description             |
| ------ | ----------------------- | ----------------------- |
| GET    | `/api/getCategories`    | Get all categories      |
| POST   | `/api/actions-category` | Create category (Admin) |
| PUT    | `/api/actions-category` | Update category (Admin) |
| DELETE | `/api/actions-category` | Delete category (Admin) |

### Accessories

| Method | Endpoint                 | Description              |
| ------ | ------------------------ | ------------------------ |
| GET    | `/api/actions-accessory` | Get all accessories      |
| POST   | `/api/actions-accessory` | Create accessory (Admin) |
| PUT    | `/api/actions-accessory` | Update accessory (Admin) |
| DELETE | `/api/actions-accessory` | Delete accessory (Admin) |

### Authentication

| Method | Endpoint                    | Description            |
| ------ | --------------------------- | ---------------------- |
| POST   | `/api/auth/signup`          | Register new user      |
| POST   | `/api/auth/login`           | Login user             |
| POST   | `/api/auth/logout`          | Logout user            |
| GET    | `/api/auth/session`         | Get current session    |
| POST   | `/api/auth/forgot-password` | Request password reset |

### Upload

| Method | Endpoint      | Description                |
| ------ | ------------- | -------------------------- |
| POST   | `/api/upload` | Upload image to Cloudinary |

### Documentation

| Endpoint   | Description            |
| ---------- | ---------------------- |
| `/swagger` | Interactive Swagger UI |

---

## 👥 Team

### Developers (5)

- **Dumitru Gangan**
- **Vladyslav Kravchenko**
- **Dmitrii Evdokimov**
- **Kateryna Matvieieva**
- **Stepan Serbin**

### QA Engineers (4)

- **Dariia Boiko**
- **Daryna Suk**
- **Vladimir Dinu**
- **Hanna Kozlianska**

---

## 📄 License

This project is part of a school practice and is not intended for commercial use.

---

## 📞 Support

For questions or issues, contact: **info@blablabike.com**

---

<div align="center">

**Built with ❤️ by the BlablaBike Team**

[Report Bug](https://github.com/DiAmo89/bike_rental/issues) · [Request Feature](https://github.com/DiAmo89/bike_rental/issues)

</div>
