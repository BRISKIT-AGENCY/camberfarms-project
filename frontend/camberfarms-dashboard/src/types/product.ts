export type Product = {
	createAt: string
	images: string[]
	status: 'active' | 'inactive'
	stockQuantity: number
	updatedAt: string
	_id: string
	translations: {
		en: {
			category: string
			description: string
			name: string
			variants: {
				weight?: string
				type?: string
				packageSize?: string
				variety?: string
			}
		}
	}
}

export type ProductStats = {
	monthly: {
		changeFromPreviousMonth: number | null
		changePercentage: number | null
		month: number
		totalAdded: number
		year: number
	}[]
}

export type ProductVariants = Record<string, string | number>

export type CreateProduct = {
	name: string
	category: string
	description: string
	stockQuantity?: number
	variants?: ProductVariants
	images: File[]
}

export type EditProductType = {
	_id: string
	name: string
	category: string
	description: string
	stockQuantity: number
	variants?: ProductVariants
	images?: File[] | string[]
}
