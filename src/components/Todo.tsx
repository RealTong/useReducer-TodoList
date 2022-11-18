import {useReducer, useRef} from "react";

type Todo = {
    id: number,
    content: string,
    status: boolean
}

function todoReducer(todos: Todo[], state: any) {
    switch (state.type) {
        case 'ADD':
            return [...todos, state.payload];
        case 'DELETE':
            return todos.filter((todo: Todo) => todo.id !== state.payload.id)
        case "TOGGLE":
            return todos.map((todo: Todo) => todo.id === state.payload.id ? {...todo, status: !todo.status} : todo)
        default:
            return state
    }
}

function newTodo(text: string) {
    return {
        id: Math.floor(Math.random() * 10000),
        content: text,
        status: false
    }
}

function Todo() {
    const [todos, dispatch] = useReducer(todoReducer, []);
    const inputRef = useRef<HTMLInputElement>(null);
    const handleClick = () => {
        const todoContent = inputRef.current?.value;
        dispatch({type: 'ADD', payload: newTodo(todoContent as string)});
    }
    return (
        <div>
            <input type="text" ref={inputRef}/>
            <button onClick={handleClick}>Add Todo
            </button>
            <ul>
                {
                    todos.map((todo: Todo) => (
                        <div key={todo.id}>
                            <span>{todo.content}</span>
                            <button onClick={() => dispatch({type: 'DELETE', payload: {id: todo.id}})}>Delete</button>
                            <button onClick={() => dispatch({
                                type: 'TOGGLE',
                                payload: {id: todo.id}
                            })}>{todo.status ? 'Yes' : 'No'}</button>
                        </div>
                    ))
                }
            </ul>
        </div>
    )
}

export default Todo
