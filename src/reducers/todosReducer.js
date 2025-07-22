export default function reducer(currentTodos, action) {
    switch(action.type) {
        case "add":
          if(!action.payload.title.trim()) {
              return
          }
          
          const updatedTodos = [
            ...currentTodos,
            {
              id: currentTodos.length + 1,
              title: action.payload.title,
              description: "no description yet",
              isCompleted: false
            }
          ]
      
          localStorage.setItem("todos", JSON.stringify(updatedTodos))
          return updatedTodos

        case "delete":
          const newTodos = currentTodos.filter((t) => t.id !== action.payload.id) // todos without the deleted one
          localStorage.setItem("todos", JSON.stringify(newTodos))
          return newTodos

        case "update":
          const todos = currentTodos.map((t) => {
            if(t.id === action.payload.id) return action.payload
            return t;
          })
          localStorage.setItem("todos", JSON.stringify(todos))
          return todos

        case "refrech":
          let todosFromStorage = JSON.parse(localStorage.getItem("todos"))
          if(!todosFromStorage) todosFromStorage = []
          return todosFromStorage
        case "done":
          const todosUpdated = currentTodos.map((t) => {
            if(t.id === action.payload.id) {
                return {
                  ...action.payload,
                  isCompleted: !action.payload.isCompleted
                }
            } 
            return t;
          })
          localStorage.setItem("todos", JSON.stringify(todosUpdated))
          return todosUpdated
        default:
            throw Error("error action"+ action.type)
    }
}