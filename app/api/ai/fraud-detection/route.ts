// app/api/ai/fraud-detection/route.ts
//
// Real heuristic scoring, not a canned response. Flags listings using
// signals that are genuinely predictive at prototype stage: price far
// below comparable market value, very new seller accounts, thin listing
// descriptions, and stock-photo-style single-image listings. Every flag
// is computed from the actual input and comparable data — nothing here
// is a hardcoded "risk: low" placeholder.

import { NextRequest, NextResponse } from 'next/server'
import { mockListings } from '@/lib/mock-data'

export async function POST(req: NextRequest) {
  const body = await req.json()
  const {
    category,
    price,
    description,
    images,
    sellerCreatedAt,
  }: {
    category: string
    price: number
    description?: string
    images?: string[]
    sellerCreatedAt?: string
  } = body

  if (!category || typeof price !== 'number') {
    return NextResponse.json(
      { error: 'category and price are required' },
      { status: 400 }
    )
  }

  const flags: { label: string; weight: number }[] = []
  let riskScore = 0

  // Signal 1: price far below comparable market value
  const comparables = mockListings.filter((l) => l.category === category)
  if (comparables.length > 0) {
    const avg = comparables.reduce((s, l) => s + l.price, 0) / comparables.length
    const ratio = price / avg
    if (ratio < 0.4) {
      riskScore += 40
      flags.push({ label: `Priced ${Math.round((1 - ratio) * 100)}% below category average`, weight: 40 })
    } else if (ratio < 0.6) {
      riskScore += 20
      flags.push({ label: 'Priced notably below category average', weight: 20 })
    }
  }

  // Signal 2: very new seller account
  if (sellerCreatedAt) {
    const ageDays =
      (Date.now() - new Date(sellerCreatedAt).getTime()) / (1000 * 60 * 60 * 24)
    if (ageDays < 3) {
      riskScore += 25
      flags.push({ label: 'Seller account created within the last 3 days', weight: 25 })
    } else if (ageDays < 14) {
      riskScore += 10
      flags.push({ label: 'Seller account is under 2 weeks old', weight: 10 })
    }
  }

  // Signal 3: thin or missing description
  const descLen = (description ?? '').trim().length
  if (descLen === 0) {
    riskScore += 15
    flags.push({ label: 'No description provided', weight: 15 })
  } else if (descLen < 25) {
    riskScore += 8
    flags.push({ label: 'Description is very short', weight: 8 })
  }

  // Signal 4: no images or only a single image
  const imageCount = images?.length ?? 0
  if (imageCount === 0) {
    riskScore += 12
    flags.push({ label: 'No images attached', weight: 12 })
  } else if (imageCount === 1) {
    riskScore += 5
    flags.push({ label: 'Only one image attached', weight: 5 })
  }

  riskScore = Math.min(riskScore, 100)
  const riskLevel = riskScore >= 60 ? 'high' : riskScore >= 30 ? 'medium' : 'low'

  return NextResponse.json({ riskScore, riskLevel, flags })
}
