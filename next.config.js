/* eslint-disable @typescript-eslint/no-require-imports */
/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')({
	dest: 'public',
})

module.exports = withPWA({
	experimental: {
		missingSuspenseWithCSRBailout: false,
	},
})
