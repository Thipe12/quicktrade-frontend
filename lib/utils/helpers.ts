// lib/utils/helpers.ts
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price: number): string {
  return price.toLocaleString('en-LS')
}

export function formatTimeAgo(date: Date): string {
  const now = new Date()
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)
  
  const intervals = [
    { label: 'year', seconds: 31536000 },
    { label: 'month', seconds: 2592000 },
    { label: 'week', seconds: 604800 },
    { label: 'day', seconds: 86400 },
    { label: 'hour', seconds: 3600 },
    { label: 'minute', seconds: 60 },
  ]
  
  for (const interval of intervals) {
    const count = Math.floor(diffInSeconds / interval.seconds)
    if (count > 0) {
      return `${count} ${interval.label}${count > 1 ? 's' : ''} ago`
    }
  }
  
  return 'Just now'
}

export function getConditionColor(condition: string): 
  'default' | 'success' | 'warning' | 'destructive' | 'info' {
  switch (condition.toLowerCase()) {
    case 'new':
      return 'success'
    case 'like_new':
      return 'info'
    case 'good':
      return 'default'
    case 'fair':
      return 'warning'
    case 'poor':
      return 'destructive'
    default:
      return 'default'
  }
}

export function getUrgencyColor(urgency: string): 
  'default' | 'success' | 'warning' | 'destructive' {
  switch (urgency.toLowerCase()) {
    case 'low':
      return 'default'
    case 'medium':
      return 'warning'
    case 'high':
      return 'destructive'
    case 'urgent':
      return 'destructive'
    default:
      return 'default'
  }
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength) + '...'
}

export function generateId(): string {
  return Math.random().toString(36).substr(2, 9)
}

export function getInitials(name: string): string {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null
  
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null
      func(...args)
    }
    
    if (timeout) {
      clearTimeout(timeout)
    }
    timeout = setTimeout(later, wait)
  }
}