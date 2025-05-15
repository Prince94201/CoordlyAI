# Business Intelligence AI Data Agent

A modern, full-stack web application that lets users interact with business data using natural language. The system converts user questions into SQL, executes them, and returns insights, visualizations, and summaries. Users can sign up, log in, chat with the AI, view query history, and explore their business data visually.

## Features

- User authentication (signup, login, JWT-based session)
- Conversational chat interface for business questions
- AI-generated SQL, insights, and visualizations (bar, line, pie, table)
- Natural language summary of each query result
- User chat history page
- Responsive, clean, and professional UI/UX (with dark mode)
- Error handling and loading states

## Tech Stack

- **Frontend:** React, TypeScript, Vite, Tailwind CSS
- **Backend:** Node.js, Express, SQLite
- **AI/NLP:** Gemini/OpenAI (for natural language to SQL and summaries)
- **Authentication:** JWT
- **Visualization:** (Pluggable, e.g., Chart.js or Recharts)

## Project Structure

- `client/` — Frontend React app
- `server/` — Backend API (Express, SQLite, AI integration)
- `database.db` — SQLite database with sample business data

## Setup Instructions

### Prerequisites

- Node.js (v18+ recommended)
- npm or bun

### 1. Clone the repository

```sh
git clone <your-repo-url>
cd CoordlyAI
```

### 2. Install dependencies

#### Backend

```sh
cd server
npm install
```

#### Frontend

```sh
cd ../client
npm install
```

### 3. Environment Variables

Create a `.env` file in `server/` with:

```
PORT=3000
JWT_SECRET=your_jwt_secret
# Add Gemini/OpenAI API keys as needed
```

### 4. Run the backend

```sh
cd server
npm start
```

The backend will initialize the database and start on `http://localhost:3000`.

### 5. Run the frontend

```sh
cd ../client
npm run dev
```

The frontend will start on `http://localhost:5173` (or as shown in the terminal).

## Usage

1. Open the frontend in your browser.
2. Sign up and log in.
3. Ask business questions in the chat (e.g., “Show me the top 5 products by sales in 2024”).
4. View AI-generated SQL, insights, summaries, and visualizations.
5. Explore your chat history and database schema in the Settings page.

## API Documentation

See [`server/API_DOC.md`](server/API_DOC.md) for full API details, including endpoints for authentication, querying, schema, and history.

## Customization

- To add more data, modify the sample data generator in `server/src/models/sampleData.js`.
- To change the UI, edit components in `client/src/components/`.

## License

MIT

