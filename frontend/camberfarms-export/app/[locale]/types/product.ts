export type ProductVariants = Record<string, string | number>

export type Product = {
	createAt: string
	images: string[]
	status: 'active' | 'inactive'
	stockQuantity: number
	updatedAt: string
	_id: string
	category: string
	description: string
	name: string
	variants?: ProductVariants[]
}
