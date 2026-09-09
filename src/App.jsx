import { Routes, Route } from 'react-router-dom'
import LedgerShell from './components/LedgerShell'
import Dashboard from './pages/Dashboard'
import Transactions from './pages/Transactions'
import Budgets from './pages/Budgets'
import Reports from './pages/Reports'

export default function App() {
  return (
    <LedgerShell>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/budgets" element={<Budgets />} />
        <Route path="/reports" element={<Reports />} />
      </Routes>
    </LedgerShell>
  )
}
