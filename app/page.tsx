// app/page.tsx
'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  Search, 
  TrendingUp, 
  Shield, 
  Zap, 
  ArrowRight,
  Laptop,
  Smartphone,
  Sofa,
  Refrigerator,
  Car,
  BookOpen,
  Grid,
  Sparkles
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { ListingCard } from '@/components/listings/ListingCard'
// Reuses the same shared dataset as the API routes and every other page,
// instead of a second hand-typed copy that can drift out of sync.
import { mockListings } from '@/lib/mock-data'

const categories = [
  { icon: Laptop, name: 'Electronics', count: '156' },
  { icon: Sofa, name: 'Furniture', count: '89' },
  { icon: Smartphone, name: 'Phones', count: '234' },
  { icon: Refrigerator, name: 'Appliances', count: '67' },
  { icon: Car, name: 'Vehicles', count: '45' },
  { icon: BookOpen, name: 'Books', count: '123' },
  { icon: Grid, name: 'Other', count: '78' },
]

const features = [
  {
    icon: Sparkles,
    title: 'AI-Powered Matching',
    description: 'Our AI actively connects you with the perfect buyer or seller based on your preferences.'
  },
  {
    icon: TrendingUp,
    title: 'Smart Pricing',
    description: 'Get AI-generated price suggestions based on market trends and demand predictions.'
  },
  {
    icon: Shield,
    title: 'Trust & Safety',
    description: 'AI-powered fraud detection and user trust scores for secure transactions.'
  },
  {
    icon: Zap,
    title: 'Instant Matching',
    description: 'Get notified instantly when a buyer is looking for what you\'re selling.'
  }
]

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [featuredListings, setFeaturedListings] = useState(mockListings)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // Fetch featured listings
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setFeaturedListings(mockListings)
      setIsLoading(false)
    }, 500)
  }, [])

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-primary/10 to-transparent py-20">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="container relative mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="info" className="mb-6">
              🤖 AI-Powered Marketplace
            </Badge>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl md:text-6xl"
            >
              Buy and Sell Smarter with{' '}
              <span className="text-primary">AI</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mt-4 text-lg text-gray-600 dark:text-gray-300"
            >
              QuickTrade uses AI to match buyers and sellers in Lesotho. 
              Get price predictions, demand insights, and fraud protection—all in one place.
            </motion.p>
            
            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-8 flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto"
            >
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for laptops, phones, furniture..."
                  className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 pl-12 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-gray-700 dark:bg-gray-900"
                />
                <Search className="absolute left-4 top-3.5 h-4 w-4 text-gray-400" />
              </div>
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                Search
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-8 flex flex-wrap justify-center gap-6 text-sm"
            >
              <div className="flex items-center space-x-2">
                <span className="font-bold text-primary">500+</span>
                <span className="text-gray-600 dark:text-gray-400">Active Listings</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-primary">200+</span>
                <span className="text-gray-600 dark:text-gray-400">Happy Buyers</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-primary">4.8★</span>
                <span className="text-gray-600 dark:text-gray-400">Average Rating</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Browse Categories
            </h2>
            <Link href="/listings" className="text-sm text-primary hover:underline">
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7">
            {categories.map((category, index) => (
              <Link
                key={index}
                href={`/listings?category=${category.name.toLowerCase()}`}
                className="group flex flex-col items-center rounded-xl border border-gray-200 bg-white p-4 transition-all hover:border-primary hover:shadow-md dark:border-gray-700 dark:bg-gray-900"
              >
                <div className="rounded-full bg-primary/10 p-3 group-hover:bg-primary/20 transition-colors">
                  <category.icon className="h-6 w-6 text-primary" />
                </div>
                <span className="mt-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  {category.name}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {category.count} items
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge variant="info" className="mb-4">Why QuickTrade</Badge>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Powered by AI for Smarter Trading
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Our AI technology makes buying and selling faster, safer, and more efficient.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full transition-all hover:shadow-lg">
                  <CardHeader>
                    <div className="rounded-lg bg-primary/10 w-12 h-12 flex items-center justify-center">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="mt-4 text-lg">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-sm">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Listings */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Featured Listings
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                AI-recommended items based on market trends
              </p>
            </div>
            <Link href="/listings">
              <Button variant="outline">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          {isLoading ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-80 animate-pulse rounded-xl bg-gray-200 dark:bg-gray-800" />
              ))}
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {featuredListings.map((listing) => (
                <ListingCard key={listing.id} listing={listing} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white">
            Ready to Start Trading Smarter?
          </h2>
          <p className="mt-2 text-primary-light">
            Join thousands of users in Lesotho using AI to buy and sell better.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Link href="/register">
              <Button size="lg" variant="secondary" className="bg-white hover:bg-gray-100">
                Get Started Free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/listings">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Browse Listings
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}