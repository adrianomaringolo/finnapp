export const Privacy = () => {
	const pClasses = 'mb-2'
	const h2Classes = 'text-lg font-semibold mt-4 mb-2'

	return (
		<section>
			<h1 className="text-xl font-semibold mb-4">
				Política de Privacidade do Amigo do Bolso
			</h1>

			<p className={pClasses}>
				Esta Política de Privacidade descreve como coletamos, usamos e protegemos suas
				informações ao utilizar o aplicativo Amigo do Bolso. Nosso compromisso é garantir
				a segurança e a privacidade de seus dados.
			</p>

			<h2 className={h2Classes}>1. Informações Coletadas</h2>
			<p className={pClasses}>
				Para acessar o Amigo do Bolso, solicitamos que você crie uma conta fornecendo seu
				nome, e-mail e senha. Também oferecemos a opção de login por meio de contas do
				Google e Facebook. Em ambos os casos, não coletamos informações adicionais além
				das fornecidas por você.
			</p>

			<h2 className={h2Classes}>2. Uso das Informações</h2>
			<p className={pClasses}>
				As informações coletadas são utilizadas exclusivamente para:
			</p>

			<p className={pClasses}>Criar e manter sua conta no aplicativo Amigo do Bolso.</p>
			<p className={pClasses}>
				Proporcionar uma experiência personalizada de acesso e navegação.
			</p>
			<p className={pClasses}>
				Não compartilhamos, vendemos ou divulgamos suas informações a terceiros, exceto
				quando necessário para cumprir obrigações legais.
			</p>

			<h2 className={h2Classes}>3. Segurança dos Dados</h2>
			<p className={pClasses}>
				Adotamos medidas de segurança para proteger suas informações contra acessos não
				autorizados, perda ou alteração. No entanto, nenhuma transmissão de dados pela
				internet é totalmente segura, e não podemos garantir a segurança absoluta dos
				dados transmitidos.
			</p>

			<h2 className={h2Classes}>4. Alterações nesta Política</h2>
			<p className={pClasses}>
				Reservamo-nos o direito de modificar esta política de privacidade a qualquer
				momento. Qualquer alteração será publicada nesta página, e recomendamos que você
				revise a política periodicamente.
			</p>

			<h2 className={h2Classes}>5. Contato</h2>
			<p className={pClasses}>
				Se tiver dúvidas ou preocupações sobre nossa política de privacidade, entre em
				contato conosco pelo e-mail: [seu-email@dominio.com].
			</p>
		</section>
	)
}
