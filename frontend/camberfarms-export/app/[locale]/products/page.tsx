import Header from './Header'
import Products from './Products'

export default async function ProductsPage({ params }: PageProps<'/[locale]'>) {
	// import locale to page
	const { locale } = await params
	return (
		<div className="flex flex-col w-full min-h-screen items-center justify-center bg-light-grey text-foreground font-inter relative">
			<main className="flex min-h-screen w-full flex-col items-center justify-between">
				<Header />
				<Products />
			</main>
		</div>
	)
}
