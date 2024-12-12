'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
} from '@/components/ui/navigation-menu'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { useUser } from '@/lib/hooks/use-user'
import { createClient } from '@/lib/supabase/client'
import { cn } from '@/lib/utils/cn'
import {
	ChartPie,
	DollarSign,
	HelpCircle,
	Lock,
	LogOut,
	LucideIcon,
	Menu,
	User,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useDialog } from '../dialog-context'

const NavLinks = ({
	navItems,
}: {
	navItems: Array<{ icon: LucideIcon; name: string; href: string }>
}) => (
	<NavigationMenuList className="flex flex-col md:flex-row items-baseline">
		{navItems.map(({ icon: Icon, name, href }) => (
			<NavigationMenuItem key={name}>
				<NavigationMenuLink asChild>
					<Link
						href={href}
						className={cn(
							'block select-none space-y-1 rounded-md p-3 leading-none',
							'no-underline outline-none transition-colors hover:bg-accent flex gap-2 items-center',
							'hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
						)}
					>
						{Icon && <Icon className="h-5 w-5" />}
						{name}
					</Link>
				</NavigationMenuLink>
			</NavigationMenuItem>
		))}
	</NavigationMenuList>
)

export function ResponsiveNav() {
	const router = useRouter()
	const supabase = createClient()

	const dialog = useDialog()

	const { user } = useUser()
	const isAdmin = false
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

	const navItems = [
		{ icon: DollarSign, name: 'Lançamentos', href: '/lancamentos' },
		{ icon: ChartPie, name: 'Relatórios', href: '/relatorios' },
		{ icon: HelpCircle, name: 'Como usar', href: '/ajuda' },
	]

	async function handleLogoutClick() {
		dialog.confirm({
			icon: LogOut,
			title: 'Encerrar sessão',
			message: 'Deseja realmente encerrar sua sessão?',
			onConfirm: async () => {
				await supabase.auth.signOut()
				router.push('/login')
				router.refresh()
			},
			displayCancel: true,
			confirmLabel: 'Encerrar',
			cancelLabel: 'Cancelar',
		})
	}

	const userNames = user?.name?.split(' ') ?? []

	const userInitials = `${userNames[0]?.[0]}${userNames[userNames.length - 1]?.[0]}`

	return (
		<>
			<header
				className={cn(
					'sticky top-0 z-50 px-4 w-full border-b bg-[#383938]',
					'backdrop-blur text-white',
				)}
			>
				<div className="flex h-14 items-center w-full">
					<div className="mr-4 hidden md:flex">
						<Link href="/" className="mr-6 flex items-center space-x-2">
							<Image
								src="/logo-letter-white.png"
								alt="Logo Amigo do Bolso"
								width={150}
								height={100}
							/>
						</Link>
						<NavigationMenu>
							<NavLinks navItems={navItems} />
						</NavigationMenu>
					</div>

					<Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
						<SheetTrigger asChild>
							<Button
								variant="ghost"
								className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
							>
								<Menu className="h-5 w-5" />
								<span className="sr-only">Toggle Menu</span>
							</Button>
						</SheetTrigger>
						<SheetContent side="left" className="pr-0">
							<Link
								href="/"
								className="flex items-center"
								onClick={() => setIsMobileMenuOpen(false)}
							>
								<Link href="/" className="mr-6 flex items-center space-x-2">
									<Image
										src="/logo-letter-white.png"
										alt="Logo Amigo do Bolso"
										width={150}
										height={100}
									/>
								</Link>
							</Link>
							<div className="my-4 h-[calc(100vh-8rem)] pb-10">
								<NavigationMenu orientation="vertical">
									<NavLinks navItems={navItems} />
								</NavigationMenu>
							</div>
						</SheetContent>
					</Sheet>

					<div className="flex items-center ml-auto">
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button variant="ghost" className="relative h-8 w-8 rounded-full ">
									<Avatar className="h-8 w-8">
										<AvatarImage src={user?.picture as string} alt="Foto de perfil" />
										<AvatarFallback className="bg-income">{userInitials}</AvatarFallback>
									</Avatar>
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent className="w-56" align="end" forceMount>
								{isAdmin && (
									<DropdownMenuItem asChild>
										<Link href="/admin">
											<Lock className="mr-2 h-4 w-4" />
											<span>Administração</span>
										</Link>
									</DropdownMenuItem>
								)}
								<DropdownMenuItem asChild>
									<Link href="/perfil">
										<User className="mr-2 h-4 w-4" />
										<span>Meu perfil</span>
									</Link>
								</DropdownMenuItem>
								<DropdownMenuItem onClick={handleLogoutClick}>
									<LogOut className="mr-2 h-4 w-4" />
									<span>Encerrar</span>
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				</div>
			</header>
		</>
	)
}
