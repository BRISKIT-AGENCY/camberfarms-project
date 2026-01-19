import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Topbar from './components/Topbar'
import Dashboard from './pages/home/Dashboard'
import AddProduct from './pages/products/AddProduct'
import EditProduct from './pages/products/EditProduct'
import ProductsPage from './pages/products/ProductsPage'

export default function App() {
	return (
		<Router>
			<section className="hidden w-full h-dvh sm:grid grid-cols-[75px_auto] lg:grid-cols-[250px_auto] bg-light-grey text-foreground">
				<Sidebar />
				<main className="w-full space-y-6 overflow-y-auto">
					<Topbar name="john doe" />
					<Routes>
						<Route index element={<Dashboard />} />
						<Route path="products" element={<ProductsPage />}>
							<Route path="new" element={<AddProduct />} />
							<Route path="edit/:productId?" element={<EditProduct />} />
						</Route>
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
