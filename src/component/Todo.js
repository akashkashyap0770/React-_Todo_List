import React, { useEffect, useState } from "react";
import "./style.css";

// get the localStorage data back:-
const getLocalData = () => {
    const lists = localStorage.getItem("mytodolist");

    if(lists) {
        // JSON.parse convert to Array format
        return JSON.parse(lists);
    } 
    else {
        return [];
    }
}

const Todo = () => {
  const [inputData, setInputData] = useState("");

//   const [items, setItems] = useState([]);
const [items, setItems] = useState(getLocalData());

const [isEditItem, setIsEditItem] = useState("");

const [toggleButton, setToggleButton] = useState(false);


  // add the items function:-
  const addItem = () => {
    if (!inputData) {
      alert("plz fill the data");
    } 
    else if (inputData && toggleButton) {
        setItems(
            items.map((curElem) => {
                if(curElem.id === isEditItem) {
                    return {...curElem, name:inputData}
                }
                return curElem;
            })
        )
        setInputData("");
        setIsEditItem(null);
        setToggleButton(false);
    }
    else {
        const myNewInputData = {
            id: new Date().getTime().toString(),
            name: inputData,
        }
      setItems([...items, myNewInputData]);
      setInputData("");
    }
  };

//   edit the item section:-
const editItem = (index) => {
    const itemListEdited = items.find((curElem) => {
        return curElem.id === index;
    });
    setInputData(itemListEdited.name);
    setIsEditItem(index);
    setToggleButton(true);
}

//   how to delete item section:-
const deleteItem = (index) => {
    const updatedItem = items.filter((curElem) => {
        return curElem.id !== index;
    });
    setItems(updatedItem);
}

// remove all items:-
const removeAll = () => {
    setItems([]);
}

// add items value on local storage:-
useEffect(() => {
    // JSON.stringify convert to String format
    localStorage.setItem("mytodolist", JSON.stringify(items));
}, [items])

  return (
    <>
      <div className="main-div">
        <div className="child-div">
          <figure>
            <img src="./images/todo-0.svg" alt="todologo" />
            <figcaption>Add Your List Here ✌️</figcaption>
          </figure>
          <div className="add-items">
            <input
              className="form-control"
              type="text"
              placeholder="✍️ Add Item"
              value={inputData}
              onChange={(event) => setInputData(event.target.value)}
            />

            {toggleButton ? (
            <i className="fa-solid fa-pen-to-square add-toggle-btn" onClick={addItem}></i>
            ) : (
            <i className="fa-solid fa-plus add-btn" onClick={addItem}></i>
            )}
            
          </div>
          {/* Show Our Items */}
          <div className="showItems">
            {items.map((curElem) => {
              return (
                <div className="each-item" key={curElem.id}>
                  <h3>{curElem.name}</h3>
                  <div className="todo-btn">
                    <i className="fa-solid fa-pen-to-square add-btn" onClick={() => editItem(curElem.id)}></i>
                    <i className="fa-solid fa-trash add-btn" onClick={() => deleteItem(curElem.id)}></i>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Remove All Items */}
          <div className="rm-items">
            <button className="btn effect04" data-sm-link-text="Remove All" onClick={removeAll}>
              <span>CHECK LIST</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Todo;
