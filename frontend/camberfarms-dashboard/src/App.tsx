import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Topbar from './components/Topbar'
import Dashboard from './pages/home/Dashboard'
import Products from './pages/products/Products'

export default function App() {
	return (
		<Router>
			<section className="hidden w-full h-dvh sm:grid grid-cols-[200px_auto] bg-light-grey text-foreground">
				<Sidebar />
				<main className="w-full space-y-6 overflow-y-auto">
					<Topbar />
					<Routes>
						<Route index element={<Dashboard />} />
						<Route path="/products" element={<Products />} />
					</Routes>
				</main>
			</section>
			{/* hide from users on mobile */}
			<div
				className="sm:hidden w-full h-screen flex items-center justify-center p-10 text-center"
				role="alert"
			>
				This site requires a larger screen to function properly.
			</div>
		</Router>
	)
}
