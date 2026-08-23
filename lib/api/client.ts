// lib/api/client.ts
import axios from 'axios'

// Points at this app's own Next.js API routes (app/api/**) by default,
// since those now contain real logic. Override with NEXT_PUBLIC_API_URL
// only if/when a separate backend service replaces these routes.
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api'

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor for authentication
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized
      localStorage.removeItem('token')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

// API endpoints
export const api = {
  // Auth
  auth: {
    login: (data: { email: string; password: string }) =>
      apiClient.post('/auth/login', data),
    register: (data: any) =>
      apiClient.post('/auth/register', data),
    logout: () =>
      apiClient.post('/auth/logout'),
  },
  
  // Listings
  listings: {
    getAll: (params?: any) =>
      apiClient.get('/listings', { params }),
    getById: (id: string) =>
      apiClient.get(`/listings/${id}`),
    create: (data: any) =>
      apiClient.post('/listings', data),
    update: (id: string, data: any) =>
      apiClient.patch(`/listings/${id}`, data),
    delete: (id: string) =>
      apiClient.delete(`/listings/${id}`),
  },
  
  // Users
  users: {
    getProfile: () =>
      apiClient.get('/users/profile'),
    updateProfile: (data: any) =>
      apiClient.patch('/users/profile', data),
  },
  
  // AI
  ai: {
    getPriceSuggestion: (data: { 
      category: string
      condition: string
      price?: number
    }) =>
      apiClient.post('/ai/price-suggestion', data),
    getMatchingBuyers: (listingId: string) =>
      apiClient.get(`/ai/matching-buyers`, { params: { listingId } }),
    detectFraud: (data: any) =>
      apiClient.post('/ai/fraud-detection', data),
  },
  
  // Favorites
  favorites: {
    get: () =>
      apiClient.get('/favorites'),
    add: (listingId: string) =>
      apiClient.post('/favorites', { listingId }),
    remove: (listingId: string) =>
      apiClient.delete(`/favorites/${listingId}`),
  }
}

export default apiClient