# Product Specification Document (PSD) - HDB Buyer Assistant

## 1. Product Overview
- **What the product is**: A professional, high-performance desktop web application for analyzing Singapore HDB resale market trends. It combines a modern **Next.js/React frontend** with a robust **FastAPI backend** to deliver real-time, data-driven insights.
- **Who it is for**: Singaporean home buyers (First-time & Upgraders), property investors, and data analysts who need unbiased market data.
- **What core problems it solves**:
    - **Information Asymmetry**: Centralizes scattered data (prices, trends, location) into one view.
    - **Context Deficit**: Provides historical trends and town comparisons, not just isolated listings.
    - **Agent Bias**: Offers raw, unfiltered data analysis free from sales pressure.
    - **Analysis Paralysis**: Structures complex data into 6 intuitive dashboard sections.
- **Primary value proposition**: "Democratize access to comprehensive HDB resale insights with a free, fast, and transparent analytics platform."
- **Success metrics**:
    - **Performance**: < 2 seconds page load time (cold), < 500ms API response.
    - **Engagement**: Monthly Active Users (1,000-5,000 in 6 months).
    - **Data Coverage**: 100% accurate reflection of 212,000+ transactions from Data.gov.sg.
    - **UX Quality**: Professional, responsive design with smooth animations and transitions.

## 2. User Personas
- **Persona 1: The First-Time Buyer**
    - **Role**: Young professional/couple (25-35 years), income $3k-$6k.
    - **Goals**: Find a home within budget, avoid overpaying, understand fair market value.
    - **Pain Points**: Overwhelmed by data, fear of making a wrong financial decision.
    - **Checklist Focus**: Budget & Financing, Location & Accessibility.
- **Persona 2: The Upgrader/Family**
    - **Role**: Family (35-50 years), household income $6k-$12k.
    - **Goals**: Compare neighborhoods for schools/amenities, maximize sale of current flat.
    - **Pain Points**: Balancing location vs. price, timing the market.
    - **Checklist Focus**: Nearby Amenities, Neighborhood & Community, Unit Size.
- **Persona 3: The Property Investor**
    - **Role**: Active investor (30-55 years).
    - **Goals**: Identify undervalued blocks, spot capital appreciation trends, rental yield.
    - **Pain Points**: Manual spreadsheet tracking, lack of historical trend visualization.
    - **Checklist Focus**: Investment Potential, Future-Proofing.
- **Persona 4: The Data Analyst**
    - **Role**: Tech-savvy professional.
    - **Goals**: Export raw data, perform custom analysis.
    - **Pain Points**: No easy way to bulk download clean, historical data.

## 3. Core Use Cases
1.  **Market Snapshot**: User views the "Overview" to see current market stats (avg price, total volume) for the current year.
2.  **Trend Analysis**: User uses "Price Trends" to see how 4-Room flats in "Tampines" have moved over the last 5 years (identifying growth/decline).
3.  **Location Scouting**: User uses "Geographic Analysis" to compare average prices across different towns to find affordable yet accessible areas.
4.  **Unit Valuation**: User uses "Flat Analysis" to check if a specific floor level or floor area commands a premium.
5.  **Opportunity Spotting**: Investor uses "Market Insights" to find towns with the highest Year-Over-Year (YoY) appreciation.
6.  **Deep Dive & Export**: User filters "Data Explorer" for specific blocks/streets, views them on a map, and exports the list to CSV for offline checklist comparison.
7.  **Shortlist & Compare**: User saves specific blocks to "My Shortlist" and manually adds notes on "Renovation" and "Facing" after viewing units.

## 4. User Stories
- "As a **First-Time Buyer**, I want to **filter transactions by price range and town** so that **I can find properties that fit my specific budget (Checklist: Budget)**."
- "As an **Upgrader**, I want to **see nearby schools and MRT stations on the map** so that **I can ensure the location is convenient for my family (Checklist: Amenities)**."
- "As an **Investor**, I want to **see a heatmap of price appreciation** so that **I can identify areas with high investment potential (Checklist: Investment Potential)**."
- "As a **Buyer**, I want to **save interesting blocks to a shortlist and add my own notes (e.g., 'West Sun', 'Newly Renovated')** so that **I can track my viewing history**."
- "As a **User**, I want to **download the filtered transaction data as a CSV** so that **I can run my own calculations and share with my spouse**."
- "As a **User**, I want the **interface to feel modern and professional** so that **I trust the data and enjoy using the tool**."

