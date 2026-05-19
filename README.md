# Adburd

Adburd is a premium digital marketing agency website built with Next.js, Tailwind CSS, and MongoDB.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```text
.
├── AGENTS.md
├── CLAUDE.md
├── eslint.config.mjs
├── next-env.d.ts
├── next.config.ts
├── package.json
├── postcss.config.mjs
├── README.md
├── tsconfig.json
├── public/
└── src/
    ├── proxy.ts
    ├── app/
    │   ├── globals.css
    │   ├── layout.tsx
    │   ├── (website)/
    │   │   ├── layout.tsx
    │   │   ├── page.tsx
    │   │   ├── about-us/page.tsx
    │   │   ├── blog/page.tsx
    │   │   ├── blog/[slug]/
    │   │   ├── case-studies/page.tsx
    │   │   ├── case-studies/[slug]/
    │   │   ├── contact-us/page.tsx
    │   │   ├── free-marketing-audit/page.tsx
    │   │   ├── industries/page.tsx
    │   │   ├── industries/[slug]/
    │   │   ├── our-process/page.tsx
    │   │   ├── portfolio/page.tsx
    │   │   ├── portfolio/[slug]/
    │   │   ├── services/page.tsx
    │   │   ├── services/[...slug]/
    │   │   └── why-adburd/page.tsx
    │   ├── admin/
    │   │   ├── layout.tsx
    │   │   ├── dashboard/
    │   │   │   ├── layout.tsx
    │   │   │   ├── page.tsx
    │   │   │   ├── blogs/
    │   │   │   ├── leads/
    │   │   │   ├── portfolio/
    │   │   │   └── services/
    │   │   ├── login/
    │   │   │   ├── LoginForm.tsx
    │   │   │   └── page.tsx
    │   ├── api/
    │   │   ├── admin/
    │   │   │   ├── blogs/
    │   │   │   ├── leads/
    │   │   │   ├── portfolio/
    │   │   │   ├── register/
    │   │   │   └── services/
    │   │   ├── auth/[...nextauth]/
    │   │   ├── forms/audit/
    │   │   ├── forms/contact/
    │   │   ├── setup-admin/route.ts
    │   │   └── test-db/route.ts
    ├── components/
    │   ├── AnimationWrapper.tsx
    │   ├── Footer.tsx
    │   ├── MetricCard.tsx
    │   ├── Navbar.tsx
    │   ├── SectionHeading.tsx
    │   ├── ServiceCard.tsx
    │   │   ├── admin/layout/
    │   │   │   ├── AdminSidebar.tsx
    │   │   │   ├── AdminTopbar.tsx
    │   │   │   └── ...
    │   ├── cms/
    │   │   ├── AdminCard.tsx
    │   │   ├── AdminPageHeader.tsx
    │   │   ├── AdminSection.tsx
    │   │   ├── ConfirmModal.tsx
    │   │   ├── DataTable.tsx
    │   │   ├── DeleteModal.tsx
    │   │   ├── Drawer.tsx
    │   │   ├── EmptyState.tsx
    │   │   ├── FormInput.tsx
    │   │   ├── FormSelect.tsx
    │   │   ├── FormSlugInput.tsx
    │   │   ├── FormSwitch.tsx
    │   │   ├── FormTextarea.tsx
    │   │   ├── ImageUploader.tsx
    │   │   ├── LoadingState.tsx
    │   │   ├── RichTextEditor.tsx
    │   │   ├── SEOFields.tsx
    │   │   ├── StatusBadge.tsx
    │   │   ├── TablePagination.tsx
    │   ├── forms/
    │   │   ├── AuditForm.tsx
    │   │   └── ContactForm.tsx
    │   ├── ui/
    ├── constants/
    ├── hooks/
    │   └── useDebounce.ts
    ├── lib/
    │   ├── auth.ts
    │   └── db.ts
    ├── models/
    │   ├── Blog.ts
    │   ├── Category.ts
    │   ├── Lead.ts
    │   ├── LeadActivity.ts
    │   ├── LeadNote.tsx
    │   ├── Portfolio.ts
    │   ├── Service.ts
    │   └── User.ts
    ├── modules/
    │   ├── blogs/
    │   │   ├── components/
    │   │   ├── services/
    │   ├── leads/
    │   │   ├── components/
    │   ├── portfolio/
    │   │   ├── components/
    │   └── services/
    │       ├── components/
    ├── scripts/
    │   └── create-admin.ts
    ├── services/
    ├── types/
    ├── utils/
    │   ├── api.ts
    │   ├── pagination.ts
    │   └── slug.ts
    └── validators/
        ├── blog.ts
        ├── core.ts
        ├── lead.ts
        ├── portfolio.ts
        ├── seo.ts
        └── service.ts
```

## API Endpoints

Here are the custom API endpoints available in the application:

### 1. Database Connection Test
- **URL:** `/api/test-db`
- **Method:** `GET`
- **Description:** Tests the connection to the MongoDB database using the `MONGODB_URI` environment variable.
- **Response:**
  - `200 OK`: `{"success": true, "message": "MongoDB connected successfully"}`
  - `500 Error`: `{"success": false, "error": "MongoDB connection failed"}`

### 2. Setup Initial Admin
- **URL:** `/api/setup-admin`
- **Method:** `GET`
- **Description:** Creates the initial super admin user. This endpoint will only work if there are **no users** currently in the database (it prevents running twice).
- **Query Parameters:**
  - `email` (optional): The email for the admin user. Default: `admin@adburd.com`
  - `password` (optional): The password for the admin user. Default: `password123`
- **Example Usage:** `/api/setup-admin?email=myadmin@adburd.com&password=securepass`
- **Response:**
  - `200 OK`: Returns success message with credentials.
  - `400 Error`: If an admin user already exists.
  - `500 Error`: On setup failure.

### 3. Register Admin User
- **URL:** `/api/admin/register`
- **Method:** `POST`
- **Description:** Registers a new admin user programmatically.
- **Body (JSON):**
  ```json
  {
    "name": "Admin Name",
    "email": "admin@example.com",
    "password": "yourpassword"
  }
  ```
- **Response:**
  - `201 Created`: `{"success": true, "message": "Admin registered successfully", "user": {...}}`
  - `400 Error`: Missing fields or if the user email already exists.
  - `500 Error`: Server error.

### 4. Authentication (NextAuth)
- **URL:** `/api/auth/*`
- **Description:** Standard NextAuth.js endpoints for handling authentication (e.g., `/api/auth/signin`, `/api/auth/signout`, `/api/auth/session`).

## Environment Variables

Ensure you have a `.env.local` file with the following variables:
- `MONGODB_URI`: Your MongoDB connection string.
- NextAuth variables as configured in your app.

