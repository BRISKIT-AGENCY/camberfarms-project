import { IoClose } from 'react-icons/io5'
import OverlayWrapper from '../../components/OverlayWrapper'
import { useGoBack } from '../../hooks/useGoBack'

export default function AddNews() {
	const goBack = useGoBack('/news')

	return (
		<OverlayWrapper>
			<div className="w-full pb-2">
				<div className="w-full flex items-center justify-between gap-6 pb-4 mb-6 border-b border-grey/50">
					<h1
						id="page-title"
						className="text-2xl lg:text-3xl capitalize font-bold"
					>
						add new article
					</h1>
					<IoClose size={30} className="cursor-pointer" onClick={goBack} />
				</div>
				<section className="">
					<form className="w-full py-6 space-y-4">
						{/* title */}
						<label className="w-full flex flex-col gap-1">
							<span className="text-grey text-sm">Article Title</span>
							<input
								type="text"
								required
								className="w-full p-2 border-2 border-grey/40 rounded-md focus-within:outline-0 focus-within:border-primary transition-all ease-in duration-200"
								placeholder="Enter title"
								name="title"
							/>
						</label>
						{/* category */}
						<label className="w-full flex flex-col gap-1">
							<span className="text-grey text-sm">Category</span>
							<input
								type="text"
								required
								className="w-full p-2 border-2 border-grey/40 rounded-md focus-within:outline-0 focus-within:border-primary transition-all ease-in duration-200"
								placeholder="Enter article category"
								name="category"
							/>
						</label>
						<fieldset className="w-full grid grid-cols-2 gap-6">
							{/* date */}
							<label className="w-full flex flex-col gap-1">
								<span className="text-grey text-sm">Date</span>
								<input
									type="date"
									required
									className="w-full p-2 border-2 border-grey/40 rounded-md focus-within:outline-0 focus-within:border-primary transition-all ease-in duration-200"
									placeholder="Select date"
									name="date"
								/>
							</label>
							{/* image */}
							<label className="w-full flex flex-col gap-1">
								<span className="text-grey text-sm">Upload image</span>
								<input
									type="file"
									name="image"
									id="image"
									accept="image/*"
									multiple={false}
									className="w-full p-2 border-2 border-grey/40 rounded-md focus-within:outline-0 focus-within:border-primary transition-all ease-in duration-200"
								/>
							</label>
						</fieldset>

						<label className="w-full flex flex-col gap-1 mt-6">
							<span className="text-grey text-sm">Article Content</span>
							<textarea
								name="description"
								id="description"
								placeholder="Write your article contents here..."
								className="w-full h-28 p-2 resize-y border-2 border-grey/40 rounded-md field-sizing-content focus-within:outline-0 focus-within:border-primary transition-all ease-in duration-200"
							></textarea>
						</label>
						<div className="w-full flex gap-6 items-center justify-end py-6 mt-8 border-t border-grey/50">
							<button
								type="button"
								onClick={goBack}
								className="bg-light-grey text-dark-grey font-poppins font-medium text-base py-2 px-4 rounded-lg cursor-pointer"
							>
								Cancel
							</button>
							<button
								type="submit"
								className="bg-primary text-white font-poppins font-medium text-base py-2 px-4 rounded-lg cursor-pointer"
							>
								Upload Article
							</button>
						</div>
					</form>
				</section>
			</div>
		</OverlayWrapper>
	)
}
