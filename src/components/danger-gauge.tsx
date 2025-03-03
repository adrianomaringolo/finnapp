'use client'

import { ReactNode } from 'react'

type DangerGaugeProps = {
	title: string | ReactNode
	value: number
	maxValue: number
}

export function DangerGauge(props: DangerGaugeProps) {
	const { title, value = 0, maxValue = 100 } = props

	// Ensure value is between 0 and maxValue
	const normalizedValue = Math.min(Math.max(0, value), maxValue)
	const percentage = (normalizedValue / maxValue) * 100

	return (
		<div className="w-full max-w-3xl space-y-2">
			<h2 className="text-xl font-semibold mb-6">{title}</h2>
			<div className="relative h-7">
				{/* Background gradient */}
				<div
					className="w-full h-full inset-0 rounded-sm"
					style={{
						background:
							'linear-gradient(90deg, #295f9d 0%, #ee9931 50%, rgb(244, 67, 54) 80%)',
					}}
					role="progressbar"
					aria-valuenow={percentage}
					aria-valuemin={0}
					aria-valuemax={100}
				/>

				{/* Marker triangle */}
				<div
					className="absolute -top-3 -mt-2 -ml-2 transform"
					style={percentage < 100 ? { left: `${percentage}%` } : { right: 0 }}
				>
					<div className="bg-black text-white px-1 rounded text-sm">
						{percentage.toFixed(1).replace('.', ',')}%
					</div>
					<div
						className="w-2 ml-2 border-l-[8px] border-r-[8px] border-t-[12px] border-l-transparent border-r-transparent border-t-black"
						aria-hidden="true"
					/>
				</div>
				<div className="text-sm absolute right-1 top-1">{maxValue}%</div>
			</div>
		</div>
	)
}
