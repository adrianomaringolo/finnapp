import { Button, usePWAInstall } from 'buildgrid-ui'
import { Download, HelpCircle } from 'lucide-react'
import React, { useState } from 'react'

const InstallPWAButton: React.FC = () => {
	const { isPromptReady, isInstalled, showInstallPrompt } = usePWAInstall()
	const [showIOSPrompt, setShowIOSPrompt] = useState(false)

	const handleIOSPrompt = () => setShowIOSPrompt(true)
	const closeIOSPrompt = () => setShowIOSPrompt(false)

	// Detect iOS
	const isIOSDevice =
		typeof window !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent)

	if (isInstalled || !isPromptReady) return null // Hide button if already installed

	console.log(isInstalled, isPromptReady)

	return (
		<div className="flex flex-col items-center">
			{isIOSDevice ? (
				<>
					<Button variant="secondary" onClick={handleIOSPrompt}>
						<HelpCircle className="w-6 h-6" />
						Como instalar
					</Button>
					{showIOSPrompt && (
						<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
							<div className="bg-white p-6 rounded shadow-lg">
								<h2 className="text-lg font-bold">
									Instale esse app em seu dispositivo Apple
								</h2>
								<p className="mt-2">Para instalar esse app em seu iPhone ou iPad:</p>
								<ol className="mt-2 list-decimal list-inside">
									<li>
										Clique no botão <strong>Compartilhar</strong> no Safari.
									</li>
									<li>
										Mova para baixo e selecione a opção{' '}
										<strong>Adicionar a tela inicial</strong>.
									</li>
									<li>Siga as instruções na tela para adicionar.</li>
								</ol>
								<div className="text-right">
									<button
										onClick={closeIOSPrompt}
										className="mt-4 py-2 px-4 bg-gray-500 text-white rounded"
									>
										Fechar
									</button>
								</div>
							</div>
						</div>
					)}
				</>
			) : (
				<Button variant="secondary" onClick={showInstallPrompt}>
					<Download className="w-6 h-6" /> Instalar app
				</Button>
			)}
		</div>
	)
}

export default InstallPWAButton
