import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Topbar from './components/Topbar'
import AffiliateMembership from './pages/affiliate/AffiliateMembership'
import AffiliatePage from './pages/affiliate/AffiliatePage'
import AddBlog from './pages/blog/AddBlog'
import BlogPage from './pages/blog/BlogPage'
import EditBlog from './pages/blog/EditBlog'
import EnquiriesPage from './pages/Enquiries/EnquiriesPage'
import ReplyEnquiry from './pages/Enquiries/ReplyEnquiry'
import ViewEnquiry from './pages/Enquiries/ViewEnquiry'
import FarmFundPage from './pages/farm-fund-form/FarmFundPage'
import ReplyFarmFundEnquiry from './pages/farm-fund-form/ReplyFarmFundEnquiry'
import ViewFarmFundEnquiry from './pages/farm-fund-form/ViewFarmFundEnquiry'
import AddGallery from './pages/gallery/AddGallery'
import EditGallery from './pages/gallery/EditGallery'
import GalleryPage from './pages/gallery/GalleryPage'
import Dashboard from './pages/home/Dashboard'
import MembershipForm from './pages/membership/MembershipForm'
import MembershipPage from './pages/membership/MembershipPage'
import AddNews from './pages/news/AddNews'
import EditNews from './pages/news/EditNews'
import NewsPage from './pages/news/NewsPage'
import AfricaNitifications from './pages/notification/AfricaNitifications'
import ExportNitifications from './pages/notification/ExportNotifications'
import NotificationPage from './pages/notification/NotificationPage'
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
						{/* home */}
						<Route index element={<Dashboard />} />
						{/* products */}
						<Route path="products" element={<ProductsPage />}>
							<Route path="new" element={<AddProduct />} />
							<Route path="edit/:productId" element={<EditProduct />} />
						</Route>
						{/* news */}
						<Route path="news" element={<NewsPage />}>
							<Route path="new" element={<AddNews />} />
							<Route path="edit/:newsId" element={<EditNews />} />
						</Route>
						{/* blog */}
						<Route path="blog" element={<BlogPage />}>
							<Route path="new" element={<AddBlog />} />
							<Route path="edit/:blogId" element={<EditBlog />} />
						</Route>
						{/* gallery */}
						<Route path="gallery" element={<GalleryPage />}>
							<Route path="new" element={<AddGallery />} />
							<Route path="edit/:imageId" element={<EditGallery />} />
						</Route>
						{/* notifications */}
						<Route path="notification" element={<NotificationPage />}>
							<Route path="africa" element={<AfricaNitifications />} />
							<Route path="export" element={<ExportNitifications />} />
						</Route>
						{/* affiliate */}
						<Route path="affiliate" element={<AffiliatePage />}>
							<Route path=":id" element={<AffiliateMembership />} />
						</Route>
						{/* Enquiries */}
						<Route path="enquiries" element={<EnquiriesPage />}>
							<Route path=":enquiryId" element={<ViewEnquiry />} />
							<Route path="reply/:enquiryId" element={<ReplyEnquiry />} />
						</Route>
						{/* membership */}
						<Route path="membership" element={<MembershipPage />}>
							<Route path=":id" element={<MembershipForm />} />
						</Route>
						{/* farm fund form */}
						<Route path="farm-fund-form" element={<FarmFundPage />}>
							<Route path=":enquiryId" element={<ViewFarmFundEnquiry />} />
							<Route
								path="reply/:enquiryId"
								element={<ReplyFarmFundEnquiry />}
							/>
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
