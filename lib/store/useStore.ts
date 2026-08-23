// lib/store/useStore.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { User, Listing, SearchFilters } from '@/types'

interface AppState {
  // User
  user: User | null
  setUser: (user: User | null) => void
  
  // Listings
  listings: Listing[]
  setListings: (listings: Listing[]) => void
  
  // Filters
  filters: SearchFilters
  setFilters: (filters: SearchFilters) => void
  
  // Favorites
  favorites: string[]
  toggleFavorite: (listingId: string) => void
  
  // UI
  isLoading: boolean
  setLoading: (loading: boolean) => void
}

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      // User
      user: null,
      setUser: (user) => set({ user }),
      
      // Listings
      listings: [],
      setListings: (listings) => set({ listings }),
      
      // Filters
      filters: {},
      setFilters: (filters) => set({ filters }),
      
      // Favorites
      favorites: [],
      toggleFavorite: (listingId) => {
        const { favorites } = get()
        const index = favorites.indexOf(listingId)
        if (index > -1) {
          set({ favorites: favorites.filter(id => id !== listingId) })
        } else {
          set({ favorites: [...favorites, listingId] })
        }
      },
      
      // Loading
      isLoading: false,
      setLoading: (loading) => set({ isLoading: loading })
    }),
    {
      name: 'quicktrade-storage',
      partialize: (state) => ({
        user: state.user,
        favorites: state.favorites
      })
    }
  )
)