# **HDB Buyer Tool \- Product Specification Document (Enhanced)**

**Version:** 2.0  
**Date:** November 30, 2025  
**Author:** Product & Engineering Team  
**Status:** Ready for Development

---

## **Table of Contents**

1. [Executive Summary](#executive-summary)  
2. [Product Overview](#product-overview)  
3. [Problem Statement](#problem-statement)  
4. [Target Users](#target-users)  
5. [Core Features](#core-features)  
6. [Dashboard Sections](#dashboard-sections)  
7. [User Flows](#user-flows)  
8. [Technical Architecture](#technical-architecture)  
9. [API Specifications](#api-specifications)  
10. [Data Models](#data-models)  
11. [UI/UX Requirements](#uiux-requirements)  
12. [Performance Requirements](#performance-requirements)  
13. [Security Requirements](#security-requirements)  
14. [MVP Scope](#mvp-scope)  
15. [Post-MVP Features](#post-mvp-features)  
16. [Success Metrics](#success-metrics)  
17. [Development Timeline](#development-timeline)

---

## **Executive Summary**

**Product Name:** HDB Buyer Tool \- Singapore Resale Flat Price Analysis Dashboard  
**Product Type:** Interactive Web Application / Streamlit Dashboard  
**Primary Goal:** Empower HDB home buyers and investors with transparent, data-driven insights about resale flat prices, market trends, and geographic patterns.

**Core Value Proposition:**

- Real-time data from Singapore's official data.gov.sg API  
- 6 comprehensive analysis sections with interactive visualizations  
- Search HDB resale units by postal code, town, price range  
- View 12-month price trends and market comparisons  
- Filter by unit characteristics (room type, price, floor level, lease remaining)  
- Interactive maps with synchronized table records  
- Download filtered results as CSV  
- Smart caching for 1.44x faster performance than direct API calls  
- Year-based filtering across all sections  
- Year-over-year market analysis and trend identification

**Target Launch:** Month 6 of development (6-month MVP timeline)

**Budget:** $1,500-3,000 (infrastructure \+ optional outsourcing)

**Expected Users (6 months):** 1,000-5,000 monthly active users

**Data Coverage:** 212,000+ HDB resale transactions from 2017-2025

---

## **Product Overview**

### Vision

Become Singapore's most trusted platform for HDB resale transparency and market analysis, empowering buyers, upgraders, and investors to make data-driven decisions without sales pressure or hidden biases.

### Mission

Democratize access to comprehensive HDB resale insights by aggregating government data and presenting it through interactive dashboards, trend analysis, and geographic visualizations that serve diverse buyer personas and use cases.

### Product Positioning

- **What it is:** A comprehensive data analytics platform \+ interactive dashboard for HDB resale research, market insights, and property analysis  
- **What it's NOT:** A listing portal, agent marketplace, or predictive pricing tool  
- **Competitive advantage:** Free, transparent, comprehensive analysis (vs. agent-biased listing sites)

### Key Principles

1. **Data-First:** All insights backed by official government data (212K+ transactions)  
2. **Transparent:** Clear disclosure of data source, update frequency, limitations  
3. **Interactive:** Rich visualizations, maps, and filtering across all sections  
4. **User-Centric:** Flexible analysis options for different buyer personas  
5. **Free:** No paywalls, no ads (at MVP stage)  
6. **Fast:** 1.44x faster with smart caching; under 3-second load times  
7. **Accessible:** Mobile-friendly, intuitive UX (no expert knowledge required)  
8. **Comprehensive:** 6 dashboard sections covering all aspects of resale market

---

## **Problem Statement**

### The Problem

HDB home buyers, upgraders, and investors face **information asymmetry** when evaluating resale flats:

1. **Scattered Data:** Price info on PropertyGuru/99.co, school data on Google, transport info on Google Maps, trend analysis nowhere  
     
   - Users spend 3-5 hours collating data from multiple sources  
   - No centralized view of market trends

   

2. **Context Deficit:** Existing tools show individual listings, not comprehensive trends  
     
   - Buyers ask: "Is this block's price rising or falling relative to market?"  
   - Cannot easily compare same unit across months/years  
   - No geographic context or town-wise comparisons

   

3. **Agent Bias:** Listing platforms optimize for agent commissions, not buyer clarity  
     
   - Results prioritize high-commission units  
   - Marketing language obscures trade-offs  
   - Limited to recent listings only

   

4. **Analysis Paralysis:** Too much data, no structured framework  
     
   - Buyers compare prices in isolation, missing larger trends  
   - No easy way to summarize findings across multiple units  
   - Investors cannot identify appreciation patterns or undervalued blocks

   

5. **Limited Historical Context:** Cannot analyze market trends over time  
     
   - No way to see how prices have evolved since 2017  
   - Cannot identify seasonal patterns or cyclical trends  
   - Investor cannot assess long-term appreciation

### Why Now?

- **Interest Rates Stabilizing:** Buyers scrutinize value more carefully  
- **Data Availability:** HDB \+ MOE \+ LTA APIs now mature and free; 212K+ historical records available  
- **Market Fragmentation:** Incumbents (PropertyGuru, 99.co) focus on listings, not analysis  
- **Tech-Savvy Buyers:** Younger cohort prefers data-driven insights over agent sales talk  
- **Post-COVID Housing Demand:** More focus on value, location, and long-term investment potential  
- **Government Initiative:** Singapore's open data movement provides free, reliable data sources

---

## **Target Users**

### Primary Persona: First-Time HDB Buyer

- **Age:** 25-35 years  
- **Income:** $3,000-6,000/month (individual)  
- **Tech Savvy:** Medium-High (comfortable with web tools)  
- **Primary Need:** Understand market, find good value, avoid overpaying  
- **Pain Point:** Overwhelmed by data, unclear if price is fair, worried about overpaying  
- **Usage:** Deep research phase (1-3 months before purchase)  
- **Dashboard Focus:** Price trends, town comparisons, geographic analysis

### Secondary Persona: Upgrader/Family

- **Age:** 35-50 years  
- **Income:** $6,000-12,000/month (household)  
- **Tech Savvy:** Medium (learns quickly)  
- **Primary Need:** Compare neighborhoods for family fit, school access, identify emerging areas  
- **Pain Point:** Balancing price, location, amenities for changing life stage, need data-backed insights  
- **Usage:** Extended research (3-6 months)  
- **Dashboard Focus:** Geographic analysis, flat analysis, market insights

### Tertiary Persona: Property Investor

- **Age:** 30-55 years  
- **Income:** Variable (active investors)  
- **Tech Savvy:** High  
- **Primary Need:** Identify price appreciation trends, spot undervalued blocks, rental arbitrage, YoY analysis  
- **Pain Point:** Manual spreadsheet tracking, hard to find undervalued blocks, need comprehensive market view  
- **Usage:** Continuous scanning (weekly/monthly), historical analysis  
- **Dashboard Focus:** Market insights, data explorer, trend analysis, price vs. floor area correlations

### Quaternary Persona: Data Analyst / Real Estate Professional

- **Age:** 25-50 years  
- **Income:** $5,000-10,000/month  
- **Tech Savvy:** High (comfortable with data exports, analysis tools)  
- **Primary Need:** Download and analyze data, generate reports, identify patterns  
- **Pain Point:** No centralized data source, manual data compilation  
- **Usage:** Ad-hoc analysis, report generation  
- **Dashboard Focus:** Data explorer, CSV export, filtering capabilities

### Non-Target User

- Non-tech elderly buyers (\< 5% market)  
- International buyers (\< 1% of HDB market)  
- Real estate agents (may use, but not primary target)

---

## **Core Features**

### Feature 1: Real-time Data with Smart Caching (MVP)

**Purpose:** Deliver official government data with superior performance

**Functional Requirements:**

1. Direct connection to data.gov.sg API (212K+ records)  
2. Smart CSV caching system for 1.44x faster performance  
3. Month-based detection system to prevent unnecessary API calls  
4. Automatic data refresh when new monthly data available  
5. Metadata tracking for data freshness

**Technical Details:**

- Data source: Singapore data.gov.sg API (Dataset ID: d\_8b84c4ee58e3cfc0ece0d773c8ca6abc)  
- Update frequency: Monthly (around 28th)  
- Cache strategy: Local CSV storage with metadata  
- Performance gain: 1.44x faster than direct API calls  
- Historical coverage: 2017 onwards (8+ years of data)

**Data Points:**

- 212,000+ resale transactions  
- 29 towns in Singapore  
- 5 flat types (1-5 rooms)  
- Monthly price data with aggregations

---

### Feature 2: 6 Dashboard Sections (MVP)

#### 2.1 Overview Dashboard

**Purpose:** High-level market snapshot and dataset metrics

**Sections:**

- Dataset metrics and statistics (total records, date range, flat types)  
- Price statistics (average, median, min, max, standard deviation)  
- Floor area analysis (average, distribution by flat type)  
- Year-based filtering (defaults to 2025\)  
- Key market indicators

**Visualizations:**

- Summary statistics cards  
- Distribution charts  
- Year comparison view

---

#### 2.2 Price Trends Section

**Purpose:** Analyze historical and current price movements

**Sections:**

- Monthly price trends (line/area chart, 12-month lookback)  
- Flat type comparisons (price trends by 1/2/3/4/5 room)  
- Interactive charts with hover details  
- Year-over-year trend comparison  
- Average vs. median price toggle

**Visualizations:**

- Multi-line trend charts  
- Flat type comparison overlays  
- YoY growth indicators  
- Trend direction indicators (↑ up, → stable, ↓ down)

**Filtering:**

- Year selection  
- Flat type multi-select  
- Time period selection (3/6/12/24 months)

---

#### 2.3 Geographic Analysis Section

**Purpose:** Analyze price patterns by location and region

**Sections:**

- Town-wise price analysis (average prices by town)  
- Transaction volume mapping (which towns have most transactions)  
- Top performers by region (best appreciation, highest prices)  
- Geographic price heatmap  
- Town comparison rankings

**Visualizations:**

- Town-wise bar charts (sorted by price or transactions)  
- Geographic maps with price color-coding  
- Heatmaps showing price density  
- Top 10 / Bottom 10 town listings

**Insights:**

- Which towns are most popular (transaction count)  
- Which towns have highest average prices  
- Which towns showing strongest growth (YoY)  
- Emerging areas with price appreciation

---

#### 2.4 Flat Analysis Section

**Purpose:** Analyze unit-level characteristics and their relationship to price

**Sections:**

- Price vs. floor area correlations (scatter plot)  
- Age impact analysis (lease commenced date vs. resale price)  
- Flat type comparison (price per sqft by flat type)  
- Floor level analysis (storey range impact on price)  
- Room type price distributions

**Visualizations:**

- Scatter plots (price vs. floor area with trend lines)  
- Box plots (price distribution by flat type)  
- Age vs. price analysis with trend indicators  
- Floor level impact charts

**Insights:**

- Price per sqft benchmarks by flat type  
- How lease age affects price  
- Premium/discount for different floor levels  
- Correlation between unit size and price

---

#### 2.5 Market Insights Section

**Purpose:** Deep market analysis and trend identification

**Sections:**

- Year-over-year (YoY) changes (price change % by town/flat type)  
- Market leaders identification (towns with highest appreciation)  
- Recent trend analysis (last 3/6/12 months trends)  
- Market momentum indicators  
- Seasonal pattern analysis

**Visualizations:**

- YoY comparison charts  
- Top performers leaderboard  
- Momentum indicators (↑↑ strong, ↑ moderate, → stable, ↓ weak)  
- Seasonal pattern charts

**Insights:**

- Which towns growing fastest  
- Which flat types appreciate most  
- Seasonal buying/selling patterns  
- Market momentum and direction

---

#### 2.6 Data Explorer Section

**Purpose:** Interactive exploration with detailed filtering and export capabilities

**Sections:**

- Interactive multi-level filtering (town, flat type, month, price range)  
- Pagination (15 records per page)  
- Advanced sorting options  
- Interactive map synchronized with table records  
- CSV export functionality  
- Data quality indicators

**Filtering Capabilities:**

- **Town Filter:** Multi-select dropdown (all 29 towns)  
- **Flat Type Filter:** Multi-select (1 ROOM, 2 ROOM, 3 ROOM, 4 ROOM, 5 ROOM)  
- **Month Filter:** Multi-select with reverse chronological order (newest first)  
- **Price Range Slider:** Dynamic range ($200k-$1,200k+) with S$ formatting  
- **Floor Level Filter:** Low (01-03), Mid (04-06), High (07+)  
- **Lease Range Filter:** 50+, 60+, 70+, 80+, 90+ years

**Table Display:**

- Columns: Month, Town, Block, Flat Type, Floor Area (sqm), Resale Price, Price per sqm, Floor Level, Remaining Lease  
- Right-aligned price columns for better comparison  
- Currency formatting: "S$" prefix with comma separators (e.g., "S$650,000")  
- Date formatting: Readable format (Jan-2017, Feb-2017, etc.)  
- Monospace font for numerical values (consistent alignment)  
- Red column headers for visual hierarchy  
- 15 records per page with pagination controls

**Map Visualization:**

- Interactive map showing exact table records  
- Price-based color coding (green/yellow/red gradient)  
- Size scaling based on price  
- Synchronized with table: Shows current page records only  
- Hover information: Detailed property details  
- Dynamic updates with pagination, sorting, filtering  
- OpenStreetMap base with property markers

**Data Export:**

- Download filtered results as CSV  
- Maintains formatting (prices, dates, calculations)  
- Includes all columns visible in table  
- Export button at bottom of table

**Smart Features:**

- "Showing X of Y records" indicator  
- Clear filters button to reset all selections  
- Real-time record count updates  
- No results message if filters yield zero records

---

### Feature 3: Year-Based Filtering (MVP)

**Purpose:** Enable temporal analysis across entire dashboard

**Functional Requirements:**

1. Year selector appears in Overview section  
2. Selected year filters all dashboard sections  
3. Default to current year (2025)  
4. Support historical year analysis (2017 onwards)  
5. Maintain filter state across navigation  
6. Enable YoY comparisons

**Implementation:**

- Dropdown selector: 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025  
- Applied to all calculations, charts, and tables  
- Session state management for filter persistence  
- Dynamic chart updates based on year selection

---

### Feature 4: Interactive Maps (MVP)

**Purpose:** Geographic visualization with data synchronization

**Functional Requirements:**

1. Map in Data Explorer shows exact table records  
2. Price-based color coding (green=below avg, yellow=avg, red=above avg)  
3. Size scaling based on price (larger \= higher price)  
4. Click/hover to see property details  
5. Dynamic updates when table changes (pagination, filtering, sorting)  
6. Mobile-responsive map display

**Technical Details:**

- Map library: Folium or similar (Python-based mapping)  
- Base map: OpenStreetMap tiles  
- Color gradient: Price-based (3-5 color stops)  
- Marker sizing: Dynamic based on price relative to average  
- Synchronization: Always shows current page (15 records)  
- Interactivity: Hover tooltips, click for details

**Display Information:**

- Property block number  
- Resale price (formatted S$)  
- Room type  
- Floor area  
- Price per sqm  
- Date of transaction

---

### Feature 5: CSV Export Functionality (MVP)

**Purpose:** Enable data analysis and offline use

**Functional Requirements:**

1. Export filtered Data Explorer results  
2. Maintain formatting (prices, dates)  
3. Include all visible columns  
4. Preserve sorting and filtering  
5. Generate timestamped filename  
6. Handle large exports (212K+ records)

**Technical Details:**

- File format: CSV (comma-separated values)  
- Filename: `HDB_Resale_Data_[YYYY-MM-DD].csv`  
- Encoding: UTF-8  
- Include headers: Yes  
- Formatting: Maintain S$ and date formats where possible  
- Compression: Optional (for very large exports)

---

### Feature 6: Smart Data Refresh System (MVP)

**Purpose:** Balance performance with data freshness

**Functional Requirements:**

1. Detect new monthly data automatically  
2. Prevent unnecessary API calls  
3. Use metadata tracking (last updated date)  
4. Manual refresh option for users  
5. Refresh status indicators  
6. Version tracking

**Implementation:**

- Store metadata: `data_metadata.json` (last\_updated, record\_count, version)  
- Check on app launch: Compare stored date with current month  
- If new month: Fetch from API, update CSV cache  
- If same month: Load from cache (1.44x faster)  
- UI indicator: "Data last updated: \[DATE\]"  
- Refresh button: Force update if needed

---

## **Dashboard Sections**

### Section Overview Summary

| Section | Purpose | Key Metrics | Filtering |
| :---- | :---- | :---- | :---- |
| **Overview** | Market snapshot | Total records, price stats, floor area | Year |
| **Price Trends** | Historical trends | Monthly avg/median, YoY change | Year, flat type, period |
| **Geographic** | Location analysis | Town prices, transaction volume | Year, town |
| **Flat Analysis** | Unit characteristics | Price vs area, age impact | Year, flat type |
| **Market Insights** | Deep analysis | YoY changes, leaders, momentum | Year |
| **Data Explorer** | Detailed exploration | Individual transactions | All filters |

---

## **User Flows**

### Flow 1: First-Time Buyer Research (Using Dashboard)

1\. User lands on homepage

   ↓

2\. Sees 6 dashboard sections

   ↓

3\. Starts with Overview section

   \- Views market snapshot (total records, avg price, trends)

   \- Selects year (defaults to 2025\)

   ↓

4\. Explores Price Trends section

   \- Views 12-month price trend line chart

   \- Toggles between average and median price

   \- Compares different flat types (1-5 room)

   ↓

5\. Reviews Geographic Analysis section

   \- Identifies target neighborhoods

   \- Checks which towns have price appreciation

   \- Compares top towns by price

   ↓

6\. Analyzes Flat Analysis section

   \- Understands price per sqft benchmarks

   \- Checks floor level impact on price

   \- Views price vs. floor area correlations

   ↓

7\. Goes to Data Explorer section

   \- Filters by target town (e.g., Bukit Merah)

   \- Selects flat type: 3 ROOM

   \- Sets price range: $350k \- $450k

   \- Minimum lease: 60+ years

   ↓

8\. Reviews filtered results

   \- Views table: 15 records per page

   \- Sees map with synchronized pins

   \- Notes prices, floor areas, dates

   ↓

9\. Exports data as CSV

   \- Downloads filtered results

   \- Uses for further analysis

   ↓

10\. Makes decision with confidence (data-backed)

### Flow 2: Investor Identifying Market Opportunities

1\. User opens dashboard

   ↓

2\. Checks Market Insights section

   \- Reviews YoY changes across towns

   \- Identifies towns with highest appreciation

   \- Notes momentum indicators

   ↓

3\. Analyzes Price Trends section

   \- Compares 24-month trends for target towns

   \- Identifies emerging appreciation patterns

   \- Checks seasonal patterns

   ↓

4\. Explores Geographic Analysis

   \- Identifies undervalued towns

   \- Compares price positions relative to average

   ↓

5\. Deep-dives in Data Explorer

   \- Filters for emerging town with price growth potential

   \- Sets price range for undervalued properties

   \- Targets specific flat types for rental appeal (e.g., 3-room)

   ↓

6\. Reviews map and table synchronization

   \- Visualizes exact property locations

   \- Confirms geographic distribution

   ↓

7\. Exports data

   \- Downloads all matching properties

   \- Performs investment analysis (ROI, rental yield)

   ↓

8\. Identifies investment opportunity (data-driven)

### Flow 3: Town Comparison for Relocation

1\. User opens Geographic Analysis

   ↓

2\. Reviews town-wise price rankings

   \- Identifies candidate towns

   \- Notes transaction volumes (popularity)

   ↓

3\. Checks Price Trends for each town

   \- Compares growth trajectories

   \- Identifies town momentum

   ↓

4\. Analyzes Market Insights

   \- Views YoY changes per town

   \- Checks recent trend analysis

   ↓

5\. Compares multiple towns in Data Explorer

   \- Filters by Town 1, downloads

   \- Filters by Town 2, downloads

   \- Compares side-by-side in spreadsheet

   ↓

6\. Explores Flat Analysis

   \- Checks age/price impact in selected towns

   \- Reviews floor level premiums

   ↓

7\. Makes relocation decision with full context

---

## **Technical Architecture**

### System Overview

┌─────────────────────────────────────────────────────┐

│         Browser (Streamlit Web Interface)           │

│ \- Dashboard sections (6 areas)                      │

│ \- Interactive charts (Plotly)                       │

│ \- Maps (Folium)                                     │

│ \- Filters and controls                             │

│ \- Data export buttons                              │

└────────────────┬────────────────────────────────────┘

                 │ 

                 ↓

┌─────────────────────────────────────────────────────┐

│         Streamlit Application Core                  │

│ \- streamlit\_app.py (1400+ lines)                   │

│ \- Session state management                         │

│ \- Data caching and filtering logic                 │

│ \- Chart/map generation                             │

└────────────────┬────────────────────────────────────┘

      ↗──────────┼──────────┐

      │          │          │

      ↓          ↓          ↓

   Local      Local       External

   CSV       Metadata       API

  Cache       JSON      (data.gov.sg)

(1.44x)     (tracking)   (212K+ records)

faster

CSV: resale\_flat\_data.csv (auto-generated)

Metadata: data\_metadata.json (version tracking)

### Frontend Stack (Streamlit)

- **Framework:** Streamlit 1.25+  
- **Visualization:** Plotly 5.0+ (interactive charts)  
- **Mapping:** Folium (geographic visualization)  
- **Data Processing:** Pandas 1.5+, NumPy 1.24+  
- **Data Source:** data.gov.sg API  
- **Caching:** Local CSV storage

### Backend Stack

- **Runtime:** Python 3.9+  
- **Data Fetcher:** Custom `data_fetcher.py` module  
- **API Integration:** Requests library  
- **Caching Strategy:** Local CSV files \+ metadata JSON  
- **Task Scheduler:** Streamlit rerun \+ state management  
- **Data Pipeline:** Month-based detection system

### Infrastructure

- **Hosting:** Streamlit Cloud (or self-hosted server)  
- **Storage:** Local filesystem (CSV \+ JSON)  
- **Data Source:** data.gov.sg API (free, public)  
- **Performance:** Smart caching (1.44x faster than API)  
- **Scalability:** In-memory data processing with Pandas

### Project Structure

├── streamlit\_app.py         \# Main dashboard (1400+ lines)

│   ├── Overview section

│   ├── Price Trends section

│   ├── Geographic Analysis

│   ├── Flat Analysis

│   ├── Market Insights

│   └── Data Explorer

├── data\_fetcher.py          \# API integration and caching

│   ├── fetch\_data() \- API calls

│   ├── load\_cache() \- CSV loading

│   └── should\_refresh() \- Smart refresh logic

├── run\_dashboard.sh         \# Startup script

├── requirements.txt         \# Dependencies

├── resale\_flat\_data.csv     \# Cached dataset (auto-generated)

└── data\_metadata.json      \# Metadata (auto-generated)

---

## **API Specifications**

### 1\. Data.gov.sg HDB Resale API

**Endpoint:** `https://data.gov.sg/api/action/datastore_search`

**Query Parameters:**

resource\_id: "d\_8b84c4ee58e3cfc0ece0d773c8ca6abc"

limit: 32000 (max per request)

offset: 0 (for pagination)

sort: "month desc" (optional)

**Response:**

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

    "limit": 32000

  }

}

---

### 2\. Internal Data Processing APIs

#### 2.1 Fetch Data Function

**Purpose:** Unified data retrieval with caching logic

**Parameters:**

def fetch\_resale\_data(

    cache\_dir: str \= ".",

    force\_refresh: bool \= False

) \-\> pd.DataFrame:

    """

    Fetch HDB resale data with smart caching

    

    Args:

        cache\_dir: Directory for CSV cache

        force\_refresh: Force API call (bypass cache)

        

    Returns:

        DataFrame: 212K+ resale transactions

    """

---

#### 2.2 Smart Refresh Logic

**Purpose:** Determine if data needs updating

**Logic:**

def should\_refresh(metadata\_file: str) \-\> bool:

    """

    Check if new monthly data available

    

    Returns True if:

    \- No metadata file exists

    \- Current month \> last\_updated month

    \- User requests force refresh

    """

---

## **Data Models**

### 1\. HDB Transaction Record

{

  month: String (YYYY-MM format)

  town: String (29 possible towns)

  flat\_type: Enum (1 ROOM, 2 ROOM, 3 ROOM, 4 ROOM, 5 ROOM)

  block: String

  street\_name: String

  storey\_range: String (e.g., "04 TO 06")

  floor\_area\_sqm: Float

  flat\_model: String

  lease\_commence\_date: Date

  remaining\_lease: String

  resale\_price: Integer (SGD)

  

  Derived Fields (calculated):

  \- price\_per\_sqm: resale\_price / floor\_area\_sqm

  \- age\_years: (current\_year \- lease\_commence\_date.year)

  \- year: extracted from month

  \- flat\_level: derived from storey\_range

}

### 2\. Aggregated Statistics (Cached)

{

  period: String (YYYY-MM or YYYY)

  town: String (optional \- null for overall)

  flat\_type: String (optional \- null for all types)

  

  metrics: {

    count: Integer (transaction count)

    avg\_price: Float

    median\_price: Float

    min\_price: Integer

    max\_price: Integer

    std\_dev: Float

    avg\_floor\_area: Float

    avg\_price\_per\_sqm: Float

  }

}

### 3\. Metadata Tracking

{

  last\_updated: String (YYYY-MM-DD HH:MM:SS)

  last\_updated\_month: String (YYYY-MM)

  total\_records: Integer

  version: String

  data\_source: String (data.gov.sg)

  api\_endpoint: String

}

---

## **UI/UX Requirements**

### 1\. Overall Dashboard Layout

- **Header:** "Singapore HDB Resale Flat Price Analysis Dashboard"  
- **Subtitle:** "Comprehensive market insights powered by data.gov.sg"  
- **Last Updated:** Display "Data last updated: \[DATE\]" with refresh option  
- **Sidebar:** Navigation to 6 sections (collapsible on mobile)  
- **Main Content:** Full-width responsive layout  
- **Footer:** Data attribution, contact, links

### 2\. Overview Section

- **Layout:** Cards \+ summary charts  
- **Components:**  
  - Dataset metrics card (total records, date range)  
  - Price statistics card (avg, median, range)  
  - Floor area statistics card  
  - Year selector dropdown  
  - Key indicators row

### 3\. Price Trends Section

- **Layout:** Chart \+ controls  
- **Components:**  
  - Multi-line trend chart (Plotly)  
  - Avg vs. Median toggle  
  - Flat type multi-select filter  
  - Time period selector (3/6/12/24 months)  
  - YoY comparison indicator  
  - Trend direction badge (↑ up, → stable, ↓ down)

### 4\. Geographic Analysis Section

- **Layout:** Charts \+ maps  
- **Components:**  
  - Town-wise bar chart (top 10\)  
  - Geographic heatmap (if applicable)  
  - Transaction volume chart  
  - Top/bottom performers cards  
  - Town ranking table

### 5\. Flat Analysis Section

- **Layout:** Scatter plots \+ correlation charts  
- **Components:**  
  - Price vs. floor area scatter plot (with trend line)  
  - Age vs. price analysis chart  
  - Floor level impact chart  
  - Price distribution box plots  
  - Correlation indicators

### 6\. Market Insights Section

- **Layout:** Rankings \+ indicators  
- **Components:**  
  - YoY change table (towns ranked)  
  - Market leaders leaderboard  
  - Momentum indicators (color-coded)  
  - Seasonal pattern chart  
  - Recent trend analysis

### 7\. Data Explorer Section

- **Layout:** Filters (top) \+ Table (middle) \+ Map (bottom)  
- **Components:**  
  - Filter panel (town, flat type, month, price range, floor level, lease)  
  - "Showing X of Y records" indicator  
  - Results table (15 records per page)  
  - Pagination controls  
  - Sort controls (click headers)  
  - Interactive map (synchronized with table)  
  - Export CSV button  
  - Clear filters button

### 8\. Table Display

- **Columns:** Month, Town, Block, Flat Type, Floor Area (sqm), Resale Price, Price/sqm, Floor Level, Remaining Lease  
- **Right Alignment:** Price columns (for numerical comparison)  
- **Currency Formatting:** "S$" prefix \+ comma separators (e.g., "S$650,000")  
- **Date Formatting:** Readable (Jan-2017, Feb-2017, etc.)  
- **Monospace Font:** Numerical values for consistent alignment  
- **Headers:** Bold, red text for visual hierarchy  
- **Row Highlighting:** Subtle on hover  
- **Pagination:** 15 records per page  
- **Responsive:** Stack on mobile, maintain layout on desktop

### 9\. Map Display

- **Base Map:** OpenStreetMap tiles  
- **Markers:** Colored by price (green=low, yellow=avg, red=high)  
- **Size:** Scaled by price (larger \= more expensive)  
- **Interactivity:** Hover for details, click for full info  
- **Synchronization:** Updates when table changes  
- **Controls:** Zoom in/out, reset view  
- **Mobile:** Responsive sizing, touch-friendly controls

### 10\. Chart Style & Colors

- **Color Scheme:**  
  - Primary: Teal/Blue (uptrends, positive indicators)  
  - Secondary: Gray (stable, neutral)  
  - Alert: Red/Orange (downtrends, high prices)  
  - Success: Green (positive changes, low prices)  
- **Chart Types:**  
  - Line charts: Smooth curves with markers  
  - Bar charts: Grouped or stacked as needed  
  - Scatter plots: With trend lines  
  - Box plots: For distribution analysis  
  - Heatmaps: For geographic visualization  
- **Accessibility:** WCAG AA compliant, colorblind-friendly palette

### 11\. Filtering UX

- **Real-time Updates:** Charts/tables update as filters change  
- **Visual Feedback:** "Showing X of Y records" text  
- **Filter Persistence:** Remember selected filters (session-based)  
- **Clear Option:** "Clear All Filters" button resets to defaults  
- **Default State:** Show all data (no pre-applied filters except year)  
- **Mobile Friendly:** Collapsible filter panel on small screens

### 12\. Loading & Error States

- **Loading:** Spinner \+ "Loading data..." message  
- **No Results:** "No data found. Try adjusting filters."  
- **API Error:** "Unable to fetch data. Please try again later."  
- **Offline:** "No internet connection. Using cached data."  
- **Data Refresh:** "Checking for new data..." notification

### 13\. Typography

- **Header (H1):** 32px, bold, teal  
- **Section Headers (H2):** 24px, semi-bold, dark gray  
- **Subsection Headers (H3):** 18px, medium, gray  
- **Body Text:** 14px, regular, dark gray  
- **Labels:** 12px, medium, gray  
- **Table Headers:** 12px, bold, red (emphasized)  
- **Font:** System fonts (Inter, Segoe UI, Roboto as fallback)

---

## **Performance Requirements**

### Load Time Targets

- **Page Load:** \< 3 seconds (cold)  
- **Data Load:** \< 2 seconds (from cache) or \< 5 seconds (from API)  
- **Chart Render:** \< 1 second (12-month data)  
- **Map Render:** \< 2 seconds (15 records)  
- **Filter Update:** \< 500ms (real-time)

### Performance Gains

- **CSV Cache Performance:** 1.44x faster than API calls  
- **Monthly Data Sync:** Prevents unnecessary API requests  
- **Pagination:** Only loads 15 records per page  
- **Lazy Loading:** Charts/maps load on section scroll

### Optimization Strategies

- **Smart Caching:** CSV storage with month-based refresh logic  
- **Pagination:** 15 records per page (lazy load)  
- **Data Sampling:** For large visualizations (if needed)  
- **Lazy Loading:** Sections load on scroll/click  
- **Session State:** Persist filters and selections  
- **Efficient Queries:** Pandas operations optimized

---

## **Security Requirements**

### Data Protection

- **HTTPS:** All traffic encrypted  
- **HSTS:** HTTP Strict Transport Security enabled  
- **No PII:** Only public HDB resale data  
- **Data Source:** Official government API (trusted source)

### API Security

- **Rate Limiting:** Respect data.gov.sg API limits  
- **User-Agent:** Identify application in API calls  
- **Error Handling:** Graceful API failure management  
- **Caching:** Reduce API dependency

### Compliance

- **Data Privacy:** Singapore PDPA compliant  
- **Attribution:** Clear credit to data.gov.sg  
- **Terms of Use:** Comply with HDB data usage terms  
- **Accessibility:** WCAG 2.1 AA compliant

### Monitoring

- **Error Tracking:** Log API failures and exceptions  
- **Performance Monitoring:** Track load times  
- **Data Quality:** Validate API responses  
- **User Analytics:** Track feature usage (privacy-first)

---

## **MVP Scope**

### MVP Features (Months 1-4)

✅ Real-time data from data.gov.sg API  
✅ Smart CSV caching (1.44x performance gain)  
✅ 6 comprehensive dashboard sections:

- Overview (market snapshot)  
- Price Trends (historical trends)  
- Geographic Analysis (town-wise analysis)  
- Flat Analysis (unit characteristics)  
- Market Insights (trend identification)  
- Data Explorer (detailed exploration) ✅ Year-based filtering across all sections  
  ✅ Interactive charts (Plotly)  
  ✅ Interactive maps (Folium) with data synchronization  
  ✅ Multi-level filtering (town, flat type, month, price range, floor level, lease)  
  ✅ Data pagination (15 records per page)  
  ✅ Sortable table columns  
  ✅ CSV export functionality  
  ✅ Responsive design (mobile \+ desktop)  
  ✅ Smart data refresh system (month-based detection)  
  ✅ Error handling \+ loading states  
  ✅ Professional UI with currency formatting  
  ✅ Red column headers \+ right-aligned prices

### MVP Non-Features (Out of Scope)

❌ User accounts / authentication  
❌ Saved searches / favorites  
❌ Real-time transport data (MRT/bus)  
❌ Rental yield calculator (detailed version)  
❌ Price prediction / ML model  
❌ Community reviews / ratings  
❌ Agent marketplace / listings  
❌ Mobile app (responsive web only)  
❌ Internationalization (non-English)

---

## **Post-MVP Features**

### Phase 2 (Months 5-6, Post-MVP)

**P2.1: User Accounts & Saved Searches**

- Email/password signup (Firebase)  
- Save favorite analyses  
- Save filter configurations  
- Search history tracking  
- Personal watchlist for towns/blocks

**P2.2: Advanced Analytics**

- Rental yield calculator (investment analysis)  
- Property tax estimation  
- Mortgage calculator integration  
- ROI analysis for investors  
- Portfolio tracking (saved properties)

**P2.3: Comparison Features**

- Town vs. town comparison (side-by-side)  
- Historical comparison (year-over-year deep-dive)  
- Unit comparison (similar flats, different locations)  
- Export comparison reports

**P2.4: Amenity Integration**

- Nearby schools (\< 1km)  
- MRT/bus stop proximity  
- Healthcare facilities nearby  
- Shopping centers and markets  
- Parks and recreational areas

**P2.5: Data Export & Reporting**

- Generate PDF reports  
- Scheduled weekly digests  
- Market trend newsletters  
- Custom report builder  
- Data analysis templates

**P2.6: Marketing & Growth**

- Blog: Weekly price insights by area  
- Email newsletter: Market trends  
- SEO: Target long-tail keywords  
- Social media: Share price trends  
- Interactive charts for sharing

### Phase 3 (Months 7+, Future)

- **AI/ML:** Price prediction model (experimental)  
- **Mobile App:** iOS/Android native app  
- **Monetization:** Freemium tier, B2B licensing  
- **Community:** Discussion forum for buyers  
- **API:** Public API for developers  
- **Webhooks:** Price alerts via email/SMS

---

## **Success Metrics**

### User Metrics

| Metric | Target (6 months) | Target (12 months) |
| :---- | :---- | :---- |
| **Monthly Active Users** | 1,000-5,000 | 10,000-50,000 |
| **Daily Active Users** | 100-500 | 1,000-5,000 |
| **Avg Session Duration** | 5-10 min | 8-15 min |
| **Bounce Rate** | \< 40% | \< 30% |
| **Return Rate (7-day)** | \> 30% | \> 40% |

### Feature Usage Metrics

| Feature | Target Usage |
| :---- | :---- |
| **Overview Section** | \> 80% (entry point) |
| **Price Trends** | \> 70% (core feature) |
| **Geographic Analysis** | \> 60% |
| **Flat Analysis** | \> 50% |
| **Market Insights** | \> 45% |
| **Data Explorer** | \> 65% (detailed analysis) |
| **Map Usage** | \> 40% |
| **CSV Export** | \> 25% |
| **Year Filtering** | \> 60% |

### Technical Metrics

| Metric | Target | Notes |
| :---- | :---- | :---- |
| **Page Load Time** | \< 3s | Cold load |
| **Cache Load Time** | \< 2s | With smart caching |
| **Data Freshness** | ≤ 30 days | Monthly HDB updates |
| **Uptime** | \> 99% | Monthly availability |
| **Error Rate** | \< 0.5% | Graceful failures |

### Business Metrics

| Metric | Target | Notes |
| :---- | :---- | :---- |
| **Cost per Month** | \< $200 | Infrastructure \+ hosting |
| **User Acquisition Cost** | $0 | Organic only |
| **Data Quality Score** | \> 4.5/5 | User satisfaction |
| **Feature Completeness** | 100% | All MVP features shipped |

---

## **Development Timeline**

### Month 1-2: Foundation & Data Architecture

**Week 1-2: Setup & Data Integration**

- [ ] Streamlit project structure setup  
- [ ] Git repository and CI/CD configuration  
- [ ] Virtual environment and dependencies  
- [ ] Data.gov.sg API integration  
- [ ] CSV caching implementation  
- [ ] Metadata tracking system  
- [ ] Month-based refresh logic

**Week 3-4: Data Pipeline**

- [ ] Fetch data from API (212K+ records)  
- [ ] Validate data quality  
- [ ] Store in CSV cache  
- [ ] Create metadata JSON  
- [ ] Test caching performance (1.44x gain)  
- [ ] Error handling for API failures  
- [ ] Offline mode (use cached data)

**Week 5-6: Overview Section**

- [ ] Dashboard header and layout  
- [ ] Overview section UI  
- [ ] Statistics cards (total records, price stats)  
- [ ] Year selector dropdown  
- [ ] Year-based filtering system  
- [ ] Session state management  
- [ ] Mobile responsiveness

**Week 7-8: Core Foundation**

- [ ] Data loading and caching integration  
- [ ] Performance testing (\< 3 sec load)  
- [ ] Error states and loading indicators  
- [ ] Local testing with full dataset  
- [ ] Initial user feedback (alpha testing)

---

### Month 3-4: Dashboard Sections

**Week 9-10: Price Trends & Charts**

- [ ] Price Trends section UI  
- [ ] Monthly trend line chart (Plotly)  
- [ ] Flat type comparison logic  
- [ ] Avg vs. median toggle  
- [ ] Interactive tooltips and zoom  
- [ ] Time period selector (3/6/12/24 months)  
- [ ] YoY comparison calculation

**Week 11-12: Geographic Analysis**

- [ ] Geographic Analysis section  
- [ ] Town-wise price analysis  
- [ ] Bar charts (sorted by price/transactions)  
- [ ] Top performers leaderboard  
- [ ] Transaction volume mapping  
- [ ] Geographic heatmap (if time permits)

**Week 13-14: Flat & Market Analysis**

- [ ] Flat Analysis section  
- [ ] Price vs. floor area scatter plot  
- [ ] Age vs. price analysis  
- [ ] Floor level impact analysis  
- [ ] Market Insights section  
- [ ] YoY changes calculation  
- [ ] Market momentum indicators

**Week 15-16: Data Explorer**

- [ ] Data Explorer section UI  
- [ ] Multi-level filtering (town, flat type, month, price, floor, lease)  
- [ ] Results table (15 records/page, sortable)  
- [ ] Pagination controls  
- [ ] Interactive map (Folium)  
- [ ] Map-table synchronization  
- [ ] CSV export functionality  
- [ ] "Showing X of Y records" indicator

---

### Month 5-6: Polish, Testing & Launch

**Week 17-18: UI/UX Polish**

- [ ] Currency formatting (S$ \+ commas)  
- [ ] Date formatting (readable format)  
- [ ] Right-aligned price columns  
- [ ] Red bold column headers  
- [ ] Monospace fonts for numbers  
- [ ] Color scheme refinement  
- [ ] Dark/light theme support  
- [ ] Mobile optimization

**Week 19-20: Testing & Optimization**

- [ ] Performance testing (\< 3s load time)  
- [ ] Browser compatibility (Chrome, Safari, Firefox)  
- [ ] Accessibility audit (WCAG AA)  
- [ ] Load testing (1000+ concurrent users)  
- [ ] Data validation (212K+ records)  
- [ ] Edge cases and error handling  
- [ ] Caching performance verification  
- [ ] User acceptance testing (UAT)

**Week 21-22: Deployment & Launch**

- [ ] Deploy to Streamlit Cloud  
- [ ] Production environment setup  
- [ ] Monitoring and logging  
- [ ] Backup and recovery procedures  
- [ ] Documentation (README, user guide)  
- [ ] SEO setup (meta tags, sitemap)  
- [ ] Analytics configuration (privacy-first)  
- [ ] Public launch announcement

**Week 23-24: Post-Launch & Growth**

- [ ] Monitor uptime and errors  
- [ ] User feedback collection  
- [ ] Bug fixes and hotfixes  
- [ ] Performance optimization  
- [ ] Content marketing (blog posts)  
- [ ] Social media promotion  
- [ ] Community engagement  
- [ ] Plan Phase 2 roadmap

---

### Milestone Summary

| Milestone | Target Date | Deliverable |
| :---- | :---- | :---- |
| **M1: Data Integration** | Week 4 | API integration, caching, refresh logic |
| **M2: Overview & Trends** | Week 10 | 2 sections, price trends, year filtering |
| **M3: All Sections** | Week 16 | 6 complete sections, maps, export |
| **M4: Polish & Testing** | Week 20 | Performance, accessibility, UI/UX |
| **M5: Public Launch** | Week 22 | Live dashboard, marketing push |
| **M6: Growth & Optimization** | Week 24 | 1k MAU, optimization, Phase 2 planning |

---

## **Appendix**

### A. Glossary

| Term | Definition |
| :---- | :---- |
| **HDB** | Housing and Development Board (Singapore's public housing authority) |
| **Resale** | Second-hand flat sale (not new launch) |
| **Lease Remaining** | Years left on 99-year HDB lease |
| **Storey Range** | Floor level (e.g., "04 TO 06" \= 4th-6th floor) |
| **Floor Area** | Unit size in square meters (sqm) |
| **Price/sqm** | Resale price divided by floor area |
| **MRT** | Mass Rapid Transit (metro/subway) |
| **MVP** | Minimum Viable Product (core features only) |
| **API** | Application Programming Interface |
| **CSV** | Comma-Separated Values (data export format) |
| **YoY** | Year-over-Year (annual comparison) |
| **Streamlit** | Python library for building data applications |
| **Caching** | Storing data locally for faster retrieval |

---

### B. Data Sources

1. **HDB Resale Prices:** data.gov.sg  
     
   - Dataset: Resale flat prices based on registration date from Jan-2017 onwards  
   - Dataset ID: d\_8b84c4ee58e3cfc0ece0d773c8ca6abc  
   - Updated: Monthly (around 28th)  
   - Records: 212,000+ transactions (2017-2025)  
   - Latency: 1-2 months behind (batch processing)  
   - Cost: FREE (open data)

   

2. **Geographic Data:** OneMap API (for Phase 2\)  
     
   - Coverage: All Singapore addresses  
   - Accuracy: ±5-10 meters  
   - Cost: FREE

   

3. **Schools Data:** data.gov.sg (for Phase 2\)  
     
   - Coverage: All primary, secondary, pre-university schools  
   - Cost: FREE

   

4. **Transport Data:** LTA DataMall (for Phase 2\)  
     
   - Coverage: All MRT/bus stops  
   - Cost: FREE

---

### C. Assumptions

1. **User Tech Comfort:** Users comfortable with dashboards and charts  
2. **Data Accuracy:** HDB, MOE, LTA data accurate and official  
3. **Market Size:** Demand for 1k-5k users by Month 6  
4. **Infrastructure:** Streamlit Cloud available and scalable  
5. **API Stability:** data.gov.sg API remains stable  
6. **Internet:** Users have reliable internet connection  
7. **Browsers:** Modern browsers (Chrome, Firefox, Safari)  
8. **Device:** Primarily desktop/tablet, mobile secondary  
9. **Monetization:** No revenue required for MVP  
10. **Data Freshness:** Users accept 1-2 month data lag

---

### D. Risk Mitigation

| Risk | Probability | Impact | Mitigation |
| :---- | :---- | :---- | :---- |
| **API Rate Limits** | Medium | Medium | CSV caching (1.44x faster), batch processing |
| **Data Quality Issues** | Low | Medium | Validation, error handling, fallback |
| **Performance Degradation** | Medium | High | Pagination, lazy loading, optimization |
| **Scope Creep** | High | High | Strict MVP list, Phase 2 planning |
| **Low User Adoption** | Low-Medium | High | Validate early, organic marketing |
| **Streamlit Limitations** | Low | Medium | Plan migration to React/FastAPI if needed |
| **Data Privacy Concerns** | Low | High | Compliance documentation, privacy policy |
| **Accessibility Issues** | Medium | Medium | WCAG AA audit, remediation |

---

### E. Technology Stack Reference

**Frontend:**

- Streamlit 1.25+ (web framework)  
- Plotly 5.0+ (interactive charts)  
- Folium (geographic visualization)  
- Pandas (data manipulation)

**Backend:**

- Python 3.9+ (runtime)  
- Requests library (HTTP client)  
- Local filesystem (storage)

**Data Source:**

- data.gov.sg API (212K+ records)  
- Local CSV cache (performance)  
- Metadata JSON (tracking)

**Deployment:**

- Streamlit Cloud (primary)  
- Docker (containerization)  
- Git (version control)

---

### F. File Structure Reference

project/

├── streamlit\_app.py              \# Main dashboard (1400+ lines)

│   ├── Imports and configuration

│   ├── create\_overview\_section()

│   ├── create\_price\_trends\_section()

│   ├── create\_geographic\_analysis()

│   ├── create\_flat\_analysis()

│   ├── create\_market\_insights()

│   └── create\_data\_explorer()

├── data\_fetcher.py               \# Data management

│   ├── fetch\_resale\_data()

│   ├── load\_cache()

│   ├── save\_cache()

│   └── should\_refresh()

├── run\_dashboard.sh              \# Startup script

├── requirements.txt              \# Dependencies

├── .gitignore

├── README.md                     \# Documentation

├── resale\_flat\_data.csv          \# Cache (auto-generated)

├── data\_metadata.json            \# Metadata (auto-generated)

└── LICENSE

\#\#\# Dependencies

\- streamlit\>=1.25

\- pandas\>=1.5

\- numpy\>=1.24

\- plotly\>=5.0

\- requests\>=2.28

\- folium\>=0.13.0

---

### G. Key Features Comparison Table

| Feature | MVP | Phase 2 | Phase 3 |
| :---- | :---- | :---- | :---- |
| Real-time data | ✅ | ✅ | ✅ |
| Smart caching | ✅ | ✅ | ✅ |
| 6 Dashboard sections | ✅ | ✅ | ✅ |
| Year filtering | ✅ | ✅ | ✅ |
| Interactive charts | ✅ | ✅ | ✅ |
| Interactive maps | ✅ | ✅ (enhanced) | ✅ |
| CSV export | ✅ | ✅ | ✅ |
| Multi-level filtering | ✅ | ✅ | ✅ |
| User accounts | ❌ | ✅ | ✅ |
| Saved searches | ❌ | ✅ | ✅ |
| Rental calculator | ❌ | ✅ | ✅ |
| Amenity integration | ❌ | ✅ | ✅ |
| PDF reports | ❌ | ✅ | ✅ |
| Price alerts | ❌ | ❌ | ✅ |
| Mobile app | ❌ | ❌ | ✅ |
| AI predictions | ❌ | ❌ | ✅ |

---

## **Version Control**

| Version | Date | Author | Changes |
| :---- | :---- | :---- | :---- |
| 1.0 | 2025-11-29 | Product Team | Initial draft |
| 2.0 | 2025-11-30 | Product Team | Enhanced with README features (6 sections, maps, export, smart caching) |

---

**End of Document**

---

**Document Status:** ✅ APPROVED FOR DEVELOPMENT

**Enhancement Summary:**

- Added 5 new dashboard sections (Price Trends, Geographic Analysis, Flat Analysis, Market Insights, Data Explorer)  
- Integrated smart caching system (1.44x performance improvement)  
- Added interactive map visualization with data synchronization  
- Added CSV export functionality  
- Added year-based filtering across entire dashboard  
- Added 212,000+ historical transaction data coverage  
- Enhanced UI/UX with professional formatting and accessibility  
- Detailed technical implementation for all 6 sections

**Next Action:** Engineering team to begin Month 1 setup phase

**Questions?** Refer to this document or contact the product manager.  
