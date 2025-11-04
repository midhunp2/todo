import React, { useState, useEffect } from "react";
import Column from "./components/Column";
import TrashArea from "./components/TrashArea";
import "./styles.css";

const API_URL = "http://localhost:5000/tasks"; 

const App = () => {
  const [tasks, setTasks] = useState({ todo: [], inProgress: [], done: [] });
  const [newTask, setNewTask] = useState("");
  const [loaded, setLoaded] = useState(false); 

  
  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        setTasks(data);
        setLoaded(true); 
      })
      .catch((err) => console.error("Error loading tasks:", err));
  }, []);

  useEffect(() => {
    if (!loaded) return; 

    fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(tasks),
    }).catch((err) => console.error("Error saving tasks:", err));
  }, [tasks, loaded]);

  const handleAddTask = () => {
    if (!newTask.trim()) return;
    const task = { id: Date.now(), text: newTask };
    setTasks((prev) => ({ ...prev, todo: [...prev.todo, task] }));
    setNewTask("");
  };

  const handleDragStart = (e, task, fromColumn) => {
    e.dataTransfer.setData("task", JSON.stringify({ task, fromColumn }));
  };

  const handleDrop = (e, toColumn) => {
    const { task, fromColumn } = JSON.parse(e.dataTransfer.getData("task"));
    if (fromColumn === toColumn) return;

    setTasks((prev) => {
      const newState = { ...prev };
      newState[fromColumn] = prev[fromColumn].filter((t) => t.id !== task.id);
      newState[toColumn] = [...prev[toColumn], task];
      return newState;
    });
  };

  const handleDelete = (e) => {
    const { task, fromColumn } = JSON.parse(e.dataTransfer.getData("task"));
    setTasks((prev) => ({
      ...prev,
      [fromColumn]: prev[fromColumn].filter((t) => t.id !== task.id),
    }));
  };

  return (
    <div className="app">
      <h1>Tasks</h1>

      <div className="add-task">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Enter new task"
        />
        <button onClick={handleAddTask}>Add</button>
      </div>

      <div className="columns">
        <Column
          title="To Do"
          column="todo"
          tasks={tasks.todo}
          onDragStart={handleDragStart}
          onDrop={handleDrop}
        />
        <Column
          title="In Progress"
          column="inProgress"
          tasks={tasks.inProgress}
          onDragStart={handleDragStart}
          onDrop={handleDrop}
        />
        <Column
          title="Done"
          column="done"
          tasks={tasks.done}
          onDragStart={handleDragStart}
          onDrop={handleDrop}
        />
      </div>

      <TrashArea onDrop={handleDelete} />
    </div>
  );
};

export default App;
