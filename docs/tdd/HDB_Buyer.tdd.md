# Technical Design Document (TDD) - HDB Buyer Assistant

## 1. Overview
### 1.1 Purpose
This document specifies the technical architecture and implementation details for the **HDB Buyer Assistant**, a web application designed to provide comprehensive insights into the Singapore HDB resale market. It serves as the blueprint for the engineering team to build a scalable, high-performance product using **Next.js**, **FastAPI**, and **PostgreSQL**.

### 1.2 Scope
- **Frontend**: Next.js 14+ (App Router), React 18, Tailwind CSS, shadcn/ui.
- **Backend**: Python 3.9+ FastAPI, SQLAlchemy (Async), Pydantic.
- **Database**: PostgreSQL 15+ (Primary), Redis 7+ (Caching).
- **Integrations**: Data.gov.sg (HDB Resale Prices), OneMap API (Amenities).
- **Deployment**: Vercel (Frontend), Railway/AWS (Backend/DB).

### 1.3 Success Criteria
- **Performance**: < 2s page load (cold), < 500ms API response time.
- **Scalability**: Support 1,000+ concurrent users.
- **Reliability**: 99.9% uptime, graceful degradation on API failures.
- **Data Accuracy**: 100% match with Data.gov.sg source.

## 2. System Architecture
### 2.1 High-Level Diagram
```mermaid
graph TD
    User[User Browser] -->|HTTPS| CDN[Vercel Edge Network]
    CDN -->|Next.js App| FE[Frontend (Next.js/React)]
    FE -->|REST API| BE[Backend (FastAPI)]
    
    subgraph Backend Services
        BE -->|Read/Write| DB[(PostgreSQL)]
        BE -->|Cache| Cache[(Redis)]
        BE -->|Fetch Data| ExtAPI[Data.gov.sg API]
        BE -->|Fetch Amenities| OneMap[OneMap API]
    end
```

### 2.2 Component Description
- **Frontend (Next.js)**: Handles UI rendering, client-side state (Zustand), and user interactions. Uses Server Components for initial data fetch and Client Components for interactive dashboards.
- **Backend (FastAPI)**: Provides RESTful endpoints for data retrieval, aggregation, and filtering. Manages business logic and caching strategies.
- **Database (PostgreSQL)**: Stores historical transaction data, processed statistics, and user shortlist data.
- **Cache (Redis)**: Caches frequent API responses and expensive aggregation results to ensure low latency.

## 3. Technology Stack
### 3.1 Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui (Radix UI based)
- **State Management**: Zustand (Global), React Query (Server State)
- **Visualization**: Recharts (Charts), Mapbox GL JS (Maps)
- **Forms**: React Hook Form + Zod

### 3.2 Backend
- **Framework**: FastAPI
- **Language**: Python 3.9+
- **ORM**: SQLAlchemy (Async)
- **Validation**: Pydantic v2
- **Data Processing**: Pandas, NumPy
- **HTTP Client**: HTTPX (Async)

### 3.3 Infrastructure
- **Database**: PostgreSQL 15
- **Cache**: Redis 7
- **Hosting**: Vercel (FE), Railway (BE/DB)

## 4. Data Architecture
### 4.1 Database Schema (PostgreSQL)

#### `resale_transactions`
| Column | Type | Description |
| :--- | :--- | :--- |
| `id` | UUID | Primary Key |
| `month` | VARCHAR(7) | YYYY-MM |
| `town` | VARCHAR(50) | e.g., "ANG MO KIO" |
| `flat_type` | VARCHAR(20) | e.g., "3 ROOM" |
| `block` | VARCHAR(10) | |
| `street_name` | VARCHAR(100) | |
| `storey_range` | VARCHAR(20) | e.g., "04 TO 06" |
| `floor_area_sqm` | NUMERIC | |
| `flat_model` | VARCHAR(50) | |
| `lease_commence_date` | INTEGER | Year |
| `remaining_lease` | VARCHAR(50) | Original string |
| `resale_price` | NUMERIC | |
| `price_per_sqm` | NUMERIC | Calculated |
| `floor_level` | VARCHAR(10) | Derived (LOW/MID/HIGH) |
| `created_at` | TIMESTAMP | |

#### `shortlist_items`
| Column | Type | Description |
| :--- | :--- | :--- |
| `id` | UUID | Primary Key |
| `transaction_id` | UUID | FK to resale_transactions |
| `user_notes` | TEXT | |
| `renovation_rating` | INTEGER | 1-5 |
| `facing` | VARCHAR(10) | N, S, E, W, NE, etc. |
| `added_at` | TIMESTAMP | |

#### `metadata`
| Column | Type | Description |
| :--- | :--- | :--- |
| `key` | VARCHAR(50) | PK (e.g., "last_updated") |
| `value` | JSONB | |

### 4.2 Caching Strategy (Redis)
- **Key Pattern**: `api:{endpoint}:{params_hash}`
- **TTL**:
    - Dashboard Stats: 24 hours
    - Search Results: 1 hour
    - OneMap Amenities: 7 days (static data)
