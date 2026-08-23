// app/listings/[id]/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { 
  ArrowLeft, 
  Heart, 
  Share2, 
  MapPin, 
  Clock, 
  User, 
  Star,
  MessageCircle,
  Phone,
  Shield,
  TrendingUp,
  Calendar,
  CheckCircle,
  AlertCircle
} from 'lucide-react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { AIPriceSuggestion } from '@/components/listings/AIPriceSuggestion'
import { Listing } from '@/types'
import { formatPrice, getConditionColor } from '@/lib/utils/helpers'
import { api } from '@/lib/api/client'

export default function ListingDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [listing, setListing] = useState<Listing | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState(0)
  const [isLiked, setIsLiked] = useState(false)
  const [showContact, setShowContact] = useState(false)

  useEffect(() => {
    // Fetches the real listing matching the URL's [id] from /api/listings/[id],
    // which reads from lib/mock-data.ts. Different ids now return different
    // listings instead of one hardcoded object.
    const fetchListing = async () => {
      setIsLoading(true)
      try {
        const id = Array.isArray(params.id) ? params.id[0] : params.id
        const data = await api.listings.getById(id as string)
        setListing(data as unknown as Listing)
      } catch (error) {
        console.error('Failed to fetch listing:', error)
        setListing(null)
      } finally {
        setIsLoading(false)
      }
    }
    fetchListing()
  }, [params.id])

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 w-32 bg-gray-200 dark:bg-gray-800 rounded mb-6" />
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <div className="aspect-video rounded-xl bg-gray-200 dark:bg-gray-800" />
            </div>
            <div className="space-y-4">
              <div className="h-8 w-3/4 bg-gray-200 dark:bg-gray-800 rounded" />
              <div className="h-6 w-1/2 bg-gray-200 dark:bg-gray-800 rounded" />
              <div className="h-24 bg-gray-200 dark:bg-gray-800 rounded" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!listing) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <AlertCircle className="mx-auto h-12 w-12 text-gray-400" />
        <h2 className="mt-4 text-2xl font-bold">Listing Not Found</h2>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          The listing you&apos;re looking for doesn&apos;t exist or has been removed.
        </p>
        <Link href="/listings">
          <Button className="mt-4">Browse Listings</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="mb-6 flex items-center gap-2 text-sm text-gray-600 hover:text-primary dark:text-gray-400"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to listings
      </button>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Left Column - Images */}
        <div className="lg:col-span-2">
          <div className="relative aspect-video overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800">
            <Image
              src={listing.images[selectedImage] || '/images/placeholder.jpg'}
              alt={listing.title}
              fill
              className="object-cover"
            />
            {/* Badges */}
            <div className="absolute left-4 top-4 flex gap-2">
              <Badge variant={getConditionColor(listing.condition)}>
                {listing.condition.replace('_', ' ')}
              </Badge>
              {listing.urgency === 'high' && (
                <Badge variant="destructive">🔥 Urgent</Badge>
              )}
              {listing.urgency === 'urgent' && (
                <Badge variant="destructive" className="animate-pulse">
                  ⚡ Urgent Sale
                </Badge>
              )}
            </div>
          </div>

          {/* Thumbnails */}
          {listing.images.length > 1 && (
            <div className="mt-4 grid grid-cols-4 gap-4">
              {listing.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative aspect-video overflow-hidden rounded-lg border-2 transition-all ${
                    selectedImage === index
                      ? 'border-primary'
                      : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <Image
                    src={image}
                    alt={`${listing.title} - Image ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}

          {/* Description */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold">Description</h2>
            <div className="mt-4 whitespace-pre-wrap text-gray-600 dark:text-gray-400">
              {listing.description}
            </div>
          </div>

          {/* AI Price Suggestion */}
          {listing.suggestedPrice && (
            <div className="mt-8">
              <AIPriceSuggestion
                currentPrice={listing.price}
                suggestedPrice={listing.suggestedPrice}
                confidence={0.85}
                marketTrend="stable"
                demandScore={78}
              />
            </div>
          )}
        </div>

        {/* Right Column - Details & Actions */}
        <div>
          <Card className="sticky top-24">
            <CardContent className="p-6 space-y-6">
              {/* Title & Price */}
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {listing.title}
                </h1>
                <div className="mt-2 flex items-baseline gap-3">
                  <span className="text-3xl font-bold text-primary">
                    M{formatPrice(listing.price)}
                  </span>
                  {listing.suggestedPrice && (
                    <span className="text-sm text-gray-400 line-through">
                      M{formatPrice(listing.suggestedPrice)}
                    </span>
                  )}
                </div>
              </div>

              {/* Quick Info */}
              <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400">
                <span className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {listing.location}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  Listed {new Date(listing.createdAt).toLocaleDateString()}
                </span>
                <span className="flex items-center gap-1">
                  <TrendingUp className="h-4 w-4" />
                  {listing.views} views
                </span>
              </div>

              {/* Seller Info */}
              <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-lg font-bold text-primary">
                      {listing.seller.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium">{listing.seller.name}</p>
                      <div className="flex items-center gap-2 text-sm">
                        <span className="flex items-center gap-0.5 text-yellow-500">
                          <Star className="h-4 w-4 fill-current" />
                          {listing.seller.trustScore}
                        </span>
                        <span className="text-gray-400">•</span>
                        <span className="text-gray-500 dark:text-gray-400">
                          Member since {new Date(listing.seller.createdAt).getFullYear()}
                        </span>
                      </div>
                    </div>
                  </div>
                  <Badge variant="success" className="flex items-center gap-1">
                    <Shield className="h-3 w-3" />
                    Verified
                  </Badge>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <Button className="w-full bg-primary hover:bg-primary/90">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Contact Seller
                </Button>
                
                {showContact && listing.seller.phone && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="rounded-lg bg-gray-50 p-3 dark:bg-gray-800"
                  >
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Contact {listing.seller.name}:
                    </p>
                    <div className="mt-1 flex items-center gap-2">
                      <Phone className="h-4 w-4 text-primary" />
                      <span className="font-medium">{listing.seller.phone}</span>
                    </div>
                  </motion.div>
                )}

                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => setIsLiked(!isLiked)}
                  >
                    <Heart
                      className={`mr-2 h-4 w-4 ${
                        isLiked ? 'fill-red-500 text-red-500' : ''
                      }`}
                    />
                    {isLiked ? 'Liked' : 'Save'}
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Share2 className="mr-2 h-4 w-4" />
                    Share
                  </Button>
                </div>
              </div>

              {/* Trust & Safety */}
              <div className="rounded-lg bg-blue-50 p-4 dark:bg-blue-900/20">
                <div className="flex items-start gap-3">
                  <Shield className="mt-0.5 h-5 w-5 text-primary" />
                  <div className="text-sm">
                    <p className="font-medium text-gray-900 dark:text-white">
                      Trust & Safety
                    </p>
                    <p className="text-gray-600 dark:text-gray-400">
                      This seller has a high trust score. QuickTrade uses AI to detect 
                      potential fraud and protect your transactions.
                    </p>
                  </div>
                </div>
              </div>

              {/* Report */}
              <button className="w-full text-center text-sm text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                Report this listing
              </button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
