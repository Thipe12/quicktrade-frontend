// app/api/listings/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { mockListings } from '@/lib/mock-data'

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const listing = mockListings.find((l) => l.id === params.id)
  if (!listing) {
    return NextResponse.json({ error: 'listing not found' }, { status: 404 })
  }
  return NextResponse.json(listing)
}