## 5. Feature List
### P0 - Core MVP Features
- **Real-time Data Engine**: FastAPI backend integrating with Data.gov.sg API and Redis caching.
- **Professional Dashboard UI**: Next.js/React frontend with Tailwind CSS and shadcn/ui components.
- **Overview Dashboard**: High-level stats (Avg Price, Median Price, Volume) with Year-based filtering.
- **Price Trends Module**: Interactive Recharts line charts showing monthly trends, broken down by flat type.
- **Geographic Analysis**: Town-wise bar charts and heatmaps to compare prices and volumes across Singapore.
- **Data Explorer**: Advanced table view with multi-level filtering (Town, Flat Type, Price, Lease, Floor Level) and CSV export.
- **Interactive Map**: Mapbox GL integration in Data Explorer showing exact property locations with price color-coding.

### P1 - Enhanced Features
- **Amenities Integration**: Overlay MRT stations, Schools, Malls, and **Carparks** on the map using **OneMap API**.
- **Flat Analysis Module**: Scatter plots for Price vs. Floor Area, Age vs. Price, and Floor Level analysis.
- **Market Insights Module**: YoY change analysis, momentum indicators, and seasonal pattern detection.

### P2 - Future/Checklist Features
- **My Shortlist & Notes**: Feature to save specific blocks/transactions and manually input "Renovation Status", "Facing", and "Personal Rating".
- **Comparison View**: Side-by-side comparison of shortlisted units.

## 6. Functional Requirements
- **FR-1 (Data Fetching)**: The backend shall fetch data from Data.gov.sg (Dataset: `d_8b84c4ee58e3cfc0ece0d773c8ca6abc`) and cache it in Redis/PostgreSQL.
- **FR-2 (Smart Refresh)**: The system shall check for new data on launch; if the current month's data is missing, it shall fetch and update the database.
- **FR-3 (Global Filter)**: The frontend shall provide a "Year" selector (default: current year) that applies to all dashboard sections via global state (Zustand).
- **FR-4 (Trend Visualization)**: The "Price Trends" section shall display a multi-line chart comparing selected flat types over a 12-24 month period using Recharts.
- **FR-4.1 (Trend Controls)**: The "Price Trends" section shall include a toggle for **Average vs. Median Price** and a **Time Period Selector** (3/6/12/24 months).
- **FR-5 (Map Sync)**: The "Data Explorer" map shall update markers dynamically to match the records currently visible in the data table (current page).
- **FR-6 (Export)**: The system shall allow users to export the currently filtered dataset to a CSV file named `HDB_Resale_Data_[YYYY-MM-DD].csv`.
- **FR-7 (Filtering)**: The Data Explorer shall support filtering by: Town (multi-select), Flat Type, Price Range (slider), Floor Level (Low/Mid/High), and Remaining Lease.
- **FR-8 (Metrics)**: The Overview shall display Total Transactions, Average Price, Median Price, and Min/Max Price for the selected period.
- **FR-9 (Amenities)**: The map shall allow toggling layers for "MRT", "Schools", "Malls", and **"Carparks"** fetched from OneMap API.
- **FR-10 (Geographic Analysis)**: The section shall include a **Town Ranking Table** and **Transaction Volume Charts** in addition to price comparison.
- **FR-11 (Flat Analysis)**: The section shall include **Price Distribution Box Plots** to show price spread by flat type.
- **FR-12 (Market Insights)**: The section shall include a **Seasonal Pattern Chart** to identify buying trends.

## 7. Non-Functional Requirements
- **Performance**: Dashboard load time < 2 seconds. API response < 500ms.
- **Tech Stack**:
    - **Frontend**: Next.js 14+, React 18+, Tailwind CSS, shadcn/ui, Recharts, Mapbox GL.
    - **Backend**: Python 3.9+, FastAPI, PostgreSQL, Redis.
