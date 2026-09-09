import { NavLink } from 'react-router-dom'

const TABS = [
  { to: '/', label: 'Dashboard' },
  { to: '/transactions', label: 'Transactions' },
  { to: '/budgets', label: 'Budgets' },
  { to: '/reports', label: 'Reports' },
]

export default function LedgerShell({ children }) {
  return (
    <div className="ledger-book">
      <nav className="ledger-tabs">
        {TABS.map((tab) => (
          <NavLink
            key={tab.to}
            to={tab.to}
            end={tab.to === '/'}
            className={({ isActive }) => `ledger-tab ${isActive ? 'active' : ''}`}
          >
            {tab.label}
          </NavLink>
        ))}
      </nav>
      <div className="ledger-page">{children}</div>
    </div>
  )
}
