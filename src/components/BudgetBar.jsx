import { categoryById } from '../data/categories'

export default function BudgetBar({ progress }) {
  const { category, limit, spent, percent, projected, onTrackToExceed } = progress
  const label = categoryById(category).label

  return (
    <div className="budget-bar-row">
      <div className="budget-bar-header">
        <span>{label}</span>
        <span className="budget-figures">
          ₹{spent.toLocaleString('en-IN')} / ₹{limit.toLocaleString('en-IN')}
        </span>
      </div>
      <div className="budget-bar-track">
        <div
          className={`budget-bar-fill ${percent >= 100 ? 'over' : ''}`}
          style={{ width: `${percent}%` }}
        />
      </div>
      {onTrackToExceed && (
        <p className="budget-warning">
          At this rate, projected to reach ₹{Math.round(projected).toLocaleString('en-IN')} by month's end —
          over budget.
        </p>
      )}
    </div>
  )
}
