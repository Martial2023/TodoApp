import { useEffect, useState } from "react"
import axios from 'axios'

function App() {
  const [newTodo, setNewTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [editingTodo, setEditingTodo] = useState(null)
  const [textEdited, setTextEdited] = useState("")

  const addTodo = async (e) => {
    e.preventDefault();
    if (!newTodo.trim()) return;
    try {
      const response = await axios.post("/api/todos", {
        text: newTodo.trim()
      })
      setTodos([...todos, response.data])
      setNewTodo("")
    } catch (error) {
      console.log("Error adding todo: ", error)
    }
  }

  const fetchTodos = async () => {
    try {
      const response = await axios.get("/api/todos")
      setTodos(response.data)
    } catch (error) {
      console.error("Error fetching todos")
    }
  }
  useEffect(() => {
    fetchTodos()
  }, [])

  const editing = (todo) => {
    setEditingTodo(todo._id)
    setTextEdited(todo.text)
  }

  const saveEdit = async (id) => {
    try {
      const response = await axios.patch(`/api/todos/${id}`, {
        text: textEdited
      })
      setTodos(todos.map((todo) => (todo._id === id ? response.data : todo)))
      setEditingTodo(null)
      setTextEdited("")
    } catch (error) {
      console.log("Error updating todo: ", error)
    }
  }

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`/api/todos/${id}`)
      setTodos(todos.filter((todo) => todo._id !== id))
    } catch (error) {
      console.log("Error deleting todo: ", error)
    }
  }

  const toggleTodo = async (id) => {
    try {
      const todo = todos.find((t) => t._id === id)
      const response = await axios.patch(`/api/todos/${id}`, {
        completed: !todo.completed
      })
      setTodos(todos.map((t) => (t._id === id ? response.data : t)))
    } catch (error) {
      console.log("Error toggling todo: ", error)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-1">
            Todo List
          </h1>
          <p className="text-gray-500 text-sm">Manage your tasks</p>
        </div>
        <form
          onSubmit={addTodo}
          className="mb-6"
        >
          <div className="flex gap-2">
            <input
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md outline-none focus:border-blue-400"
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              placeholder="What needs to be done?"
              required
            />
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md font-medium"
            >
              Add
            </button>
          </div>
        </form>

        <div className="mt-4">
          {todos.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">No tasks yet. Add one above!</p>
            </div>
          ) : (
            <div className="space-y-2">
              {
                todos.map((todo) => (
                  <div 
                    key={todo._id}
                    className="border border-gray-200 rounded-md p-3"
                  >
                    {
                      editingTodo === todo._id ? (
                        <div className="flex items-center gap-2">
                          <input
                            className="flex-1 p-2 border border-gray-300 rounded-md outline-none focus:border-blue-400"
                            type="text"
                            value={textEdited}
                            onChange={(e) => setTextEdited(e.target.value)}
                          />
                          <button
                            onClick={() => saveEdit(todo._id)}
                            className="px-3 py-1 text-white rounded-md bg-green-500 hover:bg-green-600"
                          >
                            Save
                          </button>
                          <button
                            className="px-3 py-1 text-gray-600 rounded-md bg-gray-200 hover:bg-gray-300"
                            onClick={() => setEditingTodo(null)}
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => toggleTodo(todo._id)}
                              className={`w-5 h-5 border rounded items-center justify-center ${
                                todo.completed 
                                  ? "bg-green-500 border-green-500" 
                                  : "border-gray-300"
                              }`}
                            >
                              {todo.completed && <span className="text-white text-xs">✓</span>}
                            </button>
                            <span className={`${
                              todo.completed 
                                ? "text-gray-400 line-through" 
                                : "text-gray-700"
                            }`}>
                              {todo.text}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <button
                              className="px-2 py-1 text-blue-600 hover:bg-blue-50 rounded"
                              onClick={() => editing(todo)}
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => deleteTodo(todo._id)}
                              className="px-2 py-1 text-red-600 hover:bg-red-50 rounded"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      )
                    }
                  </div>
                ))
              }
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default App