// components/listings/ListingCard.tsx
'use client'
import { useState } from 'react'

import Link from 'next/link'
import Image from 'next/image'
import { Heart, MapPin, Clock, Star } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Listing } from '@/types'
import { formatPrice, formatTimeAgo, getConditionColor } from '@/lib/utils/helpers'

interface ListingCardProps {
  listing: Listing
}

export function ListingCard({ listing }: ListingCardProps) {
  const [isLiked, setIsLiked] = useState(false)

  return (
    <Card className="group overflow-hidden transition-all hover:shadow-lg">
      <Link href={`/listings/${listing.id}`}>
        <div className="relative aspect-[4/3] overflow-hidden bg-gray-100 dark:bg-gray-800">
          {listing.images[0] ? (
            <Image
              src={listing.images[0]}
              alt={listing.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <span className="text-gray-400">No image</span>
            </div>
          )}
          {/* Urgency Badge */}
          {listing.urgency === 'high' && (
            <Badge className="absolute left-3 top-3 bg-red-500 hover:bg-red-600">
              🔥 Urgent
            </Badge>
          )}
          {listing.urgency === 'urgent' && (
            <Badge className="absolute left-3 top-3 bg-red-600 hover:bg-red-700 animate-pulse">
              ⚡ Urgent Sale
            </Badge>
          )}
          {/* Like Button */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-3 top-3 h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white dark:bg-gray-900/80"
            onClick={(e) => {
              e.preventDefault()
              setIsLiked(!isLiked)
            }}
          >
            <Heart
              className={`h-4 w-4 transition-colors ${
                isLiked ? 'fill-red-500 text-red-500' : 'text-gray-600'
              }`}
            />
          </Button>
          {/* AI Price Suggestion Badge */}
          {listing.suggestedPrice && (
            <Badge variant="info" className="absolute bottom-3 right-3 bg-primary/90">
              <span className="flex items-center gap-1">
                <span className="text-xs">AI Suggested</span>
                <span className="font-bold">M{listing.suggestedPrice}</span>
              </span>
            </Badge>
          )}
        </div>
      </Link>

      <CardContent className="p-4">
        <Link href={`/listings/${listing.id}`}>
          <h3 className="line-clamp-1 font-semibold text-gray-900 hover:text-primary dark:text-white">
            {listing.title}
          </h3>
          <div className="mt-1 flex items-center justify-between">
            <span className="text-lg font-bold text-primary">
              M{formatPrice(listing.price)}
            </span>
            <Badge variant={getConditionColor(listing.condition)}>
              {listing.condition.replace('_', ' ')}
            </Badge>
          </div>
          <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
            <span className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              {listing.location}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {formatTimeAgo(listing.createdAt)}
            </span>
          </div>
          <div className="mt-3 flex items-center justify-between border-t border-gray-100 pt-3 dark:border-gray-800">
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-medium text-primary">
                {listing.seller.name.charAt(0)}
              </div>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {listing.seller.name}
              </span>
              <span className="flex items-center gap-0.5 text-xs text-yellow-500">
                <Star className="h-3 w-3 fill-current" />
                {listing.seller.trustScore}
              </span>
            </div>
            <span className="text-xs text-gray-400">
              {listing.views} views
            </span>
          </div>
        </Link>
      </CardContent>
    </Card>
  )
}