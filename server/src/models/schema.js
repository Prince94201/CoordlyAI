/**
 * Database schema for Business Intelligence AI Data Agent
 * Creates all tables with intentional issues to challenge the AI agent
 */

const createTables = `
-- Sales Data Table
CREATE TABLE IF NOT EXISTS sales_data (
    tr_id TEXT PRIMARY KEY,
    dt TEXT,  -- Inconsistent date format (sometimes YYYY-MM-DD, sometimes MM/DD/YYYY)
    cid TEXT,
    pid TEXT,
    qty INTEGER,
    amt REAL,
    str_id TEXT,
    pymt TEXT, -- Sometimes abbreviated (CC, CASH), sometimes full (Credit Card, Cash)
    dscnt TEXT -- Sometimes percentage (15%), sometimes amount (15.00)
);

-- Products Table
CREATE TABLE IF NOT EXISTS products (
    pid TEXT PRIMARY KEY,
    name TEXT,
    cat TEXT, -- Sometimes abbreviated categories
    sub_cat TEXT,
    p REAL, -- Unclear column name for price
    cost REAL,
    supplier TEXT,
    x1 TEXT -- Poorly named column for inventory status
);

-- Stores Table
CREATE TABLE IF NOT EXISTS stores (
    str_id TEXT PRIMARY KEY,
    loc TEXT, -- Inconsistent formatting (sometimes "City, State", sometimes just "City")
    sz REAL, -- No units specified (sq ft)
    mgr TEXT, -- Sometimes initials, sometimes full name
    opened TEXT, -- Inconsistent date format
    region TEXT
);

-- Customers Table
CREATE TABLE IF NOT EXISTS customers (
    cid TEXT PRIMARY KEY,
    name TEXT, -- Sometimes full name, sometimes just last name
    since TEXT, -- Join date
    seg TEXT, -- Customer segment with cryptic codes (A1, B2, etc.)
    val REAL, -- Customer lifetime value
    churn_risk REAL -- No scale indication (0-1)
);

-- Customer Interactions Table
CREATE TABLE IF NOT EXISTS customer_interactions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    cid TEXT,
    type TEXT, -- Interaction type with abbreviations (PH, EM, etc.)
    ts TEXT, -- Timestamp in inconsistent format
    dur REAL, -- Duration with no units (minutes)
    notes TEXT, -- Unstructured text
    agent TEXT,
    rating INTEGER, -- Sometimes 1-5, sometimes 1-10
    FOREIGN KEY (cid) REFERENCES customers(cid)
);

-- Marketing Campaigns Table
CREATE TABLE IF NOT EXISTS campaigns (
    camp_id TEXT PRIMARY KEY,
    name TEXT,
    st_dt TEXT, -- Start date abbreviated
    end_dt TEXT, -- End date abbreviated
    bgt REAL, -- Budget with no currency indicator
    channel TEXT,
    target_seg TEXT, -- Target segment
    KPI TEXT -- Target KPI abbreviation
);

-- Campaign Results Table
CREATE TABLE IF NOT EXISTS campaign_results (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    camp_id TEXT,
    metric TEXT, -- Various metrics with inconsistent naming
    val REAL, -- Value
    dt TEXT, -- Date
    FOREIGN KEY (camp_id) REFERENCES campaigns(camp_id)
);

-- Financial Data Table
CREATE TABLE IF NOT EXISTS financial_data (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    period TEXT, -- Sometimes months (Jan 2023), sometimes quarters (Q1 2023)
    department TEXT,
    type TEXT, -- Expense type with inconsistent naming
    actual REAL,
    budget REAL,
    variance REAL,
    notes TEXT
);

-- Operational Expenses Table
CREATE TABLE IF NOT EXISTS operational_expenses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    dt TEXT,
    cat TEXT, -- Category with cryptic abbreviations
    amount REAL,
    dept_code TEXT, -- Department code
    approved_by TEXT,
    status TEXT
);

-- Employees Table
CREATE TABLE IF NOT EXISTS employees (
    emp_id TEXT PRIMARY KEY,
    name TEXT,
    dept TEXT,
    role TEXT,
    joined TEXT,
    salary_band TEXT, -- Cryptic codes (L1, L2, etc.)
    manager TEXT,
    status TEXT
);

-- Performance Table
CREATE TABLE IF NOT EXISTS performance (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    emp_id TEXT,
    period TEXT,
    rating INTEGER,
    comments TEXT,
    goals_met REAL, -- Percentage
    a1 REAL, -- Attendance - poorly named
    p1 REAL, -- Productivity - poorly named
    FOREIGN KEY (emp_id) REFERENCES employees(emp_id)
);

-- Users Table
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
);

-- Chat History Table
CREATE TABLE IF NOT EXISTS chat_history (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    question TEXT,
    response TEXT,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);
`;

module.exports = {
    createTables
};