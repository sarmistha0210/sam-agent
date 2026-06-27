import { useState } from 'react';
import styles from './BySamTodoList.module.css';

export function BySamTodoList() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  const handleAddTodo = () => {
    if (input.trim() === '') {
      return;
    }

    const newTodo = {
      id: Date.now(),
      text: input,
      completed: false,
    };

    setTodos([...todos, newTodo]);
    setInput('');
  };

  const handleDeleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleToggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddTodo();
    }
  };

  const completedCount = todos.filter((todo) => todo.completed).length;

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>My Tasks</h1>
        <p className={styles.subtitle}>
          {completedCount} of {todos.length} completed
        </p>
      </header>

      <div className={styles.inputSection}>
        <label htmlFor="todo-input" className={styles.label}>
          Add a new task
        </label>
        <div className={styles.inputWrapper}>
          <input
            id="todo-input"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Enter a new task..."
            className={styles.input}
            aria-describedby="todo-helper"
          />
          <button
            onClick={handleAddTodo}
            className={styles.addButton}
            aria-label="Add task"
          >
            Add Task
          </button>
        </div>
        <p id="todo-helper" className={styles.helper}>
          Press Enter or click Add Task to add a new item
        </p>
      </div>

      {todos.length === 0 ? (
        <div className={styles.emptyState}>
          <p>No tasks yet. Add one to get started!</p>
        </div>
      ) : (
        <ul className={styles.todoList} aria-label="Task list">
          {todos.map((todo) => (
            <li key={todo.id} className={styles.todoItem}>
              <div className={styles.checkboxWrapper}>
                <input
                  type="checkbox"
                  id={`todo-${todo.id}`}
                  checked={todo.completed}
                  onChange={() => handleToggleTodo(todo.id)}
                  className={styles.checkbox}
                  aria-label={`Mark "${todo.text}" as complete`}
                />
                <label
                  htmlFor={`todo-${todo.id}`}
                  className={`${styles.todoText} ${
                    todo.completed ? styles.completed : ''
                  }`}
                >
                  {todo.text}
                </label>
              </div>
              <button
                onClick={() => handleDeleteTodo(todo.id)}
                className={styles.deleteButton}
                aria-label={`Delete task "${todo.text}"`}
                title="Delete task"
              >
                <span aria-hidden="true">×</span>
              </button>
            </li>
          ))}
        </ul>
      )}

      {todos.length > 0 && (
        <footer className={styles.footer}>
          <small>
            You have {todos.length - completedCount} active task
            {todos.length - completedCount !== 1 ? 's' : ''}
          </small>
        </footer>
      )}
    </div>
  );
}
