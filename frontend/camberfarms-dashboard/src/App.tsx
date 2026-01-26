import { Suspense, lazy } from 'react'
import {
	Navigate,
	Route,
	BrowserRouter as Router,
	Routes,
} from 'react-router-dom'
import Loading from './components/Loading'
import Sidebar from './components/Sidebar'
import Topbar from './components/Topbar'
import NotFound from './pages/NotFound'
const ForgotPassword = lazy(() => import('./pages/account/ForgotPassword'))
const PasswordSuccess = lazy(() => import('./pages/account/PasswordSuccess'))
const ResetPassword = lazy(() => import('./pages/account/ResetPassword'))
const Theme = lazy(() => import('./pages/account/Theme'))
const AffiliateMembership = lazy(
	() => import('./pages/affiliate/AffiliateMembership'),
)
const AffiliatePage = lazy(() => import('./pages/affiliate/AffiliatePage'))
const AddBlog = lazy(() => import('./pages/blog/AddBlog'))
const BlogPage = lazy(() => import('./pages/blog/BlogPage'))
const EditBlog = lazy(() => import('./pages/blog/EditBlog'))
const EnquiriesPage = lazy(() => import('./pages/Enquiries/EnquiriesPage'))
const ReplyEnquiry = lazy(() => import('./pages/Enquiries/ReplyEnquiry'))
const ViewEnquiry = lazy(() => import('./pages/Enquiries/ViewEnquiry'))

const FarmFundPage = lazy(() => import('./pages/farm-fund-form/FarmFundPage'))
const ReplyFarmFundEnquiry = lazy(
	() => import('./pages/farm-fund-form/ReplyFarmFundEnquiry'),
)
const ViewFarmFundEnquiry = lazy(
	() => import('./pages/farm-fund-form/ViewFarmFundEnquiry'),
)
const AddGallery = lazy(() => import('./pages/gallery/AddGallery'))
const EditGallery = lazy(() => import('./pages/gallery/EditGallery'))
const GalleryPage = lazy(() => import('./pages/gallery/GalleryPage'))
const Dashboard = lazy(() => import('./pages/home/Dashboard'))
const MembershipForm = lazy(() => import('./pages/membership/MembershipForm'))
const MembershipPage = lazy(() => import('./pages/membership/MembershipPage'))
const AddNews = lazy(() => import('./pages/news/AddNews'))
const EditNews = lazy(() => import('./pages/news/EditNews'))
const NewsPage = lazy(() => import('./pages/news/NewsPage'))
const AfricaNitifications = lazy(
	() => import('./pages/notification/AfricaNitifications'),
)
const ExportNitifications = lazy(
	() => import('./pages/notification/ExportNotifications'),
)
const NotificationPage = lazy(
	() => import('./pages/notification/NotificationPage'),
)
const AddProduct = lazy(() => import('./pages/products/AddProduct'))
const EditProduct = lazy(() => import('./pages/products/EditProduct'))
const ProductsPage = lazy(() => import('./pages/products/ProductsPage'))
const AccountPage = lazy(() => import('./pages/account/AccountPage'))

export default function App() {
	return (
		<Router>
			<Suspense fallback={<Loading />}>
				<section className="hidden w-full min-h-screen sm:grid grid-cols-[75px_auto] lg:grid-cols-[250px_auto] bg-light-grey dark:bg-dark-grey text-foreground dark:text-background">
					<Sidebar />
					<main className="w-full space-y-6 overflow-y-auto dark:bg-dark-grey">
						<Topbar name="john doe" />
						<Routes>
							{/* home */}
							<Route index element={<Dashboard />} />
							{/* products */}
							<Route path="products" element={<ProductsPage />}>
								<Route path="new" element={<AddProduct />} />
								<Route path="edit/:productId" element={<EditProduct />} />
								{/* if user goes to products/[id] redirect back to products */}
								<Route path=":id" element={<Navigate to={'/products'} />} />
							</Route>
							{/* news */}
							<Route path="news" element={<NewsPage />}>
								<Route path="new" element={<AddNews />} />
								<Route path="edit/:newsId" element={<EditNews />} />
								{/* if user goes to news/[id] redirect back to news */}
								<Route path=":id" element={<Navigate to={'/news'} />} />
							</Route>
							{/* blog */}
							<Route path="blog" element={<BlogPage />}>
								<Route path="new" element={<AddBlog />} />
								<Route path="edit/:blogId" element={<EditBlog />} />
								{/* if user goes to blog/[id] redirect back to blog */}
								<Route path=":id" element={<Navigate to={'/blog'} />} />
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
							{/* account */}
							<Route path="account" element={<AccountPage />}>
								<Route path="theme" element={<Theme />} />
								<Route path="iforgot" element={<ForgotPassword />} />
								<Route path="reset-password" element={<ResetPassword />} />
								<Route path="reset-success" element={<PasswordSuccess />} />
							</Route>
							{/* 404 */}
							<Route path="*" element={<NotFound />} />
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
			</Suspense>
		</Router>
	)
}
