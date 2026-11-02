export type Filter = 'all' | 'active' | 'completed';

export interface TodoFiltersProps {
  current: Filter;
  onChange: (filter: Filter) => void;
}
