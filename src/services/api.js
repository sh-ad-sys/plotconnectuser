// PlotConnect API Service

const API_BASE_URL =
  process.env.REACT_APP_API_URL || 'https://marketers-backend.onrender.com';

async function fetchAPI(endpoint, options = {}) {
  try {
    // Send role in headers — cross-origin cookies are blocked between Vercel & Render
    const role     = localStorage.getItem('role')     || '';
    const username = localStorage.getItem('username') || localStorage.getItem('name') || '';

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: options.method || 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Auth-Role':  role,
        'X-Auth-User':  username,
        ...(options.headers || {}),
      },
      credentials: 'include',
      body: options.body ? JSON.stringify(options.body) : undefined,
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('API Error:', error);
    return {
      success: false,
      message: 'Network error. Please check your connection.',
    };
  }
}

const api = {
  // AUTH
  checkAuth: () => fetchAPI('/api/auth/check.php'),

  login: (type, credentials) =>
    fetchAPI('/api/auth/login.php', {
      method: 'POST',
      body: { type, ...credentials },
    }),

  logout: () => fetchAPI('/api/auth/logout.php', { method: 'POST' }),

  // MARKETER
  submitProperty: (data) =>
    fetchAPI('/api/marketer/submit-property.php', {
      method: 'POST',
      body: data,
    }),

  getMyProperties: () => fetchAPI('/api/marketer/my-properties.php'),

  deleteProperty: (id) =>
    fetchAPI('/api/marketer/delete-property.php', {
      method: 'POST',
      body: { id },
    }),

  // ADMIN
  getAdminStats: () => fetchAPI('/api/admin/dashboard.php'),

  getMarketers: () => fetchAPI('/api/admin/marketers.php'),

  addMarketer: (data) =>
    fetchAPI('/api/admin/marketers.php', {
      method: 'POST',
      body: data,
    }),

  deleteMarketer: (id) =>
    fetchAPI('/api/admin/marketers.php', {
      method: 'POST',
      body: { id, action: 'delete' },
    }),

  getAllProperties: () => fetchAPI('/api/admin/properties.php'),

  updatePropertyStatus: (id, status) =>
    fetchAPI('/api/admin/properties.php', {
      method: 'POST',
      body: { id, status, action: 'update_status' },
    }),

  deletePropertyAdmin: (id) =>
    fetchAPI('/api/admin/properties.php', {
      method: 'POST',
      body: { id, action: 'delete' },
    }),
};

export default api;