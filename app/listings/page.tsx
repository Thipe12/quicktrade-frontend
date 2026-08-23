// app/listings/page.tsx
'use client'

import { Suspense, useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { 
  Filter, 
  Grid, 
  List, 
  ChevronDown,
  X
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { ListingCard } from '@/components/listings/ListingCard'
import { ListingFilters } from '@/components/listings/ListingFilters'
import { Listing } from '@/types'
import { mockListings } from '@/lib/mock-data'

function ListingsPageContent() {
  const searchParams = useSearchParams()
  const [listings, setListings] = useState<Listing[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [showFilters, setShowFilters] = useState(false)
  const [activeFilters, setActiveFilters] = useState<Record<string, any>>({})

  useEffect(() => {
    // Fetch listings with filters
    const fetchListings = async () => {
      setIsLoading(true)
      try {
        // Simulate API call with search params
        await new Promise(resolve => setTimeout(resolve, 600))
        setListings(mockListings)
      } catch (error) {
        console.error('Failed to fetch listings:', error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchListings()
  }, [searchParams])

  const clearFilters = () => {
    setActiveFilters({})
    // Reset URL params
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Browse Listings
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Discover AI-matched items from sellers across Lesotho
        </p>
      </div>

      {/* Controls */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="mr-2 h-4 w-4" />
            Filters
            {Object.keys(activeFilters).length > 0 && (
              <Badge variant="info" className="ml-2">
                {Object.keys(activeFilters).length}
              </Badge>
            )}
          </Button>
          <div className="flex items-center gap-2">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('grid')}
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {listings.length} listings
          </span>
          <select className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm focus:border-primary focus:outline-none dark:border-gray-700 dark:bg-gray-900">
            <option>Most Recent</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
            <option>Most Popular</option>
          </select>
        </div>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <Card className="mt-4">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Filters</h3>
              <button
                onClick={clearFilters}
                className="text-sm text-primary hover:underline"
              >
                Clear all
              </button>
            </div>
            <ListingFilters
              onFilterChange={setActiveFilters}
              activeFilters={activeFilters}
            />
          </CardContent>
        </Card>
      )}

      {/* Active Filters Tags */}
      {Object.keys(activeFilters).length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {Object.entries(activeFilters).map(([key, value]) => (
            <Badge key={key} variant="secondary" className="flex items-center gap-1">
              {key}: {value}
              <button
                onClick={() => {
                  const newFilters = { ...activeFilters }
                  delete newFilters[key]
                  setActiveFilters(newFilters)
                }}
                className="ml-1 hover:text-red-500"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
      )}

      {/* Listings Grid */}
      {isLoading ? (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-80 animate-pulse rounded-xl bg-gray-200 dark:bg-gray-800" />
          ))}
        </div>
      ) : listings.length > 0 ? (
        <div className={`mt-8 ${
          viewMode === 'grid' 
            ? 'grid gap-6 sm:grid-cols-2 lg:grid-cols-3' 
            : 'space-y-4'
        }`}>
          {listings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      ) : (
        <div className="mt-8 text-center py-12">
          <div className="mx-auto h-24 w-24 rounded-full bg-gray-100 flex items-center justify-center dark:bg-gray-800">
            <Filter className="h-12 w-12 text-gray-400" />
          </div>
          <h3 className="mt-4 text-lg font-medium">No listings found</h3>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Try adjusting your filters or check back later
          </p>
          <Button className="mt-4" onClick={clearFilters}>
            Clear Filters
          </Button>
        </div>
      )}

      {/* Pagination */}
      {listings.length > 0 && (
        <div className="mt-8 flex justify-center gap-2">
          <Button variant="outline" size="sm">Previous</Button>
          <Button variant="default" size="sm">1</Button>
          <Button variant="outline" size="sm">2</Button>
          <Button variant="outline" size="sm">3</Button>
          <Button variant="outline" size="sm">Next</Button>
        </div>
      )}
    </div>
  )
}

export default function ListingsPage() {
  return (
    <Suspense fallback={<div className="container mx-auto px-4 py-8">Loading listings...</div>}>
      <ListingsPageContent />
    </Suspense>
  )
}
