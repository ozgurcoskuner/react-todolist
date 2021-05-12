import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

function TodoForm(props) {
  const items = props.items;
  const setItems = props.setItems;

  const [newItem, setNewItem] = useState({
    id: uuidv4(),
    activity: "",
    time: "",
    date: "",
    reminder: false,
  });

  const [toggleFormState, setToggleFormState] = useState(false);

  const [warningModal, setWarningModal] = useState(false);

  useEffect(() => {
    if (warningModal) {
      window.addEventListener("click", handleModal);
      window.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
          handleModal();
        }
      });
    }

    return () => {
      window.removeEventListener("click", handleModal);
    };
  }, [warningModal]);

  const toggleForm = () => {
    setToggleFormState(!toggleFormState);
  };
  const createActivity = (e) => {
    setNewItem({
      ...newItem,
      activity: e.target.value,
    });
  };
  const createDate = (e) => {
    setNewItem({
      ...newItem,
      date: e.target.value,
    });
  };
  const createTime = (e) => {
    setNewItem({
      ...newItem,
      time: e.target.value,
    });
  };

  const handleModal = () => {
    setWarningModal(false);
  };

  const createReminder = (e) => {
    setNewItem({
      ...newItem,
      reminder: !newItem.reminder,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if ((newItem.activity && newItem.date && newItem.time) === "") {
      setWarningModal(true);
      return;
    }

    const copyItems = items.slice(0);
    copyItems.push(newItem);
    setItems(copyItems);
    setNewItem({
      id: uuidv4(),
      activity: "",
      time: "",
      date: "",
      reminder: newItem.reminder,
    });
  };
  return (
    <div>
      <div className={warningModal ? "open-modal" : "modal"}>
        <span>Missing information!</span>
        <button onClick={handleModal}>X</button>
      </div>
      <button
        className="toggleButton"
        style={
          toggleFormState
            ? { background: "rgb(91, 223, 91)" }
            : { background: "red" }
        }
        onClick={toggleForm}
      >
        {toggleFormState ? "Open" : "Close"}
      </button>
      <form className={toggleFormState ? "hideForm" : ""}>
        <label>
          Activity:
          <input
            type="text"
            value={newItem.activity}
            onChange={(e) => createActivity(e)}
          />
        </label>
        <label>
          Date:
          <input
            type="date"
            value={newItem.date}
            onChange={(e) => createDate(e)}
          />
        </label>
        <label>
          Time:
          <input
            type="time"
            value={newItem.time}
            onChange={(e) => createTime(e)}
          />
        </label>
        <label className="checkboxLabel">
          Set reminder:
          <input
            type="checkbox"
            onClick={(e) => createReminder(e)}
            value={newItem.reminder}
          />
        </label>
        <input
          type="submit"
          value="Add Activity"
          onClick={(e) => handleSubmit(e)}
        />
      </form>
    </div>
  );
}

export default TodoForm;
