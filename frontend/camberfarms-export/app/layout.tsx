import type { Metadata } from 'next'
import { Inter, Manrope, Poppins } from 'next/font/google'
import Footer from './components/Footer'
import Navbar from './components/Nav/Navbar'
import './globals.css'

const poppins = Poppins({
	variable: '--font-poppins',
	subsets: ['latin'],
	weight: ['400', '500', '600', '700'],
})
const manrope = Manrope({
	variable: '--font-manrope',
	subsets: ['latin'],
	weight: ['600', '700'],
})

const inter = Inter({
	variable: '--font-inter',
	subsets: ['latin'],
})

export const metadata: Metadata = {
	title: 'CamberFarms Export',
	description: 'A B2B agricultural export showcase website.',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en">
			<body
				className={`${poppins.variable} ${inter.variable} ${manrope.variable} antialiased`}
			>
				<Navbar />
				{children}
				<Footer />
			</body>
		</html>
	)
}
