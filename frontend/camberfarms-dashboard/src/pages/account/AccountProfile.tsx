import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { IoClose } from 'react-icons/io5'
import { MdVerified } from 'react-icons/md'
import axiosInstance from '../../api/axios'
import editIcon from '../../assets/icon/edit.svg'
import userAvatar from '../../assets/img/user-avatar.png'
import { Dropzone } from '../../components/Dropzone'
import OverlayWrapper from '../../components/OverlayWrapper'
import type { User } from '../../context/AuthContext'
import { formatImgUrl } from '../../helpers/formatImgUrl'
import { useAuth } from '../../hooks/useAuth'

type ChangeProfile = {
	success: boolean
	message: string
	profilePhoto: string
}

const baseURL = 'https://api.camberfarms.org/'

export default function AccountProfile() {
	const { dispatch } = useAuth()
	const user: User = JSON.parse(localStorage.getItem('user') || '')!
	const [profileImg, setProfileImg] = useState<File | null>(null)
	const [avatar, setAvatar] = useState(
		formatImgUrl(user?.profilePhoto) || userAvatar,
	)
	const [showForm, setShowForm] = useState(false)
	const { mutateAsync, isPending } = useMutation({
		mutationFn: async (data: FormData) => {
			const res = await axiosInstance.post('/profile-photo', data)
			return res.data
		},
		onSuccess: (data: ChangeProfile) => {
			const url = data.profilePhoto.replace(baseURL, '')
			dispatch({ type: 'CHANGE_PROFILE', url })
			setAvatar(`${baseURL}/${url}`)
			user.profilePhoto = url
			localStorage.setItem('user', JSON.stringify(user))
		},
		onError: (error) => {
			toast.error(error.message)
		},
	})

	async function handleSubmit() {
		const formData = new FormData()
		if (!profileImg) {
			throw new Error('Image is required')
		}

		formData.append('profilePhoto', profileImg)
		await mutateAsync(formData)
		// console.log('data: ', data)
		setShowForm(false)
	}

	return (
		<div className="w-full mb-4 rounded-t-xl bg-[url('./account-bg1.png')] bg-no-repeat bg-cover bg-top-left">
			<div className="w-full from-[#11881A99] via-[#11881A90] to-[#1AD32999] bg-linear-360 text-white px-6 py-10 mt-6 rounded-t-xl flex items-center">
				<div className="w-28 lg:w-32 aspect-square ml-2 mr-6 border border-primary rounded-full">
					<img
						src={avatar}
						alt=""
						className="object-fill object-center w-full h-full rounded-full"
					/>
				</div>
				<div className="w-fit flex flex-col gap-1">
					<h4 className="text-2xl lg:text-3xl">Super Admin</h4>
					<p className="flex gap-1 items-center">
						Account verified <MdVerified size={20} />
					</p>
				</div>
				<button
					type="button"
					onClick={() => setShowForm(true)}
					className="ml-auto flex items-center gap-2 bg-white text-secondary py-1 px-4 rounded-lg text-sm font-semibold cursor-pointer"
				>
					Change picture{' '}
					<img src={editIcon} className="w-8 aspect-square" alt="" />
				</button>
				{showForm && (
					<OverlayWrapper fullWidth={false}>
						<div className="w-lg aspect-video p-4 relative flex flex-col items-center justify-center">
							<IoClose
								size={40}
								onClick={() => setShowForm(false)}
								className="self-end p-2 bg-light-grey dark:bg-dark-grey rounded-full cursor-pointer"
							/>
							<Dropzone setState={setProfileImg} />
							<button
								type="button"
								onClick={handleSubmit}
								disabled={profileImg === null || isPending}
								className="flex items-center mt-6 bg-primary text-white py-2 px-4 rounded-lg font-semibold cursor-pointer disabled:opacity-50"
							>
								Save changes
							</button>
						</div>
					</OverlayWrapper>
				)}
			</div>
		</div>
	)
}
// to-[#1AD32980] via-[#11881A80] from-[#11881A60] bg-linear-360
