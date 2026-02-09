import { useCallback, useState } from 'react'
import { useDropzone, type FileWithPath } from 'react-dropzone'
import { IoIosCloseCircle } from 'react-icons/io'
import { IoImageOutline } from 'react-icons/io5'

type DropZoneProps = {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	setState: (file: any) => void
	image?: string
	isMultiple?: boolean
	styleVariant?: string
}

export function Dropzone({
	setState,
	isMultiple = false,
	image,
	styleVariant,
}: DropZoneProps) {
	const [preview, setPreview] = useState<string | undefined>(image)
	const [previews, setPreviews] = useState<(string | undefined)[]>([])
	const [imgExists, setImgExists] = useState(false)

	const onDrop = useCallback(
		(acceptedFiles: FileWithPath[]) => {
			if (!acceptedFiles.length) return

			let file, imgUrl

			if (isMultiple) {
				file = acceptedFiles
				const urls = file.map((img) => handleFileChange(img))

				if (!urls) return

				setPreviews(urls)
			} else {
				file = acceptedFiles[0]
				imgUrl = handleFileChange(file)

				if (!imgUrl) return
				setPreview(imgUrl)
			}

			setImgExists(true)
			setState(file)
		},
		[setState, isMultiple],
	)

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
		accept: { 'image/*': [] },
		multiple: isMultiple,
		// if there's a preview image, disable click
		noClick: imgExists,
		disabled: imgExists,
	})

	//
	const handleRemoveImg = () => {
		setPreview(undefined)
		setPreviews([])
		setImgExists(false)
		setState(null)
	}

	//TODO revoke the data uri to avoid memory leaks, run on unmount

	return (
		<div
			{...getRootProps()}
			className={`rounded-lg h-50 flex flex-col items-center justify-center bg-light-grey dark:bg-dark-grey shadow-sm border-2 cursor-pointer ${
				isDragActive
					? 'border-primary border-solid'
					: 'border-grey/40 border-dashed'
			} ${styleVariant}`}
		>
			<input {...getInputProps()} />
			{isDragActive ? (
				<p>Drop the file here ...</p>
			) : !imgExists ? (
				<div className="flex flex-col w-full h-full py-6 bg-white dark:bg-black items-center justify-center gap-3 text-center">
					<IoImageOutline
						size={40}
						className="w-fit object-contain aspect-square"
					/>
					<div className="flex flex-col items-center justify-center gap-2">
						<h6 className="font-semibold font-poppins text-base text-black">
							Drag image here or browse
						</h6>
						<p className="text-grey mb-2 text-sm">
							File type (SVG, PNG, JPG or WEBP)
						</p>
						<button
							type="button"
							className="bg-primary text-white font-poppins font-medium text-base py-2 px-6 rounded-2xl"
						>
							Upload image
						</button>
					</div>
				</div>
			) : (
				<div className="relative flex items-center justify-center w-fit mx-auto h-full">
					<IoIosCloseCircle
						onClick={handleRemoveImg}
						size={40}
						title="clear images"
						role="button"
						className="w-fit rounded-full block absolute top-4 -right-6 text-red-500 bg-white"
					/>
					{preview && (
						<img
							src={preview}
							className="w-auto h-full object-contain inline-block"
							alt="image preview"
							onLoad={() => URL.revokeObjectURL(preview)}
						/>
					)}
					{previews && (
						<div className="w-full flex flex-wrap gap-6">
							{previews.map((img) => (
								<img
									src={img}
									key={img}
									className="w-32 object-contain inline-block"
									alt="image preview"
									onLoad={() => URL.revokeObjectURL(img || '')}
								/>
							))}
						</div>
					)}
				</div>
			)}
		</div>
	)
}

function handleFileChange(file: File): string | undefined {
	// const file = e.target.files[0]
	if (file) {
		if (!file.type.startsWith('image/')) {
			alert('Please select a valid image file.')
			return
		}

		// Check if file size is more than 2MB
		if (file.size > 2 * 1024 * 1024) {
			alert('File size is too big')
			return
		}
		return URL.createObjectURL(file)
	}
}
