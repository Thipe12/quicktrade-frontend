// components/ui/Slider.tsx
// Native dual-thumb range slider — no extra dependency required.
// Matches the (min, max, step, value, onValueChange) interface used by
// ListingFilters.tsx.
'use client'

interface SliderProps {
  min: number
  max: number
  step?: number
  value: number[]
  onValueChange: (value: number[]) => void
  className?: string
}

export function Slider({ min, max, step = 1, value, onValueChange, className }: SliderProps) {
  const [low, high] = value

  const handleLow = (e: React.ChangeEvent<HTMLInputElement>) => {
    const next = Math.min(Number(e.target.value), high)
    onValueChange([next, high])
  }

  const handleHigh = (e: React.ChangeEvent<HTMLInputElement>) => {
    const next = Math.max(Number(e.target.value), low)
    onValueChange([low, next])
  }

  return (
    <div className={`relative flex items-center gap-2 py-2 ${className ?? ''}`}>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={low}
        onChange={handleLow}
        className="w-1/2 accent-primary"
        aria-label="Minimum value"
      />
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={high}
        onChange={handleHigh}
        className="w-1/2 accent-primary"
        aria-label="Maximum value"
      />
    </div>
  )
}
