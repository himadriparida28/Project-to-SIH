# 🚀 BACKEND PART

> **AI-Powered Government Complaint & Scheme Recommendation Platform**
>
> Backend developed using **Django**, **Django REST Framework**, **PostgreSQL**, and **Docker** for Smart India Hackathon (SIH).

---

# 📖 Table of Contents

- Project Overview
- Tech Stack
- Project Architecture
- Folder Structure
- Completed Modules
- Features
- Database Design
- API Endpoints
- Installation
- Docker Setup
- Environment Variables
- Database Migration
- Seed Data
- Create Superuser
- Running the Server
- Development Guidelines
- Current Progress
- Future Roadmap

---

# 📌 Project Overview

This project is an AI-powered Government Complaint and Scheme Recommendation Platform that enables citizens to:

- Register/Login securely
- Submit complaints with images
- Track complaint status
- Receive AI-powered complaint classification
- Get automatic department assignment
- Receive government scheme recommendations
- Monitor complaint progress through a timeline

The backend follows a **Service Layer Architecture**, making it scalable, maintainable, and suitable for future AI integration.

---

# 🛠 Tech Stack

### Backend

- Python 3.x
- Django
- Django REST Framework

### Database

- PostgreSQL

### Authentication

- JWT Authentication
- SimpleJWT

### File Handling

- Pillow

### Filtering

- django-filter

### Containerization

- Docker
- Docker Compose

---

# 🏗 Project Architecture

```
Client
   │
   ▼
Views
   │
   ▼
Permissions
   │
   ▼
Filters
   │
   ▼
Selectors
   │
   ▼
Services
   │
   ▼
Models
   │
   ▼
PostgreSQL
```

---

# 📂 Project Structure

```
backend/

│
├── accounts/
│
├── categories/
│
├── common/
│
├── complaints/
│
├── departments/
│
├── locations/
│
├── config/
│
├── media/
│
├── manage.py
│
└── requirements.txt
```

---

# ✅ Completed Modules

## Authentication

- Custom User Model
- Custom User Manager
- JWT Authentication
- Email + Password Login
- Phone + Password Login
- Phone OTP Login
- Register
- Login
- Profile
- Update Profile
- Send OTP
- Verify OTP
- Forgot Password
- Reset Password
- Logout
- Refresh Token

---

## Common

Reusable abstract models:

- BaseModel
- TimeStampedModel
- SoftDeleteModel

---

## Locations

Models

- State
- District

---

## Departments

Models

- Department
- DepartmentOffice

---

## Categories

Models

- ComplaintCategory

---

## Complaint Module

Models

- ComplaintStatus
- Complaint
- ComplaintImage
- ComplaintStatusHistory

Features

- Complaint CRUD
- Multiple Image Upload
- Complaint Timeline
- Soft Delete
- Object Level Permission
- Service Layer
- Selector Layer
- Pagination
- Filtering
- Search
- Ordering

---

# 📊 Database Design

```
User
 │
 ▼
Complaint
 │
 ├── ComplaintCategory
 │
 ├── Department
 │
 ├── DepartmentOffice
 │
 ├── State
 │
 ├── District
 │
 ├── ComplaintStatus
 │
 ├── ComplaintImage
 │
 └── ComplaintStatusHistory
```

---

# 🔐 Authentication APIs

| Method | Endpoint |
|---------|----------|
| POST | /api/auth/register/ |
| POST | /api/auth/login/ |
| GET | /api/auth/profile/ |
| PATCH | /api/auth/profile/ |
| POST | /api/auth/send-otp/ |
| POST | /api/auth/verify-otp/ |
| POST | /api/auth/forgot-password/ |
| POST | /api/auth/reset-password/ |
| POST | /api/auth/logout/ |
| POST | /api/auth/token/refresh/ |

---

# 📋 Complaint APIs

