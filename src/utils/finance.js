export function monthKey(dateStr) {
  return dateStr.slice(0, 7) // 'YYYY-MM'
}

export function currentMonthKey() {
  return monthKey(new Date().toISOString())
}

export function totalsForMonth(transactions, month) {
  const inMonth = transactions.filter((t) => monthKey(t.date) === month)
  const income = inMonth
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0)
  const expense = inMonth
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0)
  return { income, expense, net: income - expense }
}

export function categoryBreakdown(transactions, month) {
  const totals = {}
  transactions
    .filter((t) => t.type === 'expense' && monthKey(t.date) === month)
    .forEach((t) => {
      totals[t.category] = (totals[t.category] || 0) + t.amount
    })
  return Object.entries(totals)
    .map(([category, total]) => ({ category, total }))
    .sort((a, b) => b.total - a.total)
}

// Last `count` months, oldest first, each with income/expense totals —
// feeds the trend line chart.
export function monthlyTrend(transactions, count = 6) {
  const months = []
  const now = new Date()
  for (let i = count - 1; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1)
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
    months.push(key)
  }
  return months.map((key) => ({
    month: key,
    ...totalsForMonth(transactions, key),
  }))
}

// The piece worth explaining in an interview: rather than just showing
// "spent so far," this projects where spending will land by month's end
// based on the current daily burn rate, so a budget can warn you before
// you've actually gone over — not just after.
export function budgetProgress(transactions, budgets, month) {
  const spendByCategory = {}
  transactions
    .filter((t) => t.type === 'expense' && monthKey(t.date) === month)
    .forEach((t) => {
      spendByCategory[t.category] = (spendByCategory[t.category] || 0) + t.amount
    })

  const [year, mon] = month.split('-').map(Number)
  const daysInMonth = new Date(year, mon, 0).getDate()
  const today = new Date()
  const isCurrentMonth = currentMonthKey() === month
  const daysElapsed = isCurrentMonth ? today.getDate() : daysInMonth

  return Object.entries(budgets).map(([category, limit]) => {
    const spent = spendByCategory[category] || 0
    const dailyRate = daysElapsed > 0 ? spent / daysElapsed : 0
    const projected = dailyRate * daysInMonth
    return {
      category,
      limit,
      spent,
      percent: limit > 0 ? Math.min(100, (spent / limit) * 100) : 0,
      projected,
      onTrackToExceed: projected > limit,
    }
  })
}
