import { useMemo, useState } from 'react';

import type { Filter } from '../components/TodoFilter/types';
import type { Todo } from '../components/TodoItem/types';
import { useLocalStorage } from './useLocalStorage';

export const useTodos = () => {
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

  const activeCount = useMemo(() => todos.filter((t) => !t.completed).length, [todos]);

  return { visibleTodos, activeCount, filter, setFilter, addTodo, toggleTodo, deleteTodo };
};
