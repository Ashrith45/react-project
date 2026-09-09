import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts'
import { categoryById } from '../data/categories'

export default function CategoryDonut({ data }) {
  if (data.length === 0) {
    return <p className="empty-note">No expenses logged this month yet.</p>
  }

  return (
    <ResponsiveContainer width="100%" height={220}>
      <PieChart>
        <Pie
          data={data}
          dataKey="total"
          nameKey="category"
          innerRadius={55}
          outerRadius={85}
          paddingAngle={2}
        >
          {data.map((entry) => (
            <Cell key={entry.category} fill={categoryById(entry.category).color} />
          ))}
        </Pie>
        <Tooltip
          formatter={(value, name) => [`₹${value.toLocaleString('en-IN')}`, categoryById(name).label]}
        />
      </PieChart>
    </ResponsiveContainer>
  )
}
