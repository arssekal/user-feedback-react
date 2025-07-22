import { createContext, useContext, useReducer } from "react";
import lhoussaine from '../reducers/todosReducer'

const TodosContext = createContext({})

const TodosProvider = ({children}) => {
    const [todos, todosDispatch] = useReducer(lhoussaine, [])
    return (
        <TodosContext.Provider value={{todos: todos, dispatch: todosDispatch}}>
            {children}
        </TodosContext.Provider>
    );
} 

export const useTodos = () => {
    return useContext(TodosContext)
}

export default TodosProvider