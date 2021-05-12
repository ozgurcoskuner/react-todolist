import React, { useState } from "react";
import TodoItem from "./TodoItem";
import TodoForm from "./TodoForm";
import { v4 as uuidv4 } from "uuid";

function TodoMain() {
  const [items, setItems] = useState([
    {
      id: uuidv4(),
      activity: "Meeting",
      time: "13:30",
      date: "2021-03-11",
      reminder: true,
    },
    {
      id: uuidv4(),
      activity: "Chilling",
      time: "15:00",
      date: "2021-03-13",
      reminder: true,
    },
    {
      id: uuidv4(),
      activity: "Fitness",
      time: "17:30",
      date: "2021-03-14",
      reminder: false,
    },
  ]);

  const handleClick = (event) => {
    const updItems = items.filter((item) => {
      return item.id !== event.target.id;
    });

    setItems(updItems);
  };

  const handleDouble = (event) => {
    const itemsWithReminder = items.map((item) => {
      if (event.currentTarget.id === item.id) {
        item = { ...item, reminder: !item.reminder };
      }

      return item;
    });
    setItems(itemsWithReminder);
  };

  return (
    <div className="TodoMain">
      <h2>To do list</h2>

      <TodoForm items={items} setItems={setItems} />
      {items.length === 0 ? (
        <h2 style={{ marginTop: "40px" }}>There is no activity!</h2>
      ) : (
        items.map((item) => {
          return (
            <TodoItem
              handleDouble={handleDouble}
              item={item}
              key={item.id}
              handleClick={handleClick}
            />
          );
        })
      )}
    </div>
  );
}
export default TodoMain;
