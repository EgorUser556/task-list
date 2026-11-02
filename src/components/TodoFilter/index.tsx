import clsx from 'clsx';

import { FILTERS } from './config';
import styled from './styled.module.scss';
import type { TodoFiltersProps } from './types';

const TodoFilter = ({ current, onChange }: TodoFiltersProps) => {
  return (
    <div className={styled.filters}>
      {FILTERS.map(({ value, label }) => (
        <button
          key={value}
          type="button"
          className={clsx(styled.button, { [styled.active]: current === value })}
          onClick={() => onChange(value)}
        >
          {label}
        </button>
      ))}
    </div>
  );
};

export default TodoFilter;
