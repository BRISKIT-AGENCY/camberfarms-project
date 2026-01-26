export default function Loading() {
	return (
		<aside className="w-full h-dvh sm:grid grid-cols-[75px_auto] lg:grid-cols-[250px_auto] bg-white dark:bg-black fixed inset-0 z-40 animate-pulse">
			<div className="w-full h-full bg-grey/20 dark:bg-dark-grey"></div>
			<div className="w-full h-full grid grid-rows-[80px_auto] gap-6 space-y-6">
				<div className="w-full h-full bg-grey/10 dark:bg-dark-grey shadow-sm"></div>
				<div className="w-[95%] h-[95%] flex flex-col gap-4 mx-auto shadow-sm rounded-lg bg-grey/10 dark:bg-dark-grey"></div>
			</div>
		</aside>
	)
}
