import { Dispatch, SetStateAction } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { TodoItem } from './TodoItem';
import { ErrorType, Todo } from '../types';

interface Props {
  todos: Todo[],
  tempTodo: Todo | null,
  setTodos: Dispatch<SetStateAction<Todo[]>>
  isLoading: number[]
  setIsLoading: Dispatch<SetStateAction<number[]>>
  handleError: (error: ErrorType) => void
  handleEditTodo: (todoId: number, newTitle: string) => void
  handleDeleteTodo: (id: number) => void
}

export const TodoList: React.FC<Props> = (props) => {
  const {
    todos,
    tempTodo,
    setTodos,
    isLoading,
    setIsLoading,
    handleError,
    handleEditTodo,
    handleDeleteTodo,
  } = props;

  return (
    <section className="todoapp__main" data-cy="TodoList">
      <TransitionGroup>
        {todos.map(todo => (
          <CSSTransition
            key={todo.id}
            timeout={300}
            classNames="item"
          >
            <TodoItem
              key={todo.id}
              handleDeleteTodo={handleDeleteTodo}
              isLoading={isLoading}
              tempTodo={tempTodo}
              todo={todo}
              setTodos={setTodos}
              handleError={handleError}
              setIsLoading={setIsLoading}
              handleEditTodo={handleEditTodo}
            />
          </CSSTransition>
        ))}

        {tempTodo && (
          <CSSTransition
            key={tempTodo.id}
            timeout={300}
            classNames="temp-item"
          >
            <TodoItem
              key={tempTodo.id}
              handleDeleteTodo={handleDeleteTodo}
              isLoading={isLoading}
              tempTodo={tempTodo}
              todo={tempTodo}
              setTodos={setTodos}
              handleError={handleError}
              setIsLoading={setIsLoading}
              handleEditTodo={handleEditTodo}
            />
          </CSSTransition>
        )}
      </TransitionGroup>
    </section>
  );
};