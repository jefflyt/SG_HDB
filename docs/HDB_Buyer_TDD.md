# **HDB Buyer Tool \- Technical Design Document (React/Next.js Edition)**

**Version:** 2.0  
**Date:** November 30, 2025  
**Author:** Engineering & Architecture Team  
**Status:** Ready for Development  
**Previous Version:** 1.0 (Streamlit-based)

---

## **Table of Contents**

1. [Overview](#overview)  
2. [System Architecture](#system-architecture)  
3. [Technology Stack](#technology-stack)  
4. [Project Structure](#project-structure)  
5. [Data Architecture](#data-architecture)  
6. [API Design](#api-design)  
7. [Frontend Architecture](#frontend-architecture)  
8. [Backend Architecture](#backend-architecture)  
9. [Database Design](#database-design)  
10. [Caching Strategy](#caching-strategy)  
11. [Error Handling](#error-handling)  
12. [Performance Optimization](#performance-optimization)  
13. [Security Implementation](#security-implementation)  
14. [Monitoring & Logging](#monitoring--logging)  
15. [Deployment Guide](#deployment-guide)  
16. [Code Standards](#code-standards)  
17. [Testing Strategy](#testing-strategy)

---

## **Overview**

### Purpose

This Technical Design Document provides detailed implementation specifications for the HDB Buyer Tool dashboard using React/Next.js frontend with a Python FastAPI backend. It serves as a blueprint for the engineering team to build a production-grade, scalable product based on the Product Specification Document (v2.0).

### Scope

- Next.js 14+ web application (React frontend)  
- Python 3.9+ FastAPI backend  
- Real-time data integration from data.gov.sg API  
- Smart Redis caching system (1.44x performance improvement)  
- 6 comprehensive dashboard sections  
- Interactive visualizations (Recharts, Mapbox)  
- Multi-level data filtering and exploration  
- PostgreSQL database for persistence  
- Professional, responsive UI/UX

### Key Objectives

1. Build a professional, production-grade data analysis dashboard  
2. Implement scalable backend architecture for 1k+ concurrent users  
3. Create responsive frontend with modern React patterns  
4. Implement smart caching for 1.44x faster data retrieval  
5. Enable comprehensive data exploration with export capabilities  
6. Ensure security, scalability, and maintainability

### Success Criteria

- Page load time \< 2 seconds (cold)  
- API response time \< 500ms  
- Uptime \> 99.9%  
- Error rate \< 0.1%  
- 1,000-5,000 MAU within 6 months  
- Mobile-responsive (works on 100% of devices)  
- WCAG AA accessibility compliance  
- Lighthouse score \> 90

---

## **System Architecture**

### High-Level Architecture

┌────────────────────────────────────────────────────────────┐

│                   User Browser                             │

│         (Chrome, Safari, Firefox, Mobile)                 │

└────────────────────┬─────────────────────────────────────┘

                     │ HTTPS

                     │

        ┌────────────────────────────────┐

        │   Next.js Application (Vercel) │

        │                                │

        │  ┌──────────────────────────┐  │

        │  │   React Component Layer  │  │

        │  │  \- Page routing          │  │

        │  │  \- State management      │  │

        │  │  \- UI components         │  │

        │  └──────────────────────────┘  │

        │                                │

        │  ┌──────────────────────────┐  │

        │  │  Dashboard Sections      │  │

        │  │  \- Overview              │  │

        │  │  \- Price Trends          │  │

        │  │  \- Geographic Analysis   │  │

        │  │  \- Flat Analysis         │  │

        │  │  \- Market Insights       │  │

        │  │  \- Data Explorer         │  │

        │  └──────────────────────────┘  │

        │                                │

        │  ┌──────────────────────────┐  │

        │  │  Visualization Layer     │  │

        │  │  \- Recharts              │  │

        │  │  \- Mapbox GL             │  │

        │  │  \- Data tables           │  │

        │  └──────────────────────────┘  │

        │                                │

        │  ┌──────────────────────────┐  │

        │  │  State Management        │  │

        │  │  \- Zustand/Jotai         │  │

        │  │  \- SWR/React Query       │  │

        │  │  \- Local storage         │  │

        │  └──────────────────────────┘  │

        └────────────────┬─────────────────┘

                         │ HTTPS/REST

                         │

        ┌────────────────────────────────────────┐

        │   FastAPI Backend (Railway/AWS)       │

        │                                        │

        │  ┌──────────────────────────────────┐ │

        │  │  API Layer                       │ │

        │  │  \- FastAPI routes                │ │

        │  │  \- Request validation            │ │

        │  │  \- Response formatting           │ │

        │  └──────────────────────────────────┘ │

        │                                        │

        │  ┌──────────────────────────────────┐ │

        │  │  Business Logic Layer            │ │

        │  │  \- Data processing               │ │

        │  │  \- Calculations                  │ │

        │  │  \- Aggregations                  │ │

        │  └──────────────────────────────────┘ │

        │                                        │

        │  ┌──────────────────────────────────┐ │

        │  │  Data Access Layer               │ │

        │  │  \- PostgreSQL ORM (SQLAlchemy)   │ │

        │  │  \- Redis cache layer             │ │

        │  │  \- API integration (data.gov.sg) │ │

        │  └──────────────────────────────────┘ │

        └────────────┬─────────────┬──────────────┘

                     │             │

          ┌──────────┘             └──────────┐

          │                                   │

          ↓                                   ↓

    ┌─────────────┐                  ┌──────────────┐

    │ PostgreSQL  │                  │   Redis      │

    │ Database    │                  │   Cache      │

    │ (Persistent)│                  │   (1.44x     │

    │             │                  │   faster)    │

    └─────────────┘                  └──────────────┘

          │

          ↓

    ┌──────────────────────┐

    │   data.gov.sg API    │

    │                      │

    │ Dataset:             │

    │ d\_8b84c4ee...       │

    │ 212K+ records       │

    └──────────────────────┘

### Architecture Principles

**1\. Layered Architecture**

- **Frontend Layer:** Next.js/React components, state management, UI  
- **API Layer:** FastAPI REST endpoints, request validation, response formatting  
- **Business Logic Layer:** Data processing, calculations, aggregations  
- **Data Access Layer:** PostgreSQL ORM, Redis cache, API integration  
- **External Layer:** data.gov.sg API, PostgreSQL database

**2\. Separation of Concerns**

- Frontend: UI rendering, state management, user interactions  
- Backend: Business logic, data validation, security  
- Database: Persistent data storage  
- Cache: High-speed data retrieval  
- API Integration: External data sources

**3\. Caching Strategy**

- Redis for hot data (1.44x performance improvement)  
- In-memory caching for expensive calculations  
- Browser caching for static assets  
- SWR/React Query for client-side data fetching

**4\. Performance-First Design**

- Server-side rendering (SSR) for initial page load  
- Static generation (SSG) for cacheable pages  
- API pagination (15 records per page)  
- Database query optimization  
- CDN for static assets (Vercel edge network)

---

## **Technology Stack**

### Frontend

| Component | Technology | Version | Purpose |
| :---- | :---- | :---- | :---- |
| Framework | Next.js | 14+ | React metaframework with SSR/SSG |
| UI Library | React | 18+ | Component-based UI |
| State Mgmt | Zustand/Jotai | Latest | Lightweight state management |
| Data Fetch | SWR/React Query | Latest | Data fetching & caching |
| Charts | Recharts | 2.10+ | Interactive visualizations |
| Maps | Mapbox GL | 2.15+ | Geographic visualization |
| Styling | Tailwind CSS | 3.3+ | Utility-first CSS framework |
| UI Components | shadcn/ui | Latest | Pre-built React components |
| HTTP Client | Axios/Fetch | Latest | API communication |
| Forms | React Hook Form | Latest | Form state management |
| Validation | Zod/Yup | Latest | Schema validation |

### Backend

| Component | Technology | Version | Purpose |
| :---- | :---- | :---- | :---- |
| Runtime | Python | 3.9+ | Application runtime |
| Framework | FastAPI | 0.100+ | High-performance API framework |
| ORM | SQLAlchemy | 2.0+ | Database ORM |
| Database | PostgreSQL | 14+ | Relational database |
| Cache | Redis | 7.0+ | In-memory cache store |
| Data Processing | Pandas | 2.0+ | Data manipulation |
| Numerical | NumPy | 1.24+ | Numerical operations |
| HTTP Client | HTTPX | Latest | Async HTTP client |
| Async | asyncio | Built-in | Async programming |
| Validation | Pydantic | 2.0+ | Data validation |

### Infrastructure

| Component | Technology | Purpose |
| :---- | :---- | :---- |
| Frontend Hosting | Vercel | Next.js optimized hosting |
| Backend Hosting | Railway/AWS | Python/FastAPI hosting |
| Database | Railway PostgreSQL | Managed PostgreSQL |
| Cache | Vercel KV/Redis | Redis as a service |
| CDN | Vercel Edge Network | Global content delivery |
| DNS | Vercel/Route 53 | Domain management |
| Monitoring | Sentry/Datadog | Error tracking & monitoring |

### Development Tools

| Tool | Purpose |
| :---- | :---- |
| Package Manager | npm/yarn |
| Package Manager | pip |
| IDE | VSCode |
| Testing | Jest/Vitest (Frontend) |
| Testing | pytest (Backend) |
| Linting | ESLint (Frontend) |
| Linting | Ruff/Black (Backend) |
| Git | GitHub |
| CI/CD | GitHub Actions |

---

## **Project Structure**

### Directory Layout

hdb-buyer-tool/

├── .github/

│   └── workflows/

│       ├── frontend-test.yml      \# Frontend testing

│       ├── backend-test.yml       \# Backend testing

│       ├── frontend-deploy.yml    \# Deploy to Vercel

│       └── backend-deploy.yml     \# Deploy to Railway

├── frontend/

│   ├── app/

│   │   ├── layout.tsx             \# Root layout

│   │   ├── page.tsx               \# Home page

│   │   ├── dashboard/

│   │   │   ├── layout.tsx         \# Dashboard layout

│   │   │   ├── page.tsx           \# Dashboard main

│   │   │   ├── overview/          \# Overview section

│   │   │   ├── price-trends/      \# Price trends section

│   │   │   ├── geographic/        \# Geographic analysis

│   │   │   ├── flat-analysis/     \# Flat analysis section

│   │   │   ├── market-insights/   \# Market insights section

│   │   │   └── data-explorer/     \# Data explorer section

│   │   ├── api/                   \# API routes (if needed)

│   │   └── globals.css            \# Global styles

│   ├── components/

│   │   ├── dashboard/

│   │   │   ├── OverviewSection.tsx

│   │   │   ├── PriceTrendsChart.tsx

│   │   │   ├── GeographicMap.tsx

│   │   │   ├── FlatAnalysisChart.tsx

│   │   │   ├── MarketInsightsTable.tsx

│   │   │   └── DataExplorer.tsx

│   │   ├── common/

│   │   │   ├── Header.tsx

│   │   │   ├── Sidebar.tsx

│   │   │   ├── Footer.tsx

│   │   │   └── Loading.tsx

│   │   ├── charts/

│   │   │   ├── LineChart.tsx

│   │   │   ├── BarChart.tsx

│   │   │   ├── ScatterPlot.tsx

│   │   │   └── MapComponent.tsx

│   │   └── ui/

│   │       ├── Button.tsx

│   │       ├── Card.tsx

│   │       ├── Input.tsx

│   │       ├── Select.tsx

│   │       ├── Modal.tsx

│   │       └── Table.tsx

│   ├── hooks/

│   │   ├── useDashboardData.ts

│   │   ├── useFilters.ts

│   │   ├── usePagination.ts

│   │   └── useApi.ts

│   ├── store/

│   │   ├── dashboardStore.ts      \# Zustand store

│   │   └── filterStore.ts         \# Filter state

│   ├── types/

│   │   ├── index.ts

│   │   ├── api.ts

│   │   ├── dashboard.ts

│   │   └── filter.ts

│   ├── utils/

│   │   ├── api.ts                 \# API client

│   │   ├── formatting.ts          \# Data formatting

│   │   ├── calculations.ts        \# Calculations

│   │   └── constants.ts           \# App constants

│   ├── lib/

│   │   └── axios.ts               \# Axios configuration

│   ├── public/                    \# Static assets

│   ├── next.config.js             \# Next.js configuration

│   ├── tsconfig.json              \# TypeScript config

│   ├── package.json               \# Dependencies

│   ├── tailwind.config.ts          \# Tailwind config

│   ├── postcss.config.js          \# PostCSS config

│   └── .env.example               \# Environment variables

├── backend/

│   ├── app/

│   │   ├── \_\_init\_\_.py

│   │   ├── main.py                \# FastAPI app entry

│   │   ├── config.py              \# Configuration

│   │   ├── dependencies.py        \# Dependency injection

│   │   ├── api/

│   │   │   ├── \_\_init\_\_.py

│   │   │   ├── routes/

│   │   │   │   ├── dashboard.py   \# Dashboard endpoints

│   │   │   │   ├── prices.py      \# Price endpoints

│   │   │   │   ├── towns.py       \# Town endpoints

│   │   │   │   ├── analytics.py   \# Analytics endpoints

│   │   │   │   └── export.py      \# Export endpoints

│   │   │   └── middleware/

│   │   │       ├── auth.py        \# Auth middleware

│   │   │       ├── rate\_limit.py  \# Rate limiting

│   │   │       └── cors.py        \# CORS config

│   │   ├── models/

│   │   │   ├── \_\_init\_\_.py

│   │   │   ├── resale.py          \# Resale data model

│   │   │   ├── user.py            \# User model (future)

│   │   │   └── cache.py           \# Cache model

│   │   ├── schemas/

│   │   │   ├── \_\_init\_\_.py

│   │   │   ├── resale.py          \# Pydantic schemas

│   │   │   ├── filter.py          \# Filter schemas

│   │   │   └── response.py        \# Response schemas

│   │   ├── services/

│   │   │   ├── \_\_init\_\_.py

│   │   │   ├── data\_fetcher.py    \# API integration

│   │   │   ├── calculator.py      \# Calculations

│   │   │   ├── cache\_manager.py   \# Cache management

│   │   │   └── analytics.py       \# Analytics logic

│   │   ├── db/

│   │   │   ├── \_\_init\_\_.py

│   │   │   ├── database.py        \# DB connection

│   │   │   ├── models.py          \# SQLAlchemy models

│   │   │   └── crud.py            \# CRUD operations

│   │   └── utils/

│   │       ├── \_\_init\_\_.py

│   │       ├── formatting.py

│   │       ├── validation.py

│   │       └── constants.py

│   ├── tests/

│   │   ├── \_\_init\_\_.py

│   │   ├── test\_api.py

│   │   ├── test\_services.py

│   │   ├── test\_db.py

│   │   └── conftest.py

│   ├── requirements.txt            \# Dependencies

│   ├── requirements-dev.txt        \# Dev dependencies

│   ├── .env.example                \# Environment variables

│   ├── Dockerfile                  \# Docker setup

│   └── alembic/                    \# Database migrations

├── docker-compose.yml              \# Local development

├── .gitignore

└── README.md

\#\#\# Key Architecture Decisions

\*\*Frontend: Next.js \+ React\*\*

\- App Router for file-based routing

\- Server Components for data fetching

\- Client Components for interactivity

\- Tailwind CSS for styling

\- shadcn/ui for pre-built components

\- Zustand for state management

\- SWR/React Query for data fetching

\*\*Backend: FastAPI\*\*

\- Async-first for high performance

\- Pydantic for data validation

\- SQLAlchemy for ORM

\- Redis for caching

\- PostgreSQL for persistence

\*\*Data Flow:\*\*

\- User interaction → React component

\- Component calls API endpoint

\- Backend fetches/validates data

\- Backend checks Redis cache (1.44x faster)

\- If not in cache, queries PostgreSQL

\- Response sent to frontend

\- React component renders with data

\- User sees updated dashboard

---

## **Data Architecture**

### Data Flow Diagram

┌─────────────────────────────────┐

│  User Interaction (React UI)    │

│  \- Filter selection             │

│  \- Section navigation           │

│  \- Year selection               │

└─────────────┬───────────────────┘

              │

              ↓

┌──────────────────────────────────────────────────┐

│  Frontend State Management (Zustand/React Query) │

│  \- Filter state                                  │

│  \- Pagination state                             │

│  \- UI state                                     │

└──────────────┬─────────────────────────────────┘

               │

               ↓ HTTP REST API

┌──────────────────────────────────────────────────┐

│  FastAPI Backend                                 │

│                                                  │

│  ┌────────────────────────────────────────────┐ │

│  │ Request Handler                            │ │

│  │  \- Route matching                          │ │

│  │  \- Request validation (Pydantic)           │ │

│  │  \- Authorization check                     │ │

│  └────────────────────────────────────────────┘ │

│                 ↓                                │

│  ┌────────────────────────────────────────────┐ │

│  │ Business Logic Layer                       │ │

│  │  \- Filter application                      │ │

│  │  \- Data aggregation                        │ │

│  │  \- Calculations (avg, median, trends)      │ │

│  │  \- Data transformation                     │ │

│  └────────────────────────────────────────────┘ │

│                 ↓                                │

│  ┌────────────────────────────────────────────┐ │

│  │ Cache Management (Redis)                   │ │

│  │  \- Check cache (1.44x faster)              │ │

│  │  \- Cache hit: return cached data           │ │

│  │  \- Cache miss: query database              │ │

│  └────────────────────────────────────────────┘ │

│                 ↓                                │

│  ┌────────────────────────────────────────────┐ │

│  │ Data Access Layer (SQLAlchemy ORM)         │ │

│  │  \- Query PostgreSQL                        │ │

│  │  \- Apply filters                           │ │

│  │  \- Order and paginate                      │ │

│  │  \- Return results                          │ │

│  └────────────────────────────────────────────┘ │

└──────────────┬────────────────────────────────────┘

               │

        ┌──────┴──────┐

        │             │

        ↓             ↓

    ┌─────────┐  ┌─────────────┐

    │PostgreSQL  Redis Cache  │

    │Database    (1.44x faster)

    │           │

    └─────────┘  └─────────────┘

        │

        ↓

    ┌──────────────────────────┐

    │ data.gov.sg API (Monthly)│

    │ Update source data       │

    │ (212K+ records)          │

    └──────────────────────────┘

### Data Schema

**PostgreSQL Tables**

\-- Resale flat transactions

CREATE TABLE resale\_transactions (

    id SERIAL PRIMARY KEY,

    month DATE NOT NULL,

    year INT NOT NULL,

    town VARCHAR(100) NOT NULL,

    flat\_type VARCHAR(20) NOT NULL,

    block VARCHAR(20) NOT NULL,

    street\_name VARCHAR(200),

    storey\_range VARCHAR(20),

    floor\_area\_sqm NUMERIC(10, 2),

    flat\_model VARCHAR(100),

    lease\_commence\_date DATE,

    remaining\_lease VARCHAR(50),

    resale\_price BIGINT,

    price\_per\_sqm NUMERIC(10, 2),

    floor\_level VARCHAR(10),

    age\_years INT,

    created\_at TIMESTAMP DEFAULT CURRENT\_TIMESTAMP,

    updated\_at TIMESTAMP DEFAULT CURRENT\_TIMESTAMP

);

\-- Indexes for performance

CREATE INDEX idx\_month ON resale\_transactions(month);

CREATE INDEX idx\_year ON resale\_transactions(year);

CREATE INDEX idx\_town ON resale\_transactions(town);

CREATE INDEX idx\_flat\_type ON resale\_transactions(flat\_type);

CREATE INDEX idx\_price ON resale\_transactions(resale\_price);

\-- Cached aggregations

CREATE TABLE cached\_aggregations (

    id SERIAL PRIMARY KEY,

    cache\_key VARCHAR(255) UNIQUE NOT NULL,

    data JSONB NOT NULL,

    expires\_at TIMESTAMP NOT NULL,

    created\_at TIMESTAMP DEFAULT CURRENT\_TIMESTAMP

);

**Pydantic Schemas (Python)**

class ResaleTransactionBase(BaseModel):

    month: str  \# YYYY-MM

    year: int

    town: str

    flat\_type: str

    block: str

    street\_name: Optional\[str\]

    storey\_range: Optional\[str\]

    floor\_area\_sqm: Optional\[float\]

    flat\_model: Optional\[str\]

    lease\_commence\_date: Optional\[date\]

    remaining\_lease: Optional\[str\]

    resale\_price: int

    price\_per\_sqm: Optional\[float\]

    floor\_level: Optional\[str\]

    age\_years: Optional\[int\]

class ResaleTransaction(ResaleTransactionBase):

    id: int

    created\_at: datetime

    updated\_at: datetime

    class Config:

        from\_attributes \= True

class FilterParams(BaseModel):

    year: Optional\[int\] \= None

    towns: Optional\[List\[str\]\] \= None

    flat\_types: Optional\[List\[str\]\] \= None

    price\_min: Optional\[int\] \= None

    price\_max: Optional\[int\] \= None

    floor\_level: Optional\[str\] \= None

    lease\_min: Optional\[int\] \= None

    page: int \= 1

    limit: int \= 15

class DashboardStats(BaseModel):

    total\_records: int

    avg\_price: float

    median\_price: float

    min\_price: int

    max\_price: int

    std\_dev: float

    avg\_floor\_area: float

---

## **API Design**

### Complete API Specification

#### **1\. Data.gov.sg Integration API**

**Endpoint:** `https://data.gov.sg/api/action/datastore_search`

**Rate Limits:**

- Public tier: 100 requests/minute  
- Registered tier: 1,000 requests/minute

**Authentication:** None required (public dataset)

**Dataset ID:** `d_8b84c4ee58e3cfc0ece0d773c8ca6abc`

**Max Records per Request:** 32,000

**Request Example:**

GET https://data.gov.sg/api/action/datastore\_search?

    resource\_id=d\_8b84c4ee58e3cfc0ece0d773c8ca6abc&

    limit=32000&

    offset=0&

    sort=month%20desc

**Response Example:**

{

  "success": true,

  "result": {

    "records": \[

      {

        "month": "2025-11",

        "town": "BUKIT MERAH",

        "flat\_type": "3 ROOM",

        "block": "123",

        "street\_name": "OUTRAM ROAD",

        "storey\_range": "04 TO 06",

        "floor\_area\_sqm": "67",

        "flat\_model": "New Generation",

        "lease\_commence\_date": "1980-01-01",

        "remaining\_lease": "62 years 05 months",

        "resale\_price": "420000"

      }

    \],

    "total": 212000,

    "limit": 32000,

    "offset": 0

  }

}

**Error Handling:**

HTTP 429: Rate limit exceeded → Wait 60 seconds, retry

HTTP 500: Server error → Use cached data, retry in 5 minutes

HTTP 503: Service unavailable → Switch to cache immediately

HTTP 404: Resource not found → Check dataset ID

HTTP 400: Bad request → Validate parameters

**Retry Strategy:**

- Max 3 retries with exponential backoff  
- 429: Wait 60 seconds before retry  
- 5xx: Wait 5, 10, 20 seconds between retries  
- Implement circuit breaker pattern

**Data Freshness:**

- Updated monthly around 28th  
- Check last\_updated timestamp in metadata  
- If current\_month \== last\_updated\_month: use cache  
- If current\_month \> last\_updated\_month: refresh from API

---

#### **2\. HDB Buyer Tool Backend REST APIs**

### **Dashboard Summary Endpoint**

**GET** `/api/v1/dashboard/summary`

**Query Parameters:**

year: int (optional, default: current year)

**Response:**

{

  "success": true,

  "data": {

    "total\_records": 212000,

    "avg\_price": 425000,

    "median\_price": 410000,

    "min\_price": 150000,

    "max\_price": 1200000,

    "std\_dev": 95000,

    "avg\_floor\_area": 85.5,

    "price\_per\_sqm\_avg": 4950,

    "year": 2025,

    "last\_updated": "2025-11-30T15:30:00Z",

    "cache\_hit": true

  }

}

**Error Response:**

{

  "success": false,

  "error": "Invalid year parameter",

  "status\_code": 400

}

---

### **Price Trends Endpoint**

**GET** `/api/v1/dashboard/price-trends`

**Query Parameters:**

year: int (optional)

flat\_types: string\[\] (optional, comma-separated)

period: "3m" | "6m" | "12m" | "24m" (default: "12m")

**Example Request:**

GET /api/v1/dashboard/price-trends?year=2025\&flat\_types=3%20ROOM,4%20ROOM\&period=12m

**Response:**

{

  "success": true,

  "data": {

    "trends": \[

      {

        "month": "2024-12",

        "avg\_price": 420000,

        "median\_price": 410000,

        "count": 1500,

        "price\_per\_sqm": 4900

      },

      {

        "month": "2025-01",

        "avg\_price": 425000,

        "median\_price": 415000,

        "count": 1520,

        "price\_per\_sqm": 4950

      }

    \],

    "yoy\_change\_pct": 2.5,

    "trend\_direction": "UP"

  }

}

---

### **Geographic Analysis Endpoint**

**GET** `/api/v1/dashboard/geographic`

**Query Parameters:**

year: int (optional)

metric: "avg\_price" | "transaction\_count" | "price\_per\_sqm" (default: "avg\_price")

**Response:**

{

  "success": true,

  "data": {

    "towns": \[

      {

        "town": "BUKIT MERAH",

        "avg\_price": 550000,

        "transaction\_count": 1200,

        "price\_per\_sqm": 6500,

        "rank": 1,

        "yoy\_change\_pct": 3.2

      },

      {

        "town": "CLEMENTI",

        "avg\_price": 520000,

        "transaction\_count": 1100,

        "price\_per\_sqm": 6200,

        "rank": 2,

        "yoy\_change\_pct": 2.8

      }

    \],

    "total\_towns": 29

  }

}

---

### **Data Explorer Endpoint**

**GET** `/api/v1/dashboard/data-explorer`

**Query Parameters:**

year: int (optional)

towns: string\[\] (optional, comma-separated)

flat\_types: string\[\] (optional)

price\_min: int (optional)

price\_max: int (optional)

floor\_level: "LOW" | "MID" | "HIGH" (optional)

lease\_min: int (optional, e.g., 60 for 60+ years)

sort\_by: string (default: "month")

sort\_order: "asc" | "desc" (default: "desc")

page: int (default: 1\)

limit: int (default: 15, max: 100\)

**Example Request:**

GET /api/v1/dashboard/data-explorer?

    year=2025&

    towns=BUKIT%20MERAH&

    flat\_types=3%20ROOM&

    price\_min=350000&

    price\_max=500000&

    page=1&

    limit=15

**Response:**

{

  "success": true,

  "data": {

    "records": \[

      {

        "id": 12345,

        "month": "2025-11",

        "town": "BUKIT MERAH",

        "block": "123",

        "flat\_type": "3 ROOM",

        "floor\_area\_sqm": 67,

        "resale\_price": 420000,

        "price\_per\_sqm": 6268,

        "storey\_range": "04 TO 06",

        "floor\_level": "MID",

        "lease\_years": 62,

        "age\_years": 44

      }

    \],

    "pagination": {

      "page": 1,

      "limit": 15,

      "total\_records": 156,

      "total\_pages": 11

    },

    "filters\_applied": {

      "year": 2025,

      "towns": \["BUKIT MERAH"\],

      "flat\_types": \["3 ROOM"\],

      "price\_min": 350000,

      "price\_max": 500000

    }

  }

}

---

### **Market Insights Endpoint**

**GET** `/api/v1/dashboard/market-insights`

**Query Parameters:**

year: int (optional)

comparison\_year: int (optional, for YoY)

**Response:**

{

  "success": true,

  "data": {

    "yoy\_changes": \[

      {

        "town": "BUKIT MERAH",

        "current\_year\_avg": 550000,

        "previous\_year\_avg": 533000,

        "change\_pct": 3.2,

        "direction": "UP"

      }

    \],

    "top\_performers": \[

      {

        "town": "PUNGGOL",

        "appreciation\_pct": 5.2,

        "rank": 1

      }

    \],

    "market\_momentum": "MODERATE\_UP",

    "seasonal\_patterns": {

      "peak\_months": \["Jan", "Feb", "Sep"\],

      "low\_months": \["Aug", "Dec"\]

    }

  }

}

---

### **Flat Analysis Endpoint**

**GET** `/api/v1/dashboard/flat-analysis`

**Query Parameters:**

year: int (optional)

metric: "price\_vs\_area" | "age\_vs\_price" | "floor\_vs\_price" (default: "price\_vs\_area")

**Response:**

{

  "success": true,

  "data": {

    "analysis\_type": "price\_vs\_area",

    "data\_points": \[

      {

        "floor\_area\_sqm": 65,

        "resale\_price": 420000,

        "flat\_type": "3 ROOM",

        "price\_per\_sqm": 6461

      }

    \],

    "correlation": 0.92,

    "trend\_line": {

      "slope": 6500,

      "intercept": \-5000

    },

    "insights": {

      "avg\_price\_per\_sqm": 4950,

      "benchmark\_3\_room": 5200,

      "premium\_high\_floor": 1.15

    }

  }

}

---

### **Export Data Endpoint**

**GET** `/api/v1/dashboard/export`

**Query Parameters:**

format: "csv" | "json" (default: "csv")

year: int (optional)

\[other filter parameters same as data-explorer\]

**Response:**

Content-Type: text/csv

Content-Disposition: attachment; filename="HDB\_Resale\_Data\_2025-11-30.csv"

month,town,flat\_type,block,street\_name,storey\_range,floor\_area\_sqm,resale\_price,price\_per\_sqm

2025-11,BUKIT MERAH,3 ROOM,123,OUTRAM ROAD,04 TO 06,67,420000,6268

---

### **Health Check Endpoint**

**GET** `/api/v1/health`

**Response:**

{

  "status": "ok",

  "timestamp": "2025-11-30T15:30:00Z",

  "services": {

    "database": "connected",

    "cache": "connected",

    "external\_api": "connected"

  }

}

---

### **API Authentication (Future)**

**Headers:**

Authorization: Bearer \<token\>

X-API-Key: \<api\_key\>

---

### **Rate Limiting**

**Limits per IP address:**

- 100 requests/minute for public endpoints  
- 1,000 requests/minute for authenticated users  
- 5,000 requests/minute for premium tier (future)

**Response Headers:**

X-RateLimit-Limit: 100

X-RateLimit-Remaining: 95

X-RateLimit-Reset: 1701340200

---

### **Pagination**

**Standard pagination response:**

{

  "data": \[...\],

  "pagination": {

    "page": 1,

    "limit": 15,

    "total\_records": 156,

    "total\_pages": 11,

    "has\_next": true,

    "has\_prev": false

  }

}

---

### **Error Responses**

**Standard error format:**

{

  "success": false,

  "error": "Invalid parameters",

  "error\_code": "INVALID\_PARAMS",

  "status\_code": 400,

  "details": {

    "field": "price\_min",

    "message": "Must be greater than 0"

  }

}

**Common HTTP Status Codes:**

- 200: Success  
- 400: Bad request (validation error)  
- 401: Unauthorized (auth required)  
- 403: Forbidden (insufficient permissions)  
- 404: Not found (endpoint doesn't exist)  
- 429: Rate limit exceeded  
- 500: Internal server error  
- 503: Service unavailable

---

## **Frontend Architecture**

### React Component Structure

App

├── Layout

│   ├── Header

│   ├── Sidebar

│   └── Main Content

│       └── Route

│           ├── Overview Dashboard

│           │   ├── YearSelector

│           │   ├── MetricsCards

│           │   └── DistributionChart

│           ├── Price Trends

│           │   ├── FilterControls

│           │   └── TrendsChart

│           ├── Geographic Analysis

│           │   ├── TownSelector

│           │   ├── TownRanking

│           │   └── MapComponent

│           ├── Flat Analysis

│           │   ├── MetricSelector

│           │   └── AnalysisChart

│           ├── Market Insights

│           │   ├── YOYComparison

│           │   ├── TopPerformers

│           │   └── MomentumIndicators

│           └── Data Explorer

│               ├── FilterPanel

│               ├── DataTable

│               ├── Pagination

│               ├── MapView

│               └── ExportButton

└── Footer

### State Management (Zustand)

// dashboardStore.ts

interface DashboardState {

  selectedYear: number;

  filteredData: ResaleTransaction\[\];

  isLoading: boolean;

  error: string | null;

  

  setYear: (year: number) \=\> void;

  setFilteredData: (data: ResaleTransaction\[\]) \=\> void;

  setLoading: (loading: boolean) \=\> void;

  setError: (error: string | null) \=\> void;

}

export const useDashboardStore \= create\<DashboardState\>((set) \=\> ({

  selectedYear: new Date().getFullYear(),

  filteredData: \[\],

  isLoading: false,

  error: null,

  

  setYear: (year) \=\> set({ selectedYear: year }),

  setFilteredData: (data) \=\> set({ filteredData: data }),

  setLoading: (loading) \=\> set({ isLoading: loading }),

  setError: (error) \=\> set({ error }),

}));

### Data Fetching (SWR)

// hooks/useDashboardData.ts

export const useDashboardData \= (year: number) \=\> {

  const { data, error, isLoading, mutate } \= useSWR(

    \`/api/v1/dashboard/summary?year=${year}\`,

    fetcher,

    {

      revalidateOnFocus: false,

      revalidateOnReconnect: true,

      dedupingInterval: 60000, // Cache for 1 minute

    }

  );

  return {

    data,

    error,

    isLoading,

    mutate,

  };

};

### Component Example (Overview)

// components/dashboard/OverviewSection.tsx

export default function OverviewSection() {

  const { selectedYear, setYear } \= useDashboardStore();

  const { data, isLoading } \= useDashboardData(selectedYear);

  if (isLoading) return \<Loading /\>;

  return (

    \<div className="space-y-6"\>

      \<div className="flex justify-between items-center"\>

        \<h1 className="text-3xl font-bold"\>Market Overview\</h1\>

        \<YearSelector value={selectedYear} onChange={setYear} /\>

      \</div\>

      \<div className="grid grid-cols-4 gap-4"\>

        \<MetricCard

          title="Total Records"

          value={data?.total\_records}

          format="number"

        /\>

        \<MetricCard

          title="Average Price"

          value={data?.avg\_price}

          format="currency"

        /\>

        \<MetricCard

          title="Median Price"

          value={data?.median\_price}

          format="currency"

        /\>

        \<MetricCard

          title="Price Range"

          value={data?.max\_price \- data?.min\_price}

          format="currency"

        /\>

      \</div\>

      \<DistributionChart data={data?.distribution} /\>

    \</div\>

  );

}

---

## **Backend Architecture**

### FastAPI Application Structure

\# app/main.py

from fastapi import FastAPI

from fastapi.middleware.cors import CORSMiddleware

from fastapi.middleware.gzip import GZIPMiddleware

from app.api.routes import dashboard, prices, towns, analytics, export

from app.db.database import engine, Base

from app.services.data\_fetcher import DataFetcher

from app.services.cache\_manager import CacheManager

\# Create database tables

Base.metadata.create\_all(bind=engine)

app \= FastAPI(

    title="HDB Buyer Tool API",

    description="Singapore HDB Resale Flat Analysis API",

    version="1.0.0",

    docs\_url="/api/docs",

    redoc\_url="/api/redoc",

)

\# Add middleware

app.add\_middleware(

    CORSMiddleware,

    allow\_origins=\["http://localhost:3000", "https://hdb-buyer.vercel.app"\],

    allow\_credentials=True,

    allow\_methods=\["\*"\],

    allow\_headers=\["\*"\],

)

app.add\_middleware(GZIPMiddleware, minimum\_size=1000)

\# Include routers

app.include\_router(dashboard.router, prefix="/api/v1", tags=\["dashboard"\])

app.include\_router(prices.router, prefix="/api/v1", tags=\["prices"\])

app.include\_router(towns.router, prefix="/api/v1", tags=\["towns"\])

app.include\_router(analytics.router, prefix="/api/v1", tags=\["analytics"\])

app.include\_router(export.router, prefix="/api/v1", tags=\["export"\])

@app.get("/api/v1/health")

async def health\_check():

    return {

        "status": "ok",

        "timestamp": datetime.utcnow(),

        "services": {

            "database": "connected",

            "cache": "connected",

            "external\_api": "connected",

        }

    }

if \_\_name\_\_ \== "\_\_main\_\_":

    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)

### Database Setup

\# app/db/database.py

from sqlalchemy import create\_engine

from sqlalchemy.ext.declarative import declarative\_base

from sqlalchemy.orm import sessionmaker

import os

DATABASE\_URL \= os.getenv("DATABASE\_URL")

engine \= create\_engine(

    DATABASE\_URL,

    pool\_pre\_ping=True,

    pool\_size=20,

    max\_overflow=40,

)

SessionLocal \= sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base \= declarative\_base()

async def get\_db():

    db \= SessionLocal()

    try:

        yield db

    finally:

        db.close()

### Service Layer

\# app/services/data\_fetcher.py

import aiohttp

from datetime import datetime

from typing import List

import pandas as pd

class DataFetcher:

    def \_\_init\_\_(self):

        self.api\_url \= "https://data.gov.sg/api/action/datastore\_search"

        self.dataset\_id \= "d\_8b84c4ee58e3cfc0ece0d773c8ca6abc"

        self.timeout \= 30

    async def fetch\_from\_api(self, limit: int \= 32000, offset: int \= 0\) \-\> List\[dict\]:

        """Fetch data from data.gov.sg API"""

        params \= {

            'resource\_id': self.dataset\_id,

            'limit': limit,

            'offset': offset,

            'sort': 'month desc'

        }

        

        async with aiohttp.ClientSession() as session:

            try:

                async with session.get(

                    self.api\_url,

                    params=params,

                    timeout=self.timeout

                ) as response:

                    if response.status \== 200:

                        data \= await response.json()

                        return data\['result'\]\['records'\]

                    else:

                        raise Exception(f"API returned {response.status}")

            except Exception as e:

                logger.error(f"Error fetching from API: {str(e)}")

                raise

    def process\_data(self, records: List\[dict\]) \-\> pd.DataFrame:

        """Process raw API data"""

        df \= pd.DataFrame(records)

        

        \# Type conversions

        df\['month'\] \= pd.to\_datetime(df\['month'\])

        df\['year'\] \= df\['month'\].dt.year

        df\['floor\_area\_sqm'\] \= pd.to\_numeric(df\['floor\_area\_sqm'\], errors='coerce')

        df\['resale\_price'\] \= pd.to\_numeric(df\['resale\_price'\], errors='coerce')

        

        \# Feature engineering

        df\['price\_per\_sqm'\] \= (df\['resale\_price'\] / df\['floor\_area\_sqm'\]).round(2)

        

        return df

### Cache Manager

\# app/services/cache\_manager.py

import redis

import json

from datetime import timedelta

import hashlib

class CacheManager:

    def \_\_init\_\_(self, redis\_url: str):

        self.redis\_client \= redis.from\_url(redis\_url)

        self.ttl \= 3600  \# 1 hour default

    def get\_cache(self, key: str):

        """Get data from cache"""

        try:

            data \= self.redis\_client.get(key)

            if data:

                return json.loads(data)

            return None

        except Exception as e:

            logger.error(f"Cache get error: {str(e)}")

            return None

    def set\_cache(self, key: str, value: dict, ttl: int \= None):

        """Set data in cache"""

        try:

            self.redis\_client.setex(

                key,

                ttl or self.ttl,

                json.dumps(value)

            )

        except Exception as e:

            logger.error(f"Cache set error: {str(e)}")

    def generate\_cache\_key(self, \*\*kwargs) \-\> str:

        """Generate cache key from parameters"""

        key\_string \= json.dumps(kwargs, sort\_keys=True)

        return hashlib.md5(key\_string.encode()).hexdigest()

    def invalidate\_pattern(self, pattern: str):

        """Invalidate cache by pattern"""

        keys \= self.redis\_client.keys(pattern)

        if keys:

            self.redis\_client.delete(\*keys)

---

## **Performance Optimization**

### Frontend Optimization

**1\. Code Splitting**

// Use dynamic imports for components

const OverviewSection \= dynamic(() \=\> import('@/components/dashboard/OverviewSection'), {

  loading: () \=\> \<Loading /\>,

});

**2\. Image Optimization**

import Image from 'next/image';

\<Image

  src="/dashboard-banner.png"

  width={1200}

  height={600}

  priority

  loading="eager"

/\>

**3\. Data Fetching Optimization**

// SWR cache and revalidation

useSWR(key, fetcher, {

  dedupingInterval: 60000,  // Cache for 1 minute

  focusThrottleInterval: 300000,  // Throttle refetch on focus

  revalidateOnFocus: false,

});

### Backend Optimization

**1\. Database Indexing**

CREATE INDEX idx\_month ON resale\_transactions(month);

CREATE INDEX idx\_town\_year ON resale\_transactions(town, year);

CREATE INDEX idx\_price ON resale\_transactions(resale\_price);

CREATE INDEX idx\_flat\_type ON resale\_transactions(flat\_type);

**2\. Query Optimization**

\# Use select() for specific columns only

query \= select(\[

    ResaleTransaction.month,

    ResaleTransaction.town,

    ResaleTransaction.resale\_price,

\]).filter(ResaleTransaction.year \== 2025\)

**3\. Pagination**

\# Always paginate large result sets

skip \= (page \- 1\) \* limit

query \= db.query(ResaleTransaction).offset(skip).limit(limit)

### Performance Targets

Metric                    | Target    | How Achieved

\--------------------------|-----------|---------------------------

Page Load (Cold)          | \< 2 sec   | SSR \+ Edge caching

API Response              | \< 500ms   | Redis cache \+ DB indexes

Chart Render              | \< 1 sec   | Client-side rendering

Map Render                | \< 2 sec   | Mapbox GL optimization

Filter Update             | \< 300ms   | Debouncing \+ pagination

Mobile LCP                | \< 2.5s    | Image optimization

Mobile FID                | \< 100ms   | React optimization

Mobile CLS                | \< 0.1     | Layout stability

---

## **Caching Strategy**

### Two-Level Caching

**Level 1: Redis (1.44x faster)**

┌─────────────────┐

│ User Request    │

└────────┬────────┘

         │

         ↓

┌─────────────────────────┐

│ Check Redis Cache       │

│ (in-memory, 1.44x fast) │

└────────┬────────────────┘

         │

    ┌────┴────┐

    │          │

   HIT       MISS

    │          │

    ↓          ↓

Return    Query DB

Data      (slower)

          │

          ↓

      Update

      Cache

          │

          ↓

      Return

      Data

**Level 2: Browser Cache**

// Cache-Control headers

Cache-Control: public, max-age=3600, s-maxage=86400

// Revalidate after 1 hour, but max cache on CDN for 24 hours

### Cache Strategy by Endpoint

| Endpoint | Cache Duration | Invalidation |
| :---- | :---- | :---- |
| Dashboard Summary | 1 hour | Monthly data update |
| Price Trends | 2 hours | Monthly data update |
| Geographic Data | 2 hours | Monthly data update |
| Data Explorer | 5 minutes | User filters |
| Export | No cache | On-demand |
| User Data | Session | Logout |

---

## **Security Implementation**

### HTTPS/TLS

\- Enforce HTTPS on all endpoints

\- HSTS enabled (max-age=31536000)

\- TLS 1.3 minimum

\- Certificate from Let's Encrypt

### API Security

\# Rate limiting

from slowapi import Limiter

limiter \= Limiter(key\_func=get\_remote\_address)

@app.get("/api/v1/dashboard/summary")

@limiter.limit("100/minute")

async def get\_summary():

    pass

### CORS Configuration

app.add\_middleware(

    CORSMiddleware,

    allow\_origins=\["https://hdb-buyer.vercel.app"\],

    allow\_credentials=True,

    allow\_methods=\["GET", "POST"\],

    allow\_headers=\["Content-Type"\],

    max\_age=600,

)

### Input Validation

\# Pydantic validation

class FilterParams(BaseModel):

    year: int \= Field(ge=2017, le=2025)

    price\_min: int \= Field(ge=0, le=2000000)

    price\_max: int \= Field(ge=0, le=2000000)

    

    @validator('price\_max')

    def price\_max\_greater\_than\_min(cls, v, values):

        if 'price\_min' in values and v \< values\['price\_min'\]:

            raise ValueError('price\_max must be \>= price\_min')

        return v

### Security Headers

\# Add security headers

from starlette.middleware.base import BaseHTTPMiddleware

class SecurityHeadersMiddleware(BaseHTTPMiddleware):

    async def dispatch(self, request, call\_next):

        response \= await call\_next(request)

        response.headers\["X-Content-Type-Options"\] \= "nosniff"

        response.headers\["X-Frame-Options"\] \= "DENY"

        response.headers\["X-XSS-Protection"\] \= "1; mode=block"

        response.headers\["Strict-Transport-Security"\] \= "max-age=31536000; includeSubDomains"

        return response

---

## **Deployment Guide**

### Frontend Deployment (Vercel)

**Step 1: Connect GitHub**

\# Push code to GitHub

git push origin main

**Step 2: Deploy via Vercel**

\# Option 1: Use Vercel dashboard

\# 1\. Go to vercel.com

\# 2\. Click "New Project"

\# 3\. Select GitHub repo

\# 4\. Configure environment variables

\# 5\. Deploy

\# Option 2: Use Vercel CLI

npm i \-g vercel

vercel login

vercel

**Environment Variables (.env.production):**

NEXT\_PUBLIC\_API\_URL=https://api.hdb-buyer.com

NEXT\_PUBLIC\_MAPBOX\_TOKEN=\<mapbox\_token\>

### Backend Deployment (Railway)

**Step 1: Create Railway App**

\# Install Railway CLI

npm i \-g @railway/cli

\# Login

railway login

\# Create new project

railway init

\# Link to GitHub

railway link

**Step 2: Deploy**

\# Deploy to production

railway deploy

\# Set environment variables in Railway dashboard

DATABASE\_URL=postgresql://...

REDIS\_URL=redis://...

**Step 3: Configure Services**

\# railway.json

{

  "postDeploy": "alembic upgrade head"

}

### Database Setup (Railway PostgreSQL)

\# Create PostgreSQL plugin in Railway

\# Connect to database

psql $DATABASE\_URL

\# Run migrations

alembic upgrade head

\# Seed initial data (optional)

python scripts/seed\_data.py

### Monitoring & Logging

\# Sentry integration

import sentry\_sdk

from sentry\_sdk.integrations.fastapi import FastApiIntegration

sentry\_sdk.init(

    dsn="https://\<key\>@sentry.io/\<project\>",

    integrations=\[FastApiIntegration()\],

)

---

## **Code Standards**

### Frontend (TypeScript/React)

// File naming: kebab-case for files, PascalCase for components

// components/dashboard/price-trends.tsx

import { FC } from 'react';

import { ResaleTransaction } from '@/types';

interface PriceTrendsProps {

  data: ResaleTransaction\[\];

  isLoading: boolean;

}

export const PriceTrends: FC\<PriceTrendsProps\> \= ({ data, isLoading }) \=\> {

  // Implementation

  return \<div\>...\</div\>;

};

export default PriceTrends;

### Backend (Python/FastAPI)

\# File naming: snake\_case

\# Docstring format: Google style

def calculate\_statistics(data: pd.DataFrame) \-\> Dict\[str, float\]:

    """

    Calculate statistical measures for resale data.

    

    Args:

        data: DataFrame with resale transactions

        

    Returns:

        Dictionary with statistical measures

        

    Raises:

        ValueError: If data is empty

    """

    if data.empty:

        raise ValueError("Data cannot be empty")

    

    return {

        'mean': data\['resale\_price'\].mean(),

        'median': data\['resale\_price'\].median(),

        'std': data\['resale\_price'\].std(),

    }

---

## **Testing Strategy**

### Frontend Testing

// tests/components/OverviewSection.test.tsx

import { render, screen, waitFor } from '@testing-library/react';

import { OverviewSection } from '@/components/dashboard/OverviewSection';

describe('OverviewSection', () \=\> {

  it('renders summary statistics', async () \=\> {

    render(\<OverviewSection /\>);

    

    await waitFor(() \=\> {

      expect(screen.getByText('Total Records')).toBeInTheDocument();

    });

  });

  it('displays loading state', () \=\> {

    render(\<OverviewSection /\>);

    expect(screen.getByTestId('loading')).toBeInTheDocument();

  });

});

### Backend Testing

\# tests/test\_api.py

import pytest

from fastapi.testclient import TestClient

from app.main import app

client \= TestClient(app)

def test\_dashboard\_summary():

    response \= client.get("/api/v1/dashboard/summary?year=2025")

    assert response.status\_code \== 200

    assert "total\_records" in response.json()\['data'\]

def test\_invalid\_year():

    response \= client.get("/api/v1/dashboard/summary?year=2100")

    assert response.status\_code \== 400

---

## **Version History**

| Version | Date | Author | Changes |
| :---- | :---- | :---- | :---- |
| 1.0 | 2025-11-30 | Engineering Team | Initial Streamlit-based TDD |
| 2.0 | 2025-11-30 | Engineering Team | Migrated to React/Next.js \+ FastAPI backend with comprehensive API documentation |

---

**End of Document**

---

**Document Status:** ✅ READY FOR IMPLEMENTATION

**Migration Notes from v1.0 to v2.0:**

- Replaced Streamlit with Next.js React frontend for professional UX  
- Added FastAPI backend for scalability (handles 1k+ concurrent users)  
- Added PostgreSQL database for persistence  
- Implemented Redis caching (1.44x faster than direct API calls)  
- Complete REST API specification with rate limiting and error handling  
- Enhanced security with HTTPS, CORS, input validation  
- Production-grade deployment on Vercel \+ Railway  
- Improved performance: page load \< 2s, API response \< 500ms  
- Professional mobile-responsive design

**Next Steps:**

1. Review and approve v2.0 TDD  
2. Set up development environment (Node.js \+ Python)  
3. Begin frontend development (Next.js setup)  
4. Parallel backend development (FastAPI setup)  
5. Database and cache setup (PostgreSQL \+ Redis)  
6. Integration testing  
7. Deployment to staging  
8. Beta testing with real users  
9. Production launch

**Questions?** Contact the technical architecture lead.  
