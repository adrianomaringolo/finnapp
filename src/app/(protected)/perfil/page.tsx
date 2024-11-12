'use client'

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuth } from '@/lib/context/AuthContext'
import { useState } from 'react'

export default function UserProfile() {
	const { user } = useAuth()
	const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false)
	const [isDeleteAccountOpen, setIsDeleteAccountOpen] = useState(false)

	const handleChangePassword = (event: React.FormEvent) => {
		event.preventDefault()
		// Implement password change logic here
		console.log('Change password')
		setIsChangePasswordOpen(false)
	}

	const handleDeleteAccount = () => {
		// Implement account deletion logic here
		console.log('Delete account')
		setIsDeleteAccountOpen(false)
	}

	const userNames = user?.displayName?.split(' ') ?? []
	const userInitials = `${userNames[0]?.[0]}${userNames[userNames.length - 1]?.[0]}`

	return (
		<Card className="w-full max-w-md mx-auto">
			<CardHeader>
				<CardTitle className="text-2xl font-bold text-center">
					Perfil de usuário
				</CardTitle>
			</CardHeader>
			<CardContent className="space-y-4">
				<div className="flex justify-center">
					<Avatar className="w-24 h-24">
						<AvatarImage
							src={user?.photoURL as string}
							alt={user?.displayName as string}
						/>
						<AvatarFallback>{userInitials}</AvatarFallback>
					</Avatar>
				</div>
				<div className="space-y-2">
					<Label>Nome</Label>
					<div className="font-medium">{user?.displayName as string}</div>
				</div>
				<div className="space-y-2">
					<Label>Email</Label>
					<div className="font-medium">{user?.email}</div>
				</div>
				<div className="space-y-2">
					<Label>Membro desde</Label>
					<div className="font-medium">{new Date(new Date()).toLocaleDateString()}</div>
				</div>
			</CardContent>
			<CardFooter className="flex justify-between">
				<AlertDialog open={isChangePasswordOpen} onOpenChange={setIsChangePasswordOpen}>
					<AlertDialogTrigger asChild>
						<Button variant="outline">Alterar senha</Button>
					</AlertDialogTrigger>
					<AlertDialogContent>
						<AlertDialogHeader>
							<AlertDialogTitle>Alterar senha</AlertDialogTitle>
							<AlertDialogDescription>
								Insira sua nova senha abaixo.
							</AlertDialogDescription>
						</AlertDialogHeader>
						<form onSubmit={handleChangePassword}>
							<div className="space-y-4 py-4">
								<div className="space-y-2">
									<Label htmlFor="new-password">Nova senha</Label>
									<Input id="new-password" type="password" required />
								</div>
								<div className="space-y-2">
									<Label htmlFor="confirm-password">Confirme a nova senha</Label>
									<Input id="confirm-password" type="password" required />
								</div>
							</div>
							<AlertDialogFooter>
								<AlertDialogCancel>Cancelar</AlertDialogCancel>
								<AlertDialogAction type="submit">Alterar senha</AlertDialogAction>
							</AlertDialogFooter>
						</form>
					</AlertDialogContent>
				</AlertDialog>

				<AlertDialog open={isDeleteAccountOpen} onOpenChange={setIsDeleteAccountOpen}>
					<AlertDialogTrigger asChild>
						<Button variant="destructive">Excluir conta</Button>
					</AlertDialogTrigger>
					<AlertDialogContent>
						<AlertDialogHeader>
							<AlertDialogTitle>Tem certeza?</AlertDialogTitle>
							<AlertDialogDescription>
								Esta ação é irreversível. Todos os seus dados serão apagados.
							</AlertDialogDescription>
						</AlertDialogHeader>
						<AlertDialogFooter>
							<AlertDialogCancel>Cancelar</AlertDialogCancel>
							<AlertDialogAction onClick={handleDeleteAccount}>
								Deletar conta
							</AlertDialogAction>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialog>
			</CardFooter>
		</Card>
	)
}
