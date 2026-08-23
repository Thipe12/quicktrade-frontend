// lib/constants.ts
export const categories = [
  'Electronics',
  'Furniture',
  'Phones',
  'Appliances',
  'Vehicles',
  'Books',
  'Clothing',
  'Other'
]

export const conditions = [
  'New',
  'Like New',
  'Good',
  'Fair',
  'Poor'
]

export const urgencyLevels = [
  'Low',
  'Medium',
  'High',
  'Urgent'
]

export const locations = [
  'Maseru',
  'Mafeteng',
  'Mohale\'s Hoek',
  'Quthing',
  'Qacha\'s Nek',
  'Thaba-Tseka',
  'Leribe',
  'Butha-Buthe',
  'Mokhotlong'
]

export const sortOptions = [
  { label: 'Most Recent', value: 'newest' },
  { label: 'Price: Low to High', value: 'price_asc' },
  { label: 'Price: High to Low', value: 'price_desc' },
  { label: 'Most Popular', value: 'popular' },
]

export const AI_CONFIDENCE_LEVELS = {
  HIGH: { label: 'High Confidence', min: 80, color: 'success' },
  MEDIUM: { label: 'Medium Confidence', min: 60, color: 'warning' },
  LOW: { label: 'Low Confidence', min: 0, color: 'destructive' }
}