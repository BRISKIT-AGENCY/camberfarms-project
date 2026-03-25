export default function LoadingAbout() {
	return (
		<aside className="relative min-h-screen flex items-center justify-center bg-white">
			{/* Dark background behind navbar */}
			<div className="hidden lg:block absolute top-0 left-0 w-full h-24 bg-dark-grey" />
			{/* Loader content */}
			<section className="flex flex-col items-center space-y-4 z-10">
				<div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-primary" />
				<p className="text-sm text-dark-grey">Loading...</p>
			</section>
		</aside>
	)
}
