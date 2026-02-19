import { Product } from '../types/product'

export type UniqueProduct = {
	category: string
	_id: string
	name: string
	images: string[]
}

export function getUniqueCategories(products: Product[]): UniqueProduct[] {
	return Object.values(
		products.reduce<Record<string, UniqueProduct>>(
			(acc, { category, _id, name, images }) => {
				if (!acc[category]) {
					acc[category] = { category, _id, name, images }
				}
				return acc
			},
			{},
		),
	)
}
