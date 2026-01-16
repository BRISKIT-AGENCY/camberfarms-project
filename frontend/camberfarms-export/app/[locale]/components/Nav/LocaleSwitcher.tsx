'use client'

// import i18n from '@/i18n'
// import { useTranslation } from "react-i18next"
import Image from 'next/image'
import { useRef, useState } from 'react'
import arrowDown from '../../assets/icon/arrow-down.svg'
import { useClickOutside } from '../../hooks/useClickOutside'

import { usePathname, useRouter } from '@/i18n/navigation'
import { useLocale } from 'next-intl'

const LANGUAGES = [
	{ label: 'English', code: 'en', flag: 'https://flagcdn.com/w40/gb.png' },
	{ label: 'Français', code: 'fr', flag: 'https://flagcdn.com/w40/fr.png' },
	{ label: 'Español', code: 'es', flag: 'https://flagcdn.com/w40/es.png' },
	{ label: 'português', code: 'pt', flag: 'https://flagcdn.com/w40/pt.png' },
	{ label: 'italiano', code: 'it', flag: 'https://flagcdn.com/w40/it.png' },
	{ label: 'русский', code: 'ru', flag: 'https://flagcdn.com/w40/ru.png' },
	{ label: '普通話', code: 'cn', flag: 'https://flagcdn.com/w40/cn.png' },
	{ label: 'Nederlands', code: 'nl', flag: 'https://flagcdn.com/w40/nl.png' },
	{ label: 'Deutch', code: 'de', flag: 'https://flagcdn.com/w40/de.png' },
	{ label: 'العربية', code: 'sa', flag: 'https://flagcdn.com/w40/sa.png' },
]

export default function LocaleSwitcher() {
	const [isOpen, setIsOpen] = useState(false)

	const locale = useLocale()
	const pathname = usePathname()
	const router = useRouter()

	const changeLocale = (newLocale: string) => {
		// router.push(`/${newLocale}${pathname.replace(/^\/(en|fr)/, '')}`)
		if (newLocale !== locale) {
			router.replace(pathname, { locale: newLocale })
			router.refresh()
		}
	}

	const close = () => setIsOpen(false)
	const ref = useRef<HTMLDivElement | null>(null)
	// close menu when user clicks outside
	useClickOutside(ref, close)
	// const {t} = useTranslation('nav')

	const currentLang = LANGUAGES.find((l) => l.code === locale) ?? LANGUAGES[0]

	return (
		<div className="relative" ref={ref}>
			<button
				onClick={() => setIsOpen((prev) => !prev)}
				className="flex items-center gap-1.25 uppercase cursor-pointer"
			>
				<Image
					src={currentLang.flag}
					alt={currentLang.label}
					width={34}
					height={34}
					className="w-8 aspect-square rounded-full object-center object-cover"
				/>
				<span className="uppercase">{currentLang.label.slice(0, 3)}</span>
				<Image src={arrowDown} alt="Arrow Down" width={24} height={24} />
			</button>

			{isOpen && (
				<div className="absolute mt-2 ml-4 bg-white border rounded-lg shadow-md right-0 w-max px-2">
					{LANGUAGES.map((lang) => (
						<button
							key={lang.code}
							onClick={() => {
								changeLocale(lang.code)
								close()
							}}
							className="flex items-center gap-2 px-4 py-2 w-full hover:bg-gray-100 text-black cursor-pointer"
						>
							<Image src={lang.flag} alt="flag" width={20} height={20} />
							<span>{lang.label}</span>
						</button>
					))}
				</div>
			)}
		</div>
	)
}
