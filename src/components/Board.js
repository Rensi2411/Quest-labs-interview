import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import '../styles/board.css'; 
import CardForm from './CardForm'; 
import { getSections, updateSections } from '../data';

function Board() {
  // Get initial sections data and set it as initial state
  const initialData = getSections();
  const [sections, setSections] = useState(initialData);

  // Handle drag and drop event
  const onDragEnd = (result) => {
    const { source, destination, draggableId } = result;
    if (!destination) return;
    moveCard(source.droppableId, destination.droppableId, source.index, destination.index, draggableId);
  };

  // Move a card from source section to destination section
  const moveCard = (sourceSectionId, destinationSectionId, sourceIndex, destinationIndex, draggableId) => {
    // Copy the sections array to avoid mutating state directly
    const updatedSections = [...sections];
    // Find the source and destination section indices
    const sourceSectionIndex = updatedSections.findIndex(section => section.id === Number(sourceSectionId));
    const destinationSectionIndex = updatedSections.findIndex(section => section.id === Number(destinationSectionId));

    // Remove the card from the source section and insert it into the destination section
    const [movedCard] = updatedSections[sourceSectionIndex].cards.splice(sourceIndex, 1);
    updatedSections[destinationSectionIndex].cards.splice(destinationIndex, 0, movedCard);

    // Update state with the modified sections
    setSections(updatedSections);
    // Update sections data
    updateSections(updatedSections);
  };

  // Add a new card to a section
  const addCard = (title, info, sectionId) => {
    const updatedSections = sections.map(section => {
      if (section.id === sectionId) {
        return {
          ...section,
          cards: [...section.cards, { id: Date.now(), title, info }]
        };
      }
      return section;
    });
    // Update state with the modified sections
    setSections(updatedSections);
    // Update sections data
    updateSections(updatedSections);
  };

  // Delete a card from a section
  const deleteCard = (sectionId, cardId) => {
    // Copy the sections array to avoid mutating state directly
    const updatedSections = sections.map(section => {
      if (section.id === sectionId) {
        return {
          ...section,
          cards: section.cards.filter(card => card.id !== cardId)
        };
      }
      return section;
    });
    // Update state with the modified sections
    setSections(updatedSections);
    // Update sections data
    updateSections(updatedSections);
  };

  // Render the board
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="board">
        {sections.map(section => (
          <div key={section.id} className="section">
            <div className="section-title">{section.title}</div>
            <Droppable droppableId={String(section.id)}>
              {(provided) => (
                <div className="section-content" ref={provided.innerRef} {...provided.droppableProps}>
                  {section.cards.map((card, index) => (
                    <Draggable key={card.id} draggableId={String(card.id)} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="card"
                        >
                          <div className="card-title">{card.title}</div>
                          <CardInfoToggle card={card} />
                          <button id="delete-btn" onClick={() => deleteCard(section.id, card.id)}>🗑</button>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
            <CardForm sectionId={section.id} onAddCard={addCard} />
          </div>
        ))}
      </div>
    </DragDropContext>
  );
}

// Component to toggle card info visibility
function CardInfoToggle({ card }) {
  const [showInfo, setShowInfo] = useState(false);

  // Toggle card info visibility
  const toggleInfo = () => {
    setShowInfo(!showInfo);
  };

  return (
    <div>
      {showInfo && <div className="card-info">{card.info}</div>}
      <button onClick={toggleInfo} id={showInfo ? 'close-btn' : 'info-btn'}>
        {showInfo ? 'Close' : <>&#8801;</>}
      </button>
    </div>
  );
}

export default Board;
