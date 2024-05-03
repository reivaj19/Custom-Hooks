import { useEffect, useReducer } from "react";
import { todoReducer } from "../08-useReducer/todoReducer";


const init = () =>{
    return JSON.parse(localStorage.getItem('Todos')) || [];
}
export const UseTodos = () => {

    

    const [todos, dispatch] = useReducer(todoReducer, [], init)

    useEffect(() => {
      localStorage.setItem('Todos',JSON.stringify( todos ));
    }, [todos])
    
    
    const handleNewTodo = ( todo ) =>{
        const action = {
            type: '[TODO] add Todo',
            payload: todo,
        }

        dispatch(action);
    }

    const handleDeleteTodo = (id) =>{
        dispatch({
            type: '[TODO] Remove Todo',
            payload: id
        });
    }

    const onToggleTodo = (id) =>{
        dispatch({
            type: '[TODO] Toggle Todo',
            payload: id
        });
    }



    
  return {
    todos,
    todosCount: todos.length,
    pendingTodoCount : todos.filter(todo => !todo.done).length,
    handleNewTodo,
    handleDeleteTodo,
    onToggleTodo,

  }
}
