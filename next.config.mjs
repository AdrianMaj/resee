/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'res.cloudinary.com',
				port: '',
				pathname: '/dcl15uhh0/image/**',
			},
		],
	},
	experimental: {
		serverActions: {
			bodySizeLimit: '10mb',
		},
	},
	webpack: config => {
		config.resolve.alias.canvas = false
		return config
	},
}
export default nextConfig
