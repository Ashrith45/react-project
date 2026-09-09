import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts'

export default function TrendLine({ data }) {
  return (
    <ResponsiveContainer width="100%" height={240}>
      <LineChart data={data}>
        <CartesianGrid stroke="#d8cfb8" strokeDasharray="3 3" />
        <XAxis dataKey="month" stroke="#5c5847" fontSize={12} />
        <YAxis stroke="#5c5847" fontSize={12} />
        <Tooltip formatter={(value) => `₹${value.toLocaleString('en-IN')}`} />
        <Line type="monotone" dataKey="income" stroke="#2f6f4e" strokeWidth={2} dot={false} />
        <Line type="monotone" dataKey="expense" stroke="#9e2b25" strokeWidth={2} dot={false} />
      </LineChart>
    </ResponsiveContainer>
  )
}