- **Invalidation**: On monthly data ingestion trigger.

## 5. API Design
### 5.1 Endpoints

#### `GET /api/v1/dashboard/summary`
- **Params**: `year` (optional)
- **Response**: Global stats (avg price, total volume, etc.)

#### `GET /api/v1/dashboard/price-trends`
- **Params**: `year`, `flat_types` (list), `period` (3m/6m/12m/24m)
- **Response**: Monthly trend data points for charts.

#### `GET /api/v1/dashboard/geographic`
- **Params**: `year`, `metric` (avg_price/volume)
- **Response**: Town-wise aggregated data for maps/charts.

#### `GET /api/v1/dashboard/data-explorer`
- **Params**: `towns`, `flat_types`, `price_min`, `price_max`, `page`, `limit`
- **Response**: Paginated transaction list + metadata.

#### `GET /api/v1/amenities`
- **Params**: `lat`, `lng`, `radius`, `types` (mrt/school/mall)
- **Response**: List of nearby amenities from OneMap.

#### `POST /api/v1/shortlist`
- **Body**: `{ transaction_id, user_notes, renovation_rating, facing }`
- **Response**: Created item.

### 5.2 External API References
These are the upstream APIs used by the backend to fetch data.

#### **Data.gov.sg (HDB Resale Prices)**
- **Website**: [https://data.gov.sg/](https://data.gov.sg/)
- **Dataset URL**: [https://data.gov.sg/dataset/resale-flat-prices](https://data.gov.sg/dataset/resale-flat-prices)
- **API Documentation**: [CKAN API Guide](https://docs.ckan.org/en/2.9/api/index.html)
- **Base Endpoint**: `https://data.gov.sg/api/action/datastore_search`

#### **OneMap API (Amenities)**
- **Website**: [https://www.onemap.gov.sg/](https://www.onemap.gov.sg/)
- **API Documentation**: [https://www.onemap.gov.sg/docs/](https://www.onemap.gov.sg/docs/)
- **Base Endpoint**: `https://www.onemap.gov.sg/api/common/elastic/search` (for location search) & `https://www.onemap.gov.sg/api/themes` (for amenities)

## 6. Frontend Architecture
### 6.1 Page Structure
- `/` (Home): Landing page + Overview Dashboard
- `/trends`: Price Trends Module
- `/geographic`: Geographic Analysis Module
- `/explorer`: Data Explorer + Map
- `/shortlist`: My Shortlist & Notes

### 6.2 Component Hierarchy
- `DashboardLayout`: Sidebar, Header, Footer
    - `OverviewSection`: MetricCards, SummaryChart
    - `TrendsSection`: FilterBar, RechartsLineChart
    - `ExplorerSection`:
        - `FilterPanel`: Accordion with sliders/checkboxes
        - `ResultsTable`: DataTable with pagination
        - `MapComponent`: Mapbox instance with markers

### 6.3 State Management
- **Zustand**: Global UI state (sidebar open/close, theme), Global Filters (Year).
- **React Query**: Server state (API responses), caching, loading states.

## 7. Implementation Plan
### Phase 1: Foundation (Weeks 1-2)
- Setup Next.js and FastAPI projects.
- Configure PostgreSQL and Redis.
- Implement Data Ingestion Pipeline (Data.gov.sg -> DB).

### Phase 2: Core Dashboard (Weeks 3-4)
- Build Overview and Price Trends APIs & UI.
- Implement Geographic Analysis.

### Phase 3: Explorer & Map (Weeks 5-6)
- Build Data Explorer with advanced filtering.
- Integrate Mapbox GL.
- Implement OneMap API integration for amenities.

### Phase 4: Shortlist & Polish (Weeks 7-8)
- Build "My Shortlist" feature (Local Storage or DB).
- UI Polish (Tailwind, Animations).
- Performance Tuning & Testing.

## 8. Security & Compliance
- **Data Privacy**: No PII collection (initially).
- **API Security**: Rate limiting (100 req/min), CORS configuration.
- **Input Validation**: Strict Pydantic models for all API inputs.
- **Attribution**: Clear credit to Data.gov.sg and OneMap.

## 9. Testing Strategy
- **Unit Testing**:
    - Backend: `pytest` for API endpoints and business logic.
    - Frontend: `Vitest` + `React Testing Library` for components.
- **Integration Testing**:
    - Test database interactions and cache invalidation.
    - Test OneMap and Data.gov.sg API clients with mocks.
- **E2E Testing**:
    - `Playwright` for critical user flows (Filtering, Shortlisting).

## 10. Deployment & Monitoring
- **Deployment**:
    - Frontend: Vercel (Auto-deploy from Git).
    - Backend: Railway (Dockerized).
- **Monitoring**:
    - **Sentry**: Error tracking for both FE and BE.
    - **Vercel Analytics**: Web vitals and user traffic.
    - **Uptime Robot**: API health check monitoring.
