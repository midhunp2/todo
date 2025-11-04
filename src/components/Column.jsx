import React from "react";
import TaskCard from "./TaskCard";

const Column = ({ title, column, tasks, onDragStart, onDrop }) => {
  const allowDrop = (e) => e.preventDefault();

  return (
    <div
      className="column"
      onDrop={(e) => onDrop(e, column)}
      onDragOver={allowDrop}
    >
      <h2>{title}</h2>
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          column={column}
          onDragStart={onDragStart}
        />
      ))}
    </div>
  );
};

export default Column;
