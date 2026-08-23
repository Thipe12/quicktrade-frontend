// components/listings/AIPriceSuggestion.tsx
'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  TrendingUp, 
  TrendingDown, 
  Minus, 
  Sparkles,
  Info,
  CheckCircle,
  AlertTriangle
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { formatPrice } from '@/lib/utils/helpers'

interface AIPriceSuggestionProps {
  currentPrice: number
  suggestedPrice: number
  confidence: number // 0-1
  marketTrend: 'rising' | 'falling' | 'stable'
  demandScore: number // 0-100
  similarListings?: { title: string; price: number }[]
}

export function AIPriceSuggestion({
  currentPrice,
  suggestedPrice,
  confidence,
  marketTrend,
  demandScore,
  similarListings = []
}: AIPriceSuggestionProps) {
  const [showDetails, setShowDetails] = useState(false)
  
  const priceDiff = suggestedPrice - currentPrice
  const percentDiff = ((priceDiff / currentPrice) * 100).toFixed(1)
  const isHigher = priceDiff > 0
  const isLower = priceDiff < 0
  const confidenceLevel = confidence * 100

  const getConfidenceLabel = () => {
    if (confidenceLevel >= 80) return { label: 'High Confidence', color: 'success' }
    if (confidenceLevel >= 60) return { label: 'Medium Confidence', color: 'warning' }
    return { label: 'Low Confidence', color: 'destructive' }
  }

  const getTrendIcon = () => {
    switch (marketTrend) {
      case 'rising':
        return <TrendingUp className="h-4 w-4 text-green-500" />
      case 'falling':
        return <TrendingDown className="h-4 w-4 text-red-500" />
      default:
        return <Minus className="h-4 w-4 text-yellow-500" />
    }
  }

  const getTrendLabel = () => {
    switch (marketTrend) {
      case 'rising':
        return 'Market is rising - Good time to sell'
      case 'falling':
        return 'Market is falling - Consider adjusting price'
      default:
        return 'Market is stable'
    }
  }

  return (
    <Card className="border-primary/20 bg-gradient-to-br from-primary/5 via-primary/10 to-transparent">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          <Sparkles className="h-5 w-5 text-primary" />
          AI Price Suggestion
          <Badge variant="info" className="ml-auto">
            Powered by AI
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Price Comparison */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Current Price</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              M{formatPrice(currentPrice)}
            </p>
          </div>
          <div className="text-center">
            <div className={`flex items-center gap-1 text-sm font-medium ${
              isHigher ? 'text-green-600' : isLower ? 'text-red-600' : 'text-yellow-600'
            }`}>
              {isHigher && <TrendingUp className="h-4 w-4" />}
              {isLower && <TrendingDown className="h-4 w-4" />}
              {!isHigher && !isLower && <Minus className="h-4 w-4" />}
              {isHigher ? '+' : ''}{percentDiff}%
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {isHigher ? 'Above' : isLower ? 'Below' : 'At'} AI Suggestion
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">AI Suggested</p>
            <p className="text-2xl font-bold text-primary">
              M{formatPrice(suggestedPrice)}
            </p>
          </div>
        </div>

        {/* Confidence & Demand */}
        <div className="grid grid-cols-2 gap-3 rounded-lg bg-white/50 p-3 dark:bg-gray-800/50">
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Confidence</p>
            <div className="mt-1 flex items-center gap-2">
              <div className="h-2 flex-1 rounded-full bg-gray-200 dark:bg-gray-700">
                <div
                  className={`h-2 rounded-full transition-all ${
                    confidenceLevel >= 80 ? 'bg-green-500' :
                    confidenceLevel >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${confidenceLevel}%` }}
                />
              </div>
              <span className="text-xs font-medium">{confidenceLevel}%</span>
            </div>
          </div>
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Demand Score</p>
            <div className="mt-1 flex items-center gap-2">
              <div className="h-2 flex-1 rounded-full bg-gray-200 dark:bg-gray-700">
                <div
                  className="h-2 rounded-full bg-primary transition-all"
                  style={{ width: `${demandScore}%` }}
                />
              </div>
              <span className="text-xs font-medium">{demandScore}%</span>
            </div>
          </div>
        </div>

        {/* Market Trend */}
        <div className="flex items-center gap-2 text-sm">
          {getTrendIcon()}
          <span className="text-gray-600 dark:text-gray-400">{getTrendLabel()}</span>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button 
            variant="default" 
            className="flex-1 bg-primary hover:bg-primary/90"
            onClick={() => {
              // Apply suggested price
              // This would update the listing price
            }}
          >
            <CheckCircle className="mr-2 h-4 w-4" />
            Apply Suggested Price
          </Button>
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => setShowDetails(!showDetails)}
          >
            <Info className="mr-2 h-4 w-4" />
            {showDetails ? 'Hide' : 'Show'} Details
          </Button>
        </div>

        {/* Details */}
        {showDetails && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="rounded-lg border border-gray-200 p-4 dark:border-gray-700"
          >
            <h4 className="mb-2 font-medium">Similar Listings</h4>
            {similarListings.length > 0 ? (
              <div className="space-y-2">
                {similarListings.map((item, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">{item.title}</span>
                    <span className="font-medium">M{formatPrice(item.price)}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500 dark:text-gray-400">
                No similar listings found in your area.
              </p>
            )}
            <div className="mt-3 rounded-lg bg-gray-50 p-3 dark:bg-gray-800">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                <span className="font-medium">How it works:</span> Our AI analyzes 
                recent sales, demand patterns, and market conditions to suggest 
                optimal pricing for your item.
              </p>
            </div>
          </motion.div>
        )}
      </CardContent>
    </Card>
  )
}