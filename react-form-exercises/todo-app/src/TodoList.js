import React, { useState } from 'react';
import Todo from './Todo';
import NewTodoForm from './NewTodoForm';

const TodoList = () => {
	const [ todos, setTodos ] = useState([]);

	const addTodo = (input, id) => {
		setTodos((todos) => [ ...todos, { input, id } ]);
	};

	const removeTodo = (id) => {
		setTodos((todos) => todos.filter((todo) => todo.id !== id));
	};

	const todoComponents = todos.map((todo) => (
		<Todo input={todo.input} key={todo.id} id={todo.id} remove={removeTodo} />
	));

	return (
		<div>
			<h1>To-do List</h1>
			<NewTodoForm addTodo={addTodo} />
			<ul>{todoComponents}</ul>
		</div>
	);
};

export default TodoList;
