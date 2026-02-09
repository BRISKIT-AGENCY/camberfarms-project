import { useEffect, useState } from 'react'

type VariantRow = {
	key: string
	value: string
}

interface VariantsEditorProps {
	value?: Record<string, string | number>
	onChange: (variants: Record<string, string | number>) => void
}

export function AddVariants({ value = {}, onChange }: VariantsEditorProps) {
	const [rows, setRows] = useState<VariantRow[]>([])

	// Initialize from value
	useEffect(() => {
		const initialRows = Object.entries(value).map(([key, val]) => ({
			key,
			value: String(val),
		}))
		setRows(initialRows)
	}, [value])

	const emitChange = (nextRows: VariantRow[]) => {
		const normalized: Record<string, string | number> = {}

		nextRows.forEach(({ key, value }) => {
			if (!key.trim()) return

			// Auto-cast numbers if possible
			// const num = Number(value)
			normalized[key] = value
		})

		onChange(normalized)
	}

	const updateRow = (index: number, field: 'key' | 'value', val: string) => {
		const next = [...rows]
		next[index] = { ...next[index], [field]: val }
		setRows(next)
		emitChange(next)
	}

	const addRow = () => {
		const next = [...rows, { key: '', value: '' }]
		setRows(next)
	}

	const removeRow = (index: number) => {
		const next = rows.filter((_, i) => i !== index)
		setRows(next)
		emitChange(next)
	}

	return (
		<div
			style={{ display: 'grid', gap: 8 }}
			onKeyUp={(e) => {
				e.preventDefault()
				if (e.key === 'Enter') addRow()
			}}
		>
			{rows.map((row, index) => (
				<div key={index} className="flex gap-8 mt-4">
					<input
						placeholder="Property"
						value={row.key}
						onChange={(e) => updateRow(index, 'key', e.target.value)}
						maxLength={35}
						minLength={2}
						className="w-full h-10 p-2 resize-y border-2 border-grey/40 rounded-md focus-within:outline-0 focus-within:border-primary transition-all ease-in duration-200"
					/>

					<input
						placeholder="Value"
						value={row.value}
						onChange={(e) => updateRow(index, 'value', e.target.value)}
						className="w-full h-10 p-2 resize-y border-2 border-grey/40 rounded-md focus-within:outline-0 focus-within:border-primary transition-all ease-in duration-200"
					/>

					<button type="button" onClick={() => removeRow(index)}>
						✕
					</button>
				</div>
			))}

			<button type="button" onClick={addRow} className="text-primary">
				+ Add variant
			</button>
		</div>
	)
}
