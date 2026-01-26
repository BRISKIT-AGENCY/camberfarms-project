import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis } from 'recharts'

const data = [
	{ day: '05', traffic: 2000 },
	{ day: '06', traffic: 1500 },
	{ day: '06', traffic: 3000 },
	{ day: '07', traffic: 1550 },
	{ day: '08', traffic: 2000 },
	{ day: '09', traffic: 2500 },
	{ day: '10', traffic: 3500 },
	{ day: '11', traffic: 900 },
]

export default function Chart() {
	return (
		<ResponsiveContainer width="100%" height={300}>
			<BarChart data={data} barGap={10}>
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
