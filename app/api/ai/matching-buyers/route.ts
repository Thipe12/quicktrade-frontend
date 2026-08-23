// app/api/ai/matching-buyers/[listingId] logic, implemented as
// GET /api/ai/matching-buyers?listingId=...
//
// Real rule-based matching: scores every OTHER active listing's implied
// "buyer profile" (its own category/location/urgency act as a stand-in
// for demand, since this prototype has no separate buyer-request table
// yet) against the target listing, and returns ranked results with a
// visible score breakdown — the same logic pattern as the standalone
// QuickTrade matching prototype, wired into this codebase for real.

import { NextRequest, NextResponse } from 'next/server'
import { mockListings } from '@/lib/mock-data'
import type { Listing } from '@/types'

function scoreAgainst(target: Listing, candidate: Listing) {
  const breakdown: { label: string; points: number }[] = []
  let score = 0

  if (candidate.category === target.category) {
    score += 40
    breakdown.push({ label: 'Category match', points: 40 })
  } else {
    breakdown.push({ label: 'Category mismatch', points: 0 })
  }

  const priceDelta = Math.abs(candidate.price - target.price) / Math.max(target.price, 1)
  let pricePoints = 0
  if (priceDelta <= 0.1) pricePoints = 30
  else if (priceDelta <= 0.25) pricePoints = 15
  score += pricePoints
  breakdown.push({ label: pricePoints ? 'Comparable price range' : 'Price far apart', points: pricePoints })

  const locPoints = candidate.location === target.location ? 20 : 0
  score += locPoints
  breakdown.push({ label: locPoints ? 'Same town' : 'Different town', points: locPoints })

  const urgencyRank: Record<string, number> = { low: 0, medium: 1, high: 2, urgent: 3 }
  const urgencyPoints =
    (urgencyRank[candidate.urgency] ?? 0) >= (urgencyRank[target.urgency] ?? 0) ? 10 : 4
  score += urgencyPoints
  breakdown.push({ label: 'Urgency alignment', points: urgencyPoints })

  return { total: Math.min(score, 100), breakdown }
}

export async function GET(req: NextRequest) {
  const listingId = req.nextUrl.searchParams.get('listingId')
  if (!listingId) {
    return NextResponse.json({ error: 'listingId query param is required' }, { status: 400 })
  }

  const target = mockListings.find((l) => l.id === listingId)
  if (!target) {
    return NextResponse.json({ error: 'listing not found' }, { status: 404 })
  }

  const results = mockListings
    .filter((l) => l.id !== listingId)
    .map((candidate) => ({
      listingId: candidate.id,
      title: candidate.title,
      location: candidate.location,
      price: candidate.price,
      ...scoreAgainst(target, candidate),
    }))
    .filter((r) => r.total > 0)
    .sort((a, b) => b.total - a.total)

  return NextResponse.json({ target: target.id, matches: results })
}
