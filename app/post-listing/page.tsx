// app/post-listing/page.tsx
'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useRouter } from 'next/navigation'
import { 
  Upload, 
  X, 
  Image as ImageIcon,
  Sparkles,
  Loader2,
  CheckCircle,
  AlertCircle
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { AIPriceSuggestion } from '@/components/listings/AIPriceSuggestion'

// Form validation schema
const listingSchema = z.object({
  title: z.string().min(10, 'Title must be at least 10 characters').max(100, 'Title is too long'),
  description: z.string().min(50, 'Description must be at least 50 characters').max(2000, 'Description is too long'),
  price: z.number().min(1, 'Price must be greater than 0').max(999999, 'Price is too high'),
  category: z.string().min(1, 'Please select a category'),
  condition: z.string().min(1, 'Please select a condition'),
  location: z.string().min(3, 'Please enter your location'),
  urgency: z.string().optional(),
  images: z.array(z.string()).min(1, 'Please upload at least one image')
})

type ListingFormData = z.infer<typeof listingSchema>

const categories = [
  'Electronics', 'Furniture', 'Phones', 'Appliances', 
  'Vehicles', 'Books', 'Clothing', 'Other'
]

const conditions = ['New', 'Like New', 'Good', 'Fair', 'Poor']
const urgencyLevels = ['Low', 'Medium', 'High', 'Urgent']

export default function PostListingPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [uploadedImages, setUploadedImages] = useState<string[]>([])
  const [showAISuggestion, setShowAISuggestion] = useState(false)
  const [aiSuggestion, setAiSuggestion] = useState<{
    suggestedPrice: number
    confidence: number
    marketTrend: 'rising' | 'falling' | 'stable'
    demandScore: number
  } | null>(null)

  const { register, handleSubmit, watch, formState: { errors }, setValue, getValues } = useForm<ListingFormData>({
    resolver: zodResolver(listingSchema),
    defaultValues: {
      title: '',
      description: '',
      price: 0,
      category: '',
      condition: '',
      location: '',
      urgency: 'Medium',
      images: []
    }
  })

  const watchPrice = watch('price')
  const watchCategory = watch('category')
  const watchCondition = watch('condition')
  const watchLocation = watch('location')

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      // Convert to base64 for preview
      Array.from(files).forEach(file => {
        const reader = new FileReader()
        reader.onloadend = () => {
          setUploadedImages(prev => [...prev, reader.result as string])
        }
        reader.readAsDataURL(file)
      })
    }
  }

  const removeImage = (index: number) => {
    setUploadedImages(prev => prev.filter((_, i) => i !== index))
  }

  const getAIPriceSuggestion = () => {
    // Simulate AI price suggestion
    const price = getValues('price')
    const suggestion = {
      suggestedPrice: Math.round(price * (0.85 + Math.random() * 0.3)),
      confidence: 0.7 + Math.random() * 0.25,
      marketTrend: ['rising', 'falling', 'stable'][Math.floor(Math.random() * 3)] as 'rising' | 'falling' | 'stable',
      demandScore: 50 + Math.floor(Math.random() * 40)
    }
    setAiSuggestion(suggestion)
    setShowAISuggestion(true)
  }

  const onSubmit = async (data: ListingFormData) => {
    setIsSubmitting(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Show success
      // Redirect to listing
      router.push('/listings')
    } catch (error) {
      console.error('Failed to create listing:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          List Your Item
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Use AI to get the best price and reach the right buyers in Lesotho.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
            <CardDescription>
              Provide details about your item to help AI match it with the right buyers.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Title <span className="text-red-500">*</span>
              </label>
              <input
                {...register('title')}
                type="text"
                placeholder="e.g., Dell XPS 13 Laptop - Like New"
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-gray-700 dark:bg-gray-900"
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-500">{errors.title.message}</p>
              )}
            </div>

            {/* Category & Condition */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  {...register('category')}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-gray-700 dark:bg-gray-900"
                >
                  <option value="">Select category</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
                {errors.category && (
                  <p className="mt-1 text-sm text-red-500">{errors.category.message}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Condition <span className="text-red-500">*</span>
                </label>
                <select
                  {...register('condition')}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-gray-700 dark:bg-gray-900"
                >
                  <option value="">Select condition</option>
                  {conditions.map(cond => (
                    <option key={cond} value={cond}>{cond}</option>
                  ))}
                </select>
                {errors.condition && (
                  <p className="mt-1 text-sm text-red-500">{errors.condition.message}</p>
                )}
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                {...register('description')}
                rows={5}
                placeholder="Describe your item in detail. Include features, reason for selling, and any issues..."
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-gray-700 dark:bg-gray-900"
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-500">{errors.description.message}</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Pricing & Location */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Pricing & Location</span>
              <Badge variant="info" className="flex items-center gap-1">
                <Sparkles className="h-3 w-3" />
                AI Optimized
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Price (M) <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-gray-500">M</span>
                  <input
                    {...register('price', { valueAsNumber: true })}
                    type="number"
                    placeholder="0.00"
                    className="w-full rounded-lg border border-gray-300 pl-8 pr-4 py-2 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-gray-700 dark:bg-gray-900"
                  />
                </div>
                {errors.price && (
                  <p className="mt-1 text-sm text-red-500">{errors.price.message}</p>
                )}
                {watchPrice > 0 && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="mt-2"
                    onClick={getAIPriceSuggestion}
                  >
                    <Sparkles className="mr-2 h-4 w-4" />
                    Get AI Price Suggestion
                  </Button>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Location <span className="text-red-500">*</span>
                </label>
                <input
                  {...register('location')}
                  type="text"
                  placeholder="e.g., Maseru"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-gray-700 dark:bg-gray-900"
                />
                {errors.location && (
                  <p className="mt-1 text-sm text-red-500">{errors.location.message}</p>
                )}
              </div>
            </div>

            {/* AI Price Suggestion */}
            <AnimatePresence>
              {showAISuggestion && aiSuggestion && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4"
                >
                  <AIPriceSuggestion
                    currentPrice={watchPrice}
                    suggestedPrice={aiSuggestion.suggestedPrice}
                    confidence={aiSuggestion.confidence}
                    marketTrend={aiSuggestion.marketTrend}
                    demandScore={aiSuggestion.demandScore}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Urgency */}
            <div>
              <label className="block text-sm font-medium mb-1">Urgency</label>
              <select
                {...register('urgency')}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-gray-700 dark:bg-gray-900"
              >
                {urgencyLevels.map(level => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Images */}
        <Card>
          <CardHeader>
            <CardTitle>Images</CardTitle>
            <CardDescription>
              Upload clear photos of your item. First image will be the cover.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {/* Upload Button */}
              <label className="flex aspect-square cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 hover:border-primary transition-colors dark:border-gray-700">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={handleImageUpload}
                />
                <Upload className="h-8 w-8 text-gray-400" />
                <span className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  Upload
                </span>
              </label>

              {/* Uploaded Images */}
              {uploadedImages.map((image, index) => (
                <div key={index} className="relative aspect-square">
                  <Image
                    src={image}
                    alt={`Upload ${index + 1}`}
                    fill
                    sizes="(max-width: 768px) 50vw, 160px"
                    className="h-full w-full rounded-lg object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute -right-2 -top-2 rounded-full bg-red-500 p-1 text-white hover:bg-red-600"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
            {errors.images && (
              <p className="mt-2 text-sm text-red-500">{errors.images.message}</p>
            )}
          </CardContent>
        </Card>

        {/* Submit */}
        <div className="flex gap-4">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 bg-primary hover:bg-primary/90"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating Listing...
              </>
            ) : (
              <>
                <CheckCircle className="mr-2 h-4 w-4" />
                List Item
              </>
            )}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  )
}
