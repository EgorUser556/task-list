import clsx from 'clsx';

import styled from './styled.module.scss';
import type { TodoItemProps } from './types';

const TodoItem = ({ todo, onToggle, onDelete }: TodoItemProps) => {
  return (
    <li className={clsx(styled.item, { [styled.done]: todo.completed })}>
      <label className={styled.label}>
        <input type="checkbox" checked={todo.completed} onChange={() => onToggle(todo.id)} />
        <span className={styled.text}>{todo.text}</span>
      </label>
      <button className={styled.delete} onClick={() => onDelete(todo.id)}>
        x
      </button>
    </li>
  );
};

export default TodoItem;
