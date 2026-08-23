// components/listings/ListingFilters.tsx
'use client'

import { useState } from 'react'
import { Slider } from '@/components/ui/Slider'
import { Button } from '@/components/ui/Button'
import { categories, conditions, urgencyLevels } from '@/lib/constants'

interface ListingFiltersProps {
  onFilterChange: (filters: Record<string, any>) => void
  activeFilters: Record<string, any>
}

export function ListingFilters({ onFilterChange, activeFilters }: ListingFiltersProps) {
  const [priceRange, setPriceRange] = useState<[number, number]>([
    activeFilters.minPrice || 0,
    activeFilters.maxPrice || 100000
  ])

  const handleFilterChange = (key: string, value: any) => {
    const newFilters = { ...activeFilters, [key]: value }
    onFilterChange(newFilters)
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {/* Category */}
      <div>
        <label className="block text-sm font-medium mb-1">Category</label>
        <select
          className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-primary focus:outline-none dark:border-gray-700 dark:bg-gray-900"
          onChange={(e) => handleFilterChange('category', e.target.value)}
          value={activeFilters.category || ''}
        >
          <option value="">All Categories</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {/* Condition */}
      <div>
        <label className="block text-sm font-medium mb-1">Condition</label>
        <select
          className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-primary focus:outline-none dark:border-gray-700 dark:bg-gray-900"
          onChange={(e) => handleFilterChange('condition', e.target.value)}
          value={activeFilters.condition || ''}
        >
          <option value="">Any Condition</option>
          {conditions.map(cond => (
            <option key={cond} value={cond}>{cond}</option>
          ))}
        </select>
      </div>

      {/* Urgency */}
      <div>
        <label className="block text-sm font-medium mb-1">Urgency</label>
        <select
          className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-primary focus:outline-none dark:border-gray-700 dark:bg-gray-900"
          onChange={(e) => handleFilterChange('urgency', e.target.value)}
          value={activeFilters.urgency || ''}
        >
          <option value="">Any Urgency</option>
          {urgencyLevels.map(level => (
            <option key={level} value={level}>{level}</option>
          ))}
        </select>
      </div>

      {/* Price Range */}
      <div>
        <label className="block text-sm font-medium mb-1">
          Price Range: M{priceRange[0]} - M{priceRange[1]}
        </label>
        <Slider
          min={0}
          max={100000}
          step={100}
          value={priceRange}
          onValueChange={(value) => {
            setPriceRange(value as [number, number])
            handleFilterChange('minPrice', value[0])
            handleFilterChange('maxPrice', value[1])
          }}
        />
      </div>
    </div>
  )
}