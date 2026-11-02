import { useMemo, useState } from 'react';

import { useLocalStorage } from '../../hooks/useLocalStorage';
import TodoFilters from '../TodoFilter';
import type { Filter } from '../TodoFilter/types';
import TodoForm from '../TodoForm';
import TodoItem from '../TodoItem';
import type { Todo } from '../TodoItem/types';
import styled from './styled.module.scss';

const App = () => {
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);
  const [filter, setFilter] = useState<Filter>('all');

  const addTodo = (text: string) =>
    setTodos((prev) => [{ id: crypto.randomUUID(), text, completed: false }, ...prev]);

  const toggleTodo = (id: string) =>
    setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));

  const deleteTodo = (id: string) => setTodos((prev) => prev.filter((t) => t.id !== id));

  const visibleTodos = useMemo(() => {
    switch (filter) {
      case 'active':
        return todos.filter((t) => !t.completed);
      case 'completed':
        return todos.filter((t) => t.completed);
      default:
        return todos;
    }
  }, [todos, filter]);

  const activeCount = todos.filter((t) => !t.completed).length;

  return (
    <main className={styled.app}>
      <h1 className={styled.title}>Список задач</h1>
      <TodoForm onAdd={addTodo} />
      <TodoFilters current={filter} onChange={setFilter} />

      {visibleTodos.length === 0 ? (
        <p className={styled.empty}>Задач нет</p>
      ) : (
        <ul className={styled.list}>
          {visibleTodos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} onToggle={toggleTodo} onDelete={deleteTodo} />
          ))}
        </ul>
      )}

      <p className={styled.counter}>Осталось активных: {activeCount}</p>
    </main>
  );
};

export default App;
