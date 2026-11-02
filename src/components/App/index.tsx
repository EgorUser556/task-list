import { useTodos } from '../../hooks/useTodos';
import TodoFilters from '../TodoFilter';
import TodoForm from '../TodoForm';
import TodoItem from '../TodoItem';
import styled from './styled.module.scss';

const App = () => {
  const { visibleTodos, activeCount, filter, setFilter, addTodo, toggleTodo, deleteTodo } =
    useTodos();

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