- **Reliability**: Data must match Data.gov.sg exactly.
- **Usability**: Mobile-responsive layout (charts resize automatically). WCAG AA accessibility.
- **Aesthetics**: Professional, modern design with consistent color palette, typography, and spacing.

## 8. Data Model
### Entities
- **Transaction (PostgreSQL Table)**
    - `id`: UUID (Primary Key)
    - `month`: String (YYYY-MM)
    - `town`: String (e.g., "ANG MO KIO")
    - `flat_type`: String (e.g., "3 ROOM")
    - `block`: String
    - `street_name`: String
    - `storey_range`: String (e.g., "10 TO 12")
    - `floor_area_sqm`: Float
    - `flat_model`: String
    - `lease_commence_date`: Integer (Year)
    - `remaining_lease`: String (e.g., "60 years 04 months")
    - `resale_price`: Float
    - `_derived_price_per_sqm`: Float (Calculated)
    - `_derived_floor_level_category`: String (Low/Mid/High)

- **Metadata**
    - `last_updated`: Timestamp
    - `record_count`: Integer
    - `data_version`: String

- **ShortlistItem (Local Storage / Future DB)**
    - `transaction_id`: UUID (Reference)
    - `user_notes`: String
    - `renovation_rating`: Integer (1-5)
    - `facing`: String (N, S, E, W, etc.)
    - `added_at`: Timestamp

## 9. Integrations
- **Source**: Data.gov.sg HDB Resale Flat Prices API.
- **Source**: OneMap API (for MRT, Schools, Amenities locations).
- **Method**: HTTP GET requests via FastAPI backend.
- **Rate Limiting**: Handle API rate limits with retry logic; rely on Redis cache primarily.

## 10. UX & UI Specifications
- **Framework**: Next.js App Router with React Server Components.
- **Layout**:
    - **Sidebar/Navigation**: Collapsible sidebar with clear icons and labels.
    - **Header**: Global search, user settings (if any), and theme toggle.
    - **Main Content**: Grid-based layout for dashboard cards.
- **Design System**:
    - **Colors**: Professional palette (e.g., Slate/Blue/Teal) using Tailwind colors.
    - **Typography**: Clean sans-serif font (Inter or similar).
    - **Components**: Use shadcn/ui for consistent buttons, inputs, cards, and modals.
- **Table Formatting**:
    - **Price Columns**: Right-aligned, formatted as currency (e.g., "S$ 650,000").
    - **Headers**: Bold text for visual hierarchy.
    - **Record Count**: "Showing X of Y records" indicator above table.
- **Interactions**:
    - Smooth transitions between pages.
    - Loading skeletons for data fetching states.
    - Hover effects on charts and table rows.

## 11. System Constraints & Assumptions
- **Constraint**: Requires hosting environment supporting Node.js (Frontend) and Python (Backend).
- **Constraint**: Data is public; no private user accounts or login required initially.
- **Assumption**: User has internet access for initial data fetch and map tiles.
- **Assumption**: Data.gov.sg API structure remains stable.

## 12. Decisions & Open Questions
- **Decision**: **OneMap API** will be used for amenities data (Schools, MRT).
- **Decision**: **Manual Input** will be used for "Renovation" and "Facing" via a "My Shortlist" feature, as this data is not available in government datasets.
- **Decision**: **Mortgage Calculator** is excluded from MVP scope.
- **Q1**: Can we integrate OneMap API later for "Nearby Amenities" (schools, MRT)? (Post-MVP). -> **Resolved: Yes, moved to P1.**
- **Q2**: How do we handle "Renovation Status" or "Facing"? -> **Resolved: User Manual Input.**
- **Q3**: Should we add a "Mortgage Calculator" tab? -> **Resolved: No.**

## 13. Acceptance Criteria
- **AC-1**: Application launches and loads data from backend within 2 seconds.
- **AC-2**: "Overview" shows correct statistics for the selected year.
- **AC-3**: User can filter "Data Explorer" by Town and Price, and see the table and map update.
- **AC-4**: Map displays markers for MRT stations and Schools when the respective layers are toggled.
- **AC-5**: User can save a transaction to "Shortlist" and add a note.
- **AC-6**: "Price Trends" chart correctly displays the trend line for selected flat types.
- **AC-7**: UI is responsive and looks professional on both desktop and mobile.
