import React from "react";


function TodoItem(props) {
  const item = props.item;

  return (
    <>
      <div
        className={!item.reminder ? "TodoItem" : "TodoItem active"}
        onDoubleClick={props.handleDouble}
        id={item.id}
      >
        {item.activity}
        <button id={item.id} onClick={props.handleClick}>
          X
        </button>
        <div className="Time">
          {item.date} at {item.time}
        </div>
      </div>
    </>
  );
}

export default TodoItem;
