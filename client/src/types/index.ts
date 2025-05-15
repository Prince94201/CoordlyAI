
// Auth types
export interface User {
  username: string;
  token?: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface SignupRequest {
  username: string;
  password: string;
}

export interface AuthResponse {
  token?: string;
  message?: string;
  error?: string;
}

// Query types
export interface QueryRequest {
  question: string;
}

export interface Visualization {
  type: "bar" | "line" | "pie" | "table";
  x?: string;
  y?: string;
  data?: any[];
}

export interface QueryResponse {
  data: any[];
  insights: string[];
  visualization: Visualization;
  nlp_text: string;
  additional_questions?: string[];
  sql?: string;
}

export interface ChatMessage {
  id?: number;
  role: "user" | "assistant";
  content: string;
  timestamp?: Date;
  response?: QueryResponse;
}

// History types
export interface HistoryItem {
  id: number;
  user_id: number;
  question: string;
  response: string; // JSON string of QueryResponse
  created_at: string;
}

export interface HistoryResponse {
  history: HistoryItem[];
}

// Schema types
export interface SchemaColumn {
  name: string;
  type: string;
}

export interface Schema {
  [tableName: string]: SchemaColumn[];
}

export interface SchemaResponse {
  schema: Schema;
}
