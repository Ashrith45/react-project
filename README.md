# Ledger 📒

A budget tracker styled as a real accounting ledger book — tabbed pages
down the side, monospace right-aligned figures, cream ledger paper.
Multi-page (React Router), with state shared across every page via
Context + a reducer.

## Why this is more than a CRUD app

Anyone can show a list of transactions and a running total. The piece
worth explaining in an interview is the **burn-rate projection** in
`src/utils/finance.js` — `budgetProgress()` doesn't just show what you've
spent so far, it looks at how many days have passed in the month, works
out your daily spend rate, and projects where you'll land by month's end.
That means a category can warn you it's on track to go over budget while
you've technically only spent 50% of it — which is a genuinely more
useful signal than a plain progress bar.

## Pages

- **Dashboard** (`/`) — this month's income/expense/net + a category
  breakdown donut chart
- **Transactions** (`/transactions`) — add and remove entries
- **Budgets** (`/budgets`) — set a monthly limit per category, see
  burn-rate projected overspend
- **Reports** (`/reports`) — 6-month income vs. expense trend line

## Stack

- React 18 + Vite
- React Router for multi-page navigation
- Context + `useReducer` for shared state (no prop drilling across pages)
- Recharts for the donut and line charts
- `localStorage` persistence, no backend

## Running locally

```bash
npm install
npm run dev
```

## Project structure

```
src/
  context/FinanceContext.jsx   shared state: transactions, budgets, actions
  utils/finance.js              totals, category breakdown, trend, burn-rate projection
  data/categories.js            category catalog with colors
  components/
    LedgerShell.jsx              tab navigation + page frame
    StatLine.jsx                 income/expense/net row
    CategoryDonut.jsx            pie chart
    TrendLine.jsx                 line chart
    TransactionForm.jsx          add-entry form
    TransactionTable.jsx         entry list
    BudgetBar.jsx                 progress bar + burn-rate warning
  pages/
    Dashboard.jsx
    Transactions.jsx
    Budgets.jsx
    Reports.jsx
  App.jsx                        routes
  main.jsx                       router + context providers
```
