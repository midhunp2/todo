const TrashArea = ({ onDrop }) => {
  const allowDrop = (e) => e.preventDefault();

  return (
    <div className="trash" onDrop={onDrop} onDragOver={allowDrop}>
      Delete
    </div>
  );
};

export default TrashArea;
