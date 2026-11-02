import { useState } from 'react';

import styled from './styled.module.scss';
import type { TodoFormProps } from './types';

const TodoForm = ({ onAdd }: TodoFormProps) => {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;
    onAdd(trimmed);
    setText('');
  };

  return (
    <form className={styled.form} onSubmit={handleSubmit}>
      <input
        className={styled.input}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Что нужно сделать?"
      />
      <button className={styled.submit} type="submit" disabled={!text.trim()}>
        Добавить
      </button>
    </form>
  );
};

export default TodoForm;
