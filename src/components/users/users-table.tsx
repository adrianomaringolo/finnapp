'use client'

import { useGetUsers } from '@/services/users/useGetUsers'
import { getFunctions, httpsCallable } from 'firebase/functions'
import { EllipsisVertical, Lock, Trash } from 'lucide-react'
import { useState } from 'react'
import { SkeletonTable } from '../loaders/skeleton-table'
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from '../ui/alert-dialog'
import { Button } from '../ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '../ui/table'
import { UserNameDisplay } from './user-name-display'

export const UsersTable = () => {
	const { data: users = [], isLoading } = useGetUsers()

	const [isAdminConfirmOpen, setIsAdminConfirmOpen] = useState(false)
	const [selectedUser, setSelectedUser] = useState({ uid: '' })

	const functions = getFunctions()

	const setAdmin = async (uid: string) => {
		const setAdminClaim = httpsCallable(functions, 'setAdminClaim')

		try {
			const result = await setAdminClaim({ uid })
			const data = result.data as { message: string }
			console.log(data.message) // Success message
		} catch (error: unknown) {
			if (error instanceof Error) {
				console.error('Error setting admin claim:', error.message)
			} else {
				console.error('Error setting admin claim:', error)
			}
		}
	}

	if (isLoading) return <SkeletonTable rows={5} columns={3} />

	return (
		<>
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>Nome</TableHead>
						<TableHead>E-mail</TableHead>
						<TableHead></TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{users.map((user) => {
						return (
							<TableRow key={user.uid}>
								<TableCell>
									<UserNameDisplay user={user} />
								</TableCell>
								<TableCell>{user.email}</TableCell>
								<TableCell>
									<DropdownMenu>
										<DropdownMenuTrigger asChild>
											<Button
												variant="outline"
												className="relative h-8 w-8 rounded-full "
											>
												<EllipsisVertical className="w-3 h-3" />
											</Button>
										</DropdownMenuTrigger>
										<DropdownMenuContent className="w-56" align="end" forceMount>
											<DropdownMenuItem
												onClick={() => {
													setSelectedUser(user)
													setIsAdminConfirmOpen(true)
												}}
											>
												<Lock className="mr-2 h-4 w-4" />
												<span>Definir como administrador</span>
											</DropdownMenuItem>

											<DropdownMenuItem onClick={() => {}}>
												<Trash className="mr-2 h-4 w-4" />
												<span>Excluir dados do usuário</span>
											</DropdownMenuItem>
										</DropdownMenuContent>
									</DropdownMenu>
								</TableCell>
							</TableRow>
						)
					})}
				</TableBody>
			</Table>

			<AlertDialog open={isAdminConfirmOpen} onOpenChange={setIsAdminConfirmOpen}>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>
							Tem certeza que deseja promover esse usuário a ADMINISTRADOR?
						</AlertDialogTitle>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>Cancelar</AlertDialogCancel>
						<AlertDialogAction onClick={() => setAdmin(selectedUser.uid)}>
							Sim
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</>
	)
}
