export interface Column<T> {
	header: string
	key: keyof T | string
	// custom renderer for complex cells
	render?: (item: T) => React.ReactNode
}

interface TableProps<T> {
	columns: Column<T>[]
	data: T[]
	wrapContent?: boolean
}

export function Table<T extends { id: string | number }>({
	columns,
	data,
	wrapContent = false,
}: TableProps<T>) {
	return (
		<table className="w-full table-auto bg-white shadow-2xs px-4">
			<thead className="bg-grey/10 text-[#030303] capitalize rounded-2xl">
				<tr>
					{columns.map((col) => (
						<th
							key={String(col.key)}
							scope="col"
							className="py-2 first:text-start first:pl-4 last:pr-4 last:text-center"
						>
							{col.header}
						</th>
					))}
				</tr>
			</thead>
			<tbody>
				{data.map((item) => (
					<tr
						key={item.id}
						className="border-t border-grey/20 text-dark-grey font-inter"
					>
						{columns.map((col) => (
							<td
								key={String(col.key)}
								className={`p-4 capitalize text-center text-[12px] lg:text-base ${wrapContent ? 'min-w-fit text-wrap' : 'min-w-max text-nowrap'}`}
							>
								{/* Use custom render if provided, otherwise default to the key value */}
								{col.render
									? col.render(item)
									: (item[col.key as keyof T] as React.ReactNode)}
							</td>
						))}
					</tr>
				))}
			</tbody>
		</table>
	)
}
