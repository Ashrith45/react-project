import { categoryById } from '../data/categories'

export default function TransactionTable({ transactions, onDelete }) {
  if (transactions.length === 0) {
    return <p className="empty-note">No entries yet — add your first one above.</p>
  }

  return (
    <table className="ledger-table">
      <thead>
        <tr>
          <th>Date</th>
          <th>Category</th>
          <th>Note</th>
          <th className="num">Amount</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {transactions.map((t) => (
          <tr key={t.id}>
            <td>{t.date}</td>
            <td>{categoryById(t.category).label}</td>
            <td className="note-cell">{t.note || '—'}</td>
            <td className={`num ${t.type === 'income' ? 'income' : 'expense'}`}>
              {t.type === 'income' ? '+' : '-'}₹{t.amount.toLocaleString('en-IN')}
            </td>
            <td>
              <button className="remove-entry" onClick={() => onDelete(t.id)} aria-label="Delete entry">
                ✕
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
