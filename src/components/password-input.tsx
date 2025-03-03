'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Progress } from 'buildgrid-ui'
import { Eye, EyeOff } from 'lucide-react'
import React, { InputHTMLAttributes, useState } from 'react'

interface PasswordInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
	showStrengthMeter?: boolean
}

export function PasswordInputComponent({
	showStrengthMeter = true,
	className,
	...props
}: PasswordInputProps) {
	const [password, setPassword] = useState('')
	const [showPassword, setShowPassword] = useState(false)

	const calculateStrength = (password: string): number => {
		let strength = 0
		if (password.length >= 8) strength += 25
		if (password.match(/[a-z]/)) strength += 25
		if (password.match(/[A-Z]/)) strength += 25
		if (password.match(/[0-9]/)) strength += 25
		return strength
	}

	const getStrengthLabel = (strength: number): string => {
		if (strength === 0) return 'Muito fraca'
		if (strength <= 25) return 'Fraca'
		if (strength <= 50) return 'Mediana'
		if (strength <= 75) return 'Forte'
		return 'Muito forte'
	}

	const strength = calculateStrength(password)
	const strengthLabel = getStrengthLabel(strength)

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value)
		props.onChange?.(e)
	}

	return (
		<div className="w-full max-w-sm space-y-4">
			<div className="relative">
				<Input
					{...props}
					type={showPassword ? 'text' : 'password'}
					value={password}
					onChange={handleChange}
					className={`pr-10 ${className || ''}`}
				/>
				<Button
					type="button"
					variant="ghost"
					size="icon"
					className="absolute right-0 top-0 h-full"
					onClick={() => setShowPassword(!showPassword)}
					aria-label={showPassword ? 'Esconder senha' : 'Mostrar senha'}
				>
					{showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
				</Button>
			</div>
			{showStrengthMeter && (
				<div className="space-y-2">
					<div className="flex justify-between text-sm">
						<span>Força da senha:</span>
						<span>{strengthLabel}</span>
					</div>
					<Progress value={strength} className="h-2" />
				</div>
			)}
		</div>
	)
}
