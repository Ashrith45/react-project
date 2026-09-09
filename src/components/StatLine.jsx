export default function StatLine({ label, amount, tone = 'neutral' }) {
  const sign = amount < 0 ? '-' : ''
  const display = Math.abs(amount).toLocaleString('en-IN')

  return (
    <div className={`stat-line tone-${tone}`}>
      <span className="stat-label">{label}</span>
      <span className="stat-amount">
        {sign}₹{display}
      </span>
    </div>
  )
}
