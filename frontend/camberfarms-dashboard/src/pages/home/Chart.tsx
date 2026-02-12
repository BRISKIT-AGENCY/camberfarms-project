import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis } from 'recharts'

type ChartProps = {
	data: {
		day: string
		traffic: number
	}[]
}

export default function Chart({ data }: ChartProps) {
	return (
		<ResponsiveContainer width="100%" height={300}>
			<BarChart data={data}>
				<XAxis
					dataKey="day"
					axisLine={false}
					tickLine={false}
					tickMargin={10}
				/>
				<Tooltip cursor={{ fill: '#1AD32910' }} />

				<Bar
					dataKey="traffic"
					fill="#1AD329"
					radius={[50, 50, 0, 0]}
					barSize={23}
				/>
			</BarChart>
		</ResponsiveContainer>
	)
}