| Method | Endpoint |
|---------|----------|
| POST | /api/complaints/create/ |
| GET | /api/complaints/ |
| GET | /api/complaints/my/ |
| GET | /api/complaints/{id}/ |
| PATCH | /api/complaints/{id}/update/ |
| DELETE | /api/complaints/{id}/delete/ |
| POST | /api/complaints/{id}/upload-images/ |

---

# ⚙ Prerequisites

Install the following before running the project.

- Python 3.11+
- Git
- Docker Desktop
- PostgreSQL (Docker)

---

# 🚀 Installation

## Clone Repository

```bash
git clone <repository-url>
```

---

## Navigate to Backend

```bash
cd backend
```

---

## Create Virtual Environment

```bash
python -m venv myenv
```

---

## Activate Virtual Environment

### Windows

```bash
myenv\Scripts\activate
```

### Linux / macOS

```bash
source myenv/bin/activate
```

---

## Install Dependencies

```bash
pip install -r requirements.txt
```

---

# 🐳 Docker Setup

Start PostgreSQL

```bash
docker compose up -d
```

Verify

```bash
docker ps
```

Stop PostgreSQL

```bash
docker compose down
```

---

# 🔑 Environment Variables

Create a `.env` file inside the backend directory.

Example

```
SECRET_KEY=your_secret_key

DEBUG=True

DB_NAME=gov_assist_db

DB_USER=postgres

DB_PASSWORD=postgres123

DB_HOST=localhost

DB_PORT=5432
```

---

# 🗄 Database Migration

```bash
python manage.py makemigrations

python manage.py migrate
```

---

# 🌱 Seed Initial Data

```bash
python manage.py seed_data
```

This command creates:

- Complaint Statuses
- Complaint Categories
- Departments
- States
- Districts

---

# 👤 Create Superuser

```bash
python manage.py createsuperuser
```

---

# ▶ Run Development Server

```bash
python manage.py runserver
```

Open

```
http://127.0.0.1:8000/
```

Admin Panel

```
http://127.0.0.1:8000/admin/
```

---

# 📸 Image Upload

Complaint images are stored inside

```
media/complaints/
```

---

# 📈 Current Progress

## Completed

- Authentication Module
- Common Module
- Locations Module
- Departments Module
- Categories Module
- Complaint Module
- Docker Setup
- PostgreSQL Integration

---

# 🚧 Future Roadmap

## AI Module

- Complaint Classification
- Department Prediction
- Priority Prediction
- Complaint Summarization
- Duplicate Complaint Detection
- Language Detection
- Government Scheme Recommendation

---

## Notifications

- Email Notifications
- SMS Notifications
- Push Notifications

---

## Government Schemes

- Scheme Database
- Eligibility Prediction
- Personalized Recommendations

---

## Analytics

- Complaint Heatmaps
- Department Performance
- Complaint Trends
- Resolution Statistics
- AI Dashboard

---

# 💻 Development Guidelines

- Follow Service Layer Architecture.
- Keep business logic inside services.
- Keep database queries inside selectors.
- Avoid writing business logic in views.
- Use object-level permissions.
- Keep serializers focused on serialization only.
- Maintain normalized database design.
- Follow PEP-8 coding standards.
- Write reusable and maintainable code.

---

# 🤝 Team Workflow

Before pushing changes:

```bash
git pull origin main --rebase
```

After completing your work:

```bash
git add .

git commit -m "Meaningful commit message"

git push origin main
```

Always pull the latest changes before starting new work to avoid merge conflicts.

---

# 📌 Project Status

| Module | Status |
|---------|--------|
| Authentication | ✅ Complete |
| Complaint Management | ✅ Complete |
| Database Architecture | ✅ Complete |
| AI Module | 🚧 In Progress |
| Notifications | ⏳ Planned |
| Government Schemes | ⏳ Planned |
| Analytics | ⏳ Planned |

---

# 👨‍💻 Team

Developed as part of **Smart India Hackathon (SIH)**.

Backend follows a scalable, production-oriented architecture designed for future AI integration and enterprise-level maintainability.
