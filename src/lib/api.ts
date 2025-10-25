import type { ApiKey } from "./types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api";

async function fetchWithAuth(url: string, apiKey: string, options: RequestInit = {}) {
  const headers = {
    ...options.headers,
    'Authorization': `Bearer ${apiKey}`,
    'Content-Type': 'application/json',
  };

  const response = await fetch(url, { ...options, headers });

  if (!response.ok) {
    let errorBody;
    try {
      errorBody = await response.json();
    } catch (e) {
      errorBody = { message: `Request failed with status ${response.status}` };
    }
    throw new Error(errorBody.message || `Request failed with status ${response.status}`);
  }
  
  // For DELETE requests or other methods that might not return a body
  const contentType = response.headers.get("content-type");
  if (contentType && contentType.indexOf("application/json") !== -1) {
    return response.json();
  }
  return; 
}

// API Keys Management
export async function getKeys(apiKey: string): Promise<ApiKey[]> {
  return fetchWithAuth(`${API_BASE_URL}/keys`, apiKey);
}

export async function createKey(apiKey: string, data: { name: string, email: string }): Promise<ApiKey> {
  return fetchWithAuth(`${API_BASE_URL}/keys`, apiKey, {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function revokeKey(apiKey: string, keyId: string): Promise<void> {
  return fetchWithAuth(`${API_BASE_URL}/keys/${keyId}`, apiKey, {
    method: 'DELETE',
  });
}

export async function getUsage(apiKey: string, keyId: string): Promise<{ sends: number, validations: number, limit: number }> {
    return fetchWithAuth(`${API_BASE_URL}/keys/${keyId}/usage`, apiKey);
}


// OTP Flow
export async function sendOTP(apiKey: string, data: { identifier: string, channel: 'email' }): Promise<{ status: string }> {
    return fetchWithAuth(`${API_BASE_URL}/otp/send`, apiKey, {
        method: 'POST',
        body: JSON.stringify(data),
    });
}

export async function validateOTP(apiKey: string, data: { identifier: string, otp: string }): Promise<{ valid: boolean }> {
     return fetchWithAuth(`${API_BASE_URL}/otp/validate`, apiKey, {
        method: 'POST',
        body: JSON.stringify(data),
    });
}
