import { useState } from 'react'
import { CATEGORIES } from '../data/categories'

const todayISO = () => new Date().toISOString().slice(0, 10)

export default function TransactionForm({ onAdd }) {
  const [form, setForm] = useState({
    type: 'expense',
    amount: '',
    category: 'food',
    note: '',
    date: todayISO(),
  })

  function update(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    const amount = parseFloat(form.amount)
    if (!amount || amount <= 0) return
    onAdd({ ...form, amount })
    setForm({ type: 'expense', amount: '', category: 'food', note: '', date: todayISO() })
  }

  return (
    <form className="entry-form" onSubmit={handleSubmit}>
      <div className="entry-form-row">
        <select value={form.type} onChange={(e) => update('type', e.target.value)}>
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>
        <input
          type="number"
          placeholder="Amount"
          value={form.amount}
          onChange={(e) => update('amount', e.target.value)}
          min="0"
          step="0.01"
        />
        <input type="date" value={form.date} onChange={(e) => update('date', e.target.value)} />
      </div>
      <div className="entry-form-row">
        <select value={form.category} onChange={(e) => update('category', e.target.value)}>
          {CATEGORIES.map((c) => (
            <option key={c.id} value={c.id}>
              {c.label}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Note (optional)"
          value={form.note}
          onChange={(e) => update('note', e.target.value)}
        />
        <button type="submit">Add entry</button>
      </div>
    </form>
  )
}
