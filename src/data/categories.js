export const CATEGORIES = [
  { id: 'food', label: 'Food & Groceries', color: '#8a6d3b' },
  { id: 'transport', label: 'Transport', color: '#2f6f4e' },
  { id: 'rent', label: 'Rent & Bills', color: '#5b4636' },
  { id: 'entertainment', label: 'Entertainment', color: '#9e6b3f' },
  { id: 'health', label: 'Health', color: '#7a8f5c' },
  { id: 'education', label: 'Education', color: '#3f6b6b' },
  { id: 'shopping', label: 'Shopping', color: '#a15c4e' },
  { id: 'other', label: 'Other', color: '#6e6558' },
]

export function categoryById(id) {
  return CATEGORIES.find((c) => c.id === id) || CATEGORIES[CATEGORIES.length - 1]
}
