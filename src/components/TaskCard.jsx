const TaskCard = ({ task, column, onDragStart }) => {
  return (
    <div
      className={`task ${column}`}
      draggable
      onDragStart={(e) => onDragStart(e, task, column)}
    >
      {task.text}
    </div>
  );
};

export default TaskCard;
