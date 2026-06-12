import { useMemo, useReducer } from 'react';

const initial = { search: '', category: '', level: '' };
function reducer(state, action) {
  if (action.type === 'reset') return initial;
  return { ...state, [action.name]: action.value };
}

export function useClassFilters(classes = []) {
  const [filters, dispatch] = useReducer(reducer, initial);
  const filteredClasses = useMemo(() => classes.filter(item => {
    const bySearch = item.title.toLowerCase().includes(filters.search.toLowerCase());
    const byCategory = !filters.category || item.category === filters.category;
    const byLevel = !filters.level || item.level === filters.level;
    return bySearch && byCategory && byLevel;
  }), [classes, filters]);

  return { filters, filteredClasses, setFilter: (name, value) => dispatch({ name, value }), resetFilters: () => dispatch({ type: 'reset' }) };
}
