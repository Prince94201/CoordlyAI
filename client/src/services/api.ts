
import { 
  AuthResponse, 
  LoginRequest, 
  SignupRequest, 
  QueryRequest, 
  QueryResponse,
  HistoryResponse,
  SchemaResponse
} from '../types';

const API_URL = 'http://localhost:3000/api'; // Replace with actual API URL

const getHeaders = (token?: string) => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  return headers;
};

// Auth API calls
export const login = async (credentials: LoginRequest): Promise<AuthResponse> => {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(credentials),
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Login failed');
    }
    
    return data;
  } catch (error) {
    console.error('Login error:', error);
    return { error: error instanceof Error ? error.message : 'Unknown error' };
  }
};

export const signup = async (credentials: SignupRequest): Promise<AuthResponse> => {
  try {
    const response = await fetch(`${API_URL}/signup`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(credentials),
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Signup failed');
    }
    
    return data;
  } catch (error) {
    console.error('Signup error:', error);
    return { error: error instanceof Error ? error.message : 'Unknown error' };
  }
};

// Query API calls
export const sendQuery = async (token: string, question: QueryRequest): Promise<QueryResponse | { error: string }> => {
  try {
    const response = await fetch(`${API_URL}/query`, {
      method: 'POST',
      headers: getHeaders(token),
      body: JSON.stringify(question),
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Query failed');
    }
    
    return data as QueryResponse;
  } catch (error) {
    console.error('Query error:', error);
    return { error: error instanceof Error ? error.message : 'Unknown error' };
  }
};

// History API calls
export const getHistory = async (token: string): Promise<HistoryResponse | { error: string }> => {
  try {
    const response = await fetch(`${API_URL}/history`, {
      method: 'GET',
      headers: getHeaders(token),
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Failed to fetch history');
    }
    
    return data as HistoryResponse;
  } catch (error) {
    console.error('History fetch error:', error);
    return { error: error instanceof Error ? error.message : 'Unknown error' };
  }
};

// Schema API calls
export const getSchema = async (token: string): Promise<SchemaResponse | { error: string }> => {
  try {
    const response = await fetch(`${API_URL}/schema`, {
      method: 'GET',
      headers: getHeaders(token),
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Failed to fetch schema');
    }
    
    return data as SchemaResponse;
  } catch (error) {
    console.error('Schema fetch error:', error);
    return { error: error instanceof Error ? error.message : 'Unknown error' };
  }
};
