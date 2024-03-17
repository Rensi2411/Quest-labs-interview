import React, { useState } from 'react';
import Board from './Board';
import { getSections, updateSections } from '../data';

function ParentComponent() {
  // State to manage sections
  const [sections, setSections] = useState(getSections());

  // Function to add a new card to a section
  const addCard = (title, sectionId) => {
    // Map through sections to find the target section and update its cards
    const updatedSections = sections.map(section => {
      if (section.id === sectionId) {
        return {
          ...section,
          cards: [...section.cards, { id: Date.now(), title }]
        };
      }
      return section;
    });
    // Update sections state with the updated sections array
    setSections(updatedSections);
    // Update sections data in the backend
    updateSections(updatedSections);
  };

  // Function to move card from source section to destination section
  const moveCard = (sourceSectionId, destinationSectionId, sourceIndex, destinationIndex, draggableId) => {
    // Copy the sections array
    const updatedSections = [...sections];
    // Find the index of source and destination sections
    const sourceSectionIndex = updatedSections.findIndex(section => section.id === Number(sourceSectionId));
    const destinationSectionIndex = updatedSections.findIndex(section => section.id === Number(destinationSectionId));

    // Remove the card from the source section
    const [movedCard] = updatedSections[sourceSectionIndex].cards.splice(sourceIndex, 1);
    // Insert the card into the destination section
    updatedSections[destinationSectionIndex].cards.splice(destinationIndex, 0, movedCard);

    // Update sections state with the updated sections array
    setSections(updatedSections);
    updateSections(updatedSections);
  };

  return (
    <div>
      <Board sections={sections} addCard={addCard} moveCard={moveCard} />
    </div>
  );
}

export default ParentComponent;
