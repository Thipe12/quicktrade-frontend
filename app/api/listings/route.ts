// app/api/listings/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { mockListings } from '@/lib/mock-data'

export async function GET(req: NextRequest) {
  const params = req.nextUrl.searchParams
  const category = params.get('category')
  const location = params.get('location')
  const maxPrice = params.get('maxPrice')

  let results = [...mockListings]
  if (category) results = results.filter((l) => l.category === category)
  if (location) results = results.filter((l) => l.location === location)
  if (maxPrice) results = results.filter((l) => l.price <= Number(maxPrice))

  return NextResponse.json({ listings: results, total: results.length })
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  // Prototype note: this appends in-memory for the life of the server process.
  // A persistent store (e.g. Postgres) replaces this before production use.
  const newListing = {
    ...body,
    id: String(Date.now()),
    createdAt: new Date(),
    updatedAt: new Date(),
    views: 0,
    favorites: 0,
    status: 'active',
  }
  mockListings.unshift(newListing)
  return NextResponse.json(newListing, { status: 201 })
}
