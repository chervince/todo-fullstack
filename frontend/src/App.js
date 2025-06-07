import React, { useEffect, useState } from 'react';

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    fetch('http://localhost:3001/todos')
      .then(res => res.json())
      .then(setTodos)
      .catch(() => setTodos([]));
  }, []);

  // Ajout d'une tâche
  const handleAddTodo = async (e) => {
    e.preventDefault();
    if (!newTodo.trim()) return;
    const res = await fetch('http://localhost:3001/todos', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: newTodo })
    });
    if (res.ok) {
      const todo = await res.json();
      setTodos([todo, ...todos]);
      setNewTodo("");
    }
  };

  // Coche/décoche une tâche (PATCH)
  const handleToggleTodo = async (todo) => {
    const res = await fetch(`http://localhost:3001/todos/${todo.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed: !todo.completed })
    });
    if (res.ok) {
      const updated = await res.json();
      setTodos(todos =>
        todos.map(t =>
          t.id === todo.id ? updated : t
        )
      );
    }
  };

  // Suppression d'une tâche
const handleDeleteTodo = async (id) => {
  const res = await fetch(`http://localhost:3001/todos/${id}`, {
    method: "DELETE"
  });
  if (res.ok) {
    setTodos(todos => todos.filter(t => t.id !== id));
  }
};


return (
  <div style={{
    minHeight: "100vh",
    background: "linear-gradient(135deg, #eef2f3 0%, #dfe6e9 100%)",
    padding: "40px 8px"
  }}>
    <div style={{
      maxWidth: 420,
      margin: "auto",
      background: "#fff",
      borderRadius: 18,
      boxShadow: "0 4px 24px rgba(60,60,100,0.12)",
      padding: 32
    }}>
      <h1 style={{
        textAlign: "center",
        fontWeight: 800,
        fontSize: 32,
        marginBottom: 24,
        letterSpacing: "-1px"
      }}>Ma Todo List</h1>
      <form onSubmit={handleAddTodo} style={{
        display: "flex", marginBottom: 28
      }}>
        <input
          type="text"
          placeholder="Ajouter une tâche..."
          value={newTodo}
          onChange={e => setNewTodo(e.target.value)}
          style={{
            flex: 1,
            padding: "12px 14px",
            border: "1px solid #eee",
            borderRadius: 8,
            fontSize: 16,
            outline: "none",
            boxShadow: "0 1px 2px #e4e4e6",
            background: "#f8f9fa"
          }}
        />
        <button
          type="submit"
          style={{
            marginLeft: 8,
            padding: "12px 20px",
            background: "#4f8cff",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            fontWeight: 700,
            fontSize: 16,
            letterSpacing: "0.5px",
            cursor: "pointer",
            boxShadow: "0 2px 8px rgba(80,120,255,0.08)",
            transition: "background .2s"
          }}
        >
          +
        </button>
      </form>
      <ul style={{ padding: 0, listStyle: "none" }}>
        {todos.map(todo => (
          <li key={todo.id} style={{
            display: "flex", alignItems: "center", padding: "12px 0",
            borderBottom: "1px solid #f0f0f3"
          }}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => handleToggleTodo(todo)}
              style={{
                marginRight: 14,
                width: 22, height: 22,
                accentColor: "#4f8cff",
                cursor: "pointer"
              }}
            />
            <span style={{
              flex: 1,
              textDecoration: todo.completed ? "line-through" : "none",
              color: todo.completed ? "#9fa7b1" : "#222",
              fontSize: 17,
              fontWeight: 500
            }}>
              {todo.title}
            </span>
            <button
              onClick={() => handleDeleteTodo(todo.id)}
              style={{
                marginLeft: 8,
                background: "none",
                border: "none",
                color: "#e74c3c",
                fontWeight: "bold",
                fontSize: 22,
                cursor: "pointer",
                opacity: 0.72
              }}
              title="Supprimer"
            >
              ×
            </button>
          </li>
        ))}
      </ul>
      <div style={{
        marginTop: 22, color: "#b3b9c5", fontSize: 14, textAlign: "center"
      }}>
        {todos.length === 0 ? "Aucune tâche pour l’instant." : `${todos.length} tâche${todos.length > 1 ? "s" : ""}`}
      </div>
    </div>
  </div>
);

}

export default App;
