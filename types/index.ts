// types/index.ts
export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  location: string
  phone?: string
  trustScore: number
  createdAt: Date
}

export interface Listing {
  id: string
  title: string
  description: string
  price: number
  suggestedPrice?: number
  category: Category
  condition: Condition
  location: string
  images: string[]
  seller: User
  status: ListingStatus
  urgency: UrgencyLevel
  createdAt: Date
  updatedAt: Date
  views: number
  favorites: number
}

export enum Category {
  ELECTRONICS = 'electronics',
  FURNITURE = 'furniture',
  APPLIANCES = 'appliances',
  VEHICLES = 'vehicles',
  CLOTHING = 'clothing',
  BOOKS = 'books',
  OTHER = 'other'
}

export enum Condition {
  NEW = 'new',
  LIKE_NEW = 'like_new',
  GOOD = 'good',
  FAIR = 'fair',
  POOR = 'poor'
}

export enum ListingStatus {
  ACTIVE = 'active',
  PENDING = 'pending',
  SOLD = 'sold',
  EXPIRED = 'expired'
}

export enum UrgencyLevel {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  URGENT = 'urgent'
}

export interface SearchFilters {
  category?: Category
  minPrice?: number
  maxPrice?: number
  location?: string
  condition?: Condition
  urgency?: UrgencyLevel
  sortBy?: 'newest' | 'price_asc' | 'price_desc' | 'relevance'
}

export interface AIRecommendation {
  suggestedPrice: number
  confidence: number
  marketTrend: 'rising' | 'falling' | 'stable'
  demandScore: number
  optimalTimeframe: string
  similarListings: SimilarListing[]
}

export interface SimilarListing {
  id: string
  title: string
  price: number
  condition: Condition
}

export interface Transaction {
  id: string
  listing: Listing
  buyer: User
  seller: User
  amount: number
  status: TransactionStatus
  createdAt: Date
  completedAt?: Date
}

export enum TransactionStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
  DISPUTED = 'disputed'
}

export interface TrustScore {
  userId: string
  score: number
  completedTransactions: number
  positiveRatings: number
  negativeRatings: number
  responseRate: number
  avgResponseTime: number
}