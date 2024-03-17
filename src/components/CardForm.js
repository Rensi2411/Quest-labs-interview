import React, { useState } from 'react';
import '../styles/cardForm.css';

function CardForm({ sectionId, onAddCard }) {
  const [title, setTitle] = useState('');
  const [info, setInfo] = useState('');
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      onAddCard(title.trim(), info.trim(), sectionId);// Pass sectionId to onAddCard function
      setTitle('');
      setInfo('');
      setShowForm(false);
    }
  };

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  return (
    <div className="card-form">
      {showForm ? (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter card title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            placeholder="Enter additional information"
            value={info}
            onChange={(e) => setInfo(e.target.value)}
          />
          <button type="submit">Add Card</button>
          <button type="button" onClick={toggleForm}>Cancel</button>
        </form>
      ) : (
        <button onClick={toggleForm} id="add">+ &#160; Add a card</button> //Include "+" symbol for clarity 
      )}
    </div>
  );
}

export default CardForm;

