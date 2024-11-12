'use client'

export function DangerGauge({
  title = "Necessidades Essenciais",
  value = 55,
  maxValue = 100,
}: {
  title?: string
  value?: number
  maxValue?: number
}) {
  // Ensure value is between 0 and maxValue
  const normalizedValue = Math.min(Math.max(0, value), maxValue)
  const percentage = (normalizedValue / maxValue) * 100

  return (
    <div className="w-full max-w-3xl space-y-2">
      <h2 className="text-xl font-semibold">{title}</h2>
      <div className="relative h-8">
        {/* Background gradient */}
        <div
          className="absolute inset-0 rounded-sm"
          style={{
            background:
              "linear-gradient(90deg, #4CAF50 0%, #FFEB3B 40%, #FF9800 60%, #F44336 80%)",
          }}
          role="progressbar"
          aria-valuenow={percentage}
          aria-valuemin={0}
          aria-valuemax={100}
        />
        
        {/* Marker triangle */}
        <div
          className="absolute top-0 -mt-1 -ml-2 transform"
          style={{ left: `${percentage}%` }}
        >
          <div
            className="border-l-[8px] border-r-[8px] border-t-[12px] border-l-transparent border-r-transparent border-t-black"
            aria-hidden="true"
          />
        </div>
        
        {/* Percentage labels */}
        <div className="absolute -bottom-6 left-0 text-sm">0%</div>
        <div className="absolute -bottom-6 right-0 text-sm">{maxValue}%</div>
      </div>
    </div>
  )
}