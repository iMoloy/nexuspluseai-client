const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

export const fetchApi = async (endpoint: string, options: RequestInit = {}) => {
  let token: string | null = null;
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('nexus_auth_user');
    if (saved) {
      try {
        const user = JSON.parse(saved);
        token = user.token || null;
      } catch {}
    }
  }

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>)
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers
  });

  const data = await response.json();
  return data;
};
