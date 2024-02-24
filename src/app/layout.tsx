import type { Metadata } from 'next'
import { Raleway } from 'next/font/google'
import './globals.scss'

const raleway = Raleway({ subsets: ['latin'], display: 'swap' })

export const metadata: Metadata = {
	title: 'resee - Resume Creator App',
	description: 'Best resume creator app in the world!',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en">
			<body className={raleway.className}>{children}</body>
		</html>
	)
}
