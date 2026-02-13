import { useCallback, useState } from 'react'
import { v4 as uuid } from 'uuid'

export type Section = {
	_id: string
	heading?: string
	paragraphs: string[]
}

export function useBlogSections(initialSections: Section[] = []) {
	const [sections, setSections] = useState<Section[]>(initialSections)

	const addSection = useCallback(() => {
		setSections((prev) => [
			...prev,
			{
				_id: uuid(),
				heading: '',
				paragraphs: [''],
			},
		])
	}, [])

	const removeSection = useCallback((id: string) => {
		setSections((prev) => prev.filter((section) => section._id !== id))
	}, [])

	const updateHeading = useCallback((id: string, value: string) => {
		setSections((prev) =>
			prev.map((section) =>
				section._id === id ? { ...section, heading: value } : section,
			),
		)
	}, [])

	const addParagraph = useCallback((sectionId: string) => {
		setSections((prev) =>
			prev.map((section) =>
				section._id === sectionId
					? {
							...section,
							paragraphs: [...section.paragraphs, ''],
						}
					: section,
			),
		)
	}, [])

	const updateParagraph = useCallback(
		(sectionId: string, index: number, value: string) => {
			setSections((prev) =>
				prev.map((section) => {
					if (section._id !== sectionId) return section

					const updatedParagraphs = [...section.paragraphs]
					updatedParagraphs[index] = value

					return {
						...section,
						paragraphs: updatedParagraphs,
					}
				}),
			)
		},
		[],
	)

	const removeParagraph = useCallback((sectionId: string, index: number) => {
		setSections((prev) =>
			prev.map((section) =>
				section._id === sectionId
					? {
							...section,
							paragraphs: section.paragraphs.filter((_, i) => i !== index),
						}
					: section,
			),
		)
	}, [])

	return {
		sections,
		setSections,
		addSection,
		removeSection,
		updateHeading,
		addParagraph,
		updateParagraph,
		removeParagraph,
	}
}
